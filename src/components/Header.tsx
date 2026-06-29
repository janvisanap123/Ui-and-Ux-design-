import React from 'react';
import { MapPin, Search, ShoppingBag, Phone, Heart, User, ChevronDown, BookOpen, Compass, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  cart: CartItem[];
  onOpenCart: () => void;
  onTabChange: (tab: 'home' | 'publish' | 'store' | 'account') => void;
}

export default function Header({
  onSearchChange,
  searchQuery,
  cart,
  onOpenCart,
  onTabChange,
}: HeaderProps) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-white shadow-md flex flex-col">
      {/* 1. TOP MINI UTILITY ROW */}
      <div className="bg-[#faf8f5] border-b border-gray-200/60 py-1.5 px-4 hidden md:flex items-center justify-between text-[11px] font-sans font-medium text-gray-500">
        <div className="flex items-center gap-4">
          <a href="#about" className="hover:text-brand-secondary transition-colors">About Us</a>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <button onClick={() => onTabChange('account')} className="hover:text-brand-secondary transition-colors">My Account</button>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <a href="#wishlist" className="hover:text-brand-secondary transition-colors flex items-center gap-1">
            <Heart className="w-3 h-3 text-brand-secondary fill-current" /> Wishlist
          </a>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <button onClick={() => onTabChange('account')} className="hover:text-brand-secondary transition-colors">Order Tracking</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 font-semibold">⚡ Fast Local Delivery:</span>
          <span className="text-brand-primary font-bold">Ready in 30 minutes</span>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
            <span>Store Finder</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & SEARCH BAR ROW */}
      <header className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white gap-4">
        {/* Brand Logo with Coral Icon */}
        <div
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-secondary to-brand-gold flex items-center justify-center text-white font-serif font-black shadow-md shadow-brand-secondary/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif font-black text-2xl text-brand-primary tracking-tight leading-none group-hover:text-brand-secondary transition-colors">
              Zenjaura
            </span>
            <span className="text-[9px] text-brand-gold font-bold tracking-widest font-sans uppercase leading-none mt-1">
              Publishing House
            </span>
          </div>
        </div>

        {/* Dynamic & Colorful Search Engine */}
        <div className="flex-1 max-w-2xl mx-4 hidden sm:flex">
          <div className="relative w-full h-11 flex bg-[#f5f3f0]/70 hover:bg-[#f5f3f0] border border-gray-200/80 rounded-2xl items-center overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary/10 focus-within:border-brand-primary transition-all shadow-sm">
            
            {/* Category Dropdown (Mocking screenshot) */}
            <div className="px-4 border-r border-gray-200/60 hidden md:flex items-center gap-1 text-xs font-bold text-gray-700 cursor-pointer hover:text-brand-secondary select-none">
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Input */}
            <input
              type="text"
              className="flex-1 h-full px-4 text-xs text-gray-800 bg-transparent placeholder-gray-400 focus:outline-none"
              placeholder="Search bestsellers, authors, custom journals..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />

            {/* Search Button (Coral Red) */}
            <button
              onClick={() => onSearchChange(searchQuery)}
              className="h-full px-5 bg-brand-secondary hover:bg-brand-secondary/90 text-white transition-colors flex items-center justify-center gap-1 shadow-inner cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white hidden lg:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Action Controls & Info Center */}
        <div className="flex items-center gap-5">
          {/* Quick Call support */}
          <div className="hidden lg:flex items-center gap-2 text-left">
            <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase leading-none font-mono">24/7 Helpline</span>
              <span className="text-xs font-bold text-brand-primary mt-1">+1 840 - 841 2569</span>
            </div>
          </div>

          {/* User Account Portal trigger */}
          <button
            onClick={() => onTabChange('account')}
            className="p-2 text-gray-500 hover:text-brand-secondary rounded-xl hover:bg-gray-50 transition-colors hidden sm:block"
            aria-label="View Account"
          >
            <User className="w-5.5 h-5.5" />
          </button>

          {/* Dynamic Shopping Bag Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-brand-primary text-white hover:bg-brand-primary/95 rounded-2xl shadow-md shadow-brand-primary/10 transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            aria-label="Open Shopping Cart"
            id="cart-header-btn"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-white" />
            <span className="text-xs font-bold text-white hidden sm:inline">Cart</span>
            {totalCartItems > 0 ? (
              <span className="bg-brand-secondary text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalCartItems}
              </span>
            ) : (
              <span className="text-[10px] text-emerald-300 font-bold hidden sm:inline">empty</span>
            )}
          </button>
        </div>
      </header>

      {/* 3. COLORFUL NAVIGATION ROW */}
      <div className="bg-[#015545] text-white px-4 py-2 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 md:gap-6 text-xs font-bold">
          {/* Categories Button */}
          <button
            onClick={() => onTabChange('store')}
            className="bg-brand-secondary hover:bg-brand-secondary/90 text-white font-extrabold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm text-[11px] uppercase tracking-wider cursor-pointer"
          >
            <Compass className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '8s' }} />
            Browse Store
          </button>

          {/* Nav Links */}
          <button
            onClick={() => onTabChange('home')}
            className="hover:text-brand-gold transition-colors py-1 cursor-pointer tracking-wide"
          >
            Home
          </button>
          <button
            onClick={() => onTabChange('store')}
            className="hover:text-brand-gold transition-colors py-1 cursor-pointer tracking-wide"
          >
            Shop
          </button>
          <button
            onClick={() => onTabChange('publish')}
            className="hover:text-brand-gold transition-colors py-1 cursor-pointer flex items-center gap-1 tracking-wide text-brand-gold"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-current" /> Publish Now
          </button>
          <button
            onClick={() => onTabChange('account')}
            className="hover:text-brand-gold transition-colors py-1 cursor-pointer tracking-wide"
          >
            Order Track
          </button>
        </div>

        {/* Small badge */}
        <div className="text-[10px] font-mono font-bold text-emerald-200 hidden md:block">
          📚 MICRO-PUBLISHING HUB LIVE
        </div>
      </div>
    </div>
  );
}

