import React from "react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="relative rounded-[32px] p-10 md:p-14 mb-16 overflow-hidden bg-[#2563EB]">{/* solid blue card */}
          {/* Decorative quarter circle */}
          <div
            className="pointer-events-none absolute -left-28 -top-28 w-[180px] h-[180px] rounded-full border-[12px] border-white md:-left-48 md:-top-48 md:w-[360px] md:h-[360px] md:border-[8px]"
          ></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-[40px] md:text-[48px] leading-tight font-semibold text-white mb-10">
              Subscribe to our newsletter
            </h2>
            <div className="flex flex-col md:flex-row gap-5 w-full max-w-[900px] justify-center">
              <input
                type="text"
                placeholder="First name"
                className="flex-1 bg-transparent border border-white/70 text-white placeholder:text-white/80 rounded-[12px] px-7 py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white/80"
              />
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent border border-white/70 text-white placeholder:text-white/80 rounded-[12px] px-7 py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white/80"
              />
              <button
                className="bg-[#0B111F] text-white font-semibold rounded-[12px] px-10 py-4 text-sm md:text-base hover:bg-[#121A2A] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.97] active:translate-y-0 transform transition-all duration-200 ease-out cursor-pointer"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <span className="text-xl font-bold text-gray-900">Aviation App</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-sm">
              Aviation App gives you the blocks and components you need to create a truly professional website.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-[#2563EB] font-semibold text-xs tracking-[0.2em] uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Features</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Works</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4">Help</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Customer Support</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Delivery Details</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Free eBooks</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">Development Tutorial</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">How to - Blog</Link></li>
              <li><Link href="#" className="text-sm text-[#1F2933] hover:text-[#2563EB] transition-colors">YouTube Playlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by Aviation App
          </p>
        </div>
      </div>
    </footer>
  );
};
