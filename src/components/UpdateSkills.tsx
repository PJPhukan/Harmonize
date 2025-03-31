"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const initialSkillsList = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "GraphQL",
  "Tailwind CSS",
  "Redux",
  "Express.js",
];

const UpdateSkill = () => {
  const [skillsList, setSkillsList] = useState<string[]>(initialSkillsList);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const addNewSkill = () => {
    if (newSkill && !skillsList.includes(newSkill)) {
      setSkillsList((prev) => [...prev, newSkill]);
      setNewSkill("");
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
          <Button onClick={addNewSkill} className="text-white py-2 rounded-full font-medium transition">
            Add
          </Button>
        </div>
        <div className="flex w-full justify-center mt-4">
          <Button className="text-white py-2 rounded-full font-medium transition">
            Save Skills
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default UpdateSkill;
