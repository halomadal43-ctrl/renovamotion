/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServicePackage {
  name: string; // "Starter" | "Growth" | "Premium"
  price: number;
  deliveryTime: string;
  revisions: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  packages: ServicePackage[];
  faqs: { question: string; answer: string }[];
  category: string;
  iconName: string; // Lucide icon identifier
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  whatsIncluded: string[];
  fileFormat: string;
  deliveryMethod: string;
  rating: number;
  salesCount: number;
  imageAccent: string; // CSS style or color representing it
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "UGC Ads" | "Social Media Videos" | "Recipe Videos" | "Pet & Animal Content" | "Brand Videos" | "AI Video Projects";
  description: string;
  platform: "TikTok" | "Instagram Reels" | "YouTube Shorts" | "Meta Ads" | "All Platforms";
  result: string;
  metric: string; // e.g. "+340% ROAS", "1.2M Views"
  clientName: string;
  bgGradient: string; // CSS gradient class for thumbnail representation
}

export interface CartItem {
  id: string; // Can be product.id or service_id-package
  name: string;
  price: number;
  type: "product" | "service";
  quantity: number;
  details?: string; // package name or details
  fileFormat?: string;
  imageAccent?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Services" | "Digital Products" | "Payment & Custom Quotes";
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: "Completed" | "Pending Approval" | "Processing";
  downloadsList: { name: string; link: string }[];
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  businessName: string;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
  status: "Received" | "Under Review";
}
