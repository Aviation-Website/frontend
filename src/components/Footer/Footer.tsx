import React from "react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-blue-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div 
          className="relative rounded-[42px] p-10 md:p-14 mb-16 overflow-hidden bg-white/90"
          style={{
            backgroundImage: "url('/Footer/Curve Line.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Airplane Image */}
          <div className="absolute right-4 md:right-14 top-1/2 -translate-y-1/2 w-24 md:w-20 lg:w-36 h-auto hidden md:block pointer-events-none opacity-90">
            <Image
              src="/Footer/airplane-2.svg"
              alt="Airplane"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-[40px] md:text-[48px] leading-tight font-semibold text-blue-950 mb-10">
              Subscribe to our newsletter
              <p className="font-semibold text-3xl">Get the latest updates and offers.</p>
            </h2>
            <div className="flex flex-col md:flex-row gap-5 w-full max-w-[900px] justify-center">
              <input
                type="text"
                placeholder="First name"
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-[12px] px-7 py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-[12px] px-7 py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                className="bg-blue-600 text-white font-semibold rounded-[12px] px-10 py-4 text-sm md:text-base hover:bg-blue-700 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-[0.97] active:translate-y-0 transform transition-all duration-200 ease-out cursor-pointer"
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
                <Image
                    src="/Logo/icons8-airplane-50.svg"
                    alt="AirSpeak Logo"
                    width={40}
                    height={40}
                />
              <span className="text-xl font-bold text-white">AirSpeak App</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              AirSpeak App gives you the blocks and components you need to create a truly professional website.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-blue-900/50 rounded-full text-white hover:bg-blue-800 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="p-2 bg-blue-900/50 rounded-full text-white hover:bg-blue-800 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="p-2 bg-blue-900/50 rounded-full text-white hover:bg-blue-800 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="p-2 bg-blue-900/50 rounded-full text-white hover:bg-blue-800 transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Works</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Help</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Customer Support</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Delivery Details</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Free eBooks</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Development Tutorial</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">How to - Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">YouTube Playlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-900 pt-8 text-center">
          <p className="text-gray-400">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by AirSpeak App
          </p>
        </div>
      </div>
    </footer>
  );
};
