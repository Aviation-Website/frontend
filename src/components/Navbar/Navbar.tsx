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

const navItems = [
  { name: 'Home', link: '/home' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact-us' },
  { name: 'FAQ', link: '/faq' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavbarWrapper className="md:bg-[#002d4b]">
      <NavBody className="bg-[#002d4b] dark:bg-[#002d4b]">
        <NavbarLogo />
        <NavItems 
          items={navItems} 
          onItemClick={() => setIsMobileMenuOpen(false)}
          className="text-white font-semibold text-sm tracking-wider uppercase"
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
            </div>
            <div className="w-1/2 flex justify-center">
              <Image
                src="/Footer/airplane-2.svg"
                alt="Airplane"
                width={150}
                height={150}
                className="w-32 h-auto opacity-90"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-2 mt-6 pt-4 border-t border-white/20">
            <NavbarButton href="/login" variant="primary" className="flex-1">
              Sign In
            </NavbarButton>
            <NavbarButton href="/register" variant="dark" className="flex-1">
              Register
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarWrapper>
  );
}