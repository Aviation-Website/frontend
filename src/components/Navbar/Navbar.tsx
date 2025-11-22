'use client';

import { useState } from 'react';
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

const navItems = [
  { name: 'Home', link: '/home' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact-us' },
  { name: 'FAQ', link: '/faq' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavbarWrapper className="bg-blue-900">
      <NavBody className="bg-blue-900 dark:bg-blue-900">
        <NavbarLogo />
        <NavItems 
          items={navItems} 
          onItemClick={() => setIsMobileMenuOpen(false)}
          className="text-white"
        />
        <div className="flex gap-3">
          <NavbarButton href="/login" variant="primary">
            Sign In
          </NavbarButton>
          <NavbarButton href="/register" variant="dark">
            Register
          </NavbarButton>
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
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="w-full text-white dark:text-white font-medium hover:text-blue-200 px-2 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="w-full flex flex-col gap-2 mt-4 pt-4 border-t border-white/20">
            <NavbarButton href="/login" variant="primary" className="w-full">
              Sign In
            </NavbarButton>
            <NavbarButton href="/register" variant="dark" className="w-full">
              Register
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarWrapper>
  );
}