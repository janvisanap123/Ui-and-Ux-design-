import React, { useState } from 'react';
import { 
  Book, BookOpen, Newspaper, FileText, PenTool, Paintbrush, 
  Search, Play, Pause, Radio, CheckCircle, ArrowRight, Star,
  Bookmark, Award, Flame, ShoppingCart, Info, Compass, Sparkles, Gift, Heart, Users, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Book as BookType, MerchItem, PodcastEpisode } from '../types';

interface HomeTabProps {
  books: BookType[];
  merch: MerchItem[];
  podcasts: PodcastEpisode[];
  onAddToCart: (item: BookType | MerchItem, type: 'book' | 'merch') => void;
  onTabChange: (tab: 'home' | 'publish' | 'store' | 'account') => void;
  onSelectCategory: (category: string) => void;
  currentPlayingPodcast: PodcastEpisode | null;
  isPlaying: boolean;
  onPlayPodcast: (podcast: PodcastEpisode) => void;
  onPausePodcast: () => void;
}

export default function HomeTab({
  books,
  merch,
  podcasts,
  onAddToCart,
  onTabChange,
  onSelectCategory,
  currentPlayingPodcast,
  isPlaying,
  onPlayPodcast,
  onPausePodcast,
}: HomeTabProps) {
  const [mobileSearch, setMobileSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<{ name: string; icon: any; bg: string; text: string; desc: string; time: string } | null>(null);

  const formats = [
    { 
      name: 'Hardcover', 
      icon: Book, 
      bg: 'bg-white border border-[#e8e5e2] hover:border-brand-secondary/40', 
      text: 'text-brand-primary', 
      desc: 'Smyth-sewn, premium archival hardcover books. Ideal for novels, memoirs, and legacy publications.',
      time: 'Ready in 3-5 days'
    },
    { 
      name: 'Paperback', 
      icon: BookOpen, 
      bg: 'bg-white border border-[#e8e5e2] hover:border-brand-secondary/40', 
      text: 'text-brand-primary', 
      desc: 'Perfect-bound, durable softcover prints with matte or glossy finish. Best for mass distribution, fiction, and textbooks.',
      time: 'Ready in 2-3 days'
    },
    { 
      name: 'Magazines', 
      icon: Newspaper, 
      bg: 'bg-white border border-[#e8e5e2] hover:border-brand-secondary/40', 
      text: 'text-brand-primary', 
      desc: 'Saddle-stitched high-gloss printing. Perfect for lookbooks, regional journals, photo essays, and period publications.',
      time: 'Ready in 24 hours'
    },
    { 
      name: 'Journals', 
      icon: FileText, 
      bg: 'bg-white border border-[#e8e5e2] hover:border-brand-secondary/40', 
      text: 'text-brand-primary', 
      desc: 'Custom lined, dotted, or grid notebooks. Features thick bleed-resistant pages and flexible covers.',
      time: 'Ready in 24 hours'
    },
    { 
      name: 'Poetry', 
      icon: PenTool, 
      bg: 'bg-white border border-[#e8e5e2] hover:border-brand-secondary/40', 
      text: 'text-brand-primary', 
      desc: 'Elegantly typeset pocketbooks with specialized cream-laid paper. Perfect for lyrics, anthology, and short prose.',
      time: 'Ready in 2 days'
    },
    { 
      name: 'Artbooks', 
      icon: Paintbrush, 
      bg: 'bg-white border border-[#e8e5e2] hover:border-brand-secondary/40', 
      text: 'text-brand-primary', 
      desc: 'Heavyweight flat-lay paper with premium color-accurate CMYK printing. Perfect for design portfolios and exhibition catalogs.',
      time: 'Ready in 4 days'
    },
  ];

  // Visual custom interactive categories mapping exactly to the custom category circular layout in Bookory reference
  const circularCategories = [
    { name: 'Christian Living', color: 'from-[#7a2e2e] to-[#993d3d]', angle: '-rotate-12', delay: '0s' },
    { name: 'Church History', color: 'from-[#2a3a5a] to-[#3a5280]', angle: 'rotate-6', delay: '0.1s' },
    { name: 'Educational Curriculum', color: 'from-[#224433] to-[#32664d]', angle: '-rotate-6', delay: '0.2s' },
    { name: 'Fiction & Fantasy', color: 'from-[#5b5ad6] to-[#7472ed]', angle: 'rotate-12', delay: '0.3s' },
    { name: 'Religion & Spirituality', color: 'from-[#a25105] to-[#c2640b]', angle: '-rotate-12', delay: '0.4s' },
    { name: 'Romance Books', color: 'from-[#cc1b5b] to-[#ec3b7d]', angle: 'rotate-6', delay: '0.5s' }
  ];

  // Vendors list mapping to "Top Selling Vendor" with high-fidelity graphics
  const vendors = [
    {
      name: 'Barone LLC.',
      productsCount: 6,
      rating: 5,
      avatarBg: 'bg-gradient-to-tr from-[#0082c8] to-[#66b3ff]',
      brandColor: '#0082c8',
      initials: 'B',
      bookCovers: [
        { bg: '#2a3a5a', title: 'Metro' },
        { bg: '#224433', title: 'Rhyme' },
        { bg: '#cc1b5b', title: 'Pulse' }
      ]
    },
    {
      name: 'Gregstore',
      productsCount: 3,
      rating: 5,
      avatarBg: 'bg-gradient-to-tr from-[#e28c05] to-[#f8cb46]',
      brandColor: '#e28c05',
      initials: 'G',
      bookCovers: [
        { bg: '#7a2e2e', title: 'Urban' },
        { bg: '#5b5ad6', title: 'Grid' },
        { bg: '#a25105', title: 'Soul' }
      ]
    },
    {
      name: 'Arlene Store',
      productsCount: 6,
      rating: 5,
      avatarBg: 'bg-gradient-to-tr from-[#cc1b5b] to-[#ff6699]',
      brandColor: '#cc1b5b',
      initials: 'A',
      bookCovers: [
        { bg: '#5b5ad6', title: 'Love' },
        { bg: '#7a2e2e', title: 'Rose' },
        { bg: '#2a3a5a', title: 'Neon' }
      ]
    },
    {
      name: 'Book House',
      productsCount: 3,
      rating: 4,
      avatarBg: 'bg-gradient-to-tr from-[#1b1b1b] to-[#555555]',
      brandColor: '#1b1b1b',
      initials: 'H',
      bookCovers: [
        { bg: '#224433', title: 'Grow' },
        { bg: '#a25105', title: 'Build' },
        { bg: '#2a3a5a', title: 'Create' }
      ]
    }
  ];

  const handlePreOrder = () => {
    const gridProtocol: BookType = {
      id: 'preorder-grid',
      title: 'The Grid Protocol',
      author: 'Aida Team',
      price: 24.99,
      coverImage: 'grid-protocol',
      genre: 'Design & Architecture',
      description: 'A deep dive into the architecture of modern cities and the invisible systems that keep us moving.'
    };
    onAddToCart(gridProtocol, 'book');
  };

  return (
    <div className="flex flex-col gap-8 text-[#1b1b1b]">
      {/* Mobile Search Input */}
      <div className="px-4 md:hidden">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full h-11 bg-white border border-gray-200 rounded-xl pl-11 pr-4 text-xs text-[#1b1b1b] focus:outline-none focus:ring-2 focus:ring-brand-primary/15"
            placeholder="Search for books, authors..."
            value={mobileSearch}
            onChange={(e) => setMobileSearch(e.target.value)}
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
        </div>
      </div>

      {/* Hero Banner (Deep Pine Green styled after Bookory reference main banner) */}
      <section className="px-4">
        <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#014c3e] via-[#015d4e] to-[#047764] text-white flex flex-col md:flex-row items-center p-8 md:p-12 min-h-[320px] shadow-lg border border-emerald-950">
          
          {/* Subtle paper grid overlay & festive branches vector decorations */}
          <div className="absolute inset-0 opacity-[0.04] bg-grid-pattern" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Elegant decorative branches / stars to copy the book store's cozy layout */}
          <div className="absolute top-6 left-6 text-[22px] opacity-40 select-none animate-pulse">🌿</div>
          <div className="absolute bottom-8 right-12 text-[26px] opacity-30 select-none animate-bounce" style={{ animationDuration: '6s' }}>❄️</div>
          <div className="absolute top-1/3 right-1/3 text-[14px] opacity-50 select-none">✨</div>

          <div className="relative z-10 flex-1 flex flex-col items-start text-left gap-4 max-w-xl">
            {/* Christmas Pop Up / Creative gift badge */}
            <span className="bg-brand-secondary/90 text-white font-sans font-black tracking-widest text-[10px] px-3.5 py-1.5 rounded-full uppercase shadow-md flex items-center gap-1.5 border border-white/20">
              <Gift className="w-3.5 h-3.5 animate-bounce" />
              Special Hand-bound Gift Editions
            </span>

            <h1 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Bespoke Custom Books & Instant Gifts
            </h1>
            
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed max-w-md font-medium">
              Turn your manuscript into a masterfully typeset, gorgeous hardback or paperback. Hand-bound locally at our nearest publishing hub and dispatched to your door in 30 minutes!
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={() => onTabChange('publish')}
                className="bg-brand-gold hover:bg-amber-400 text-[#014c3e] font-sans font-black text-xs px-6 py-3 rounded-2xl flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-md shadow-amber-500/20 cursor-pointer"
                id="hero-get-started-btn"
              >
                Create Your Book
                <ArrowRight className="w-4 h-4 text-[#014c3e] stroke-[2.5]" />
              </button>
              
              <button
                onClick={() => onTabChange('store')}
                className="bg-white/10 hover:bg-white/20 text-white font-sans font-extrabold text-xs px-5 py-3 rounded-2xl border border-white/20 transition-all cursor-pointer"
              >
                Explore Bestsellers
              </button>
            </div>
          </div>

          {/* Book Display Mockup overlapping on large screens */}
          <div className="relative w-full md:w-1/2 h-52 sm:h-64 flex items-center justify-center mt-6 md:mt-0 select-none shrink-0">
            {/* Baby's First Words colorful book mockup from reference */}
            <div className="relative w-32 h-44 bg-gradient-to-br from-brand-secondary to-[#cc1b5b] rounded-r-xl shadow-2xl border-l-4 border-black/30 transform -rotate-12 translate-x-8 flex flex-col justify-between p-3.5 text-white overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
              <div className="border-b border-white/20 pb-1.5">
                <span className="text-[6px] text-amber-200 font-mono font-bold tracking-widest uppercase block">KID'S FAVORITE</span>
              </div>
              <div className="my-auto">
                <span className="text-[12px] font-serif font-black block leading-none text-white tracking-wide uppercase">BABY'S</span>
                <span className="text-[12px] font-serif font-black block leading-none text-amber-200 tracking-wide uppercase mt-0.5">FIRST WORDS</span>
              </div>
              <div className="flex justify-between items-end text-[7px] text-white/70">
                <span>LOCAL PRESS</span>
                <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[8px]">👶</span>
              </div>
            </div>
            
            {/* Baby Shark cover graphic styled after the reference screenshot */}
            <div className="relative w-34 h-48 bg-[#0082c8] rounded-r-xl shadow-2xl border-l-4 border-black/30 transform rotate-6 -translate-x-4 flex flex-col justify-between p-4 text-white overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#015545] opacity-20 pointer-events-none" />
              <div className="absolute top-4 right-4 text-[18px] opacity-40">🦈</div>
              <div className="border-b border-white/10 pb-2">
                <span className="text-[7px] text-amber-300 font-mono tracking-widest uppercase block font-black">TOP SING-ALONG</span>
                <span className="text-[11px] text-white font-serif font-black tracking-tight leading-none block mt-1">BABY SHARK</span>
              </div>
              <p className="text-[8px] text-sky-100 font-semibold leading-relaxed mt-2">The ultimate local press illustrated musical book edition.</p>
              <span className="text-[6px] text-sky-200 font-mono self-end">EDITION 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Circular/Angled Floating Categories (Exactly matching screenshot category listing style) */}
      <section className="px-4 py-2 text-center">
        <div className="flex flex-col items-center gap-1.5 mb-6">
          <span className="text-brand-secondary font-mono text-[10px] uppercase font-bold tracking-widest">Aesthetic Collections</span>
          <h2 className="font-serif font-black text-2xl text-brand-primary tracking-tight">Shop by Beautiful Formats</h2>
          <div className="w-12 h-1 bg-brand-gold rounded-full mt-1" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {circularCategories.map((cat, idx) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center gap-3.5 cursor-pointer group active:scale-95 transition-all"
              id={`circular-cat-${idx}`}
            >
              {/* Floating angled book representation inside container */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-gray-50 to-[#f5f3f0] border border-gray-200/60 shadow-sm flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-brand-secondary/40 group-hover:shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
                
                {/* Visual angled booklet preview inside */}
                <div className={`w-10 h-14 bg-gradient-to-br ${cat.color} rounded-r-md border-l-2 border-black/20 shadow-md ${cat.angle} transform transition-transform group-hover:rotate-0 flex flex-col justify-between p-1.5 text-white select-none`}>
                  <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                  <span className="text-[5px] font-mono leading-none tracking-widest block scale-75 origin-left">ZEN</span>
                </div>
              </div>
              
              <span className="font-sans font-extrabold text-[12px] text-[#1b1b1b] tracking-tight group-hover:text-brand-secondary transition-colors text-center max-w-[120px] leading-tight">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Double Side-by-Side Vibrant Promotional Banners (Copied exactly from reference screenshot) */}
      <section className="px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Banner: Purple Books Make Great Gifts (Exactly like screenshot) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#5143d9] via-[#6366f1] to-[#818cf8] p-6 md:p-8 text-white text-left flex justify-between items-center group shadow-md border border-[#4a3bc6]">
            <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col items-start gap-2 max-w-[220px] md:max-w-[240px] z-10">
              <span className="bg-white/15 text-white font-mono font-black text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider border border-white/10">
                GIFT SPECIAL
              </span>
              <h3 className="font-serif font-black text-xl md:text-2xl text-white tracking-tight leading-snug mt-1">
                Books Make Great Gifts
              </h3>
              <p className="text-[11px] text-indigo-100 leading-relaxed font-medium">
                Why not send the gift of a beautiful physical book to your family & friends?
              </p>
              <button 
                onClick={() => onTabChange('store')}
                className="mt-3 bg-white text-indigo-600 hover:bg-indigo-50 font-sans font-black text-[10px] px-4.5 py-2.5 rounded-xl transition-transform active:scale-95 shadow-sm cursor-pointer"
              >
                Choose Gift
              </button>
            </div>

            {/* Overlapping book cover mockups labeled "Sale 20%" */}
            <div className="relative w-28 h-36 flex items-center justify-center shrink-0 select-none">
              <div className="absolute -top-1 -right-1 z-20 bg-[#f34f3f] text-white font-sans font-black text-[10px] px-2 py-1 rounded-lg shadow-md transform rotate-12 uppercase tracking-wide">
                Sale 20%
              </div>
              
              <div className="w-16 h-22 bg-[#ff6699] rounded-r-md border-l-2 border-black/20 shadow-md transform -rotate-12 translate-x-4 flex flex-col justify-between p-1.5 text-white">
                <span className="text-[4px] font-mono">GIFT BOX</span>
                <span className="text-[7px] font-bold font-serif leading-tight">LOVE NOTES</span>
              </div>
              <div className="w-18 h-26 bg-[#faf8f5] rounded-r-md border-l-2 border-black/15 shadow-xl transform rotate-6 -translate-x-2 flex flex-col justify-between p-2 text-[#1b1b1b]">
                <span className="text-[4px] text-gray-400 font-mono">EDITION</span>
                <span className="text-[8px] font-black font-serif leading-tight text-brand-primary">GIFT GUIDE</span>
                <span className="text-[4px] text-right font-mono text-gray-400">ZENJAURA</span>
              </div>
            </div>
          </div>

          {/* Right Banner: Orange/Amber Sale 10% Off (Exactly like screenshot) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#df9303] via-[#e29c0b] to-[#fbc125] p-6 md:p-8 text-white text-left flex justify-between items-center group shadow-md border border-[#c48101]">
            <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col items-start gap-2 max-w-[220px] md:max-w-[240px] z-10">
              <span className="bg-[#1b1b1b]/15 text-white font-mono font-black text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider border border-[#1b1b1b]/5">
                NOVELS EVERY DAY!
              </span>
              <h3 className="font-serif font-black text-xl md:text-2xl text-white tracking-tight leading-snug mt-1">
                Sale 10% Off
              </h3>
              <p className="text-[11px] text-amber-900 leading-relaxed font-bold">
                It all begins with a great book. Refresh your bookshelf today.
              </p>
              <button 
                onClick={() => onTabChange('store')}
                className="mt-3 bg-[#1b1b1b] text-white hover:bg-[#2c2c2c] font-sans font-black text-[10px] px-5 py-2.5 rounded-xl transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                Shop Now
              </button>
            </div>

            {/* Book representation thumbnail */}
            <div className="relative w-28 h-36 flex items-center justify-center shrink-0 select-none">
              <div className="w-18 h-26 bg-[#015545] rounded-r-md border-l-2 border-black/30 shadow-2xl flex flex-col justify-between p-2.5 text-white transform hover:-rotate-3 transition-transform">
                <span className="text-[5px] text-brand-gold font-mono tracking-widest font-bold">TOP READ</span>
                <span className="text-[8px] font-serif font-black leading-tight text-white mt-auto">THE GOLDEN HOURS</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Top Selling Vendor Section (Recreating screenshot vendor segment with gorgeous graphics) */}
      <section className="px-4 py-2">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200/60 pb-3">
          <div className="text-left">
            <span className="text-brand-secondary font-mono text-[10px] uppercase font-bold tracking-widest">Handpicked Wholesalers</span>
            <h2 className="font-serif font-black text-2xl text-brand-primary tracking-tight mt-0.5">Top Selling Vendors</h2>
          </div>
          <button 
            onClick={() => onTabChange('store')}
            className="bg-brand-secondary hover:bg-brand-secondary/95 text-white font-sans font-black text-[10px] px-4 py-2 rounded-xl flex items-center gap-1 shadow-sm active:scale-95 transition-all uppercase tracking-wider cursor-pointer"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
          </button>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vendors.map((ven) => (
            <div
              key={ven.name}
              onClick={() => onSelectCategory('All')}
              className="bg-white border border-gray-200/80 rounded-[24px] p-4 flex flex-col text-left shadow-sm hover:border-brand-secondary/40 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
              id={`vendor-card-${ven.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Overlapping stack of books representing their products (exactly like screenshot cover grids) */}
              <div className="w-full h-24 bg-[#faf8f5] rounded-2xl flex items-center justify-center p-3 mb-4 relative overflow-hidden border border-gray-100">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
                
                {/* Book cover rows layered over each other */}
                <div className="flex gap-1.5 items-end justify-center h-full select-none">
                  {ven.bookCovers.map((bc, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: bc.bg }}
                      className={`w-10 h-16 rounded-r-xs border-l border-black/20 shadow-md flex flex-col justify-between p-1 text-white text-[5px] font-mono transform ${
                        idx === 0 ? '-rotate-12 translate-x-2' : idx === 2 ? 'rotate-12 -translate-x-2' : 'z-10 scale-105'
                      } transition-transform group-hover:rotate-0`}
                    >
                      <span className="text-[3px] opacity-75 font-black uppercase">ZEN</span>
                      <span className="font-serif font-bold line-clamp-2 leading-none">{bc.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendor Metadata Details */}
              <div className="flex items-center gap-2.5 mt-1">
                {/* Vendor Avatar circle */}
                <div className={`w-9 h-9 rounded-xl ${ven.avatarBg} text-white font-sans font-black flex items-center justify-center shadow-inner shrink-0`}>
                  {ven.initials}
                </div>
                
                <div className="flex flex-col text-left">
                  <h4 className="font-sans font-black text-xs text-[#1b1b1b] group-hover:text-brand-secondary transition-colors leading-tight">
                    {ven.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-bold leading-none mt-0.5">
                    ({ven.productsCount} Products)
                  </span>
                </div>
              </div>

              {/* Rating stars and tiny badge */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                <div className="flex items-center gap-0.5 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < ven.rating ? 'fill-current text-brand-gold' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-brand-primary font-bold font-mono uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestselling Books (Vibrant styled catalog covers) */}
      <section className="py-2">
        <div className="px-4 flex justify-between items-center mb-6 border-b border-gray-200/60 pb-3">
          <div className="text-left">
            <span className="text-brand-secondary font-mono text-[10px] uppercase font-bold tracking-widest">Trending Literature</span>
            <h2 className="font-serif font-black text-2xl text-brand-primary tracking-tight mt-0.5">Bestselling Publications</h2>
          </div>
          <button 
            onClick={() => onTabChange('store')}
            className="text-brand-secondary hover:underline font-sans font-black text-xs cursor-pointer tracking-wider uppercase"
          >
            View Entire Library
          </button>
        </div>
        
        {/* Horizontal Scroll Area */}
        <div className="flex overflow-x-auto hide-scrollbar gap-5 px-4 pb-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="min-w-[170px] md:min-w-[200px] flex flex-col gap-3.5 group cursor-pointer"
              id={`bestseller-book-${book.id}`}
            >
              {/* Cover Wrapper with 3D effect */}
              <div className="relative w-full aspect-[3/4] bg-white rounded-r-lg shadow-md border-l-4 border-black/20 overflow-hidden book-cover-3d">
                {book.coverImage === 'urban-solitude' ? (
                  <div className="w-full h-full bg-[#7a2e2e]/95 flex flex-col justify-between p-4 text-[#fffaee] select-none relative">
                    <div className="absolute top-10 right-0 left-0 h-10 flex flex-col gap-1 overflow-hidden pointer-events-none opacity-10">
                      <div className="h-1.5 w-full bg-white transform -skew-y-12" />
                      <div className="h-1.5 w-full bg-white transform -skew-y-12" />
                    </div>
                    <div className="border-b border-[#fffaee]/15 pb-1 z-10">
                      <span className="text-[7px] text-amber-200 tracking-widest font-black font-mono">ZENJAURA</span>
                    </div>
                    <div className="my-auto z-10 text-left">
                      <h4 className="text-[13px] font-serif font-black tracking-tight leading-snug text-white uppercase">{book.title}</h4>
                      <p className="text-[7px] text-amber-100/60 mt-1 uppercase">A Modernist Exploration</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-[#fffaee]/15 pt-1.5 z-10">
                      <span className="text-[6px] text-amber-100/50 uppercase">Urban Series</span>
                      <span className="text-[7px] text-amber-200">2026</span>
                    </div>
                  </div>
                ) : book.coverImage === 'metro-pulse' ? (
                  <div className="w-full h-full bg-[#2a3a5a] flex flex-col justify-between p-4.5 text-[#fffaee] select-none relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <span className="text-9xl font-black text-white">104</span>
                    </div>
                    <div className="flex justify-between items-start border-b border-[#fffaee]/15 pb-1.5 z-10">
                      <span className="text-[6px] text-gray-300">0.14-8</span>
                      <span className="text-[6px] text-amber-200 font-bold">LIVE</span>
                    </div>
                    <div className="my-auto z-10 text-left">
                      <span className="text-[32px] font-black text-white block leading-none tracking-tighter">1 · 04</span>
                      <span className="text-[7px] font-bold text-gray-300 block mt-1 tracking-widest uppercase">BESPOKE PRESENCE</span>
                      <h4 className="text-[13px] font-serif font-black tracking-tight leading-snug text-amber-200 mt-1.5 uppercase">{book.title}</h4>
                    </div>
                    <div className="text-[6px] text-gray-400 leading-tight border-t border-[#fffaee]/15 pt-1.5 z-10">
                      CHENG PRESENTS • NEW JOURNAL
                    </div>
                  </div>
                ) : book.coverImage === 'neon-rhymes' ? (
                  <div className="w-full h-full bg-[#224433] flex flex-col justify-between p-4 text-[#fffaee] select-none relative">
                    <div className="absolute right-4 top-4 w-2 h-2 bg-amber-200 rounded-full animate-pulse" />
                    <div className="border-b border-[#fffaee]/15 pb-1">
                      <span className="text-[7px] text-amber-200 tracking-widest uppercase font-bold">Zenjaura Press</span>
                    </div>
                    <div className="my-auto text-left">
                      <h4 className="text-[13px] font-serif font-black tracking-tight leading-snug text-white italic uppercase">#{book.title}</h4>
                      <div className="w-6 h-0.5 bg-amber-200 mt-1.5" />
                    </div>
                    <div className="flex justify-between items-end text-[6px] text-gray-300">
                      <span>STERLING M.</span>
                      <span>VOL. I</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary to-emerald-950 flex flex-col justify-between p-4 text-white">
                    <span className="text-[7px] uppercase font-bold text-brand-gold">Z-Exclusive</span>
                    <h4 className="text-[13px] font-serif font-black leading-tight mt-auto text-left uppercase">{book.title}</h4>
                    <span className="text-[8px] text-gray-300 text-left">{book.author}</span>
                  </div>
                )}

                {/* Floating Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(book, 'book');
                  }}
                  className="absolute bottom-3 right-3 bg-brand-secondary text-white hover:bg-brand-secondary/90 px-3 py-1.5 rounded-xl shadow-md font-sans font-black text-[10px] flex items-center gap-1 active:scale-90 transition-all cursor-pointer z-20 border border-white/15"
                  aria-label={`Add ${book.title} to cart`}
                  id={`add-btn-book-${book.id}`}
                >
                  Add +
                </button>
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left">
                <h3 className="font-black text-[13px] text-[#1b1b1b] line-clamp-1 group-hover:text-brand-secondary transition-colors tracking-tight">
                  {book.title}
                </h3>
                <span className="text-[10px] text-gray-400 font-bold leading-none mt-0.5">{book.author}</span>
                <span className="font-sans font-black text-xs text-brand-secondary mt-1.5">${book.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Release Editorial Banner */}
      <section className="px-4 py-2">
        <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-sm">
          {/* Cover Art Container */}
          <div className="w-full md:w-5/12 aspect-[4/5] md:aspect-auto md:min-h-[250px] bg-[#faf8f5] flex items-center justify-center p-6 relative border-r border-gray-100">
            {/* The elegant Grid Protocol Notebook Cover Mockup */}
            <div className="relative w-34 h-48 bg-white rounded-r-md shadow-xl border-l-4 border-black/25 flex flex-col justify-between p-4.5 transform transition-transform hover:scale-105 select-none text-[#1b1b1b]">
              {/* Outer bookmark strap */}
              <div className="absolute right-6 top-0 bottom-0 w-3 bg-[#015545] opacity-90 shadow-sm pointer-events-none border-l border-r border-black/10" />
              
              <div className="border-b border-gray-100 pb-1.5 z-10">
                <span className="text-[6px] text-gray-400 font-bold block leading-none uppercase">UPCOMING • VOL 14</span>
              </div>
              <div className="my-auto z-10 text-left">
                <span className="text-[14px] font-serif font-black tracking-tight leading-none text-black block uppercase">THE GRID</span>
                <span className="text-[14px] font-serif font-black tracking-tight leading-none text-black block uppercase">PROTOCOL</span>
                <span className="text-[7px] text-brand-secondary font-black block mt-1 tracking-wide uppercase">ZENJAURA EDITORIAL</span>
              </div>
              <span className="text-[5px] text-gray-400 font-medium self-end z-10 uppercase">MANUFACTURING PRESS</span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="p-8 flex flex-col justify-center text-left gap-4 md:w-7/12">
            <span className="bg-brand-primary/10 text-brand-primary font-sans font-black px-3.5 py-1.5 rounded-full text-[10px] w-fit tracking-wide border border-brand-primary/20">
              Upcoming Release
            </span>
            <h3 className="font-serif font-black text-2xl md:text-3xl text-brand-primary tracking-tight">
              The Grid Protocol
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              A deep dive into the architecture of modern cities and the invisible systems that keep us moving. Coming this fall to Zenjaura. Pre-order now to secure a special leather-bound launch edition.
            </p>
            <button
              onClick={handlePreOrder}
              className="mt-1.5 w-full md:w-fit bg-brand-primary hover:bg-brand-primary/95 text-white py-3 px-6 rounded-2xl font-black text-xs shadow-md cursor-pointer transition-all hover:scale-102"
              id="preorder-btn-grid-protocol"
            >
              Pre-order Deluxe Edition
            </button>
          </div>
        </div>
      </section>

      {/* Zenjaura Radio Player & Episode List */}
      <section className="bg-white border border-gray-200 rounded-[32px] py-8 px-6 text-[#1b1b1b]">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="text-brand-secondary w-5.5 h-5.5 animate-pulse" />
              <h2 className="font-sans font-black text-lg text-brand-primary tracking-tight">Zenjaura Podcast Radio</h2>
            </div>
            <span className="text-brand-secondary font-sans font-extrabold text-xs select-none cursor-pointer hover:underline">All Episodes</span>
          </div>

          {/* Active Radio Podcast Player Bar */}
          {currentPlayingPodcast && (
            <div className="bg-[#faf8f5] border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-3.5 w-full md:w-auto">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden group border border-brand-primary/20">
                  {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-6">
                      <div className="w-1 bg-brand-primary h-3 animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '0.8s' }} />
                      <div className="w-1 bg-brand-primary h-5 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.6s' }} />
                      <div className="w-1 bg-brand-primary h-2 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '0.9s' }} />
                      <div className="w-1 bg-brand-primary h-4 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
                    </div>
                  ) : (
                    <Radio className="text-brand-primary w-6 h-6" />
                  )}
                </div>
                <div className="text-left">
                  <span className="text-brand-secondary text-[9px] uppercase font-black tracking-wider">NOW STREAMING ON AIR</span>
                  <h4 className="text-brand-primary font-sans font-black text-sm leading-tight">{currentPlayingPodcast.title}</h4>
                  <p className="text-xs text-gray-400 font-semibold">{currentPlayingPodcast.subtitle} • {currentPlayingPodcast.duration}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="flex flex-col items-end gap-1 flex-1 md:flex-none">
                  <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden relative border border-gray-200">
                    <div className={`h-full bg-brand-primary rounded-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`} />
                  </div>
                  <span className="text-[8px] text-gray-400 font-mono uppercase tracking-widest">Digital Audio Track</span>
                </div>

                {isPlaying ? (
                  <button
                    onClick={onPausePodcast}
                    className="p-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white rounded-xl transition-transform active:scale-90 shadow-sm cursor-pointer"
                    aria-label="Pause podcast"
                  >
                    <Pause className="w-4 h-4 fill-current text-white" />
                  </button>
                ) : (
                  <button
                    onClick={() => onPlayPodcast(currentPlayingPodcast)}
                    className="p-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white rounded-xl transition-transform active:scale-90 shadow-sm cursor-pointer"
                    aria-label="Play podcast"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Episode Scroll Horizontal */}
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
            {podcasts.map((episode) => {
              const isActive = currentPlayingPodcast?.id === episode.id;
              return (
                <div
                  key={episode.id}
                  onClick={() => {
                    if (isActive && isPlaying) {
                      onPausePodcast();
                    } else {
                      onPlayPodcast(episode);
                    }
                  }}
                  className={`min-w-[250px] md:min-w-[290px] bg-white rounded-2xl border ${
                    isActive ? 'border-brand-primary bg-[#015545]/5' : 'border-gray-200 hover:border-brand-primary/30'
                  } p-4 flex gap-4 items-center cursor-pointer transition-all active:scale-98`}
                  id={`podcast-card-${episode.id}`}
                >
                  <div className={`w-12 h-12 bg-[#faf8f5] border border-gray-200/80 rounded-xl flex items-center justify-center shrink-0`}>
                    {isActive && isPlaying ? (
                      <Pause className="text-brand-primary w-5 h-5 fill-current" />
                    ) : (
                      <Play className="text-brand-primary w-5 h-5 fill-current ml-0.5" />
                    )}
                  </div>
                  <div className="flex flex-col text-left gap-0.5">
                    <h4 className="text-brand-primary font-sans font-bold text-xs line-clamp-1">{episode.title}</h4>
                    <p className="text-gray-400 text-[10px] font-semibold leading-none mt-1">
                      {episode.subtitle}
                    </p>
                    <span className="text-brand-secondary text-[9px] font-black mt-2 uppercase tracking-wide">
                      Episode {episode.episodeNumber} • {episode.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your 21-Day Journey */}
      <section className="px-4 py-2">
        <div className="bg-[#faf8f5] border border-gray-200 rounded-[32px] p-6 text-left">
          <div className="flex flex-col items-start gap-1 mb-6">
            <span className="text-brand-secondary font-mono text-[10px] uppercase font-bold tracking-widest">From Draft to Bookstore</span>
            <h2 className="font-serif font-black text-xl text-brand-primary tracking-tight">Your 21-Day Micro-Publishing Journey</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-brand-primary border border-brand-primary flex items-center justify-center text-white font-sans font-black text-sm select-none shadow-sm shadow-brand-primary/20">
                  1
                </div>
                <div className="w-0.5 h-11 bg-brand-primary my-1 opacity-25" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-sans font-black text-sm text-[#1b1b1b] tracking-tight">Upload Manuscript Draft</h4>
                <p className="text-[11px] text-gray-500 font-semibold mt-1">Drag and drop your Word or PDF script. We parse layout dimensions automatically.</p>
              </div>
              <div className="self-center shrink-0">
                <CheckCircle2 className="text-brand-primary w-6 h-6 fill-current bg-white rounded-full" />
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => onTabChange('publish')}
              className="flex items-start gap-4 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center text-brand-primary font-sans font-black text-sm select-none">
                  2
                </div>
                <div className="w-0.5 h-11 bg-gray-200 my-1" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-sans font-black text-sm text-[#1b1b1b] tracking-tight flex items-center gap-1.5">
                  AI Cover & Metadata Refinement
                  <span className="inline-block w-2 h-2 bg-brand-secondary rounded-full animate-ping" />
                </h4>
                <p className="text-[11px] text-gray-500 font-semibold mt-1">Our smart generator crafts visual jacket mockups, page guidelines, and back blurbs instantly.</p>
              </div>
              <div className="self-center shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-brand-primary animate-pulse flex items-center justify-center bg-white">
                  <div className="w-2.5 h-2.5 bg-brand-primary rounded-full" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 opacity-55">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 font-sans font-black text-sm select-none">
                  3
                </div>
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-sans font-bold text-sm text-gray-400 tracking-tight">Local Hyper-Bound Distribution</h4>
                <p className="text-[11px] text-gray-400 font-semibold mt-1">Automatic placement in regional micro-printing networks and 50+ global partner lists.</p>
              </div>
              <div className="self-center shrink-0">
                <div className="w-6 h-6 rounded-full border border-gray-200 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Success Stories */}
      <section className="px-4 py-2">
        <div className="flex flex-col items-center gap-1 mb-6 text-center">
          <span className="text-brand-secondary font-mono text-[10px] uppercase font-bold tracking-widest">Testimonials</span>
          <h2 className="font-serif font-black text-2xl text-brand-primary tracking-tight">Independent Author Success</h2>
          <div className="w-12 h-1 bg-brand-gold rounded-full mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          
          {/* Anita Rose testimonial */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex gap-4 shadow-sm hover:border-brand-secondary/30 hover:shadow-md transition-all">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-primary/20 bg-gray-50 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Anita Rose portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center gap-1.5 text-left">
              <p className="text-xs italic text-gray-500 font-semibold leading-relaxed">
                "Zenjaura turned my manuscript into a physical printed book in days. Orders are automatically handled by local micro-hubs flawlessly!"
              </p>
              <span className="text-[11px] font-sans font-black text-[#1b1b1b]">
                — Anita Rose, Author of <span className="italic text-brand-secondary">'Urban Solitude'</span>
              </span>
            </div>
          </div>

          {/* David Lin testimonial */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex gap-4 shadow-sm hover:border-brand-secondary/30 hover:shadow-md transition-all">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-primary/20 bg-gray-50 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="David Lin portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center gap-1.5 text-left">
              <p className="text-xs italic text-gray-500 font-semibold leading-relaxed">
                "The ultimate print and delivery mechanism for modern independent creators. Beautiful typesetting and outstanding paper density."
              </p>
              <span className="text-[11px] font-sans font-black text-[#1b1b1b]">
                — David Lin, Founder of <span className="italic text-brand-secondary">Metro Pulse Mag</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Merch Section Store Preview */}
      <section className="px-4 py-2">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200/60 pb-3">
          <div className="text-left">
            <span className="text-brand-secondary font-mono text-[10px] uppercase font-bold tracking-widest">Official Memorabilia</span>
            <h2 className="font-serif font-black text-2xl text-brand-primary tracking-tight mt-0.5">Zenjaura Creator Merch</h2>
          </div>
          <button 
            onClick={() => onSelectCategory('Merchandise')}
            className="text-brand-secondary hover:underline font-sans font-black text-xs cursor-pointer tracking-wider uppercase"
          >
            Shop Entire Merch Store
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {merch.map((item) => (
            <div
              key={item.id}
              onClick={() => onAddToCart(item, 'merch')}
              className="flex flex-col gap-2 cursor-pointer group hover:scale-102 active:scale-98 transition-all"
              id={`merch-card-${item.id}`}
            >
              <div className="w-full aspect-square bg-[#faf8f5] rounded-3xl flex flex-col items-center justify-center p-6 relative border border-gray-200/80 shadow-sm group-hover:border-brand-secondary/40">
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
                  {item.iconName === 'book_5' && <Book className="w-8 h-8" />}
                  {item.iconName === 'bookmarks' && <Bookmark className="w-8 h-8" />}
                  {item.iconName === 'ink_pen' && <PenTool className="w-8 h-8" />}
                  {item.iconName === 'shopping_bag' && <ShoppingCart className="w-8 h-8" />}
                </div>

                {/* Inline Hover Shopping Bag Overlay */}
                <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity flex items-center justify-center">
                  <span className="bg-brand-secondary text-white text-[10px] font-sans font-black px-4 py-2 rounded-xl shadow-md">
                    Add to Cart
                  </span>
                </div>
              </div>

              {/* Title & Price */}
              <div className="flex flex-col items-center mt-1">
                <span className="font-sans font-black text-xs text-[#1b1b1b] text-center line-clamp-1 group-hover:text-brand-secondary">{item.name}</span>
                <span className="font-sans font-black text-xs text-brand-secondary mt-0.5">${item.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Campaign Banner (Copied from reference bottom banner: "Only $5.99 a month") */}
      <section className="px-4 py-2">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-brand-primary via-[#046a57] to-[#015545] p-6 md:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-emerald-950">
          <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern" />
          
          <div className="text-left z-10">
            <span className="text-brand-gold font-mono text-[9px] uppercase font-black tracking-widest block">OUR BIGGEST SALE EDITION</span>
            <h3 className="font-serif font-black text-2xl md:text-3xl text-white tracking-tight mt-1">
              Unlimited Books: Only $5.99 a month
            </h3>
            <p className="text-xs text-emerald-100/80 font-medium mt-1">Get immediate local printing rights and unrestricted digital downloads.</p>
          </div>

          <button
            onClick={() => onTabChange('store')}
            className="bg-brand-secondary hover:bg-brand-secondary/90 text-white font-sans font-black text-xs px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer z-10 shrink-0 border border-white/10"
          >
            Subscribe Now
          </button>
        </div>
      </section>

      {/* Categories Format Info Modal */}
      {selectedFormat && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-[32px] max-w-md w-full p-6 text-left shadow-2xl text-[#1b1b1b]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-[#faf8f5] border border-gray-200 text-brand-primary rounded-xl">
                  <selectedFormat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-black text-sm text-brand-primary">
                  {selectedFormat.name} Guide
                </h3>
              </div>
              <button 
                onClick={() => setSelectedFormat(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="mt-4 flex flex-col gap-3">
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                {selectedFormat.desc}
              </p>
              <div className="flex justify-between items-center bg-[#faf8f5] p-3 rounded-xl border border-gray-150 text-xs font-sans font-semibold">
                <span className="text-gray-400">Production speed:</span>
                <span className="text-brand-secondary font-black">{selectedFormat.time}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSelectedFormat(null);
                  onTabChange('publish');
                }}
                className="flex-1 bg-brand-primary hover:bg-brand-primary/95 text-white py-2.5 rounded-xl text-xs font-black shadow-sm cursor-pointer"
              >
                Publish Now
              </button>
              <button
                onClick={() => {
                  setSelectedFormat(null);
                  onSelectCategory(selectedFormat.name);
                }}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-xs font-black cursor-pointer"
              >
                View Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
