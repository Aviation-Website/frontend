'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Navbar as NavbarWrapper,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
  NavbarButton,
} from '@/components/ui/resizable-navbar';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { name: 'Home', link: '/home' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact-us' },
  { name: 'FAQ', link: '/faq' },
  { name: 'NATO', link: '/nato-alphabet' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, isLoading } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <NavbarWrapper className="md:bg-[#002d4b] print:hidden">
      <NavBody className="bg-[#002d4b] dark:bg-[#002d4b]">
        <NavbarLogo />
        <NavItems
          items={navItems}
          onItemClick={() => setIsMobileMenuOpen(false)}
          className="text-white font-semibold text-sm tracking-wider uppercase"
        />
        <div className="flex gap-3 items-center">
          {!isLoading && isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors focus:outline-none cursor-pointer"
              >
                {user?.profile_picture ? (
                  <Image
                    src={
                      user.profile_picture.startsWith('http://') || user.profile_picture.startsWith('https://')
                        ? user.profile_picture
                        : `${process.env.NEXT_PUBLIC_DJANGO_API_URL || 'http://localhost:8000'}${user.profile_picture}`
                    }
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {user?.first_name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <span className="font-medium hidden sm:block">
                  {user?.first_name || user?.username || 'User'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  {user?.is_superuser && (
                    <a
                      href="/admin/users"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Admin Portal
                    </a>
                  )}
                  <a
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Account Settings
                  </a>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : !isLoading ? (
            <>
              <NavbarButton href="/login" variant="primary">
                Sign In
              </NavbarButton>
              <NavbarButton href="/signup" variant="dark">
                Register
              </NavbarButton>
            </>
          ) : null}
        </div>
      </NavBody>
      <MobileNav className="">
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
        >
          <div className="flex w-full items-center px-2 pt-2">
            <div className="flex flex-col w-1/2 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className="text-white dark:text-white text-lg font-medium hover:text-blue-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {!isLoading && isAuthenticated && (
                <>
                  {user?.is_superuser && (
                    <a
                      href="/admin/users"
                      className="flex items-center gap-2 text-white dark:text-white text-lg font-medium hover:text-blue-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Admin Portal
                    </a>
                  )}
                  <a
                    href="/account"
                    className="text-white dark:text-white text-lg font-medium hover:text-blue-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </a>
                </>
              )}
            </div>
            <div className="w-1/2 flex justify-center">
              <Image
                src="/Footer/airplane.svg"
                alt="Airplane"
                width={150}
                height={150}
                className="w-32 h-auto opacity-90"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-2 mt-6 pt-4 border-t border-white/20">
            {!isLoading && isAuthenticated ? (
              <div className="w-full space-y-2">
                <div className="text-white text-sm text-center pb-2">
                  Signed in as <span className="font-bold">{user?.first_name || user?.username}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors "
                >
                  Sign Out
                </button>
              </div>
            ) : !isLoading ? (
              <>
                <NavbarButton href="/login" variant="primary" className="flex-1">
                  Sign In
                </NavbarButton>
                <NavbarButton href="/signup" variant="dark" className="flex-1">
                  Register
                </NavbarButton>
              </>
            ) : null}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarWrapper>
  );
}