"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, Film } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update the navLinks array to include a Home button
  const navLinks = [
    { href: "/", label: "Home", icon: Film },
    { href: "/search", label: "Search", icon: Search },
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href;

        return (
          <Link
            key={link.href}
            to={link.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-red-600 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            <link.icon className="h-4 w-4" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-red-600" />
          <span className="font-bold text-xl">FlimStar</span>
        </Link>

        {isMobile ? (
          <>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-gray-800 rounded-md"
            >
              <Menu className="h-6 w-6" />
            </button>

            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 bg-black/95 flex flex-col pt-20 px-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white"
                >
                  ✕
                </button>
                <div className="flex flex-col gap-4">
                  <NavItems />
                </div>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-1">
            <NavItems />
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
