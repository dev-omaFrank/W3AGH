"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
         className={`fixed top-0 right-0 h-full w-64 max-w-full bg-blue shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6" style={{ backgroundColor: '#0000ff36' }}>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="black  font-semibold text-base"
          >
            Home
          </Link>

          <Link
            href="/grants"
            onClick={() => setIsOpen(false)}
            className="black  font-semibold text-base"
          >
            Explore 
          </Link>

          <Link
            href="/saved"
            onClick={() => setIsOpen(false)}
            className="black font-semibold text-base"
          >
            Saved Grants
          </Link>

          <Link
            href="/match"
            onClick={() => setIsOpen(false)}
            className="black  font-semibold text-base"
          >
            Find a Match
          </Link>

          <Link
              href="/audit"
              className="black  font-semibold text-base"
            >
              Audit Your Smart Contract 
            </Link>

            <Link
              href="/news"
              className="black  font-semibold text-base"
            >
              News Updates 
            </Link>
        </div>
      </div>
    </div>
  );
}