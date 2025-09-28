'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'ROI Calculator', href: '/roi' },
  { name: 'Skills', href: '/skills' },
  { name: 'Mentors', href: '/mentors' },
  { name: 'Courses', href: '/courses' },
  { name: 'Profile', href: '/profile' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';
  
  const isAuthenticated = false; // TODO: Replace with actual auth state

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 border-b border-white/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Avron
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-200 border-b-2 border-blue-300'
                      : 'text-blue-100 hover:text-white'
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
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 hover:text-red-300 transition-colors">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors">
                    Login
                  </Link>
                  <Link href="/login" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
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
              className="text-blue-100 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-200 bg-white/10'
                      : 'text-blue-100 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 pb-2 border-t border-white/20 space-y-2">
                {isAuthenticated ? (
                  <>
                    <button className="block w-full text-left px-3 py-2 text-base font-medium text-blue-100 hover:text-white">
                      Profile
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-base font-medium text-blue-100 hover:text-red-300">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-blue-100 hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md"
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