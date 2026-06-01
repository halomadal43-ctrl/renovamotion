/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, FileText, ChevronRight, HelpCircle } from "lucide-react";
import { LEGAL_PRIVACY_POLICY, LEGAL_TERMS_OF_SERVICE, LEGAL_REFUND_POLICY } from "../data";

interface PolicyViewProps {
  policyType: "privacy" | "terms" | "refund";
  setPolicyType: (type: "privacy" | "terms" | "refund") => void;
}

export default function PolicyView({ policyType, setPolicyType }: PolicyViewProps) {
  
  const getPolicyContent = () => {
    switch (policyType) {
      case "privacy":
        return {
          title: "Privacy Policy",
          sub: "Standard security and personal tracking regulations.",
          text: LEGAL_PRIVACY_POLICY
        };
      case "terms":
        return {
          title: "Terms of Service",
          sub: "General rules of engagement and licensing rules.",
          text: LEGAL_TERMS_OF_SERVICE
        };
      case "refund":
        return {
          title: "Refund Policy",
          sub: "Our transparent digital refund and custom production credits roadmap.",
          text: LEGAL_REFUND_POLICY
        };
    }
  };

  const currentPolicy = getPolicyContent();

  const handleTogglePolicy = (type: "privacy" | "terms" | "refund") => {
    setPolicyType(type);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Safe formatting parsing simulation since we aren't loading external markdown parser, we format raw blocks manually
  const parseBlocks = (raw: string) => {
    return raw.split("\n\n").map((block, idx) => {
      block = block.trim();
      if (!block) return null;

      // Handle main title indicator
      if (block.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-black text-amber-400 mt-8 mb-4 border-b border-neutral-900 pb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500 shrink-0" />
            {block.replace("## ", "")}
          </h2>
        );
      }

      // Handle sub sections
      if (block.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-sm sm:text-base font-extrabold text-white mt-6 mb-3 flex items-center gap-1.5 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            {block.replace("### ", "")}
          </h3>
        );
      }

      // Handle list bullet configurations
      if (block.startsWith("* ")) {
        return (
          <ul key={idx} className="space-y-2 my-4 pl-4 border-l border-amber-500/10">
            {block.split("\n").map((li, lIdx) => (
              <li key={lIdx} className="text-xs sm:text-sm text-neutral-400 flex gap-2">
                <ChevronRight className="text-amber-550 w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{li.replace("* ", "").replace("**", "").replace("**", "")}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Default paragraph layout
      return (
        <p key={idx} className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4 p-0.5 font-medium">
          {block.replace("**", "").replace("**", "")}
        </p>
      );
    });
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Selector Bar */}
        <div className="flex justify-center gap-2 border-b border-neutral-900 pb-8 mb-12" id="legal-policies-selector">
          {[
            { id: "privacy", label: "Privacy Policy" },
            { id: "terms", label: "Terms of Service" },
            { id: "refund", label: "Refund Policy" }
          ].map((pol) => (
            <button
              key={pol.id}
              onClick={() => handleTogglePolicy(pol.id as any)}
              className={`px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                policyType === pol.id
                  ? "bg-amber-400 text-neutral-950 border-amber-400"
                  : "bg-neutral-900/40 border-neutral-850 text-neutral-400 hover:text-white"
              }`}
            >
              {pol.label}
            </button>
          ))}
        </div>

        {/* Content Box layout with dual columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Left Column: Summary and trust details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl">
              <span className="text-[10px] uppercase text-neutral-500 tracking-wider font-bold">Category</span>
              <h4 className="text-base font-bold text-white mt-1">{currentPolicy.title}</h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {currentPolicy.sub}
              </p>
              <div className="mt-6 pt-6 border-t border-neutral-950 text-[10px] uppercase text-neutral-500 space-y-2">
                <p>Status: Active</p>
                <p>Auditor: Renova Legal Team</p>
                <p>Wise Account Verified</p>
              </div>
            </div>

            <div className="p-6 bg-amber-400/[0.01] border border-amber-500/10 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">Stripe & PayPal Compliant</h5>
                <p className="text-[10px] text-neutral-500 mt-1 leading-normal">
                  Our terms are formulated under strict platform standards, reducing any possibility of payment gateway chargebacks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Parsed document text */}
          <div className="lg:col-span-3 p-8 sm:p-12 border border-neutral-900 bg-neutral-900/10 rounded-3xl" id="parsed-legal-policy-body">
            <div className="flex items-center gap-3 border-b border-neutral-900 pb-5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/5 flex items-center justify-center text-amber-400 border border-amber-500/10">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentPolicy.title}</h2>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5 font-bold">RenovaMotion.com Regulatory Archive</p>
              </div>
            </div>

            <div className="prose text-neutral-300">
              {parseBlocks(currentPolicy.text)}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
