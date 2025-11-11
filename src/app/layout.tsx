import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecruitAI",
  description: "recruiteai is a platform that helps you recruit candidates for your company.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background`}>
        {children}
      </body>
    </html>
  );
}
