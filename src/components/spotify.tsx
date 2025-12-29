"use client";

import { Button } from "@material-tailwind/react";
import {
  SpotifyPlayerProps,
  AddToPlaylistButtonProps,
  SpotifyProps,
} from "@/app/types";

function SpotifyPlayer({ playlistUrl }: SpotifyPlayerProps) {
  return (
    <iframe
      className="rounded-xl"
      src={playlistUrl}
      width="100%"
      height="552"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}

function AddToPlaylistButton({ buttonText }: AddToPlaylistButtonProps) {
  return (
    <Button
      variant="outlined"
      className="border-secondary text-secondary rounded-full mt-6"
    >
      {buttonText}
    </Button>
  );
}

export function Spotify({ player, button }: SpotifyProps) {
  return (
    <section id="spotify" className="px-4 md:px-8 scroll-mt-24">
      <div className="container mx-auto text-center">
        <SpotifyPlayer playlistUrl={player.playlistUrl} />
        <AddToPlaylistButton buttonText={button.buttonText} />
      </div>
    </section>
  );
}

export default Spotify;
