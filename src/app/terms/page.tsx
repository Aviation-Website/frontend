"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck, AlertCircle, BookOpen, Scale, Gavel } from "lucide-react";
import { Footer, Navbar } from "@/components";

// Terms Sections
const termsSections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to AirSpeak. These Terms of Service ('Terms') govern your access to and use of the AirSpeak website, mobile application, and services (collectively, the 'Service'). By accessing or using the Service, you agree to be bound by these Terms.",
    icon: <BookOpen className="w-6 h-6 transition-colors duration-300 text-current" />,
  },
  {
    title: "2. User Accounts",
    content:
      "To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
    icon: <FileCheck className="w-6 h-6 transition-colors duration-300 text-current" />,
  },
  {
    title: "3. Intellectual Property",
    content:
      "The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of AirSpeak and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.",
    icon: <Scale className="w-6 h-6 transition-colors duration-300 text-current" />,
  },
  {
    title: "4. Termination",
    content:
      "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.",
    icon: <AlertCircle className="w-6 h-6 transition-colors duration-300 text-current" />,
  },
  {
    title: "5. Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which AirSpeak operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
    icon: <Gavel className="w-6 h-6 transition-colors duration-300 text-current" />,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />

      {/* Header */}
      <div className="bg-[#002d4b] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]"></div> 
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-6">
             <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <Scale className="w-10 h-10 text-blue-300" />
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Please read this document carefully. It outlines your rights and responsibilities when using AirSpeak.
          </p>
          <p className="mt-6 text-sm text-blue-300/60 uppercase tracking-widest font-semibold">
            Effective Date: November 29, 2025
          </p>
        </motion.div>
      </div>

      {/* Document Container */}
      <div className="container mx-auto px-4 -mt-12 relative z-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white rounded-t-xl shadow-2xl overflow-hidden"
        >
            {/* Document Header Stripe */}
            <div className="h-2 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-600"></div>

            <div className="p-8 md:p-16">
                
                {/* Preamble */}
                <div className="mb-12 pb-8 border-b border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-lg">
                        This Agreement is a legal document between <span className="font-bold text-gray-900">You</span> and <span className="font-bold text-gray-900">AirSpeak Inc.</span> By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {termsSections.map((section, index) => (
                        <div key={index} className="group relative pl-8 md:pl-0">
                            {/* Connecting Line (Desktop only) */}
                            <div className="hidden md:block absolute left-[-29px] top-10 bottom-[-48px] w-0.5 bg-gray-100 group-last:hidden"></div>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Icon Marker */}
                                <div className="hidden md:flex shrink-0 w-14 h-14 rounded-full bg-blue-50 items-center justify-center border-4 border-white shadow-md z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    {section.icon}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {section.title}
                                    </h3>
                                    <div className="prose prose-blue text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:bg-blue-50/30 hover:border-blue-100 transition-all">
                                        <p className="m-0">{section.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer of Document */}
                <div className="mt-16 pt-10 border-t-2 border-dashed border-gray-200 text-center">
                    <p className="text-gray-500 mb-6">Have specific questions about these terms?</p>
                    <a href="/contact-us" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Contact Us
                    </a>
                </div>
            </div>
        </motion.div>
        
      </div>
      <Footer />
    </div>
  );
}
