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

const UpdateSocialLinks = () => {
  const [spotifyLink, setSpotifyLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [additionalLinks, setAdditionalLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");

  const addNewLink = () => {
    if (newLink && !additionalLinks.includes(newLink)) {
      setAdditionalLinks((prev) => [...prev, newLink]);
      setNewLink("");
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
        <div className="flex gap-2 mt-4">
          <Input
            type="url"
            placeholder="Add another link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addNewLink} className="text-white py-2 rounded-full font-medium transition">
            Add
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {additionalLinks.map((link, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-md">
              {link}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center mt-2">
          <Button className="text-white py-2 rounded-full font-medium transition">
            Save Links
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default UpdateSocialLinks;
