'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact-us', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/login', label: 'Login' },
    { href: '/sign-up', label: 'Sign Up' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/home" className={styles.logo}>
          ✈️ Aviation
        </Link>

        {/* Hamburger Menu */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
