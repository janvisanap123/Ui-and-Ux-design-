import React, { useState } from 'react';
import { Book, MerchItem, PodcastEpisode, CartItem, Manuscript } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import PublishTab from './components/PublishTab';
import StoreTab from './components/StoreTab';
import AccountTab from './components/AccountTab';

// Static assets matching the HTML specifications
const INITIAL_BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'Urban Solitude',
    author: 'Elias Vance',
    price: 19.99,
    coverImage: 'urban-solitude',
    genre: 'Paperback',
    description: 'A striking exploration of the human condition within the dense geometry of modern cities. Capturing the isolation, triumphs, and subtle alignments of concrete environments.',
    pages: 280,
    publishedYear: '2026',
    publisher: 'Zenjaura Local Press'
  },
  {
    id: 'book-2',
    title: 'Metro Pulse',
    author: 'Sarah Chen',
    price: 14.50,
    coverImage: 'metro-pulse',
    genre: 'Magazines',
    description: 'The definitive quarterly design and culture magazine. Features extensive visual essays, architecture focus studies, and interviews with urban independent creators.',
    pages: 96,
    publishedYear: '2026',
    publisher: 'Cheng Presents'
  },
  {
    id: 'book-3',
    title: 'Neon Rhymes',
    author: 'M. Sterling',
    price: 12.00,
    coverImage: 'neon-rhymes',
    genre: 'Poetry',
    description: 'A pulsing, neon-bathed collection of urban poetry capturing city street lights, rain-swept avenues, late night diners, and industrial rhythms.',
    pages: 140,
    publishedYear: '2026',
    publisher: 'Sterling M. Publishing'
  }
];

const INITIAL_MERCH: MerchItem[] = [
  {
    id: 'merch-1',
    name: 'Premium Journal',
    price: 12.00,
    iconName: 'book_5',
    description: 'A flat-lay, hardbound notebook featuring heavy cream-laid pages and bleed-resistant lining. Ideal for brainstorming your next masterpiece.'
  },
  {
    id: 'merch-2',
    name: 'Leather Bookmark',
    price: 5.00,
    iconName: 'bookmarks',
    description: 'Full-grain vegetable-tanned leather bookmark with gold hot-stamp branding and hand-burnished edges.'
  },
  {
    id: 'merch-3',
    name: 'Zenjaura Pen',
    price: 8.00,
    iconName: 'ink_pen',
    description: 'A weighted brass rollerball pen with a matte black finish and archival waterproof black ink. Smooth and balanced.'
  },
  {
    id: 'merch-4',
    name: 'Tote Bag',
    price: 15.00,
    iconName: 'shopping_bag',
    description: 'Premium heavyweight cotton canvas tote featuring deep side pockets and double-stitched straps. Perfect for carrying books.'
  }
];

const INITIAL_PODCASTS: PodcastEpisode[] = [
  {
    id: 'podcast-1',
    title: "The Author's Edge",
    subtitle: 'Micro-Publishing Tactics',
    episodeNumber: 42,
    duration: '45 min',
    colorClass: 'bg-[#ffe08f]',
    iconName: 'play_circle'
  },
  {
    id: 'podcast-2',
    title: 'Publishing Weekly',
    subtitle: 'Indie Market Alignment',
    episodeNumber: 10,
    duration: '32 min',
    colorClass: 'bg-[#ffb3b1]',
    iconName: 'mic'
  },
  {
    id: 'podcast-3',
    title: 'Zenjaura Spotlight',
    subtitle: 'Anita Rose Exclusive',
    episodeNumber: 88,
    duration: '20 min',
    colorClass: 'bg-[#aeecff]',
    iconName: 'volume_up'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'publish' | 'store' | 'account'>('home');
  const [tabHistory, setTabHistory] = useState<('home' | 'publish' | 'store' | 'account')[]>(['home']);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Manuscripts uploaded during session
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  
  // Orders placed during session
  const [orders, setOrders] = useState<{ id: string; date: string; items: string; total: number; address: string }[]>([
    {
      id: 'ORD-9410',
      date: 'Jun 24, 2026',
      items: '1x Urban Solitude',
      total: 23.59,
      address: 'Anita Rose, Author Residence'
    }
  ]);

  // Radio Audio playback states
  const [currentPlayingPodcast, setCurrentPlayingPodcast] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTabChange = (tab: 'home' | 'publish' | 'store' | 'account') => {
    setActiveTab(tab);
    setTabHistory((prev) => {
      if (prev[prev.length - 1] === tab) return prev;
      return [...prev, tab];
    });
  };

  // Cart operations
  const handleAddToCart = (item: Book | MerchItem, type: 'book' | 'merch') => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.id === item.id);
      if (existing) {
        return prevCart.map((ci) => 
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      
      const name = type === 'book' ? (item as Book).title : (item as MerchItem).name;
      const authorOrDetail = type === 'book' ? (item as Book).author : 'Official Merch';
      const imageOrIcon = type === 'book' ? (item as Book).coverImage : (item as MerchItem).iconName;
      
      return [
        ...prevCart,
        {
          id: item.id,
          type,
          name,
          price: item.price,
          quantity: 1,
          imageOrIcon,
          authorOrDetail
        }
      ];
    });

    // Slides the cart drawer open automatically for speed shopping experience
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    // When clearing cart during simulated checkout, append to order history
    if (cart.length > 0) {
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const itemsString = cart.map(i => `${i.quantity}x ${i.name}`).join(', ');
      const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax + 2.00; // sub + tax + $2 delivery
      
      const newOrder = {
        id: orderId,
        date: orderDate,
        items: itemsString,
        total,
        address: 'Independent Creator, Main Studio'
      };

      setOrders(prev => [newOrder, ...prev]);
    }
    setCart([]);
  };

  // Switch categories & routes cleanly to store
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    handleTabChange('store');
  };

  // Add new manuscript & route to account tab
  const handleAddManuscript = (manuscript: Manuscript) => {
    setManuscripts(prev => [manuscript, ...prev]);
    handleTabChange('account'); // Guide authors to see their progress immediately!
  };

  // Radio audio controls
  const handlePlayPodcast = (episode: PodcastEpisode) => {
    setCurrentPlayingPodcast(episode);
    setIsPlaying(true);
  };

  const handlePausePodcast = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-[#1b1b1b] font-sans flex flex-col antialiased selection:bg-[#ffe08f] selection:text-[#755b00]">
      {/* Universal Top Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          if (activeTab !== 'store') {
            handleTabChange('store'); // Automatically navigate to search catalog
          }
        }}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onTabChange={handleTabChange}
      />

      {/* Main Content Area */}
      <main className="pt-24 pb-24 md:pb-12 flex-1 flex flex-col px-4 max-w-4xl mx-auto w-full">
        {activeTab !== 'home' && (
          <div className="flex items-center gap-3 mb-6 text-xs font-semibold select-none animate-fadeIn">
            <button 
              onClick={() => {
                if (tabHistory.length > 1) {
                  const newHistory = [...tabHistory];
                  newHistory.pop(); // remove current tab
                  const prevTab = newHistory[newHistory.length - 1];
                  setTabHistory(newHistory);
                  setActiveTab(prevTab);
                } else {
                  handleTabChange('home');
                }
              }}
              className="flex items-center gap-1 px-3.5 py-2 bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#4e4634] rounded-lg border border-[#e5e2e1] active:scale-95 transition-all cursor-pointer shadow-sm"
              id="global-back-btn"
            >
              ← Go Back
            </button>
            <button 
              onClick={() => {
                setTabHistory(['home']);
                setActiveTab('home');
              }}
              className="flex items-center gap-1 px-3.5 py-2 bg-white hover:bg-[#f6f3f2] text-[#755b00] rounded-lg border border-[#e5e2e1] active:scale-95 transition-all cursor-pointer shadow-sm font-bold"
              id="global-home-btn"
            >
              🏠 Go Home
            </button>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="page-enter page-enter-active">
            <HomeTab
              books={INITIAL_BOOKS}
              merch={INITIAL_MERCH}
              podcasts={INITIAL_PODCASTS}
              onAddToCart={handleAddToCart}
              onTabChange={handleTabChange}
              onSelectCategory={handleSelectCategory}
              currentPlayingPodcast={currentPlayingPodcast}
              isPlaying={isPlaying}
              onPlayPodcast={handlePlayPodcast}
              onPausePodcast={handlePausePodcast}
            />
          </div>
        )}

        {activeTab === 'publish' && (
          <div className="page-enter page-enter-active">
            <PublishTab onAddManuscript={handleAddManuscript} />
          </div>
        )}

        {activeTab === 'store' && (
          <div className="page-enter page-enter-active">
            <StoreTab
              books={INITIAL_BOOKS}
              merch={INITIAL_MERCH}
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
              isCartOpen={isCartOpen}
              onCloseCart={() => setIsCartOpen(false)}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        )}

        {activeTab === 'account' && (
          <div className="page-enter page-enter-active">
            <AccountTab manuscripts={manuscripts} orders={orders} />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* Responsive Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
