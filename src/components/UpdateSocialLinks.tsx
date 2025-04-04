"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/user.types";

const UpdateSocialLinks = ({ user }: { user: User }) => {
  const [spotifyLink, setSpotifyLink] = useState(user.spotify || "");
  const [youtubeLink, setYoutubeLink] = useState(user.youtube || "");
  const [websiteLink, setWebsiteLink] = useState(user.website || "");
  const [additionalLinks, setAdditionalLinks] = useState<string[]>(
    user.otherLink || []
  );
  const [newLink, setNewLink] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const router = useRouter();
  const addNewLink = () => {
    if (newLink && !additionalLinks.includes(newLink)) {
      setAdditionalLinks((prev) => [...prev, newLink]);
      setNewLink("");
    }
  };

  const UpdateLinks = async () => {
    try {
      setIsSubmittingForm(true);
      const response = await axios.post("/api/update/social", {
        spotify: spotifyLink,
        youtube: youtubeLink,
        website: websiteLink,
        additional: additionalLinks,
      });
      if (response.data.status) {
        router.replace(`/dashboard/settings`);
      }
    } catch (error) {
      console.log("ERROR [UPDATE GENRE ] ", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update Your Social Links</DialogTitle>
        <DialogDescription>
          Add links to your social profiles.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input
          type="url"
          placeholder="Spotify Link"
          value={spotifyLink}
          onChange={(e) => setSpotifyLink(e.target.value)}
          className="w-full"
        />
        <Input
          type="url"
          placeholder="YouTube Link"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="w-full"
        />
        <Input
          type="url"
          placeholder="Website Link"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
          className="w-full"
        />
        <div className="flex flex-col gap-2">
          {additionalLinks.map((link, index) => (
            <div key={index} className="border p-2 rounded-md">
              {link}
            </div>
          ))}
        </div>
        <div className="flex gap-2 ">
          <Input
            type="url"
            placeholder="Add another link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={addNewLink}
            className="text-white py-2 rounded-full font-medium transition"
          >
            Add
          </Button>
        </div>
        <div className="flex w-full justify-center mt-2">
          <Button
            onClick={UpdateLinks}
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

export default UpdateSocialLinks;
