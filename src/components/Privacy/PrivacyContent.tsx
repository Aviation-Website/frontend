"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, ShieldCheck, Scale, ArrowRight, HelpCircle } from "lucide-react";
import Image from "next/image";

// Section Data
const sections = [
  {
    id: "collection",
    title: "1. Information Collection",
    icon: <Image src="/Privacy/database.apng" alt="Data Collection Icon" width={25} height={25} />,
    content: (
      <>
        <p>
          We collect information that you provide directly to us when you create an account, update your profile, or
          communicate with us. This may include your name, email address, and payment information.
        </p>
        <p className="mt-4">We also automatically collect certain information when you use the Platform, including:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
          <li>
            Log Information: We collect log files when you use our services, including your IP address and browser type.
          </li>
          <li>Usage Information: We monitor your activity on the Platform to improve our educational scenarios.</li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    title: "2. How We Use Information",
    icon: <Image src="/Privacy/lens.apng" alt="Data Usage Icon" width={25} height={25} />,
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
          <li>Provide, maintain, and improve our Platform and educational services.</li>
          <li>Process your transactions and send you related information, including confirmations and invoices.</li>
          <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
          <li>Respond to your comments, questions, and requests.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    icon: <Image src="/Privacy/globe.apng" alt="Data Sharing Icon" width={25} height={25} />,
    content: (
      <>
        <p>
          We do not share your personal information with third parties except as described in this policy or with your
          consent. We may share information with vendors, consultants, and other service providers who need access to
          such information to carry out work on our behalf.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "4. Cookies & Tracking",
    icon: <Image src="/Privacy/cookie.svg" alt="Cookies Icon" width={25} height={25} />,
    content: (
      <>
        <p>
          We use cookies and similar tracking technologies to track the activity on our Platform and hold certain
          information. Cookies are files with small amount of data which may include an anonymous unique identifier.
        </p>
        <p className="mt-4">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
          you do not accept cookies, you may not be able to use some portions of our Platform.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "5. Data Security",
    icon: <Image src="/Privacy/lock.apng" alt="Data Security Icon" width={22} height={22} />,
    content: (
      <>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet,
          or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
          protect your Personal Data, we cannot guarantee its absolute security.
        </p>
      </>
    ),
  },
];

export default function PrivacyContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100; // Navbar + some padding
      const elementTop = element.offsetTop;
      const offsetPosition = elementTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // Don't set active section here - let scroll event handler update it naturally
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 100;
      const scrollPosition = window.scrollY + navbarHeight + 50; // Small offset to trigger earlier

      // Find the section that's currently in view (iterate in reverse to get the correct one)
      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          // If we've scrolled past this section's top, mark it as current
          if (scrollPosition >= elementTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] bg-[#002d4b] overflow-hidden flex items-center justify-center">
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <ShieldCheck className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-blue-200">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              We are committed to protecting your personal information and your right to privacy.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 relative z-20 -mt-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation - Sticky */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group cursor-pointer ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {section.icon}
                      {section.title.split(". ")[1]}
                    </span>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Related</h3>
                <div className="space-y-2">
                  <a
                    href="/terms"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <Scale className="w-5 h-5" />
                      Terms of Service
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                    <a
                     href="/faq"
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5" />
                      FAQ
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              </div>

              {/* Need Help Card */}
              <div className="mt-6 bg-[#002d4b] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                <h3 className="font-bold text-lg mb-2 relative z-10">Need Help?</h3>
                <p className="text-blue-200 text-sm mb-4 relative z-10">
                  If you have questions about these terms, our legal team is here to help.
                </p>
                <a
                  href="/contact-us"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-200 transition-colors relative z-10 group/link"
                >
                  Contact Support <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-12 space-y-16">
                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Last Updated: November 29, 2025
                </div>

                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-[#002d4b]">{section.title}</h2>
                    </div>

                    <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed">
                      {section.content}
                    </div>

                    {index !== sections.length - 1 && <Separator className="my-12 bg-gray-100" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
