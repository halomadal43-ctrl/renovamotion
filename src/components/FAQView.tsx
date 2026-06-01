/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ArrowRight } from "lucide-react";
import { FAQItem } from "../types";
import { GENERAL_FAQS } from "../data";

interface FAQViewProps {
  setActiveView: (view: string) => void;
}

export default function FAQView({ setActiveView }: FAQViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First item opened by default

  const categories = ["All", "General", "Services", "Digital Products", "Payment & Custom Quotes"];

  const filteredFaqs = activeCategory === "All"
    ? GENERAL_FAQS
    : GENERAL_FAQS.filter((faq) => faq.category === activeCategory);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-3 inline-block">
            Support Pipeline
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl mx-auto">
            Browse commonly raised queries regarding our design workflows, video scripts deliveries, invoices authorization, and payment support parameters.
          </p>
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 border-b border-neutral-900 pb-6 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedIndex(null); // Close everything on tab change
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-amber-400 text-neutral-950 border-amber-400 font-bold"
                  : "bg-neutral-900/40 border-neutral-850 text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4" id="faqs-accordion-list">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-neutral-900/30 border border-neutral-900 rounded-2xl overflow-hidden hover:border-neutral-800 transition-all"
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex gap-3 items-center pr-4">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-white">{faq.question}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 border-t border-neutral-950 text-xs sm:text-sm text-neutral-400 leading-relaxed bg-neutral-950/20">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] uppercase font-bold text-neutral-500">
                      <span>Category: {faq.category}</span>
                      <span>•</span>
                      <span>Verified Support</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Need Help? */}
        <div className="mt-16 text-center p-8 border border-neutral-900 bg-neutral-900/15 rounded-3xl space-y-4">
          <HelpCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Can't resolve your exact query?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Our strategic advisors are always available to help configure physical creator shipments, discuss bulk script pricing, or issue manual invoice records files.
          </p>
          <div>
            <button
              onClick={() => {
                setActiveView("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1"
            >
              Contact Support Desk
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
