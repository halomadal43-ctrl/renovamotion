/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Tv, Clapperboard, TrendingUp, UserCheck, Sparkles, BookOpen, 
  ArrowRight, ShieldCheck, Zap, Heart, Award, Star, Video, Play, 
  CheckCircle, ChevronRight, MessageSquare 
} from "lucide-react";
import { SERVICES_DATA, PORTFOLIO_DATA } from "../data";
import { ServiceItem, PortfolioItem } from "../types";

// Icon mapping dictionary helper
export const IconMap: Record<string, any> = {
  Tv,
  Clapperboard,
  TrendingUp,
  UserCheck,
  Sparkles,
  BookOpen
};

interface HomeViewProps {
  setActiveView: (view: string) => void;
  setSelectedServiceId: (id: string) => void;
  setSelectedPackageName: (name: string) => void;
}

export default function HomeView({ 
  setActiveView, 
  setSelectedServiceId,
  setSelectedPackageName
}: HomeViewProps) {
  

  const testimonials = [
    {
      name: "Arthur Pendelton",
      role: "E-Commerce Director, BloomGlow",
      quote: "The UGC video ads generated from Renova Motion dropped our Facebook acquisition cost by 40% in just two weeks! Truly modern work.",
      rating: 5,
      avatarBg: "bg-amber-500/10 text-amber-400"
    },
    {
      name: "Samantha Reis",
      role: "Creator & Tech Founder, DevSpace",
      quote: "The AI Video Prompt Directory and Viral Video Hook guides are incredible values. They paid for themselves on our first Reels campaign launch.",
      rating: 5,
      avatarBg: "bg-yellow-400/10 text-yellow-500"
    },
    {
      name: "Marcus Vance",
      role: "Director of Marketing, WaveHydrate",
      quote: "Renova's management service behaves like a fully integrated in-house team. Responsive, detail-oriented, and excellent analytics reviews.",
      rating: 5,
      avatarBg: "bg-neutral-100/15 text-white"
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveView("services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookService = (serviceId: string, packageName: string) => {
    setSelectedServiceId(serviceId);
    setSelectedPackageName(packageName);
    setActiveView("services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-neutral-950 text-white selection:bg-amber-400 selection:text-black">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 border-b border-amber-400/10 bg-gradient-to-b from-neutral-950 via-[#0F0F0F] to-[#050505]">
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-amber-450/[0.03] to-transparent opacity-50 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Trust Badge */}
          <div className="mb-6 px-3 py-1 border border-amber-400/30 w-fit text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold bg-amber-400/5">
            Next-Gen Creative Agency
          </div>

          {/* Headline and Narrative */}
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6 text-white uppercase">
              AI-Powered <span className="text-amber-400 italic font-serif lowercase">Video Content</span> & <br className="hidden sm:inline" />
              Social Media Growth
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mb-10">
              Renova Motion helps brands, creators, and businesses scale with data-driven UGC ads, high-impact video production, and viral growth strategies.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setActiveView("services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-4 bg-amber-400 text-black font-extrabold uppercase text-xs tracking-widest hover:bg-amber-500 transition-colors cursor-pointer text-center"
              >
                Explore Services
              </button>
              
              <button
                onClick={() => {
                  setActiveView("shop");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-4 border border-white/20 text-white font-extrabold uppercase text-xs tracking-widest hover:bg-white/5 transition-colors cursor-pointer text-center"
              >
                Shop Digital Guides
              </button>
            </div>
          </div>

          {/* Statistical Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 border-t border-amber-400/10 pt-10" id="hero-stats">
            <div>
              <p className="text-3xl sm:text-4xl font-light text-amber-400">1.2M+</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">Combined reach</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-white">3.4x</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">Average Ads ROAS</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-white">500+</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">Custom UGC Sourced</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-amber-400">Instant</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">Guides Downloads</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Featured Services Cards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-amber-400/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 block">
              Featured Category Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-tight text-white leading-tight">
              Sought-After Multi-Channel Offerings
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView("services");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-4 md:mt-0 text-xs font-bold tracking-widest text-amber-400 hover:text-white transition-colors flex items-center gap-1 uppercase cursor-pointer"
          >
            Review Detailed Tier pricing
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
          {SERVICES_DATA.map((service, idx) => {
            const numericLabel = `0${idx + 1}. ${service.category}`;
            return (
              <div 
                key={service.id}
                className="group relative p-8 border border-white/5 hover:border-amber-400/20 bg-[#111]/30 hover:bg-[#111]/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.2em] font-mono leading-none mb-4">
                    {numericLabel}
                  </div>
                  <h3 className="text-xl font-light uppercase tracking-wide text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-8">
                    {service.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                    From <span className="text-xs font-extrabold text-white">${service.packages[0].price}</span>
                  </span>
                  <button 
                    onClick={() => handleServiceClick(service.id)}
                    className="text-xs uppercase tracking-widest font-extrabold text-amber-400 flex items-center gap-1 group-hover:text-white transition-colors cursor-pointer"
                  >
                    View Packages
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-neutral-900/30 py-20 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 block">
              Engineered for Enterprise Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Brands Trust Renova Motion
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              We design premium consumer assets ready for processing approvals across core corporate channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="why-choose-us-grid">
            {[
              {
                icon: Zap,
                title: "Fast Verified Delivery",
                desc: "We respect strict marketing timelines, delivering standard organic edits within 5 days and final UGC drafts quickly."
              },
              {
                icon: Play,
                title: "Platform-Focused Layouts",
                desc: "Every edit is customized specifically for raw video algorithms: perfect safe zones, 9:16 aspect scaling, and interactive hook pacing."
              },
              {
                icon: TrendingUp,
                title: "Creative Growth Strategy",
                desc: "We write direct-response scripts engineered specifically under analytical funnel frameworks, generating better conversion metrics."
              },
              {
                icon: Award,
                title: "Professional Studio Editing",
                desc: "Equipped with cinema-grade tools, advanced color correction modules, dynamic subtitles, and custom sound engineering assets."
              },
              {
                icon: UserCheck,
                title: "Custom Curated Packages",
                desc: "We configure transparent services matching startups as well as long-term partner options seamlessly with full licensing."
              },
              {
                icon: CheckCircle,
                title: "Instant Secure Downloads",
                desc: "Access digital guides, hook playbooks, and scripting databases server-side validation immediately after transaction checkout."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 hover:bg-neutral-900/40 rounded-xl transition-all">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <item.icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-neutral-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Real Customer Testimonials */}
      <section className="bg-neutral-900/20 py-20 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 block">
              Direct Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Trusted by Ambitious Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
            {testimonials.map((item, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-all"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-neutral-900 pt-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.avatarBg}`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-neutral-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dynamic Pre-Footer Trust Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 py-16 text-center border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Customized Production Strategy?
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl mx-auto">
            Our strategic team prepares customized, tiered blueprints suited to your exact platform budget and product parameters. Send a response in under 2 minutes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => {
                setActiveView("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 bg-white text-black hover:bg-neutral-200 font-bold rounded-xl text-sm transition-all"
            >
              Get Custom Quote
            </button>
            <button
              onClick={() => {
                setActiveView("faqs");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white font-bold rounded-xl text-sm transition-all animate-pulse"
            >
              Consult FAQs
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
