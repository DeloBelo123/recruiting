import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceRecruit",
  description: "VoiceRecruit is a platform that helps you recruit candidates for your company.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
