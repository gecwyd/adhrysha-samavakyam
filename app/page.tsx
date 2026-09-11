"use client"

import YouTubePlayer from "@/components/ui/youtube-player";
import DriveImage from "@/components/ui/drive-image";
import { preload } from "@/lib/preload";

export default function Home() {
  return (
    <div>
      <h1>hi</h1>
      <YouTubePlayer
        thumbnail={preload("https://drive.google.com/file/d/1yogsLIANOFKKBw4fs8ZUicJ6loY94k5C/view?usp=drive_link")}
        width={500}
        height={400}
        link={preload("https://youtu.be/e1vQmP7XhDg?si=NNlfCiHr-K2d7mlC")}
      />
      <DriveImage
        width={300}
        height={400}
        src={preload("https://drive.google.com/file/d/1L1olm06Qhe72AbSYZ9UQFGBZniNzdIOG/view?usp=sharing")}
        alt="Drive image"
      />
    </div>
  );
}
