"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import VideoComponent from "./components/VideoComponent";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-tight">
          Video Reel Showcase
        </h1>
        <p className="text-lg text-gray-300">
          Explore and share amazing video reels powered by ImageKit
        </p>
      </header>
      <VideoFeed videos={[]} />
    </div>
  );
}
