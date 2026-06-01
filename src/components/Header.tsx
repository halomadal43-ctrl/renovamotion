/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, ShoppingCart, User, Sparkles, LogOut } from "lucide-react";
// State-based navigation is used instead of react-router-dom to prevent iframe routing issues
import { CartItem } from "../types";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  userEmail: string;
}

export default function Header({
  activeView,
  setActiveView,
  cart,
  setIsCartOpen,
  userEmail,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", view: "home" },
    { name: "Services", view: "services" },
    { name: "Shop Guides", view: "shop" },
    { name: "Portfolio", view: "portfolio" },
    { name: "About Us", view: "about" },
    { name: "Contact", view: "contact" },
    { name: "FAQ", view: "faqs" },
  ];

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b bg-neutral-950 border-amber-400/30 backdrop-blur-md bg-opacity-95">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 bg-amber-400 rounded-sm flex items-center justify-center font-bold text-black text-xl italic transition-transform group-hover:scale-105 duration-300">
              R
            </div>
            <div>
              <span className="text-2xl font-light tracking-[0.18em] uppercase text-white leading-none block">
                RENOVA<span className="text-amber-400 font-semibold">MOTION</span>
              </span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-bold leading-3 mt-1">
                Next-Gen Creative Agency
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-200 ${
                  activeView === link.view
                    ? "text-amber-400 border border-amber-500/30 bg-amber-500/5"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* User Controls and Cart */}
          <div className="flex items-center space-x-3">
            {/* Account Quicklink */}
            <button
              onClick={() => handleNavClick("account")}
              className={`py-2 px-4 border transition-all duration-200 flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold ${
                activeView === "account"
                  ? "border-amber-400 text-black bg-amber-400"
                  : "border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-400/50"
              }`}
              title="Client Partner Area"
              id="account-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden md:inline max-w-[120px] truncate">
                {userEmail ? "Account" : "Client Portal"}
              </span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-200"
              id="cart-trigger-btn"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full text-black bg-amber-400 animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full border border-neutral-800 text-neutral-300 lg:hidden hover:bg-neutral-900 transition-all duration-200"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-neutral-950 border-b border-neutral-800 px-4 py-6 shadow-2xl transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all ${
                  activeView === link.view
                    ? "bg-amber-400 text-neutral-950 font-bold"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-900"
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("account")}
              className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all ${
                activeView === "account"
                  ? "bg-amber-400 text-neutral-950 font-bold"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-900"
              }`}
            >
              Client Portal ({userEmail || "Log In"})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
