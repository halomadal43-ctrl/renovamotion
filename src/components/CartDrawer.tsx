/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, ShoppingCart, Trash2, Plus, Minus, Tag, ShieldCheck, 
  ArrowRight, Sparkle, Percent, CheckCircle2, ShoppingBag 
} from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onCheckout: (appliedDiscount: number, appliedCoupon: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  onCheckout
}: CartDrawerProps) {
  
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponErr, setCouponErr] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    
    if (cleanCode === "RENOVA20") {
      setDiscountPercent(20);
      setAppliedCoupon("RENOVA20 (20% OFF)");
      setCouponSuccess(true);
      setCouponErr("");
    } else if (cleanCode === "GROW50") {
      setDiscountPercent(50);
      setAppliedCoupon("GROW50 (50% OFF)");
      setCouponSuccess(true);
      setCouponErr("");
    } else {
      setCouponErr("Invalid business voucher code. Try 'RENOVA20' or 'GROW50'.");
      setCouponSuccess(false);
    }
    setCouponCode("");
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    return (getSubtotal() * discountPercent) / 100;
  };

  const getTotal = () => {
    const total = getSubtotal() - getDiscountAmount();
    return Math.max(0, total);
  };

  const handleProcedCheckout = () => {
    onCheckout(getDiscountAmount(), appliedCoupon);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Transparent Area to dismiss */}
        <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={onClose}></div>

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" id="cart-drawer-container">
          <div className="w-screen max-w-md bg-neutral-900 text-white border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-neutral-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-white">Your Shopping Cart</h3>
                {cart.length > 0 && (
                  <span className="bg-amber-400 text-neutral-950 text-xs font-black px-2 py-0.5 rounded-full">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </div>
              
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                id="close-cart-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Middle Product List Scroll */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-24 space-y-4">
                  <ShoppingBag className="w-12 h-12 text-neutral-700 mx-auto stroke-[1.25]" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300">Your Checkout Cart is Empty</h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-[220px] mx-auto leading-relaxed">
                      Explore our detailed creator template packs or book custom organic Reels packages to start checkouts.
                    </p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl flex items-start gap-3 justify-between"
                  >
                    <div className="flex gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center font-black text-amber-400"
                        style={{ background: item.imageAccent || "linear-gradient(135deg, #111 0%, #2a251b 100%)" }}
                      >
                        {item.type === "product" ? "G" : "S"}
                      </div>
                      
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-neutral-500 mt-1 uppercase font-semibold">
                          {item.type === "product" ? "Instant Secure Guide" : "Booked Agency Service"}
                        </p>
                        {item.details && (
                          <p className="text-[10px] text-neutral-400 leading-none mt-1">
                            {item.details}
                          </p>
                        )}
                        <span className="text-xs font-extrabold text-amber-500 block mt-2">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls & Removal action */}
                    <div className="flex flex-col items-end justify-between self-stretch gap-3">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shrink-0">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom calculation controls if items exist */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-850 space-y-4 bg-neutral-950/40">
                
                {/* Coupon submission segment */}
                <div>
                  {couponSuccess ? (
                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-2.5 rounded-xl">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Active discount coupon code: <strong>{appliedCoupon}</strong></span>
                      </div>
                      <button 
                        onClick={() => {
                          setDiscountPercent(0);
                          setAppliedCoupon("");
                          setCouponSuccess(false);
                        }}
                        className="font-bold underline"
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-600" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon? e.g. RENOVA20"
                          className="w-full pl-9 pr-2 py-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs uppercase text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs font-bold rounded-lg transition-colors border border-neutral-800"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponErr && (
                    <p className="text-[10px] text-rose-400 mt-1 font-semibold block">{couponErr}</p>
                  )}
                </div>

                {/* Subtotals parameters */}
                <div className="space-y-2 text-xs border-t border-neutral-900 pt-4">
                  <div className="flex justify-between text-neutral-400">
                    <span>In-Cart Subtotal:</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5" />
                        Discount Deductions ({discountPercent}%):
                      </span>
                      <span>-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>Tax Fees (Wise Standard):</span>
                    <span>$0.00 (Tax Free)</span>
                  </div>

                  <div className="flex justify-between text-sm font-extrabold border-t border-neutral-850 pt-2 text-amber-400">
                    <span>Authorized Total Charge:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex justify-center items-center gap-1.5 text-[10px] text-neutral-500 uppercase font-bold tracking-widest pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Stripe SSL 256-Bit Encrypted Secure
                </div>

                {/* Checkout secure button */}
                <button
                  onClick={handleProcedCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-750 text-neutral-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-1 shadow-lg cursor-pointer"
                  id="checkout-btn"
                >
                  Checkout Booking Securely
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
