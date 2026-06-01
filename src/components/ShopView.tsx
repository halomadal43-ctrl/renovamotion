/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Search, SlidersHorizontal, ArrowUpDown, BookOpen, Star, 
  Check, FileDown, ShieldAlert, ShoppingCart, X, Eye, Sparkles 
} from "lucide-react";
import { PRODUCTS_DATA } from "../data";
import { Product, CartItem } from "../types";

interface ShopViewProps {
  addToCart: (item: CartItem) => void;
  openCart: () => void;
}

export default function ShopView({ addToCart, openCart }: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "sales">("sales");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Filter products by searching
  const filteredProducts = PRODUCTS_DATA.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price-asc") {
      return a.price - b.price;
    } else if (sortBy === "price-desc") {
      return b.price - a.price;
    } else {
      return b.salesCount - a.salesCount; // Default popularity
    }
  });

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Avoid triggering open modal if clicking card button
    }
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      type: "product",
      quantity: 1,
      fileFormat: product.fileFormat,
      imageAccent: product.imageAccent
    };
    addToCart(cartItem);
    
    // Toast notification
    setShowNotification(product.name);
    setTimeout(() => {
      setShowNotification(null);
    }, 400);
  };

  const handleViewDetails = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedProduct(product);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const getRelatedProducts = (currentProdId: string) => {
    return PRODUCTS_DATA.filter((p) => p.id !== currentProdId).slice(0, 3);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-16 selection:bg-amber-400 selection:text-black relative">
      
      {/* Absolute Toast */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 font-bold px-4 py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] text-sm animate-bounce" id="toast-add-cart">
          <ShoppingCart className="w-4 h-4" />
          <span>{showNotification} loaded to cart!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-3 inline-block">
            Self-Paced Resources
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Creator Guides & Script Packs
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Accelerate your social editing speed and copywriting metrics instantly with our agency's field-tested templates. Instant secure downloads delivered upon authorized checkout.
          </p>
        </div>

        {/* Searching & Sorting Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-neutral-900 pb-8 mb-12" id="shop-filter-bar">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, script packs, calendars..."
              className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500 hidden sm:inline" />
            <span className="text-xs text-neutral-400 hidden sm:inline">Sort:</span>
            <div className="relative w-full sm:w-auto">
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full sm:w-56 appearance-none pl-4 pr-10 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="sales">Popularity / Sales</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Outer Catalog Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-neutral-800 bg-neutral-900/10 rounded-2xl">
            <p className="text-neutral-400 text-sm">No digital products found matching your search term.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs font-bold text-amber-400 underline uppercase"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="products-catalog-grid">
            {sortedProducts.map((product) => (
              <div 
                key={product.id}
                onClick={(e: any) => setSelectedProduct(product)}
                className="group bg-neutral-900/35 border border-neutral-850 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Product Thumbnail Block */}
                <div 
                  className="h-44 relative flex items-center justify-center p-6"
                  style={{ background: product.imageAccent }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                  <BookOpen className="w-12 h-12 text-amber-400 stroke-[1.25] group-hover:scale-110 transition-transform duration-300" />
                  
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-[10px] text-neutral-400 font-bold px-2 py-0.5 rounded border border-neutral-850">
                    {product.fileFormat.split("&")[0]}
                  </div>

                  <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] font-extrabold text-white flex items-center gap-1.5 border border-neutral-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Content info block */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xl font-extrabold text-amber-400">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-neutral-900/80">
                    <button
                      onClick={(e) => handleViewDetails(product, e)}
                      className="py-3 px-4 border border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-905 text-neutral-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-500" />
                      Details
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-neutral-950 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 shadow-md"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Dynamic Related / Trust Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-neutral-900" id="shop-trust-banners">
          <div className="flex gap-4 p-4 border border-neutral-900 bg-neutral-900/10 rounded-xl">
            <FileDown className="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Instant Portal Delivery</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Downloads links are generated straight onto checkout success screens and saved in your customer profile forever.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 border border-neutral-900 bg-neutral-900/10 rounded-xl">
            <ShieldAlert className="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Wise Bank Audit Ready</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">Tax records and professional accounting invoices are fully populated at payment clearing automatically.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 border border-neutral-900 bg-neutral-900/10 rounded-xl">
            <Sparkles className="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Tested Agency Formats</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">No generic copy-paste. All hooks, files, calendars, and prompts are utilized daily by our content editor network.</p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------- */}
        {/* MODAL: PRODUCT DETAIL DRAWER / POPUP */}
        {/* ------------------------------------------- */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div 
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              id="product-detail-modal"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-neutral-400 hover:text-white border border-neutral-800 hover:scale-105 transition-all"
                id="close-product-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Color Header panel */}
              <div 
                className="h-32 flex items-center justify-center px-8 relative"
                style={{ background: selectedProduct.imageAccent }}
              >
                <div className="absolute inset-0 bg-neutral-950/30"></div>
                <BookOpen className="w-10 h-10 text-amber-400" />
              </div>

              <div className="p-6 sm:p-8">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-6">
                  <div>
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Digital Download Pack</span>
                    <h2 className="text-2xl font-extrabold text-white mt-1">{selectedProduct.name}</h2>
                    <p className="text-xs text-neutral-500 mt-1 uppercase">Rating: {selectedProduct.rating.toFixed(1)}/5.0 ({selectedProduct.salesCount} Verified Copies)</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-3xl font-extrabold text-amber-400 block">${selectedProduct.price.toFixed(2)}</span>
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">One-time payment</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left inner section */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider mb-2">Description</h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{selectedProduct.fullDescription}</p>
                    </div>

                    <div className="p-4 bg-amber-400/5 border border-amber-500/10 rounded-xl text-xs text-amber-300">
                      <strong>Delivery Notice:</strong> Due to the immediate delivery format of these digital publications & files, standard refund loops are limited once files are downloaded. Read our Refund guidelines below for duplicity options.
                    </div>
                  </div>

                  {/* Right checklist section */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider mb-2">What is included inside:</h4>
                      <ul className="space-y-2">
                        {selectedProduct.whatsIncluded.map((incl, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-neutral-300">
                            <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{incl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-neutral-850 pt-4 text-xs text-neutral-400 space-y-1.5">
                      <p><strong>File Format:</strong> {selectedProduct.fileFormat}</p>
                      <p><strong>Access Method:</strong> {selectedProduct.deliveryMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Related Digital Products Segment */}
                <div className="border-t border-neutral-800 mt-8 pt-6">
                  <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider mb-4">You might also find helpful:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="related-products-list">
                    {getRelatedProducts(selectedProduct.id).map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className="p-4 bg-neutral-950 border border-neutral-850 hover:border-amber-400/20 rounded-xl cursor-pointer hover:bg-neutral-900 transition-all flex flex-col justify-between h-36"
                      >
                        <div>
                          <h5 className="text-xs font-bold text-white line-clamp-2">{p.name}</h5>
                          <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1 leading-tight">{p.shortDescription}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-neutral-900 pt-2 mt-1">
                          <span className="text-[10px] font-extrabold text-amber-400">${p.price.toFixed(2)}</span>
                          <span className="text-[9px] text-neutral-500 font-bold uppercase">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Buy / Cart control */}
                <div className="flex sm:flex-row flex-col gap-3 mt-8 pt-6 border-t border-neutral-800">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-grow py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 font-extrabold rounded-xl text-sm hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add this to Cart (${selectedProduct.price.toFixed(2)})
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                      openCart();
                    }}
                    className="py-3.5 px-6 border border-neutral-800 bg-neutral-950 hover:bg-neutral-850 text-neutral-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Fast Pre-Checkout Direct
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
