'use client';

import { useState } from 'react';
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
  const { user, isAuthenticated, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {user?.first_name?.[0] || user?.username?.[0] || 'U'}
                </div>
                <span className="font-medium hidden sm:block">{user?.username || 'User'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  {user?.is_superuser && (
                    <a
                      href="/admin/users"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Admin Portal
                    </a>
                  )}
                  <a
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Account Settings
                  </a>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      signOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavbarButton href="/login" variant="primary">
                Sign In
              </NavbarButton>
              <NavbarButton href="/signup" variant="dark">
                Register
              </NavbarButton>
            </>
          )}
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
              {isAuthenticated && (
                <>
                  {user?.is_superuser && (
                    <a
                      href="/admin/users"
                      className="text-white dark:text-white text-lg font-medium hover:text-blue-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
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
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut();
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <NavbarButton href="/login" variant="primary" className="flex-1">
                  Sign In
                </NavbarButton>
                <NavbarButton href="/signup" variant="dark" className="flex-1">
                  Register
                </NavbarButton>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarWrapper>
  );
}