/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  User, ShieldCheck, Mail, Calendar, FileDown, CheckCircle2, 
  Clock, AlertCircle, ShoppingBag, FolderOpen, Tag, LogIn, ExternalLink 
} from "lucide-react";
import { Order, QuoteRequest } from "../types";

interface AccountViewProps {
  userEmail: string;
  setUserEmail: (email: string) => void;
  orders: Order[];
  quotes: QuoteRequest[];
  bookings: { date: string; time: string; name: string; email: string }[];
  setActiveView: (view: string) => void;
}

export default function AccountView({
  userEmail,
  setUserEmail,
  orders,
  quotes,
  bookings,
  setActiveView
}: AccountViewProps) {
  
  const [typedEmail, setTypedEmail] = useState("");
  const [tempName, setTempName] = useState("Vanguard Media Co.");
  const [loginMsg, setLoginMsg] = useState("");

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedEmail) return;
    if (!/\S+@\S+\.\S+/.test(typedEmail)) {
      setLoginMsg("Please input a valid company email address.");
      return;
    }
    setUserEmail(typedEmail);
    setLoginMsg("Logged in successfully! Your secure creator files are unlocked below.");
    setTimeout(() => setLoginMsg(""), 4000);
  };

  const handleMockLogout = () => {
    setUserEmail("");
    setTypedEmail("");
    setLoginMsg("Logged out successfully.");
    setTimeout(() => setLoginMsg(""), 3000);
  };

  const getPurchasedDigitalProducts = () => {
    const products: { name: string; link: string; date: string }[] = [];
    orders.forEach((o) => {
      o.downloadsList.forEach((dl) => {
        products.push({
          name: dl.name,
          link: dl.link,
          date: o.date
        });
      });
    });
    return products;
  };

  const purchasedProducts = getPurchasedDigitalProducts();

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-neutral-900 pb-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-2 inline-block">
              Secure Brand Node
            </span>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Client Partner Dashboard
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Welcome to your centralized Renova Motion workspaces. Retrieve invoices, access guides, and audit proposal states.
            </p>
          </div>

          {userEmail ? (
            <div className="flex items-center gap-3 p-3 bg-neutral-900/60 border border-neutral-850 rounded-2xl shrink-0">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold font-mono">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">{tempName}</span>
                <span className="text-[11px] text-neutral-500 leading-none mt-1 block">{userEmail}</span>
              </div>
              <button
                onClick={handleMockLogout}
                className="ml-4 py-1.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-[10px] uppercase font-bold text-neutral-400 hover:text-white rounded border border-neutral-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="text-xs text-neutral-500 italic">Signed in as: Guest User. Please authorize email below.</div>
          )}
        </div>

        {loginMsg && (
          <div className="p-4 bg-amber-400/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold rounded-2xl mb-8 animate-bounce">
            {loginMsg}
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* PHASE 1: GUEST LOG IN GATE */}
        {/* ------------------------------------------- */}
        {!userEmail ? (
          <div className="max-w-md mx-auto p-8 border border-neutral-900 bg-neutral-900/40 rounded-3xl space-y-6" id="mock-login-gate">
            <div className="text-center space-y-2">
              <LogIn className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Authorize Corporate Email</h3>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Authenticate with your billing email to unlock digital script files, retrieve past Wise payments invoices, and inspect active campaigns.
              </p>
            </div>

            <form onSubmit={handleMockLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Company Corporate Email:</label>
                <input
                  type="email"
                  required
                  value={typedEmail}
                  onChange={(e) => setTypedEmail(e.target.value)}
                  placeholder="e.g. buyer@company.com"
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Company / Brand Name:</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Vanguard Media Co."
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 hover:from-amber-300 hover:to-amber-500 font-extrabold rounded-xl text-xs transition-colors shadow-md"
              >
                Access Partner Workspace
              </button>
            </form>
            
            <p className="text-[10px] text-neutral-500 text-center leading-normal">
              Note: This workspace persists data locally mimicking corporate Wise/Stripe integrations. Try shopping digital files to test downloads!
            </p>
          </div>
        ) : (
          
          /* ------------------------------------------- */
          /* PHASE 2: AUTHENTICATED PARTNER WORKSPACE LAYOUT */
          /* ------------------------------------------- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="account-main-dashboard">
            
            {/* Left Main Segment: Digital Downloads Hub & Invoices */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Box 1: Digital Downloads vault */}
              <div className="p-8 border border-neutral-900 bg-neutral-900/30 rounded-3xl space-y-6">
                <div className="flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-bold text-white">Your Instantly Sourced Digital Downloads</h3>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider font-extrabold ml-auto hidden sm:inline">
                    Locked to: {userEmail}
                  </span>
                </div>

                {purchasedProducts.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl bg-neutral-950/20 space-y-4">
                    <FolderOpen className="w-10 h-10 text-neutral-700 mx-auto" />
                    <div>
                      <p className="text-xs sm:text-sm text-neutral-400">No downloadable files detected for this email account balance.</p>
                      <p className="text-[10px] text-neutral-500 mt-1 max-w-xs mx-auto leading-normal">
                        Purchase any script pack, hook directory guidebook, or content calendar template to unlocked premium digital links instantly.
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => setActiveView("shop")}
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-amber-400 hover:text-white border border-neutral-800 text-xs font-bold rounded-xl transition-all"
                      >
                        Explore Digital Shop Goods
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="account-unlocked-downloads-list">
                    {purchasedProducts.map((p, idx) => (
                      <div 
                        key={idx}
                        className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-2">{p.name.replace(" (Direct Secure Vault Access)", "")}</h4>
                          <span className="text-[9px] text-neutral-500 uppercase block mt-1">Verified: {p.date}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Simulation successfully activated! File download simulates fetching: ${p.link}`);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 font-black rounded-lg text-[10px] uppercase cursor-pointer"
                        >
                          Extract ZIP
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box 2: Orders / Transactions history list */}
              <div className="p-8 border border-neutral-900 bg-neutral-900/30 rounded-3xl space-y-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-bold text-white">Tax Invoice & Transaction History</h3>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">No cleared card/banking transactions on record.</p>
                ) : (
                  <div className="overflow-x-auto" id="account-orders-table">
                    <table className="w-full text-xs text-left text-neutral-450 border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-850 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-2">Order ID</th>
                          <th className="py-3 px-2">Purchase Date</th>
                          <th className="py-3 px-2">Gateway Method</th>
                          <th className="py-3 px-2 text-right">Invoiced Paid</th>
                          <th className="py-3 px-2 text-right">Audit Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id} className="border-b border-neutral-900/80 hover:bg-neutral-900/10">
                            <td className="py-4 px-2 font-mono font-bold text-white uppercase">{o.id}</td>
                            <td className="py-4 px-2 text-neutral-400">{o.date}</td>
                            <td className="py-4 px-2 text-neutral-400">{o.paymentMethod.split(" ")[0]}</td>
                            <td className="py-4 px-2 text-right font-black text-amber-400">${o.total.toFixed(2)}</td>
                            <td className="py-4 px-2 text-right">
                              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold rounded-full text-[9px] uppercase">
                                Cleared
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            {/* Right Main Segment: Scheduled Meetings & Sourced Custom Proposals */}
            <div className="lg:col-span-4 space-y-8 col-reverse">
              
              {/* Segment 1: Consultations list */}
              <div className="p-6 border border-neutral-900 bg-neutral-900/20 rounded-2xl space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Upcoming Live Meetings ({bookings.length})
                </h4>

                {bookings.length === 0 ? (
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    No active creative briefings scheduled. Go to <strong>Contact Us</strong> page to secure an open slot in June 2026.
                  </p>
                ) : (
                  <div className="space-y-3" id="account-bookings-list">
                    {bookings.map((b, bIdx) => (
                      <div 
                        key={bIdx}
                        className="p-3.5 bg-neutral-950 border border-neutral-850 rounded-xl space-y-1"
                      >
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">1-on-1 Consultation Call</span>
                        <h5 className="text-xs font-bold text-white">Client: {b.name}</h5>
                        <div className="flex items-center gap-4 text-[10px] text-neutral-400 pt-1.5">
                          <p className="flex items-center gap-1"><Calendar className="w-3 h-3 text-neutral-500" /> {b.date}</p>
                          <p className="flex items-center gap-1"><Clock className="w-3 h-3 text-neutral-500" /> {b.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Segment 2: Custom Quotes status */}
              <div className="p-6 border border-neutral-900 bg-neutral-900/20 rounded-2xl space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-amber-400 flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                  Sourced Strategic Proposals ({quotes.length})
                </h4>

                {quotes.length === 0 ? (
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    No active service inquiries. Click <strong>Services</strong> page to review pricing tiers and place custom campaigns.
                  </p>
                ) : (
                  <div className="space-y-3" id="account-quotes-list">
                    {quotes.map((q) => (
                      <div 
                        key={q.id}
                        className="p-3.5 bg-neutral-950 border border-neutral-850 rounded-xl space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase">Category: {q.serviceNeeded.split(" ")[0]}</span>
                          <span className="px-2 py-0.5 bg-amber-400/10 border border-amber-500/10 text-amber-400 font-bold rounded-full text-[9px] uppercase">
                            {q.status}
                          </span>
                        </div>
                        <h5 className="text-xs font-black text-white">{q.businessName || q.name} Scope</h5>
                        <p className="text-[10px] text-neutral-400 italic line-clamp-2">"{q.message}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
