import React from 'react';
import { Home, BookOpen, Store, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'publish' | 'store' | 'account';
  onTabChange: (tab: 'home' | 'publish' | 'store' | 'account') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-[#faf8f5] border-t border-gray-200 flex justify-around py-3 z-40 shadow-lg">
      {/* Home Tab */}
      <button
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 select-none transition-transform active:scale-95 cursor-pointer ${
          activeTab === 'home' ? 'text-brand-primary font-black' : 'text-gray-400'
        }`}
        id="nav-btn-home"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-wide font-sans">Home</span>
      </button>

      {/* Publish Tab */}
      <button
        onClick={() => onTabChange('publish')}
        className={`flex flex-col items-center gap-1 select-none transition-transform active:scale-95 cursor-pointer ${
          activeTab === 'publish' ? 'text-brand-primary font-black' : 'text-gray-400'
        }`}
        id="nav-btn-publish"
      >
        <BookOpen className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-wide font-sans">Publish</span>
      </button>

      {/* Store Tab */}
      <button
        onClick={() => onTabChange('store')}
        className={`flex flex-col items-center gap-1 select-none transition-transform active:scale-95 cursor-pointer ${
          activeTab === 'store' ? 'text-brand-primary font-black' : 'text-gray-400'
        }`}
        id="nav-btn-store"
      >
        <Store className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-wide font-sans">Store</span>
      </button>

      {/* Account Tab */}
      <button
        onClick={() => onTabChange('account')}
        className={`flex flex-col items-center gap-1 select-none transition-transform active:scale-95 cursor-pointer ${
          activeTab === 'account' ? 'text-brand-primary font-black' : 'text-gray-400'
        }`}
        id="nav-btn-account"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-wide font-sans">Account</span>
      </button>
    </nav>
  );
}
