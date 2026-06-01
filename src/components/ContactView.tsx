/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Mail, MapPin, Send, HelpCircle, Calendar, Clock, CheckCircle2, 
  Sparkles, ShieldCheck, Phone, RefreshCw, AlertCircle, Sparkle 
} from "lucide-react";

interface ContactViewProps {
  initialSubject?: string;
  setActiveView: (view: string) => void;
  onSubmitQuote: (quote: {
    name: string;
    email: string;
    businessName: string;
    serviceNeeded: string;
    budgetRange: string;
    message: string;
  }) => void;
  onSubmitBooking: (booking: {
    date: string;
    time: string;
    name: string;
    email: string;
  }) => void;
}

export default function ContactView({ 
  initialSubject = "", 
  setActiveView,
  onSubmitQuote,
  onSubmitBooking
}: ContactViewProps) {
  
  // 1. General Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [message, setMessage] = useState(initialSubject || "");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formErr, setFormErr] = useState("");

  // 2. Calendar Booking State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookSuccess, setBookSuccess] = useState(false);
  const [bookErr, setBookErr] = useState("");

  const availableDates = [
    { day: "Mon", date: "June 8", full: "2026-06-08" },
    { day: "Tue", date: "June 9", full: "2026-06-09" },
    { day: "Wed", date: "June 10", full: "2026-06-10" },
    { day: "Thu", date: "June 11", full: "2026-06-11" },
    { day: "Fri", date: "June 12", full: "2026-06-12" }
  ];

  const availableTimes = [
    "10:00 AM EST",
    "11:30 AM EST",
    "2:00 PM EST",
    "3:30 PM EST",
    "5:00 PM EST"
  ];

  // Forms Submissions
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !serviceNeeded || !budgetRange || !message) {
      setFormErr("Please fully populate all required asterisks (*) fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormErr("Please provide a valid company email address.");
      return;
    }
    
    onSubmitQuote({
      name,
      email,
      businessName,
      serviceNeeded,
      budgetRange,
      message
    });

    setFormSuccess(true);
    setFormErr("");
    
    // Clear out
    setName("");
    setEmail("");
    setBusinessName("");
    setServiceNeeded("");
    setBudgetRange("");
    setMessage("");

    setTimeout(() => {
      setFormSuccess(false);
    }, 6000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setBookErr("Please select both an open calendar date and a time slot first.");
      return;
    }
    if (!bookName || !bookEmail) {
      setBookErr("Please fill in your name and corporate email for the calendar invitation.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(bookEmail)) {
      setBookErr("Please enter a valid business email address.");
      return;
    }

    onSubmitBooking({
      date: selectedDate,
      time: selectedTime,
      name: bookName,
      email: bookEmail
    });

    setBookSuccess(true);
    setBookErr("");

    // Clear
    setSelectedDate(null);
    setSelectedTime(null);
    setBookName("");
    setBookEmail("");

    setTimeout(() => {
      setBookSuccess(false);
    }, 6000);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-3 inline-block">
            Inquiries Hub
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Contact & Consultation Core
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Schedule a digital campaign audit, request custom script rates, or secure Wise coordinates. We follow up on all submissions within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Info badging and FAQ jump */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 border border-neutral-900 bg-neutral-900/20 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Contacts</h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <a 
                  href="mailto:contact@renovamotion.com"
                  className="flex items-center gap-3 p-3 bg-neutral-950 border border-neutral-900 rounded-xl hover:border-amber-400/30 transition-colors"
                >
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block font-bold leading-none mb-1">Corporate Email</span>
                    <span className="text-neutral-300 hover:text-white">contact@renovamotion.com</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block font-bold leading-none mb-1">Corporate Office</span>
                    <span className="text-neutral-300">
                      RENOVA STUDIOS LLC<br />
                      30 N Gould St Ste R<br />
                      Sheridan, WY 82801
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block font-bold leading-none mb-1">Direct Lines</span>
                    <span className="text-neutral-400">+1 (415) 890-4122 (Wise Verified)</span>
                  </div>
                </div>
              </div>

              {/* FAQ Trigger */}
              <div className="border-t border-neutral-850 pt-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Have a quick question?</h4>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  Check our direct questions pipeline regarding script properties, creator shipping timelines, and digital refund limitations.
                </p>
                <button
                  onClick={() => {
                    setActiveView("faqs");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  Jump to FAQs List
                </button>
              </div>
            </div>

            {/* Secure Badges */}
            <div className="p-6 bg-amber-400/[0.02] border border-amber-500/10 rounded-2xl space-y-3">
              <h4 className="text-xs uppercase font-extrabold text-amber-300 tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Wise & Stripe Gateway Checked
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Our custom invoices and payment interfaces comply with banking security parameters, allowing seamless billing approval for PayPal, Mercury, and Wise corporate cards.
              </p>
            </div>
          </div>

          {/* RIGHT: Combined forms (Tabbed: Custom Quote or Live Calendar Booking) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Form Section 1: Custom Quote / Contact Form */}
            <div className="p-8 sm:p-10 border border-neutral-900 bg-neutral-900/30 rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <Sparkle className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                <h3 className="text-xl font-bold text-white">Custom Proposal / Quote Request</h3>
              </div>

              {formSuccess ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl space-y-2 text-sm" id="contact-success-msg">
                  <h4 className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Strategic Quote Request Logged!
                  </h4>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Thank you! Your custom project specifications have been processed and filed successfully. We have created a **Pending Review** ticket in your Customer Account portal, and an advisor will dispatch a follow-up briefing to your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5" id="custom-quote-form">
                  
                  {formErr && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formErr}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Corporate Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Business Name / Social Profile</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. EcoClean Co. / @creator"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Service Category Needed *</label>
                      <select
                        required
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-400 focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="">-- Click to choose category --</option>
                        <option value="UGC Ads Video">UGC Ads Video Production</option>
                        <option value="Social Media Content Creation">Organic Reels / TikTok Creation</option>
                        <option value="Social Media Marketing">Social Growth funnels/Marketing</option>
                        <option value="Social Media Management">Full Social Platforms Account Management</option>
                        <option value="Video Production">Cinematic Video/Sound Production</option>
                        <option value="Video Production Guides & Courses">Interactive Agency Courses</option>
                        <option value="Custom Complex Scope">Custom Multi-Category Retainer Bundle</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Project Campaign Budget *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: "< $500", val: "Under $500" },
                        { label: "$500 - $1,500", val: "$500 - $1,500" },
                        { label: "$1,500 - $5,000", val: "$1,500 - $5,000" },
                        { label: "$5,000+", val: "Over $5,000" }
                      ].map((bud) => (
                        <div 
                          key={bud.val}
                          onClick={() => setBudgetRange(bud.val)}
                          className={`py-3 text-center rounded-xl text-xs border font-bold cursor-pointer transition-all ${
                            budgetRange === bud.val
                              ? "bg-amber-400 text-neutral-950 border-amber-400"
                              : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-700"
                          }`}
                        >
                          {bud.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Core Campaign Goals & Scope *</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Please trace brand guidelines, target platform channels, and desired turnaround..."
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-neutral-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Proposal Request
                    </button>
                    <span className="text-[10px] text-neutral-500 block mt-2 text-center sm:text-left">
                      Encrypted connection (SSL Secured). By submitting, you authorize Renova Motion tracking.
                    </span>
                  </div>

                </form>
              )}
            </div>

            {/* Form Section 2: Interactive Live Calendar Scheduler */}
            <div className="p-8 sm:p-10 border border-neutral-900 bg-neutral-900/30 rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Book 1-on-1 Creative Consultation</h3>
                <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-500/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse ml-auto hidden sm:inline">
                  Slots Open June 2026
                </span>
              </div>

              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Discuss campaign scripts, look at past UGC, and establish target audience targeting live. Select a date and open time below to register.
              </p>

              {bookSuccess ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl space-y-2 text-sm" id="booking-success-msg">
                  <h4 className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Consultation Calendar Event Confirmed!
                  </h4>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Successfully booked! We sent a calendar invitation and credentials to your email. The event is also saved inside your active Customer Account profile workspace logs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6" id="calendar-booking-form">
                  {bookErr && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl">
                      {bookErr}
                    </div>
                  )}

                  {/* Date Grid */}
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">1. Select Working Date:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {availableDates.map((d) => (
                        <div 
                          key={d.full}
                          onClick={() => {
                            setSelectedDate(d.full);
                            setBookErr("");
                          }}
                          className={`p-3 text-center rounded-xl border cursor-pointer transition-all ${
                            selectedDate === d.full
                              ? "bg-amber-400 text-neutral-950 border-amber-400 font-extrabold"
                              : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-700"
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold text-neutral-500 block leading-tight">{d.day}</span>
                          <span className="text-xs font-black block mt-0.5">{d.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">2. Select Available Time Slot:</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTimes.map((t) => (
                        <div 
                          key={t}
                          onClick={() => {
                            setSelectedTime(t);
                            setBookErr("");
                          }}
                          className={`px-4 py-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                            selectedTime === t
                              ? "bg-amber-400 text-neutral-950 border-amber-400 font-extrabold"
                              : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-700"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-900 pt-5">
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">Your Full Name:</label>
                      <input
                        type="text"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-400 block mb-1">Corporate Email Address:</label>
                      <input
                        type="email"
                        value={bookEmail}
                        onChange={(e) => setBookEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-extrabold rounded-xl text-xs transition-colors"
                    >
                      Confirm Calendar Booking (15-min Meeting)
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
