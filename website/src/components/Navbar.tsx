"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "TUTORIALS", href: "/tutorials" },
    { name: "UPDATE MAP", href: "https://docs.google.com/forms/d/e/1FAIpQLSch2VEfYH0HOo6nLVtVA80ANG8w2hmjc_D5TfPsYolnSSijPA/viewform?usp=dialog" },
    { name: "CALENDAR", href: "/calendar" },
    { name: "PROJECTS", href: "/projects" },
    { name: "PARTNERSHIPS", href: "/partnerships" },
    { name: "OUR TEAM", href: "/our-team" },
    { name: "APPLY NOW", href: "/apply-now" },
    { name: "MAILING LIST", href: "/mailing-list" },
  ];

  return (
    <nav className="navbar flex justify-start items-center gap-8 border-b border-white/20 pb-4 relative">
      <div className="logo cursor-pointer">
        <Link href="/">
          <Image
            src="/logozoomed.jpeg"
            alt="Site Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Hamburger button for mobile */}
      <button
        className="md:hidden flex flex-col justify-around absolute top-3 right-3 w-8 h-7 bg-white/10 border border-primary rounded-md p-1 z-20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className={`w-full h-0.5 bg-primary rounded-sm transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-full h-0.5 bg-primary rounded-sm transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-full h-0.5 bg-primary rounded-sm transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      <ul className={`nav-links list-none flex gap-4 xl:gap-6 ${isOpen ? 'flex active' : 'hidden md:flex flex-nowrap'}`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="nav-link"
              onClick={() => setIsOpen(false)}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @media (max-width: 767px) {
          .nav-links.active {
            display: flex;
            flex-direction: column;
            gap: 12px;
            background-color: #696969;
            padding: 1rem;
            border-radius: 12px;
            position: absolute;
            top: 45px;
            right: 0;
            min-width: 200px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
            z-index: 15;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </nav>
  );
}
