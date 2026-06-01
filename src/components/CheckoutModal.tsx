/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, CreditCard, ShieldCheck, Mail, User, MapPin, 
  RefreshCw, CheckCircle2, ArrowRight, ArrowLeft, Heart, Sparkles 
} from "lucide-react";
import { CartItem, Order } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountAmount: number;
  couponCode: string;
  userEmail: string;
  onPaymentSuccess: (newOrder: Order) => void;
  clearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  discountAmount,
  couponCode,
  userEmail,
  onPaymentSuccess,
  clearCart
}: CheckoutModalProps) {
  
  const [payMethod, setPayMethod] = useState<"card" | "paypal" | "wise">("card");
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail || "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
    cardNum: "",
    cardExp: "",
    cardCvc: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [chargeComplete, setChargeComplete] = useState<Order | null>(null);
  const [checkoutErr, setCheckoutErr] = useState("");

  if (!isOpen) return null;

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const getAuthorizedTotal = () => {
    return Math.max(0, getSubtotal() - discountAmount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setCheckoutErr("Please input your full name and company email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setCheckoutErr("Please enter a valid email address.");
      return;
    }

    if (payMethod === "card") {
      if (!formData.cardNum || !formData.cardExp || !formData.cardCvc) {
        setCheckoutErr("Please fill in your payment card parameters.");
        return;
      }
    }

    setCheckoutErr("");
    setIsProcessing(true);

    // Simulate payment merchant processing authorization
    setTimeout(() => {
      setIsProcessing(false);

      const generatedOrderId = `RENOVA-${Math.floor(100000 + Math.random() * 900000)}`;
      const today = new Date().toISOString().split("T")[0];

      // Formulate electronic downloaded files mapping depending on products in cart
      const downloads: { name: string; link: string }[] = [];
      cart.forEach((item) => {
        if (item.type === "product") {
          downloads.push({
            name: `${item.name} (Direct Secure Vault Access)`,
            link: `https://download.renovamotion.com/vault/${item.id}.zip?key=${Math.floor(100000 + Math.random() * 900000)}`
          });
        }
      });

      const orderRecord: Order = {
        id: generatedOrderId,
        date: today,
        customerName: formData.name,
        customerEmail: formData.email,
        items: [...cart],
        subtotal: getSubtotal(),
        discount: discountAmount,
        total: getAuthorizedTotal(),
        paymentMethod: payMethod === "card" ? "Credit Card (Stripe Encrypted)" : payMethod === "wise" ? "Wise Bank Node" : "PayPal Secure Express",
        status: "Completed",
        downloadsList: downloads
      };

      setChargeComplete(orderRecord);
      onPaymentSuccess(orderRecord);
      clearCart();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative max-h-[95vh] overflow-y-auto shadow-2xl"
        id="checkout-transaction-box"
      >
        {/* Close Button unless success screen active */}
        {!chargeComplete && !isProcessing && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-neutral-400 hover:text-white border border-neutral-800 transition-all hover:scale-105"
            id="close-checkout-btn"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* ------------------------------------- */}
        {/* PHASE 1: LOADING SPINNER STATE */}
        {/* ------------------------------------- */}
        {isProcessing && (
          <div className="py-24 text-center space-y-6 flex flex-col items-center justify-center" id="payment-loader">
            <RefreshCw className="w-12 h-12 text-amber-500 animate-spin" />
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Securing Merchant Authorization...</h3>
              <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto leading-relaxed">
                Renova Motion routing network is passing credentials via SSL. Please do not refresh or dismiss card tabs...
              </p>
            </div>
            
            <div className="flex gap-4 max-w-xs justify-center pt-8 text-[10px] text-neutral-500 font-bold uppercase">
              <span>Wise Direct Clearing</span>
              <span>•</span>
              <span>Stripe Node Secure</span>
            </div>
          </div>
        )}

        {/* ------------------------------------- */}
        {/* PHASE 2: TRANSACTION COMPLETED SUCCESS SUMMARY */}
        {/* ------------------------------------- */}
        {chargeComplete && (
          <div className="py-8 space-y-6" id="payment-success-panel">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Authorization Complete</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Thank You For Your Order!</h2>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Invoice payment confirmed. Order ID <strong>{chargeComplete.id}</strong> has been created and logged in our secure archives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-800">
              
              {/* Left Column: Items details */}
              <div className="space-y-4 p-5 bg-neutral-950/40 border border-neutral-850 rounded-2xl">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Purchased Deliverables:</h4>
                <ul className="space-y-2 text-xs">
                  {chargeComplete.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between border-b border-neutral-900 pb-1.5 text-neutral-300">
                      <span>{i.name} (x{i.quantity})</span>
                      <span className="font-extrabold text-white">${(i.price * i.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 text-xs space-y-1 text-neutral-400">
                  <p><strong>Subtotal:</strong> ${chargeComplete.subtotal.toFixed(2)}</p>
                  {chargeComplete.discount > 0 && <p className="text-emerald-400"><strong>Discount coupon:</strong> -${chargeComplete.discount.toFixed(2)}</p>}
                  <p className="text-sm font-bold text-amber-400 mt-2"><strong>Charged Total:</strong> ${chargeComplete.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Right Column: Downloads / Next steps */}
              <div className="space-y-4">
                <div className="p-5 bg-amber-400/[0.02] border border-amber-500/10 rounded-2xl space-y-2.5">
                  <h4 className="text-xs uppercase font-extrabold text-amber-300 tracking-wide flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    How to access your downloads:
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Digital files are immediately viewable. We have also emailed download tokens directly to <strong>{chargeComplete.customerEmail}</strong>.
                  </p>
                  
                  {chargeComplete.downloadsList.length > 0 ? (
                    <div className="space-y-1.5 pt-2">
                      {chargeComplete.downloadsList.map((dl, dIdx) => (
                        <div key={dIdx} className="p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg text-xs flex justify-between items-center text-neutral-300">
                          <span className="truncate max-w-[180px]">{dl.name.split(" ")[0]} Guide</span>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Simulation download triggered! File output path simulates: ${dl.link}`);
                            }}
                            className="text-[10px] bg-amber-400 text-neutral-950 font-black px-2.5 py-1 rounded"
                          >
                            Download (.ZIP)
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-neutral-400 bg-neutral-950 p-3 rounded-lg">
                      <strong>Note on Custom Services booking:</strong> Our onboarding creative strategist has queued your questionnaire dashboard setup. An advisor will contact you shortly.
                    </div>
                  )}
                </div>

                <div className="text-xs text-neutral-500 leading-normal">
                  You can monitor this invoice order, retrieve guides, or request custom quotes any time inside your <strong>Client Partner Portal</strong> tab.
                </div>
              </div>

            </div>

            {/* Resume button */}
            <div className="pt-6 border-t border-neutral-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white text-black font-extrabold rounded-xl text-xs hover:bg-neutral-200 transition-colors"
                id="success-done-btn"
              >
                Back To Platform Catalog
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------- */}
        {/* PHASE 3: MAIN CHECKOUT FORM ENTERING DETAILS */}
        {/* ------------------------------------- */}
        {!chargeComplete && !isProcessing && (
          <form onSubmit={handleSubmitPayment} className="space-y-6" id="checkout-main-form">
            
            {/* Header Title bar */}
            <div className="border-b border-neutral-800 pb-4 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  Secure Merchant Checkouts
                </h3>
                <p className="text-xs text-neutral-500 mt-1 uppercase font-bold tracking-widest">Renova Motion Co-Merchant Gateway Portal</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-500 uppercase block font-bold leading-none mb-1">Charge Total Due:</span>
                <span className="text-lg font-black text-amber-400">${getAuthorizedTotal().toFixed(2)}</span>
              </div>
            </div>

            {checkoutErr && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-semibold rounded-xl" id="checkout-err">
                {checkoutErr}
              </div>
            )}

            {/* Layout Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Panel: Customer Details Form */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">1. Client / Invoice Details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Company Buyer Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rachel Adams (Vanguard Co)"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Billing Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="rachel@vanguard.com"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Billing Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Suite 150, Market Chambers"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Billing City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="San Francisco"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Zip Billing Code *</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="94111"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">Billing Country *</label>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-450 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="United States">United States (USD)</option>
                      <option value="United Kingdom">United Kingdom (GBP)</option>
                      <option value="Germany">Germany (EUR)</option>
                      <option value="Singapore">Singapore (SGD)</option>
                      <option value="Canada">Canada (CAD)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Panel: Tabbed Payment Method & Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">2. Secure Payment Gateway Option</h4>
                  
                  {/* Tabs */}
                  <div className="flex gap-1.5 border-b border-neutral-850 pb-3 mb-4" id="checkout-gateway-tabs">
                    {[
                      { id: "card", label: "Credit Card" },
                      { id: "paypal", label: "PayPal Express" },
                      { id: "wise", label: "Wise Node" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setPayMethod(tab.id as any);
                          setCheckoutErr("");
                        }}
                        className={`flex-grow py-2 text-center rounded-lg text-xs font-bold transition-all ${
                          payMethod === tab.id
                            ? "bg-amber-400 text-neutral-950"
                            : "bg-neutral-950 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Render based on Tab chosen */}
                  {payMethod === "card" && (
                    <div className="space-y-3" id="stripe-inputs">
                      <div>
                        <label className="text-[9px] font-bold uppercase text-neutral-500 block mb-1">Standard Card Number *</label>
                        <input
                          type="text"
                          name="cardNum"
                          value={formData.cardNum}
                          onChange={handleInputChange}
                          maxLength={19}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase text-neutral-500 block mb-1">Expiry Date *</label>
                          <input
                            type="text"
                            name="cardExp"
                            value={formData.cardExp}
                            onChange={handleInputChange}
                            maxLength={5}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase text-neutral-500 block mb-1">CVC Code *</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            maxLength={4}
                            placeholder="123"
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {payMethod === "paypal" && (
                    <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-2xl text-center space-y-3" id="paypal-sim-widget">
                      <p className="text-xs text-neutral-400">
                        Proceed via secure PayPal login wrapper. Taxes are calculated dynamically.
                      </p>
                      <button 
                        type="button"
                        onClick={() => alert("Simulation popup: Redirecting to secure PayPal OAuth wrapper...")}
                        className="w-full py-2.5 bg-yellow-405 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black rounded-lg text-xs"
                      >
                        Authorize Secure PayPal Login
                      </button>
                    </div>
                  )}

                  {payMethod === "wise" && (
                    <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-2xl space-y-2.5 text-xs text-neutral-450" id="wise-sim-widget">
                      <p className="text-neutral-400">Wise direct account wire transfer setup instructions:</p>
                      <div className="p-2.5 bg-neutral-900 rounded-lg text-[10px] space-y-1 text-neutral-300 border border-neutral-850">
                        <p><strong>Routing Bank:</strong> Wise Europe Ltd / Belgium Node</p>
                        <p><strong>Merchant IBAN:</strong> BE42 1234 5678 9012 (Renova Corp)</p>
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        Note: Deliverables are verified as soon as wire transfer logs clear standard internal nodes.
                      </p>
                    </div>
                  )}
                </div>

                {/* Subtotal review check lists */}
                <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-2xl text-xs space-y-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Pricing Check:</span>
                  <div className="flex justify-between text-neutral-400">
                    <span>In-Cart Items Subtotal:</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Voucher Discount (Coupon: {couponCode}):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-extrabold text-amber-400 pt-1.5 border-t border-neutral-900">
                    <span>Total Charged Charge:</span>
                    <span>${getAuthorizedTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-xs transition-transform flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4 text-neutral-950" />
                    Authorize Secure Payment Transaction
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 text-neutral-500 hover:text-white text-xs font-semibold hover:underline"
                  >
                    Cancel checkout & Return
                  </button>
                </div>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
