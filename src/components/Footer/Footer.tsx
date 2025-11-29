import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#002d4b] pt-12 pb-5">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-2 mb-12 items-start">
          
          {/* Left Side: Main Footer Content */}
          <div className="w-full lg:w-full grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* AirSpeak Column */}
            <div className="col-span-2 md:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left mb-4">
              <div className="flex items-center gap-2 mb-4">
                  <Image
                      src="/Logo/Logo.svg"
                      alt="AirSpeak Logo"
                      width={32}
                      height={32}
                  />
                <span className="text-lg font-bold text-white">AirSpeak</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-sm text-sm">
                Master aviation communication with real-world scenarios and interactive training.
              </p>
              <div className="flex gap-3">
                <Link href="#" className="p-1.5 rounded-full text-white hover:bg-white/60 transition-colors">
                  <Image
                    src="/footer/facebook.svg"
                    alt="Facebook"
                    width={25}
                    height={25}
                  />
                </Link>
                <Link href="#" className="p-1.5 rounded-full text-white hover:bg-white/60 transition-colors">
                  <Image
                    src="/footer/discord.svg"
                    alt="Discord"
                    width={25}
                    height={25}
                  />
                </Link>
                
                <Link href="#" className="p-1.5 rounded-full text-white hover:bg-white/60 transition-colors">
                  <Image
                    src="/footer/instagram.svg"
                    alt="Instagram"
                    width={25}
                    height={25}
                  />
                </Link>
                <Link href="#" className="p-1.5 rounded-full text-white hover:bg-white/60 transition-colors">
                  <Image
                    src="/footer/google.svg"
                    alt="Google"
                    width={23}
                    height={23}
                  />
                </Link>
              </div>
            </div>

            {/* Discover */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-3">Discover</h3>
              <ul className="space-y-2">
                <li><Link href="/home" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/#" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="/#" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">QRGs</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-3">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Register</Link></li>
                <li><Link href="/faq" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/*Policies */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-3">Policies</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/partnership" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors">Partnership</Link></li>
                <li><Link href="/terms" className="font-semibold text-xs text-gray-300 hover:text-white transition-colors"> NATO Alphabet</Link></li>
              </ul>
            </div>
          </div>

          {/* Right Side: Newsletter Section */}
          <div 
            className="w-full lg:w-1/2 flex flex-col justify-center relative top-40 rounded-4xl p-4 overflow-hidden bg-white/90"
          >
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
              <h3 className="text-2xl font-semibold text-[#002d4b] mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="font-medium text-sm text-[#002d4b]/80 mb-4">Get the latest updates and offers.</p>
              
              <div className="flex flex-col w-full gap-3 max-w-md">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  className="w-full bg-blue-600 text-white font-semibold rounded-lg px-4 py-2.5 text-xs hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-400 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by AirSpeak
          </p>
        </div>
      </div>
    </footer>
  );
};
