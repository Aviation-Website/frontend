"use client";

import React, { useState } from "react";
import { IconPlane } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ContactForm = () => {
  const [subject, setSubject] = useState("Inquiry");
  const [message, setMessage] = useState("");

  const tags = ["Inquiry", "Complaint", "Suggestion", "Technical Support"];

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="name" className="text-sm font-bold text-[#152351]">Full Name</label>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Enter full name</span>
          </div>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3271b1] focus:border-transparent outline-none transition-all bg-white text-gray-700 placeholder-gray-300"
            placeholder=""
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="text-sm font-bold text-[#152351]">Email Address</label>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">We&apos;ll reply here</span>
          </div>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3271b1] focus:border-transparent outline-none transition-all bg-white text-gray-700 placeholder-gray-300"
            placeholder=""
          />
        </div>
      </div>

      {/* Row 2: Subject */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="subject" className="text-sm font-bold text-[#152351]">Subject</label>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Choose a topic</span>
        </div>
        


        <div className="relative">
          <Select
            value={tags.includes(subject) ? subject : "Others"}
            onValueChange={(val) => {
              if (val === "Others") {
                setSubject("");
              } else {
                setSubject(val);
              }
            }}
          >
            <SelectTrigger className="w-full px-4 py-3 h-auto rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3271b1] focus:border-transparent outline-none transition-all bg-white text-gray-700">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(!tags.includes(subject) || subject === "") && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <input
              type="text"
              id="subject-custom"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Please specify your subject"
              className="w-full px-4 py-3 mt-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3271b1] focus:border-transparent outline-none transition-all bg-white text-gray-700"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Row 3: Message */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="message" className="text-sm font-bold text-[#152351]">Message</label>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Write details here</span>
        </div>
        <div className="relative">
          <textarea
            id="message"
            rows={5}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#3271b1] focus:border-transparent outline-none transition-all resize-none bg-white text-gray-700"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
            {message.length}/1000
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-6 bg-[#3271b1] text-white font-bold rounded-xl hover:bg-[#152351] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
      >
        Send Message
        <IconPlane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform -rotate-45" />
      </button>
    </form>
  );
};
