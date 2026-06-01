/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Mail, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please provide your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid business email address.");
      return;
    }
    setIsSubscribed(true);
    setErrorMsg("");
    setEmail("");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const handleLinkClick = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-amber-400/10">
      
      {/* Top Newsletter & Badges Divider */}
      <div className="border-b border-white/5 bg-neutral-950/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-lg font-light uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Join the Renova Motion Scale Dispatch
            </h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-lg font-light">
              Get tested hook templates, UGC scripts, and algorithm update notifications sent directly to your inbox weekly.
            </p>
          </div>
          <div className="w-full">
            {isSubscribed ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm" id="newsletter-success">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Excellent choice! Check your inbox shortly for our <strong>Viral Hook Checklist</strong> download.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your company email..."
                    className="w-full pl-11 pr-4 py-3 bg-[#111] border border-white/10 rounded-none text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-extrabold uppercase text-xs tracking-widest transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            {errorMsg && (
              <p className="text-rose-400 text-xs mt-2 flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick("home")}>
            <div className="w-7 h-7 bg-amber-400 flex items-center justify-center font-bold text-neutral-950 text-sm italic">
              R
            </div>
            <span className="text-lg font-light text-white uppercase tracking-[0.15em]">
              RENOVA<span className="text-amber-400 font-semibold">MOTION</span>
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Leading digital media and video production studio helping high-growth brands and creators scale traffic with ROI-focused UGC creation, cinematic editing, and social system management.
          </p>
          <div className="space-y-2 mt-4 text-xs">
            <a 
              href="mailto:contact@renovamotion.com" 
              className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              contact@renovamotion.com
            </a>
            <div className="flex items-start gap-2 text-neutral-400 font-light">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                RENOVA STUDIOS LLC<br />
                30 N Gould St Ste R<br />
                Sheridan, WY 82801
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Service Focus */}
        <div>
          <h4 className="text-semibold text-white font-bold text-sm tracking-wide uppercase mb-4">
            Services & Solutions
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "UGC Ad Campaign Videos", view: "services" },
              { label: "Organic Content Creation", view: "services" },
              { label: "Social Growth Marketing", view: "services" },
              { label: "Full Social Management", view: "services" },
              { label: "Professional Video Production", view: "services" },
              { label: "Video Training Programs", view: "services" }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleLinkClick(item.view)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company & Direct Shop Guides */}
        <div>
          <h4 className="text-semibold text-white font-bold text-sm tracking-wide uppercase mb-4">
            Shop Digital Guides
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "UGC Script Template Pack", view: "shop" },
              { label: "100+ Viral Video Hooks", view: "shop" },
              { label: "Social Media Master Calendar", view: "shop" },
              { label: "AI Cinematography Prompting", view: "shop" },
              { label: "Video Production Starter Class", view: "shop" },
              { label: "Facebook Reels Growth Handbook", view: "shop" }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleLinkClick(item.view)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Trust Seal & Legal Checklist */}
        <div className="space-y-6">
          <div>
            <h4 className="text-semibold text-white font-bold text-sm tracking-wide uppercase mb-4">
              Legal Documents
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Privacy Policy", view: "privacy" },
                { label: "Terms of Service", view: "terms" },
                { label: "Refund Policy", view: "refund" },
                { label: "Frequently Asked Questions", view: "faqs" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(item.view)}
                    className="hover:text-amber-400 transition-colors text-left font-semibold text-neutral-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Secured Processing Platforms
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-neutral-400" id="trust-payment-badges">
              <div className="py-2 px-1 border border-neutral-900 bg-neutral-900 rounded hover:border-amber-500/20 transition-all cursor-default">
                Stripe
              </div>
              <div className="py-2 px-1 border border-neutral-900 bg-neutral-900 rounded hover:border-amber-500/20 transition-all cursor-default text-sky-400">
                PayPal
              </div>
              <div className="py-2 px-1 border border-neutral-900 bg-neutral-900 rounded hover:border-amber-500/20 transition-all cursor-default text-emerald-400">
                Wise
              </div>
              <div className="py-2 px-1 border border-neutral-900 bg-neutral-900 rounded hover:border-amber-500/20 transition-all cursor-default text-purple-400">
                Mercury
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-neutral-900 bg-neutral-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {currentYear} Renova Motion Co. All Rights Reserved. Built for global creator scale and merchant checkout safety.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-help flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Mercury Server Live
            </span>
            <span>Wise Bank Cleared</span>
            <span>SSL Secured (256-bit)</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
