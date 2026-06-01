/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Play, Sparkles, Filter, ChevronRight, X, Calendar, 
  TrendingUp, Award, Video, MonitorPlay, Check, Heart 
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { PortfolioItem } from "../types";

export default function PortfolioView() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = [
    "All",
    "UGC Ads",
    "Social Media Videos",
    "Recipe Videos",
    "Pet & Animal Content",
    "Brand Videos",
    "AI Video Projects"
  ];

  const filteredPortfolio = activeCategory === "All"
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-3 inline-block">
            Verified Case Audits
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Our Work & Client Portfolio
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Explore authentic platform-specific short-form campaigns we successfully directed, filmed, and published for leading eCommerce startups and modern creators.
          </p>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-neutral-900 pb-8 mb-12" id="portfolio-categories">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                  : "bg-neutral-900/40 border-neutral-850 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
          {filteredPortfolio.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group bg-neutral-900/30 border border-neutral-850 hover:border-amber-405/40 rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail Display with Dynamic CSS Gradient */}
              <div 
                className="h-60 relative flex items-center justify-center p-6"
                style={{ background: item.bgGradient }}
              >
                <div className="absolute inset-0 bg-neutral-950/45 group-hover:bg-neutral-950/35 transition-colors"></div>
                
                {/* Platform Label */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-[9px] text-amber-400 font-bold px-2.5 py-1 rounded border border-amber-500/10">
                  {item.platform}
                </div>

                {/* Primary Metric Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 text-[10px] font-black px-3 py-1 rounded shadow-lg">
                  {item.result}
                </div>

                {/* Large play graphic */}
                <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-amber-400/90 hover:scale-105 transition-all text-white group-hover:text-black flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Informative details */}
              <div className="p-6">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">
                  {item.category} / {item.clientName}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
                  <span>Ad Performance Metric</span>
                  <span className="font-extrabold text-amber-400">{item.metric}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox / Mock Video detail modal overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div 
              className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full text-left overflow-hidden shadow-2xl relative"
              id="portfolio-lightbox"
            >
              {/* Exit out */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-neutral-400 hover:text-white hover:scale-105 transition-all border border-neutral-800 z-20"
                id="close-lightbox-btn"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Video Player representation */}
              <div 
                className="h-80 relative flex items-center justify-center"
                style={{ background: selectedProject.bgGradient }}
              >
                <div className="absolute inset-0 bg-neutral-950/35"></div>
                
                <div className="absolute top-4 left-4 bg-black/80 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-500/10">
                  Platform: {selectedProject.platform}
                </div>

                <div className="text-center z-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400/90 text-neutral-950 flex items-center justify-center mx-auto focus:scale-110 shadow-xl border-4 border-black/20">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest block bg-black/40 px-3 py-1 rounded-full border border-neutral-800 inline-block">
                    Cinematic Stream Player Simulation
                  </span>
                </div>
              </div>

              {/* Information body */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-800 pb-5 mb-5">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{selectedProject.category} / {selectedProject.clientName}</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">{selectedProject.title}</h3>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 text-center shrink-0 min-w-[120px]">
                    <span className="text-xs text-neutral-500 block uppercase font-bold tracking-wider">ROAS Outcome</span>
                    <span className="text-lg font-black text-amber-400">{selectedProject.result}</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                  <p className="leading-relaxed"><strong>Overview:</strong> {selectedProject.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-850">
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-extrabold text-neutral-400">Pacing Strategy Used:</h4>
                      <ul className="space-y-1 text-xs">
                        <li className="flex gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" /> First 3-sec visual hook</li>
                        <li className="flex gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" /> Dynamic 1.5x pacing cuts</li>
                        <li className="flex gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" /> Captions in safe area</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-extrabold text-neutral-400">Technical Parameters:</h4>
                      <div className="text-xs space-y-1 text-neutral-400">
                        <p><strong>Aspect Scale:</strong> 9:16 Portrait / Auto safe crops</p>
                        <p><strong>Resolution:</strong> Cinematic high 4K RAW file</p>
                        <p><strong>Metric Improvement:</strong> {selectedProject.metric}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return */}
                <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    Back to Portfolio grid
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
