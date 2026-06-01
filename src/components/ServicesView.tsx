/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Tv, Clapperboard, TrendingUp, UserCheck, Sparkles, BookOpen, 
  Check, ArrowRight, ShieldCheck, HelpCircle, Calendar, MessageSquare, Sparkle 
} from "lucide-react";
import { SERVICES_DATA } from "../data";
import { ServiceItem, ServicePackage, CartItem } from "../types";
import { IconMap } from "./HomeView";

interface ServicesViewProps {
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  selectedPackageName: string;
  setSelectedPackageName: (name: string) => void;
  addToCart: (item: CartItem) => void;
  setActiveView: (view: string) => void;
  onContactConsultation: (subject: string) => void;
}

export default function ServicesView({
  selectedServiceId,
  setSelectedServiceId,
  selectedPackageName,
  setSelectedPackageName,
  addToCart,
  setActiveView,
  onContactConsultation
}: ServicesViewProps) {
  // If no category selected, default to the first one: UGC Ads
  const [activeTab, setActiveTab] = useState(selectedServiceId || "ugc-ads");
  const [selectedPkg, setSelectedPkg] = useState<string | null>(selectedPackageName || null);
  const [successAnimation, setSuccessAnimation] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      setActiveTab(selectedServiceId);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedPackageName) {
      setSelectedPkg(selectedPackageName);
    }
  }, [selectedPackageName]);

  const currentService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const handleTabChange = (serviceId: string) => {
    setActiveTab(serviceId);
    setSelectedServiceId(serviceId);
    setSelectedPkg(null);
    setSelectedPackageName("");
  };

  const handleAddToCart = (pkg: ServicePackage, service: ServiceItem) => {
    const cartItem: CartItem = {
      id: `${service.id}-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: `${service.name} (${pkg.name})`,
      price: pkg.price,
      type: "service",
      quantity: 1,
      details: `Delivery: ${pkg.deliveryTime} | Revisions: ${pkg.revisions}`,
      imageAccent: "linear-gradient(135deg, #1f1a10 0%, #0a0a0a 100%)"
    };
    
    addToCart(cartItem);
    
    // Success confirmation visual state
    setSuccessAnimation(pkg.name);
    setTimeout(() => {
      setSuccessAnimation(null);
    }, 4000);
  };

  const handleBookConsultation = (pkgName: string) => {
    onContactConsultation(`Consultation Booking request regarding: ${currentService.name} - Package: ${pkgName}`);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-3 inline-block">
            Professional Deliverables
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Scale-Oriented Agency Services
          </h1>
          <p className="text-sm text-neutral-400 mt-3">
            Accelerate acquisition, optimize social algorithms, and establish visual storytelling standards with our expert-led creation workflows.
          </p>
        </div>

        {/* Navigation Tabs (Quick Select) */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-neutral-900 pb-8 mb-12">
          {SERVICES_DATA.map((service) => {
            const IconComponent = IconMap[service.iconName] || Tv;
            const isActive = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => handleTabChange(service.id)}
                className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-semibold rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                    : "bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900"
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{service.name.split(" ")[0]} UGC</span>
              </button>
            );
          })}
        </div>

        {/* Main Service Area (Dynamic Content Rendering) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Description & Local Benefits */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 border border-neutral-900 bg-neutral-900/30 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Core Capability
              </span>
              <h2 className="text-2xl font-bold text-white mb-4">
                {currentService.name}
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {currentService.description}
              </p>

              <div className="border-t border-neutral-900 pt-6">
                <span className="text-xs font-bold uppercase text-neutral-500 tracking-wider block mb-4">
                  Key Benefits Included:
                </span>
                <ul className="space-y-3">
                  {currentService.keyBenefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-300 leading-normal">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 border border-neutral-900 bg-neutral-900/10 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                Custom Integrations?
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Need raw asset exports, custom multi-profile licenses, or corporate wide video training blueprints? We configure special workflows easily.
              </p>
              <button
                onClick={() => {
                  setActiveView("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold rounded-xl border border-neutral-800 transition-all flex items-center justify-center gap-2"
              >
                Send Custom Request
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Pricing Package Cards & Specific FAQs */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Visual Success notification upon adding to cart */}
            {successAnimation && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs sm:text-sm animate-bounce shadow-xl" id="cart-add-notice">
                <Sparkle className="w-5 h-5 text-amber-400 shrink-0 fill-current" />
                <span>Success: <strong>{currentService.name} ({successAnimation})</strong> has been successfully booked and loaded to your active Cart checkout!</span>
              </div>
            )}

            {/* Pricing Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="packages-pricing-grid">
              {currentService.packages.map((pkg, pIdx) => {
                const isGrowthPkg = pkg.name.toLowerCase().includes("growth");
                const isPremiumPkg = pkg.name.toLowerCase().includes("premium") || pkg.name.toLowerCase().includes("scale");
                
                return (
                  <div 
                    key={pIdx}
                    className={`relative p-6 rounded-2xl flex flex-col justify-between border transition-all duration-300 ${
                      isGrowthPkg 
                        ? "bg-neutral-900 border-amber-400/50 shadow-[0_0_20px_rgba(212,175,55,0.1)] scale-105 md:-translate-y-2 z-10" 
                        : "bg-neutral-900/40 border-neutral-900 hover:border-neutral-800"
                    }`}
                  >
                    {isGrowthPkg && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-neutral-950 font-extrabold text-[10px] tracking-widest uppercase rounded-full shadow-lg">
                        Popluar Scale Choice
                      </span>
                    )}

                    <div>
                      <h4 className="text-base font-extrabold text-white">{pkg.name}</h4>
                      <p className="text-xs text-neutral-500 mt-1 uppercase font-bold tracking-wider">{pkg.deliveryTime}</p>
                      
                      {/* Price layout */}
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-white">${pkg.price}</span>
                        <span className="text-xs text-neutral-500 font-semibold block mt-1">One-time transparent fee</span>
                      </div>

                      <div className="border-t border-neutral-900/80 pt-4 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-3">
                          What is included:
                        </span>
                        <ul className="space-y-2.5">
                          {pkg.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex gap-2 text-xs text-neutral-300 leading-snug">
                              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-neutral-900/60">
                      {/* Add to checkout cart direct booking */}
                      <button
                        onClick={() => handleAddToCart(pkg, currentService)}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isGrowthPkg 
                            ? "bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 hover:from-amber-300 hover:to-amber-500 shadow-md"
                            : "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                        }`}
                      >
                        Book Package Checkout
                      </button>

                      {/* Direct consult scheduling booking triggers contact */}
                      <button
                        onClick={() => handleBookConsultation(pkg.name)}
                        className="w-full py-2.5 text-center text-neutral-400 hover:text-white hover:underline transition-colors text-[11px] font-semibold flex items-center justify-center gap-1"
                      >
                        <Calendar className="w-3 h-3 text-amber-400" />
                        Discuss Custom Scope
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Local Specific Category FAQs section */}
            <div className="border-t border-neutral-900 pt-10">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Frequently asked questions on: <strong>{currentService.name}</strong>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="service-specific-faq">
                <div className="p-5 bg-neutral-900/20 border border-neutral-900 rounded-xl">
                  <h4 className="text-sm font-bold text-white">How long does onboarding configuration take?</h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Once service booking is authorized, we setup and deliver your dedicated onboarding questions within 24 hours. Your physical shipping directions or direct asset uploads link immediately.
                  </p>
                </div>
                
                <div className="p-5 bg-neutral-900/20 border border-neutral-900 rounded-xl">
                  <h4 className="text-sm font-bold text-white">Can edits be configured on long-term retainers?</h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Yes! For ongoing Social Media Management or Content Creation, we offer standard monthly billing intervals. Simply coordinate a custom quote or contact our management strategist panel.
                  </p>
                </div>

                {currentService.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-5 bg-neutral-900/20 border border-neutral-900 rounded-xl">
                    <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
