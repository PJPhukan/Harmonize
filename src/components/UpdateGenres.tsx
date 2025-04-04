"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user.types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const initialGenresList = [
  "R&B",
  "Hip Hop",
  "Indie",
  "Pop",
  "Opera",
  "Classical",
  "Country",
  "Reggae",
  "Soul",
  "DubStep",
  "Rock",
  "Bashment",
  "Gospel",
  "Electro",
  "Blues",
  "Jazz",
  "Rap",
  "Folk",
  "Heavy metal",
  "Drum ans Bass",
  "Funky House",
  "Techno",
  "Punk",
  "Afro Beates",
  "Disco",
  "Slow Jams",
];

const UpdateGenre = ({ user }: { user: User }) => {
  const [genresList, setGenresList] = useState<string[]>(initialGenresList);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(user.genres);
  const [newGenre, setNewGenre] = useState<string>("");
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const router = useRouter();

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const addNewGenre = () => {
    if (newGenre && !genresList.includes(newGenre)) {
      setGenresList((prev) => [...prev, newGenre]);
      setNewGenre("");
    }
  };
  useEffect(() => {
    setGenresList((prev) => Array.from(new Set([...prev, ...user.genres])));
  }, [user.genres]);
  const UpdateGenres = async () => {
    try {
      setIsSubmittingForm(true);
      const response = await axios.post("/api/update/genre", {
        genres: selectedGenres,
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
        <DialogTitle>Select Your Favorite Genres</DialogTitle>
        <DialogDescription>
          Click on the genres you like. Selected genres will be highlighted.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-wrap gap-2">
          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                selectedGenres.includes(genre)
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder="Add a new genre"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={addNewGenre}
            className="text-white py-2 rounded-full font-medium transition"
          >
            Add
          </Button>
        </div>
        <div className="flex w-full justify-center mt-4">
          <Button
            onClick={UpdateGenres}
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

export default UpdateGenre;
