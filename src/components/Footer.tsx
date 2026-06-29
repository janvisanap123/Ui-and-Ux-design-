import React from 'react';

interface FooterProps {
  onTabChange: (tab: 'home' | 'publish' | 'store' | 'account') => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-[#faf8f5] border-t border-gray-250 py-12 px-4 mt-auto">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto text-brand-primary">
        {/* Brand Center */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="font-serif font-black text-xl text-brand-primary tracking-wide">
            Zenjaura Publishing House
          </div>
          <p className="text-gray-500 text-xs text-center font-sans font-semibold">
            Instant local publishing for the modern independent creator.
          </p>
        </div>

        {/* Link Grids */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left mt-2">
          {/* Column 1 */}
          <div className="flex flex-col gap-2">
            <h5 className="font-black text-xs text-brand-primary tracking-wider uppercase font-sans">Company</h5>
            <a href="#about" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">About Us</a>
            <a href="#contact" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">Contact</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2">
            <h5 className="font-black text-xs text-brand-primary tracking-wider uppercase font-sans">Legal</h5>
            <a href="#privacy" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">Privacy Policy</a>
            <a href="#terms" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">Terms of Use</a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-2">
            <h5 className="font-black text-xs text-brand-primary tracking-wider uppercase font-sans">Social</h5>
            <a href="#twitter" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">Twitter</a>
            <a href="#instagram" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">Instagram</a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-2">
            <h5 className="font-black text-xs text-brand-primary tracking-wider uppercase font-sans">Support</h5>
            <a href="#help" className="text-xs text-gray-500 hover:text-brand-secondary transition-colors font-bold">Help Center</a>
            <span onClick={() => onTabChange('account')} className="text-xs text-gray-500 hover:text-brand-secondary cursor-pointer transition-colors font-bold">Author FAQ</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-[10px] text-gray-400 font-sans font-semibold tracking-wider">
            © {new Date().getFullYear()} Zenjaura Publishing House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
