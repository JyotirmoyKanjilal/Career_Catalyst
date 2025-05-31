"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar({ scrolled = false, activeSection = "", onSectionClick }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = localStorage.getItem('user');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#070F12]/90 backdrop-blur-sm shadow-lg shadow-[#003B46]/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Briefcase className="h-7 w-7 sm:h-8 sm:w-8 text-[#00A3A9] group-hover:text-[#008C8B] transition-all duration-300 group-hover:rotate-12" />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#00A3A9] transition-colors duration-300">
              Career Catalyst
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              onClick={(e) => onSectionClick && onSectionClick(e, "hero")}
              className={`text-sm font-medium ${
                activeSection === "hero" ? "text-[#00A3A9]" : "text-gray-300 hover:text-white"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/#features"
              onClick={(e) => onSectionClick && onSectionClick(e, "features")}
              className={`text-sm font-medium ${
                activeSection === "features" ? "text-[#00A3A9]" : "text-gray-300 hover:text-white"
              } transition-colors`}
            >
              Features
            </Link>
            <Link href="/answers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Answer Library
            </Link>
            <Link href="/forum" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Forum
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003B46] hover:bg-[#004B56] transition-colors shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#00A3A9] hover:bg-[#008C8B] transition-colors shadow-md hover:shadow-[#00A3A9]/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#003B46]/50 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[#070F12]/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#003B46]/90 backdrop-blur-sm shadow-lg transform transition-transform duration-300 ease-in-out"
          style={{
            transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between h-16 px-6">
            <span className="text-lg font-bold text-white">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#003B46] transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/answers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
            >
              Answer Library
            </Link>
            <Link
              href="/forum"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
            >
              Forum
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#003B46] transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}