'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'ROI Calculator', href: '/roi-dashboard' },
  { name: 'Skills Benchmark', href: '/benchmark' },
  { name: 'Courses', href: '/courses' },
  { name: 'Mentors', href: '/mentors' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';
  
  // TODO: Replace with actual auth state
  const isAuthenticated = false;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-[#0E1116] border-b border-[#1C2541] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#D4AF37]">Avron</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                      : 'text-[#8A98A9] hover:text-white hover:text-[#D4AF37]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-[#8A98A9] hover:text-[#D4AF37] transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-[#8A98A9] hover:text-red-400 transition-colors">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-[#8A98A9] hover:text-[#D4AF37] transition-colors">
                    Login
                  </Link>
                  <Link href="/login" className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D4AF37]/90 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#8A98A9] hover:text-[#D4AF37] p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[#1C2541]">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[#D4AF37] bg-[#1C2541]'
                      : 'text-[#8A98A9] hover:text-[#D4AF37] hover:bg-[#1C2541]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-2 border-t border-[#1C2541] space-y-2">
                {isAuthenticated ? (
                  <>
                    <button className="block w-full text-left px-3 py-2 text-base font-medium text-[#8A98A9] hover:text-[#D4AF37]">
                      Profile
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-base font-medium text-[#8A98A9] hover:text-red-400">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-[#8A98A9] hover:text-[#D4AF37]"
                    >
                      Login
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-base font-medium bg-[#D4AF37] text-black rounded-md"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}