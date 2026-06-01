/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ShieldCheck, HelpCircle, Target, Users2, Activity, Sparkles, 
  Workflow, ArrowRight, Video, Flame, Star 
} from "lucide-react";

interface AboutViewProps {
  onContactRequest: () => void;
}

export default function AboutView({ onContactRequest }: AboutViewProps) {
  
  const processSteps = [
    {
      num: "01",
      title: "Strategic Onboarding",
      desc: "Fill our detailed creative scope question sheet. If physical product shipping is required, we pair and dispatch creator destinations instantly."
    },
    {
      num: "02",
      title: "Script Writing & Frameworks",
      desc: "Our copywriters script 3 customized visual hooks, psychological pain points, pacing transitions, and Calls to Action for client validation."
    },
    {
      num: "03",
      title: "Vetted Creator Filming",
      desc: "Our high-energy UGC creators and cinematographers capture assets according to safe areas, lighting templates, and script parameters."
    },
    {
      num: "04",
      title: "Cinema Editing & Sound FX",
      desc: "Our in-house design veterans grade color profiles, overlay interactive captions, sync sound effects (ASMR), and verify vertical layout boundaries."
    },
    {
      num: "05",
      title: "Secure Portal Delivery",
      desc: "Download finalized campaign assets in multiple hooks and CTAs variations straight from your user workspace, ready for immediate ad launching."
    }
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between mb-20 border-b border-white/5 pb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 border border-amber-500/20 bg-amber-500/5 mb-3 inline-block">
              Corporate Narrative
            </span>
            <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
              We engineer <span className="text-amber-400 italic font-serif lowercase">short-form assets</span> built for attention & conversion.
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 mt-5 leading-relaxed font-light">
              Renova Motion is a digital media and video production studio helping brands, creators, and businesses create high-performing content for today’s social platforms. We combine creative strategy, AI-powered workflows, video production, and social media marketing to deliver content built for attention, engagement, and growth.
            </p>
          </div>
          <div className="lg:col-span-5 p-8 bg-[#111]/30 border border-white/5 relative overflow-hidden flex flex-col justify-between h-72">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 blur-3xl rounded-full"></div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Our Strategic Aim</span>
              <h3 className="text-xl font-light uppercase text-white mt-2 leading-snug">To bridge raw video creativity with strict acquisition statistics.</h3>
            </div>
            
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="w-8 h-8 bg-amber-400 text-black flex items-center justify-center font-bold italic shrink-0">
                R
              </div>
              <div>
                <p className="text-xs font-bold text-white">Wise & PayPal Cleared</p>
                <p className="text-[10px] text-neutral-500 uppercase font-mono">Trusted by 100+ Enterprise clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do & Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Our Mission Statement
            </h3>
            <p className="text-lg font-bold text-white leading-relaxed">
              We design premium social assets that conform strictly to international merchant standards, enabling brands to scale campaigns with zero friction and high return on advertising spend (ROAS).
            </p>
            <p className="text-sm text-neutral-400">
              By utilizing professional UGC creator networks paired with AI-driven editing pipelines, we accelerate visual scale while slashing cost boundaries.
            </p>
          </div>

          <div className="p-8 border border-neutral-900 bg-neutral-900/10 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Users2 className="w-4 h-4" />
              Who We Help Scale
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl">
                <span className="font-extrabold text-white block mb-1">E-Commerce Brands</span>
                High-converting short UGC hook ads designed specifically for TikTok, Meta Ads, and YouTube.
              </div>
              <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl">
                <span className="font-extrabold text-white block mb-1">Digital Creators</span>
                Viral guides, prompting packs, and calendar planners to sustain consistency.
              </div>
              <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl">
                <span className="font-extrabold text-white block mb-1">Mobile App Startups</span>
                UI showcases, AI video narratives, and custom storytelling ads that lower cost-per-installs (CPI).
              </div>
              <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl">
                <span className="font-extrabold text-white block mb-1">B2B Agencies</span>
                White-label script archives and custom media production campaigns managed hands-off.
              </div>
            </div>
          </div>
        </div>

        {/* Our Process - Timelines */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              The Production Loop
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              End-to-End Campaign Progress
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              From initial questionnaire to secure dashboard download, each step is engineered for compliance and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6" id="about-process-steps">
            {processSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 bg-[#111]/30 border border-white/5 hover:border-amber-400/20 relative flex flex-col justify-between h-72 transition-colors group"
              >
                <span className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-700 group-hover:text-amber-400 transition-colors block font-mono">
                  {step.num}
                </span>
                <div className="mt-4">
                  <h4 className="text-sm font-light uppercase tracking-wide text-white group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges Panel */}
        <div className="p-8 sm:p-12 border border-white/5 bg-gradient-to-b from-[#111]/40 to-neutral-950 text-center space-y-6" id="about-trust-cta">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em] block">Safe Processing Standard</span>
            <h3 className="text-xl sm:text-2xl font-light uppercase text-white tracking-wide">Verified Secure Creator Merchant</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto font-light">
              Our digital deliveries and invoicing protocols are calibrated to pass wise and merchant audit checks instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 max-w-lg mx-auto pt-4 text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Stripe Certified</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> PayPal Verified</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Wise Approved</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Mercury Node</span>
          </div>

          <div className="pt-6">
            <button
              onClick={onContactRequest}
              className="px-8 py-4 bg-amber-400 text-black font-extrabold uppercase text-xs tracking-widest hover:bg-amber-500 transition-colors cursor-pointer"
            >
              Partner with Renova Motion
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
