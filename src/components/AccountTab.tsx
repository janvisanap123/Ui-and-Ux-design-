import React from 'react';
import { 
  User, Book, Award, Clock, MapPin, ListOrdered, Award as Badge, 
  Flame, ArrowUpRight, HelpCircle, Sparkles, BookOpen, Check
} from 'lucide-react';
import { Manuscript } from '../types';

interface AccountTabProps {
  manuscripts: Manuscript[];
  orders: { id: string; date: string; items: string; total: number; address: string }[];
}

export default function AccountTab({ manuscripts, orders }: AccountTabProps) {
  return (
    <div className="flex flex-col gap-6 text-left max-w-4xl mx-auto">
      
      {/* Profile Overview Card */}
      <section className="bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col sm:flex-row gap-5 items-center shadow-sm">
        <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden bg-[#faf8f5] flex items-center justify-center relative shrink-0">
          <User className="w-9 h-9 text-brand-primary" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <span className="text-[10px] text-brand-secondary font-mono font-black tracking-widest uppercase">Verified Author</span>
          <h2 className="font-serif font-black text-xl text-brand-primary mt-0.5">Independent Creator</h2>
          <p className="text-xs text-gray-500 mt-1 font-semibold">Joined Zenjaura Publishing House • June 2026</p>
          
          <div className="flex flex-wrap gap-2.5 mt-3 justify-center sm:justify-start">
            <span className="bg-brand-primary text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Badge className="w-3.5 h-3.5 text-white" />
              Rising Star
            </span>
            <span className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-black px-3 py-1 rounded-full border border-brand-secondary/10 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-brand-secondary fill-current" />
              1st Publication Run
            </span>
          </div>
        </div>

        {/* Stats Column */}
        <div className="grid grid-cols-2 gap-3 sm:border-l sm:border-gray-200 sm:pl-6 w-full sm:w-auto text-center font-sans">
          <div className="flex flex-col bg-[#faf8f5] p-3 rounded-xl border border-gray-150 min-w-[100px]">
            <span className="text-lg font-black text-[#1b1b1b]">{manuscripts.length}</span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Publications</span>
          </div>
          <div className="flex flex-col bg-[#faf8f5] p-3 rounded-xl border border-gray-150 min-w-[100px]">
            <span className="text-lg font-black text-[#1b1b1b]">{orders.length}</span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Orders</span>
          </div>
        </div>
      </section>

      {/* Manuscripts & Publishing Progression Tracks */}
      <section className="flex flex-col gap-4">
        <h3 className="font-sans font-black text-base text-brand-primary flex items-center gap-1.5 border-b border-gray-100 pb-2">
          <BookOpen className="w-5 h-5 text-brand-secondary" />
          Active Publication Runs
        </h3>

        {manuscripts.length === 0 ? (
          <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-2 text-[#1b1b1b]">
            <Book className="w-10 h-10 text-gray-300" />
            <h4 className="font-bold text-sm text-[#1b1b1b]">No Active Publications</h4>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-semibold">
              You haven't initiated a micro-publishing run yet. Head over to the **Publish** tab to upload your draft and design with AI.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {manuscripts.map((man) => (
              <div 
                key={man.id}
                className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row gap-5 items-center"
                id={`publication-row-${man.id}`}
              >
                
                {/* Embedded Design Details / Cover rendering */}
                {man.aiSuggestion ? (
                  <div 
                    style={{ backgroundColor: man.aiSuggestion.coverColor }}
                    className="w-24 h-34 rounded-r-md shadow-lg shrink-0 flex flex-col justify-between p-2.5 text-white border-l-2 border-black/20 select-none relative overflow-hidden"
                  >
                    <span style={{ color: man.aiSuggestion.textColor }} className="text-[4px] tracking-widest font-mono font-black uppercase">ZENJAURA</span>
                    <h5 
                      style={{ color: man.aiSuggestion.textColor, fontFamily: 'monospace' }}
                      className="text-[8px] font-mono font-black tracking-tight leading-none uppercase"
                    >
                      {man.title}
                    </h5>
                    <span style={{ color: man.aiSuggestion.textColor }} className="text-[4px] font-mono leading-none self-end">
                      {man.authorName}
                    </span>
                  </div>
                ) : (
                  <div className="w-24 h-34 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-brand-primary/20">
                    <Book className="w-8 h-8 text-brand-primary" />
                  </div>
                )}

                {/* Tracking metadata and timeline */}
                <div className="flex-1 w-full text-left flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-serif font-black text-sm text-brand-primary leading-tight">{man.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5">Uploaded on {man.uploadedAt} • Format: {man.genre}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-100">
                      Processing Step 2
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray-500">21-Day Progress Tracker:</span>
                      <span className="text-brand-secondary font-black">{man.progress}% Complete</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-[#faf8f5] rounded-full overflow-hidden relative border border-gray-150">
                      <div 
                        style={{ width: `${man.progress}%` }}
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-gold rounded-full"
                      />
                    </div>
                  </div>

                  {/* Progressive Horizontal Step Indicators */}
                  <div className="grid grid-cols-3 gap-2 text-[9px] font-black text-gray-400 mt-2 text-center md:text-left border-t border-gray-50 pt-2">
                    <div className="flex items-center gap-1 text-brand-primary">
                      <span className="w-3.5 h-3.5 bg-brand-primary rounded-full text-white font-mono flex items-center justify-center text-[8px]">✓</span>
                      <span>Manuscript</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-primary">
                      <span className="w-3.5 h-3.5 bg-brand-gold/20 border border-brand-primary rounded-full text-brand-primary font-mono flex items-center justify-center text-[8px]">2</span>
                      <span>Layout Design</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3.5 h-3.5 bg-gray-100 border border-gray-300 rounded-full text-gray-500 font-mono flex items-center justify-center text-[8px]">3</span>
                      <span>Distribution</span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Order History */}
      <section className="flex flex-col gap-4">
        <h3 className="font-sans font-black text-base text-brand-primary flex items-center gap-1.5 border-b border-gray-150 pb-2">
          <ListOrdered className="w-5 h-5 text-brand-secondary" />
          Order History
        </h3>

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-2 text-[#1b1b1b]">
            <Clock className="w-10 h-10 text-gray-300" />
            <h4 className="font-bold text-sm text-[#1b1b1b]">No Previous Orders</h4>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-semibold">
              You haven't ordered any books or merchandise yet. Add items in the **Store** tab to place an order.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((ord) => (
              <div 
                key={ord.id}
                className="bg-white border border-gray-200 rounded-[20px] p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
                id={`order-row-${ord.id}`}
              >
                <div className="text-left flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs text-brand-primary">{ord.id}</span>
                    <span className="bg-emerald-50 text-emerald-800 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-emerald-100">
                      DELIVERED
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Ordered {ord.date}</p>
                  <p className="text-xs text-gray-600 font-bold mt-1.5 leading-snug">
                    <strong className="text-brand-primary">Items:</strong> {ord.items}
                  </p>
                  <p className="text-[9px] text-brand-secondary font-black font-mono mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Delivery Location: {ord.address}
                  </p>
                </div>
                <div className="self-end sm:self-center">
                  <span className="font-sans font-black text-brand-secondary text-sm">
                    ${ord.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
