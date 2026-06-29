import React, { useState } from 'react';
import { 
  Search, BookOpen, Star, Filter, ArrowUpDown, ChevronRight, 
  Trash2, ShoppingBag, X, Check, ShoppingCart, HelpCircle, 
  Book as BookIcon, Award, Heart, Bookmark, PenTool, Flame, Sparkles
} from 'lucide-react';
import { Book, MerchItem, CartItem } from '../types';

interface StoreTabProps {
  books: Book[];
  merch: MerchItem[];
  cart: CartItem[];
  onAddToCart: (item: Book | MerchItem, type: 'book' | 'merch') => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  isCartOpen: boolean;
  onCloseCart: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function StoreTab({
  books,
  merch,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  isCartOpen,
  onCloseCart,
  selectedCategory,
  onSelectCategory,
}: StoreTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'default'>('default');
  
  // Selected item modal details state
  const [detailItem, setDetailItem] = useState<{ item: Book | MerchItem; type: 'book' | 'merch' } | null>(null);
  
  // Checkout flow states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');

  const categories = [
    'All',
    'Hardcover',
    'Paperback',
    'Magazines',
    'Journals',
    'Poetry',
    'Artbooks',
    'Merchandise'
  ];

  // Merge items based on active category
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.genre.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory && selectedCategory !== 'Merchandise';
  });

  const filteredMerch = merch.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'Merchandise';
    return matchesSearch && matchesCategory;
  });

  // Combined searchable listings
  let allListings: ({ item: Book | MerchItem; type: 'book' | 'merch'; name: string; price: number })[] = [];
  
  if (selectedCategory !== 'Merchandise') {
    filteredBooks.forEach(b => {
      allListings.push({ item: b, type: 'book', name: b.title, price: b.price });
    });
  }
  
  if (selectedCategory === 'All' || selectedCategory === 'Merchandise') {
    filteredMerch.forEach(m => {
      allListings.push({ item: m, type: 'merch', name: m.name, price: m.price });
    });
  }

  // Sorting logic
  if (sortBy === 'price-asc') {
    allListings.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    allListings.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    allListings.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Cart financial summaries
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal > 0 ? 2.00 : 0; // Flat $2 quick commerce local fee
  const estTax = cartSubtotal * 0.08; // 8% local sales tax
  const cartTotal = cartSubtotal + deliveryFee + estTax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutAddress) return;
    setCheckoutStep('success');
  };

  const handleCompleteOrder = () => {
    onClearCart();
    setCheckoutStep('details');
    setIsCheckingOut(false);
    onCloseCart();
  };

  return (
    <div className="flex flex-col gap-6 text-left text-[#1b1b1b] max-w-4xl mx-auto">
      
      {/* Search and Sorting Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Store Search with Brand Color outline */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            className="w-full h-11 bg-white border border-gray-200 rounded-xl pl-11 pr-4 text-xs text-gray-850 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/15 focus:border-brand-primary transition-all"
            placeholder="Search catalog, bestsellers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
        </div>

        {/* Sort drop options */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <span className="font-sans font-bold text-[11px] tracking-wide text-gray-600">Sort By:</span>
          <select
            className="h-9 border border-gray-200 rounded-xl px-2 py-0 text-xs bg-white text-gray-800 focus:outline-none focus:border-brand-primary cursor-pointer"
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
          >
            <option value="default">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Category Horizontal Scrolling Filters */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2.5 pb-2 border-b border-gray-100">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-4.5 py-2 rounded-xl text-xs font-sans font-extrabold tracking-wide transition-all cursor-pointer border ${
              selectedCategory === cat 
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm shadow-brand-primary/10' 
                : 'bg-white text-gray-500 border-gray-200 hover:text-brand-secondary hover:border-brand-secondary/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Store Items with 3D Effect */}
      {allListings.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-2.5 justify-center bg-white border border-gray-200 rounded-3xl">
          <ShoppingBag className="w-14 h-14 text-brand-primary/20 animate-bounce" style={{ animationDuration: '4s' }} />
          <h3 className="font-black text-sm text-brand-primary">No Products Found</h3>
          <p className="text-xs text-gray-400 font-medium">Try checking your spelling or selecting another filter category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {allListings.map(({ item, type, name }) => (
            <div
              key={item.id}
              className="flex flex-col bg-white border border-gray-200/80 rounded-[24px] p-4 shadow-sm hover:border-brand-secondary/40 hover:shadow-md transition-all cursor-pointer relative group"
              onClick={() => setDetailItem({ item, type })}
              id={`store-item-${item.id}`}
            >
              {/* Card visual rendering with 3D Book Cover Cover classes */}
              {type === 'book' ? (
                <div className="relative w-full aspect-[3/4] bg-[#faf8f5] rounded-r-lg border-l-4 border-black/25 shadow-md overflow-hidden mb-4 select-none book-cover-3d">
                  {/* Visual structures matching category hues */}
                  {(item as Book).coverImage === 'urban-solitude' || item.id === 'book-1' ? (
                    <div className="w-full h-full bg-[#7a2e2e]/95 flex flex-col justify-between p-3 text-[#fffaee] relative">
                      <div className="absolute top-6 right-0 left-0 h-8 flex flex-col gap-1 overflow-hidden pointer-events-none opacity-20">
                        <div className="h-1.5 w-full bg-white transform -skew-y-12" />
                        <div className="h-1.5 w-full bg-white transform -skew-y-12" />
                      </div>
                      <span className="text-[6px] text-amber-200 tracking-widest font-mono font-black leading-none">ZENJAURA</span>
                      <h4 className="text-[11px] font-serif font-black leading-tight mt-auto uppercase">{name}</h4>
                    </div>
                  ) : (item as Book).coverImage === 'metro-pulse' || item.id === 'book-2' ? (
                    <div className="w-full h-full bg-[#2a3a5a] flex flex-col justify-between p-3 text-[#fffaee] relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-7xl font-extrabold text-white">14</div>
                      <span className="text-[6px] text-gray-300 font-mono font-black">CODE CH-14</span>
                      <h4 className="text-[11px] font-serif font-black leading-tight text-amber-200 mt-auto uppercase">{name}</h4>
                    </div>
                  ) : (item as Book).coverImage === 'neon-rhymes' || item.id === 'book-3' ? (
                    <div className="w-full h-full bg-[#224433] flex flex-col justify-between p-3 text-[#fffaee] relative">
                      <span className="text-[6px] text-amber-200 uppercase font-black tracking-widest font-mono">Sterling</span>
                      <h4 className="text-[11px] font-serif font-black leading-tight text-white italic mt-auto uppercase">{name}</h4>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#015545]/90 to-[#015545] flex flex-col justify-between p-3 text-white">
                      <span className="text-[6px] text-brand-gold uppercase font-mono font-black">Bestseller</span>
                      <h4 className="text-[11px] font-serif font-black leading-tight mt-auto uppercase">{name}</h4>
                    </div>
                  )}

                  {/* Red/Coral Discount banner for visual attraction */}
                  <span className="absolute top-2 right-2 bg-brand-secondary text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    Sale
                  </span>
                </div>
              ) : (
                /* Merchandise Graphic */
                <div className="w-full aspect-square bg-[#faf8f5] rounded-2xl flex items-center justify-center p-6 mb-4 border border-gray-100 relative overflow-hidden group-hover:border-brand-secondary/20">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
                  <div className="w-14 h-14 bg-white border border-gray-150 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm z-10">
                    {(item as MerchItem).iconName === 'book_5' && <BookIcon className="w-7 h-7" />}
                    {(item as MerchItem).iconName === 'bookmarks' && <Bookmark className="w-7 h-7" />}
                    {(item as MerchItem).iconName === 'ink_pen' && <PenTool className="w-7 h-7" />}
                    {(item as MerchItem).iconName === 'shopping_bag' && <ShoppingCart className="w-7 h-7" />}
                  </div>
                </div>
              )}

              {/* Title Info */}
              <div className="flex flex-col text-left gap-0.5 mt-auto">
                <h3 className="font-sans font-black text-[13px] text-[#1b1b1b] line-clamp-2 leading-snug group-hover:text-brand-secondary transition-colors">
                  {name}
                </h3>
                {type === 'book' && (
                  <span className="text-[10px] text-gray-400 font-bold leading-none mt-0.5">
                    {(item as Book).author}
                  </span>
                )}
                {type === 'merch' && (
                  <span className="text-[10px] text-brand-secondary font-black tracking-wide">
                    Official Memorabilia
                  </span>
                )}
                
                {/* Price and Cart Action */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
                  <span className="font-sans font-black text-brand-secondary text-xs">
                    ${item.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item, type);
                    }}
                    className="p-1.5 bg-brand-primary text-white hover:bg-brand-primary/95 rounded-xl shadow-md transition-transform active:scale-90 cursor-pointer"
                    aria-label={`Add ${name} to cart`}
                    id={`store-add-cart-btn-${item.id}`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILED BOOK/MERCH MODAL */}
      {detailItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-[32px] max-w-lg w-full p-6 text-left shadow-2xl relative overflow-hidden text-[#1b1b1b]">
            <button 
              onClick={() => setDetailItem(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-brand-secondary font-bold text-lg p-1 z-10 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-start mt-2">
              {/* Product Representation Thumbnail */}
              <div className="w-full sm:w-1/3 aspect-[3/4] sm:aspect-auto sm:h-48 bg-[#faf8f5] rounded-r-lg border-l-4 border-black/25 shadow-md overflow-hidden flex items-center justify-center p-4 shrink-0 border border-gray-200/60">
                {detailItem.type === 'book' ? (
                  <div className="w-full h-full bg-[#7a2e2e]/95 rounded-r-xs p-3 flex flex-col justify-between text-[#fffaee] relative">
                    <span className="text-[5px] uppercase font-mono font-black text-amber-200 tracking-widest">ZENJAURA</span>
                    <h5 className="text-[10px] font-serif font-black leading-tight tracking-tight text-white mt-auto uppercase">
                      {(detailItem.item as Book).title}
                    </h5>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-white border border-gray-150 rounded-xl flex items-center justify-center text-brand-primary">
                    {(detailItem.item as MerchItem).iconName === 'book_5' && <BookIcon className="w-6 h-6" />}
                    {(detailItem.item as MerchItem).iconName === 'bookmarks' && <Bookmark className="w-6 h-6" />}
                    {(detailItem.item as MerchItem).iconName === 'ink_pen' && <PenTool className="w-6 h-6" />}
                    {(detailItem.item as MerchItem).iconName === 'shopping_bag' && <ShoppingCart className="w-6 h-6" />}
                  </div>
                )}
              </div>

              {/* Product Info details */}
              <div className="flex-1 flex flex-col text-left gap-2">
                <span className="text-[10px] text-brand-secondary font-mono font-black tracking-widest uppercase">
                  {detailItem.type === 'book' ? (detailItem.item as Book).genre : 'Official Memorabilia'}
                </span>
                <h3 className="font-serif font-black text-xl text-brand-primary leading-tight">
                  {detailItem.type === 'book' ? (detailItem.item as Book).title : (detailItem.item as MerchItem).name}
                </h3>
                {detailItem.type === 'book' && (
                  <span className="text-xs text-gray-400 font-bold">
                    By {(detailItem.item as Book).author}
                  </span>
                )}
                
                <span className="text-xl font-black text-brand-secondary mt-1">
                  ${detailItem.item.price.toFixed(2)}
                </span>

                <p className="text-xs text-gray-500 leading-relaxed mt-1 font-semibold">
                  {detailItem.type === 'book' 
                    ? (detailItem.item as Book).description 
                    : (detailItem.item as MerchItem).description
                  }
                </p>

                {detailItem.type === 'book' && (
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-[#faf8f5] p-3 rounded-xl border border-gray-150 text-[10px] font-sans">
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold">Pages</span>
                      <span className="text-[#1b1b1b] font-extrabold">{(detailItem.item as Book).pages || 240} Pages</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold">Publisher</span>
                      <span className="text-[#1b1b1b] font-extrabold">{(detailItem.item as Book).publisher || 'Zenjaura Local Press'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => {
                  onAddToCart(detailItem.item, detailItem.type);
                  setDetailItem(null);
                }}
                className="flex-1 bg-brand-primary hover:bg-brand-primary/95 text-white py-3 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                Add to Shopping Cart
              </button>
              <button
                onClick={() => setDetailItem(null)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-2xl text-xs font-black cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OUT SHOPPING CART DRAWER (iframe-compliant overlay) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-sm animate-fadeIn">
          {/* Backdrop clicking dismisses cart */}
          <div className="absolute inset-0" onClick={onCloseCart} />
          
          <div className="relative w-full max-w-md bg-white h-full border-l border-gray-200 shadow-2xl flex flex-col text-left animate-slideLeft z-10 text-[#1b1b1b]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-[#faf8f5]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brand-primary w-5.5 h-5.5" />
                <h3 className="font-sans font-black text-sm text-brand-primary">Shopping Cart</h3>
                <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  {cart.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>
              <button 
                onClick={onCloseCart}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              
              {!isCheckingOut ? (
                /* Item List */
                cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-2.5 select-none py-16">
                    <ShoppingCart className="w-14 h-14 text-brand-primary/20" />
                    <h4 className="font-black text-sm text-brand-primary">Your cart is empty</h4>
                    <p className="text-xs text-gray-400 max-w-[200px] font-semibold">Add books or merchandise from the store to start your order.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex gap-3 bg-[#faf8f5] border border-gray-200 rounded-2xl p-3 shadow-none relative text-[#1b1b1b]"
                      id={`cart-item-row-${item.id}`}
                    >
                      {/* Product display */}
                      <div className="w-14 h-18 bg-white border border-gray-150 rounded-r-md overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-sm">
                        {item.type === 'book' ? (
                          <div className="w-full h-full bg-[#7a2e2e]/95 rounded-r-xs p-1.5 flex flex-col justify-between text-white text-[8px]">
                            <span className="text-[4px] text-amber-200 font-mono font-bold leading-none">Z</span>
                            <span className="font-serif font-black uppercase tracking-tighter leading-none line-clamp-2 mt-auto">
                              {item.name}
                            </span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 text-brand-primary">
                            {item.imageOrIcon === 'book_5' && <BookIcon className="w-6 h-6" />}
                            {item.imageOrIcon === 'bookmarks' && <Bookmark className="w-6 h-6" />}
                            {item.imageOrIcon === 'ink_pen' && <PenTool className="w-6 h-6" />}
                            {item.imageOrIcon === 'shopping_bag' && <ShoppingCart className="w-6 h-6" />}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="text-left">
                          <h4 className="font-sans font-black text-xs text-[#1b1b1b] line-clamp-1 leading-tight">{item.name}</h4>
                          <span className="text-[9px] text-gray-400 font-bold">{item.authorOrDetail}</span>
                        </div>

                        {/* Qty selectors */}
                        <div className="flex items-center gap-2.5 mt-2">
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-7 bg-white">
                            <button
                              onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
                              className="px-2.5 hover:bg-gray-50 text-xs text-[#1b1b1b] font-black cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-black text-brand-primary select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
                              className="px-2.5 hover:bg-gray-50 text-xs text-[#1b1b1b] font-black cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-sans font-black text-xs text-brand-secondary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-brand-secondary p-1 cursor-pointer"
                        aria-label="Remove item"
                        id={`remove-cart-item-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )
              ) : (
                /* Checkout details / success */
                checkoutStep === 'details' ? (
                  <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4 py-2 text-left text-[#1b1b1b]">
                    <h4 className="font-sans font-black text-brand-secondary border-b border-gray-100 pb-2 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Direct Delivery Coordinates
                    </h4>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500" htmlFor="checkout-name-input">Receiver Name</label>
                      <input
                        id="checkout-name-input"
                        type="text"
                        required
                        className="h-11 border border-gray-200 rounded-xl px-3 text-xs bg-white text-[#1b1b1b] focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                        placeholder="e.g. Elias Vance"
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500" htmlFor="checkout-address-input">Delivery Address</label>
                      <input
                        id="checkout-address-input"
                        type="text"
                        required
                        className="h-11 border border-gray-200 rounded-xl px-3 text-xs bg-white text-[#1b1b1b] focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                        placeholder="123 Local Press Blvd, City Center"
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                      />
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl flex items-start gap-2.5 text-emerald-950 text-[11px] leading-relaxed mt-2">
                      <Flame className="w-4 h-4 text-brand-secondary fill-current shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <span className="font-bold block">Instant Binding Run:</span>
                        <span>Our nearest publishing house starts manufacturing and binding immediately. Arrives in 30 minutes!</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsCheckingOut(false)}
                        className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-xs font-black cursor-pointer"
                      >
                        Back to Cart
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-brand-primary hover:bg-brand-primary/95 text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer"
                      >
                        Confirm Delivery
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Success Checkout step */
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8 select-none text-[#1b1b1b]">
                    <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md animate-bounce">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-serif font-black text-lg text-brand-primary">Order Dispatched!</h4>
                      <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-semibold">
                        Thank you, <strong>{checkoutName}</strong>! Your items have entered production at our local binding hub and will arrive at <strong>{checkoutAddress}</strong> in 30 minutes.
                      </p>
                    </div>
                    <button
                      onClick={handleCompleteOrder}
                      className="mt-4 bg-brand-primary hover:bg-brand-primary/95 text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-md cursor-pointer"
                      id="order-success-close-btn"
                    >
                      Complete Order
                    </button>
                  </div>
                )
              )}

            </div>

            {/* Financial summaries footer */}
            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className="p-5 border-t border-gray-200 bg-[#faf8f5] flex flex-col gap-3 text-[#1b1b1b]">
                <div className="flex flex-col gap-1.5 text-xs text-gray-600 font-sans font-semibold">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-black text-[#1b1b1b]">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Press Delivery:</span>
                    <span className="font-black text-brand-secondary">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Sales Tax (8%):</span>
                    <span className="font-black text-[#1b1b1b]">${estTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-1.5 font-black text-sm text-brand-primary mt-0.5">
                    <span>Total Amount:</span>
                    <span className="text-brand-secondary font-black">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {!isCheckingOut && (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full h-11 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl font-black text-xs shadow-md mt-1 transition-transform active:scale-98 cursor-pointer"
                    id="checkout-initiator-btn"
                  >
                    Proceed to Delivery
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
