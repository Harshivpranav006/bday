"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AMBIENT_SRC } from "@/lib/constants";

type MusicContextValue = {
  muted: boolean;
  playing: boolean;
  toggle: () => void;
  playMusic: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(AMBIENT_SRC);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "none";
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setMuted(false);
    audio.load();
    void audio.play().catch(() => {
      setMuted(true);
      setPlaying(false);
    });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted || !playing) {
      playMusic();
    } else {
      audio.pause();
      setMuted(true);
    }
  }, [muted, playing, playMusic]);

  return (
    <MusicContext.Provider value={{ muted, playing, toggle, playMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic requires MusicProvider");
  return ctx;
}
