/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import ShopView from "./components/ShopView";
import PortfolioView from "./components/PortfolioView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import FAQView from "./components/FAQView";
import PolicyView from "./components/PolicyView";
import AccountView from "./components/AccountView";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { CartItem, Order, QuoteRequest } from "./types";

export default function App() {
  // Navigation State
  const [activeView, setActiveView] = useState<string>("home");
  const [policyType, setPolicyType] = useState<"privacy" | "terms" | "refund">("privacy");
  
  // Selected configurations to bridge views
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedPackageName, setSelectedPackageName] = useState<string>("");

  // E-Commerce cart persistence state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  // Customer Account profiles state
  const [userEmail, setUserEmail] = useState<string>("halomadal43@gmail.com");
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [bookings, setBookings] = useState<{ date: string; time: string; name: string; email: string }[]>([]);

  // 1. Initial State Sync & Databases Seed
  useEffect(() => {
    // Sync cart
    const savedCart = localStorage.getItem("renova_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart retrieval error", e);
      }
    }

    // Sync account details
    const savedOrders = localStorage.getItem("renova_orders");
    const savedQuotes = localStorage.getItem("renova_quotes");
    const savedBookings = localStorage.getItem("renova_bookings");

    if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
    if (savedBookings) setBookings(JSON.parse(savedBookings));

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Seed account with 1 verified seed order for proof of checkout instant downloads
      const seedOrder: Order = {
        id: "RENOVA-44820",
        date: "2026-05-24",
        customerName: "Halomadal User",
        customerEmail: "halomadal43@gmail.com",
        items: [
          {
            id: "ugc-script-pack",
            name: "UGC Ad Script Pack",
            price: 29.00,
            type: "product",
            quantity: 1,
            fileFormat: "Interactive PDF",
            imageAccent: "linear-gradient(135deg, #0a0a0a 0%, #3a2e1d 100%)"
          }
        ],
        subtotal: 29.00,
        discount: 0,
        total: 29.00,
        paymentMethod: "PayPal Secure Express",
        status: "Completed",
        downloadsList: [
          {
            name: "UGC Ad Script Pack (Direct Secure Vault Access)",
            link: "https://download.renovamotion.com/vault/ugc-script-pack.zip?key=8194"
          }
        ]
      };
      setOrders([seedOrder]);
      localStorage.setItem("renova_orders", JSON.stringify([seedOrder]));
    }
  }, []);

  // Sync Cart items to LocalStorage on updates
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("renova_cart", JSON.stringify(newCart));
  };

  // 2. E-Commerce Cart Logic Mutators
  const addToCart = (newItem: CartItem) => {
    const existingIndex = cart.findIndex((item) => item.id === newItem.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      saveCartToStorage(updatedCart);
    } else {
      saveCartToStorage([...cart, newItem]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCartToStorage(updatedCart);
  };

  const handleCheckoutProcess = (discount: number, coupon: string) => {
    setAppliedDiscount(discount);
    setAppliedCoupon(coupon);
    setIsCheckoutOpen(true);
  };

  // 3. Checkout Confirmation Upstream mutators
  const handlePaymentSuccess = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("renova_orders", JSON.stringify(updatedOrders));
    
    // Jump user directly to Account Portal to access their newly decrypted file downloads!
    setActiveView("account");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("renova_cart");
    setAppliedDiscount(0);
    setAppliedCoupon("");
  };

  // 4. Contact & Booking mutators
  const handleSubmitQuote = (quoteData: {
    name: string;
    email: string;
    businessName: string;
    serviceNeeded: string;
    budgetRange: string;
    message: string;
  }) => {
    const newQuote: QuoteRequest = {
      id: `Q-${Math.floor(1000 + Math.random() * 9000)}`,
      name: quoteData.name,
      email: quoteData.email,
      businessName: quoteData.businessName,
      serviceNeeded: quoteData.serviceNeeded,
      budgetRange: quoteData.budgetRange,
      message: quoteData.message,
      status: "Received"
    };

    const updatedQuotes = [newQuote, ...quotes];
    setQuotes(updatedQuotes);
    localStorage.setItem("renova_quotes", JSON.stringify(updatedQuotes));
  };

  const handleSubmitBooking = (bookingData: {
    date: string;
    time: string;
    name: string;
    email: string;
  }) => {
    const updatedBookings = [bookingData, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem("renova_bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 font-sans text-neutral-200">
      
      {/* 1. Header Navigation elements */}
      <Header 
        activeView={activeView}
        setActiveView={(v) => {
          // If nav click, clean transitional parameters
          if (v !== "services") {
            setSelectedServiceId("");
            setSelectedPackageName("");
          }
          setActiveView(v);
        }}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        userEmail={userEmail}
      />

      {/* 2. Core Active View Rendering Frame with smooth motion animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + policyType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {activeView === "home" && (
              <HomeView 
                setActiveView={setActiveView}
                setSelectedServiceId={setSelectedServiceId}
                setSelectedPackageName={setSelectedPackageName}
              />
            )}

            {activeView === "services" && (
              <ServicesView 
                selectedServiceId={selectedServiceId}
                setSelectedServiceId={setSelectedServiceId}
                selectedPackageName={selectedPackageName}
                setSelectedPackageName={setSelectedPackageName}
                addToCart={addToCart}
                setActiveView={setActiveView}
                onContactConsultation={(subjectLine) => {
                  setActiveView("contact");
                  // Setup message prefilled subject line
                  const quoteForm = document.getElementById("custom-quote-form");
                  if (quoteForm) {
                    quoteForm.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            )}

            {activeView === "shop" && (
              <ShopView 
                addToCart={addToCart} 
                openCart={() => setIsCartOpen(true)}
              />
            )}

            {activeView === "portfolio" && (
              <PortfolioView />
            )}

            {activeView === "about" && (
              <AboutView 
                onContactRequest={() => {
                  setActiveView("contact");
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
              />
            )}

            {activeView === "contact" && (
              <ContactView 
                setActiveView={setActiveView}
                onSubmitQuote={handleSubmitQuote}
                onSubmitBooking={handleSubmitBooking}
              />
            )}

            {activeView === "faqs" && (
              <FAQView setActiveView={setActiveView} />
            )}

            {(activeView === "privacy" || activeView === "terms" || activeView === "refund") && (
              <PolicyView 
                policyType={activeView as any}
                setPolicyType={(pType) => {
                  setPolicyType(pType);
                  setActiveView(pType);
                }}
              />
            )}

            {activeView === "account" && (
              <AccountView 
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                orders={orders}
                quotes={quotes}
                bookings={bookings}
                setActiveView={setActiveView}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer block elements */}
      <Footer 
        setActiveView={(v) => {
          if (v === "privacy" || v === "terms" || v === "refund") {
            setPolicyType(v as any);
          }
          setActiveView(v);
        }}
      />

      {/* 4. Sliding Shopping Cart Drawer Overlay */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckoutProcess}
      />

      {/* 5. Secure Checkouts Processing modal gateway */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discountAmount={appliedDiscount}
        couponCode={appliedCoupon}
        userEmail={userEmail}
        onPaymentSuccess={handlePaymentSuccess}
        clearCart={clearCart}
      />

    </div>
  );
}
