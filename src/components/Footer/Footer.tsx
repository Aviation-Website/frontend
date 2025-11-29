import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#002d4b] pt-12 pb-5 relative overflow-x-hidden print:hidden">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col min-[1400px]:flex-row gap-10 mb-12 items-start">
          
          {/* Left Side: Brand + Links */}
          <div className="w-full min-[1400px]:w-3/5 flex flex-col gap-10">
            
            {/* AirSpeak Brand + Socials */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-3 mb-4">
                  <Image
                      src="/Logo/Logo.svg"
                      alt="AirSpeak Logo"
                      width={32}
                      height={32}
                  />
                <span className="text-lg font-bold text-white">AirSpeak</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-sm text-sm leading-relaxed">
                Master aviation communication with real-world scenarios and interactive training.
              </p>
              
              {/* Social Icons - Fixed UI */}
              <div className="flex gap-4">
                {[
                    { src: "/Footer/facebook.svg", alt: "Facebook", w: 24 },
                    { src: "/Footer/discord.svg", alt: "Discord", w: 24 },
                    { src: "/Footer/instagram.svg", alt: "Instagram", w: 24 },
                    { src: "/Footer/google.svg", alt: "Google", w: 22 }
                ].map((icon, idx) => (
                    <Link key={idx} href="#" className="p-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={icon.w}
                        height={icon.w}
                        className="opacity-90 group-hover:opacity-100"
                      />
                    </Link>
                ))}
              </div>
            </div>

            {/* Links Sections - Always 3 Columns Row as requested */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-6 md:gap-6 2xl:gap-4">
                {/* Discover */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">Discover</h3>
                    <ul className="space-y-3">
                        <li><Link href="/home" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/about" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/#" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Roadmap</Link></li>
                        <li><Link href="/#" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">QRGs</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><Link href="/login" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
                        <li><Link href="/signup" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Register</Link></li>
                        <li><Link href="/faq" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link href="/contact" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Policies */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase mb-4">Policies</h3>
                    <ul className="space-y-3">
                        <li><Link href="/privacy" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/partnership" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">Partnership</Link></li>
                        <li><Link href="/terms" className="font-medium text-xs text-gray-400 hover:text-white transition-colors">NATO Alphabet</Link></li>
                    </ul>
                </div>
            </div>
          </div>

          {/* Right Side: Newsletter Section */}
          {/* Stacked below on <1400px, Floating relative on >1400px */}
          <div className="w-full min-[1400px]:w-2/5 flex flex-col items-center min-[1400px]:items-end mt-8 min-[1400px]:mt-0">
             <div className="w-full max-w-md bg-white/90 rounded-4xl p-6 relative overflow-hidden min-[1400px]:relative min-[1400px]:top-40 shadow-xl backdrop-blur-sm">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "url('/Footer/Curve Line.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.4,
                  }}
                />
                <div className="relative z-10 flex flex-col items-center text-center w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002d4b] mb-2">
                    Subscribe to our newsletter
                  </h3>
                  <p className="font-medium text-xs sm:text-sm text-[#002d4b]/80 mb-5">Get the latest aviation updates and offers.</p>
                  
                  <div className="flex flex-col w-full gap-3">
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Name" 
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl px-3 py-2 md:px-4 md:py-2.5 text-[10px] md:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl px-3 py-2 md:px-4 md:py-2.5 text-[10px] md:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                      />
                    </div>
                    <button className="w-full bg-blue-600 text-white font-bold rounded-xl px-3 py-2 md:px-4 md:py-3 text-[10px] md:text-xs hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer">
                      Subscribe Now
                    </button>
                  </div>
                </div>
             </div>
          </div>

        </div>

        {/* Copyright - Extra margin top on large screens to account for floating newsletter */}
        <div className="border-t border-gray-400/30 pt-8 text-center mt-12 min-[1400px]:mt-1">
          <p className="text-gray-400 text-xs sm:text-sm">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by AirSpeak
          </p>
        </div>
      </div>
    </footer>
  );
};
