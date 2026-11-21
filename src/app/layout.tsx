import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mike Cho — Full-Stack Software Engineer",
  description:
    "Mike Cho is a full-stack software engineer building and modernizing enterprise applications, APIs, and reliable delivery workflows.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
