"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {Scale, ChevronRight, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";

// Terms Sections
const termsSections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content:
      "Welcome to AirSpeak. These Terms of Service ('Terms') govern your access to and use of the AirSpeak website, mobile application, and services (collectively, the 'Service'). By accessing or using the Service, you agree to be bound by these Terms.",
    icon: <Image src="/terms/book.apng" alt="Introduction Icon" width={25} height={25} />,
  },
  {
    id: "accounts",
    title: "2. User Accounts",
    content:
      "To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
    icon: <Image src="/terms/account.apng" alt="User Accounts Icon" width={25} height={25} />,
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    content:
      "The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of AirSpeak and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.",
    icon: <Image src="/terms/brain.apng" alt="Intellectual Property Icon" width={25} height={25} />,
  },
  {
    id: "termination",
    title: "4. Termination",
    content:
      "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.",
    icon: <Image src="/terms/warning.apng" alt="Termination Icon" width={25} height={25} />,
  },
  {
    id: "governing-law",
    title: "5. Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which AirSpeak operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
    icon: <Image src="/terms/shield.apng" alt="Governing Law Icon" width={25} height={25} />,
  },
];

export default function TermsContent() {
  const [activeSection, setActiveSection] = useState(termsSections[0].id);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100;
      const elementTop = element.offsetTop;
      const offsetPosition = elementTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 100;
      const scrollPosition = window.scrollY + navbarHeight + 50;

      let currentSection = termsSections[0].id;

      for (const section of termsSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <style jsx global>{`
        @media print {
          @page {
            margin-top: 0;
            margin-bottom: 0;
          }
          body {
            padding-top: 0;
            padding-bottom: 0;
          }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[450px] bg-[#002d4b] overflow-hidden flex items-center justify-center print:hidden">
        

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Scale className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-blue-200">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services. They define your rights and responsibilities
              as an AirSpeak user.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 text-white text-sm backdrop-blur-sm uppercase font-medium tracking-wide">
              Effective Date: {new Date().toLocaleDateString()}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 relative z-20 -mt-24 print:mt-0 print:pt-0 print:px-0">
        <div className="flex flex-col lg:flex-row gap-12 print:block">
          {/* Sidebar Navigation - Sticky */}
          <div className="lg:w-1/4 hidden lg:block print:hidden">
            <div className="sticky top-28">
              <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Table of Contents</h3>
                <nav className="space-y-1">
                  {termsSections.map((section) => (
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
                      {activeSection === section.id && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Related</h3>
                  <a
                    href="/privacy"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5" />
                      Privacy Policy
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

              {/* Quick Contact Card */}
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
          <div className="lg:w-3/4 print:w-full">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">
              {/* Print Header */}
              <div className="hidden print:flex flex-col items-center mb-4 pt-4">
                <Image src="/Logo/Logo.svg" alt="AirSpeak Logo" width={60} height={60} />
                <h1 className="text-2xl font-bold text-[#002d4b] mt-2">AirSpeak</h1>
                <h2 className="text-lg text-gray-600 mt-1">Terms of Service</h2>
              </div>

              {/* Document Header */}
              <div className="bg-gray-50/50 border-b border-gray-100 p-6 md:p-8 flex items-center gap-4 print:hidden">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Legal Agreement</h2>
                  <p className="text-sm text-gray-500">Last updated on November 29, 2025</p>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-16 print:p-0 print:space-y-4">
                {termsSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="scroll-mt-32 group"
                  >
                    <div className="flex gap-6 print:block">
                      {/* Icon Column */}
                      <div className="hidden md:flex flex-col items-center print:hidden">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            activeSection === section.id
                              ? "bg-gray-200 text-white shadow-lg shadow-gray-200/30 scale-110"
                              : "bg-blue-50 text-blue-900/50 group-hover:bg-white/30 group-hover:text-blue-600"
                          }`}
                        >
                          {section.icon}
                        </div>
                        {index !== termsSections.length - 1 && (
                          <div className="w-0.5 flex-1 bg-gray-100 my-4 group-hover:bg-blue-50 transition-colors" />
                        )}
                      </div>

                      {/* Content Column */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4 md:hidden print:hidden">
                          <span className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            {section.icon}
                          </span>
                          <h2 className="text-2xl font-bold text-[#002d4b]">{section.title.split(". ")[1]}</h2>
                        </div>

                        <h2 className="hidden md:block text-2xl font-bold text-[#002d4b] mb-6 group-hover:text-blue-700 transition-colors print:block print:text-black print:mb-2">
                          <span className="print:hidden">{section.title.split(". ")[1]}</span>
                          <span className="hidden print:inline">{section.title}</span>
                        </h2>

                        <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 print:bg-transparent print:p-0 print:border-none">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Document Footer */}
              <div className="bg-gray-50 border-t border-gray-100 p-8 text-center print:hidden">
                <p className="text-gray-500 mb-4">By using our services, you agree to these terms.</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 md:px-6 md:py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors text-xs md:text-sm font-medium shadow-sm cursor-pointer"
                  >
                    Print Terms
                  </button>
                  <a
                    href="/contact-us"
                    className="px-4 py-2 md:px-6 md:py-2 bg-[#002d4b] text-white rounded-lg hover:bg-blue-900 transition-colors text-xs md:text-sm font-medium shadow-lg shadow-blue-900/20"
                  >
                    Contact Legal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
