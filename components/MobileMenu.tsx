"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sm:hidden relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary text-2xl focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 max-w-full bg-blue shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6" style={{ backgroundColor: '#b2b2b2' }}>
          <Link href="/" onClick={() => setIsOpen(false)} className="black font-semibold text-base">Home</Link>
          <Link href="/grants" onClick={() => setIsOpen(false)} className="black font-semibold text-base">Explore</Link>
          <Link href="/saved" onClick={() => setIsOpen(false)} className="black font-semibold text-base">Saved Grants</Link>
          <Link href="/match" onClick={() => setIsOpen(false)} className="black font-semibold text-base">Find a Match</Link>
          <Link href="/audit" onClick={() => setIsOpen(false)} className="black font-semibold text-base">Audit Your Smart Contract</Link>
          <Link href="/news" onClick={() => setIsOpen(false)} className="black font-semibold text-base">News Updates</Link>
        </div>
      </div>
    </div>
  );
}