import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Community Map | ATX Food Hub",
  description: "Your guide to meals, pantries, and community support in Austin. Built by UT Austin students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="panel">
          <Navbar />
          <main className="flex-grow flex flex-col gap-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
