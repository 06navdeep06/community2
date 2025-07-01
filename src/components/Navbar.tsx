"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 to-green-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-green-200 transition duration-300">
          Nepal Community Fund
        </Link>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="text-white hover:text-green-200 transition duration-300">
            About
          </Link>
          <Link href="/blog" className="text-white hover:text-green-200 transition duration-300">
            Blog
          </Link>
          <Link href="/contact" className="text-white hover:text-green-200 transition duration-300">
            Contact
          </Link>
          <Link href="/donate" className="text-white hover:text-green-200 transition duration-300">
            Donate
          </Link>
          <Link href="/mission" className="text-white hover:text-green-200 transition duration-300">
            Mission
          </Link>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2 space-y-3 flex flex-col">
          <Link 
            href="/about" 
            className="text-white hover:text-green-200 transition duration-300 px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/blog" 
            className="text-white hover:text-green-200 transition duration-300 px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className="text-white hover:text-green-200 transition duration-300 px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/donate" 
            className="text-white hover:text-green-200 transition duration-300 px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Donate
          </Link>
          <Link 
            href="/mission" 
            className="text-white hover:text-green-200 transition duration-300 px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Mission
          </Link>
        </div>
      )}
    </nav>
  );
}