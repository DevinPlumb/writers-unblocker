import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Writer's Unblocker | Defeat the Blank Page",
  description: "Find inspiration from curated quotes and generate screenplay scenes to overcome writer's block.",
  keywords: ["writing", "screenplay", "quotes", "inspiration", "AI", "creative writing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
