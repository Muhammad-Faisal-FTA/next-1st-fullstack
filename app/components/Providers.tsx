"use client";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";


const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={urlEndPoint}>
        <ThemeProvider
          attribute="class"     // adds class to <html>
          defaultTheme="system" // default: follows OS theme
          enableSystem          // allow system theme switching
        >
          {children}
        </ThemeProvider>  
      </ImageKitProvider>
    </SessionProvider>
  );
}