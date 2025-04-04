"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { User } from "@/types/user.types";

const initialSkillsList = [
  "Playing an instrument",
  "Singing/vocal training",
  "Music theory",
  "Songwriting",
  "Music production",
  "Mixing and mastering",
  "Beat-making",
  "DJing",
  "Ear training",
  "Improvisation",
  "Reading sheet music",
  "Composing",
  "Lyric writing",
  "Performing live",
  "Recording techniques"
];

const UpdateSkill = ({ user }: { user: User }) => {
  console.log(user.skill);
  const [skillsList, setSkillsList] = useState<string[]>(initialSkillsList);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(user.skill);
  const [newSkill, setNewSkill] = useState<string>("");
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  const router = useRouter();
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  useEffect(() => {
    setSkillsList((prev) => Array.from(new Set([...prev, ...user.skill])));
  }, [user.skill]);

  const addNewSkill = () => {
    if (newSkill && !skillsList.includes(newSkill)) {
      setSkillsList((prev) => [...prev, newSkill]);
      setNewSkill("");
    }
  };

  const UpdateSkill = async () => {
    try {
      setIsSubmittingForm(true);
      const response = await axios.post("/api/update/skill", {
        skills: selectedSkills,
      });
      console.log("UPDATE SKILL RESPONSE :", response);
      if (response.data.status) {
        router.replace(`/dashboard/settings`);
      }
    } catch (error) {
      console.log("ERROR [UPDATE PASSWORD ] ", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select Your Skills</DialogTitle>
        <DialogDescription>
          Click on the skills you have. Selected skills will be highlighted.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                selectedSkills.includes(skill)
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder="Add a new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={addNewSkill}
            className="text-white py-2 rounded-full font-medium transition"
          >
            Add
          </Button>
        </div>
        <div className="flex w-full justify-center mt-4">
          <Button
            onClick={UpdateSkill}
            className=" text-white py-2 rounded-full font-medium  transition"
          >
            {isSubmittingForm ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait...
              </>
            ) : (
              " Save Changes"
            )}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default UpdateSkill;
