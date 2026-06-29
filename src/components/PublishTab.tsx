import React, { useState, useRef } from 'react';
import { Upload, FileText, Paintbrush, Sparkles, BookOpen, Layers, CheckCircle, ArrowRight, Save, RotateCcw } from 'lucide-react';
import { Manuscript, AISuggestion } from '../types';

interface PublishTabProps {
  onAddManuscript: (manuscript: Manuscript) => void;
}

export default function PublishTab({ onAddManuscript }: PublishTabProps) {
  // Form states
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genre, setGenre] = useState('Paperback');
  const [synopsis, setSynopsis] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Design/AI status
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Customizer controls (authors can manually tweak the AI suggestions!)
  const [customCoverColor, setCustomCoverColor] = useState('');
  const [customTextColor, setCustomTextColor] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customBlurb, setCustomBlurb] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag-and-drop mechanics
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      // Autofill title if empty based on file name
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
        setTitle(cleanName.replace(/\b\w/g, c => c.toUpperCase()));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
        setTitle(cleanName.replace(/\b\w/g, c => c.toUpperCase()));
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Connects to server-side Gemini API route `/api/ai-refine`
  const handleAIAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !genre || !synopsis) {
      setError("Please fill out Title, Genre, and Synopsis before refining.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const response = await fetch('/api/ai-refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, synopsis }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI Designer endpoint.");
      }

      const data: AISuggestion = await response.json();
      setSuggestion(data);
      
      // Initialize custom overrides with AI values
      setCustomCoverColor(data.coverColor);
      setCustomTextColor(data.textColor);
      setCustomTitle(data.suggestedTitle);
      setCustomBlurb(data.blurb);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during cover refinement.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save layout and launch 21-day timeline tracking
  const handlePublishLaunch = () => {
    if (!title || !suggestion) return;

    const newManuscript: Manuscript = {
      id: `manuscript-${Date.now()}`,
      title: customTitle || suggestion.suggestedTitle || title,
      genre,
      synopsis: customBlurb || suggestion.blurb || synopsis,
      authorName: authorName || 'Independent Creator',
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'refined', // Marks as AI refined, moving onto distribution prep!
      progress: 45, // 45% represents active step 2 completion
      aiSuggestion: {
        ...suggestion,
        coverColor: customCoverColor,
        textColor: customTextColor,
        suggestedTitle: customTitle,
        blurb: customBlurb
      }
    };

    onAddManuscript(newManuscript);

    // Reset Form
    setTitle('');
    setAuthorName('');
    setSynopsis('');
    setFileName(null);
    setSuggestion(null);
    
    // Alert success in a visual container instead of window.alert (per iframe constraints)
    const successToast = document.getElementById('publish-success-banner');
    if (successToast) {
      successToast.classList.remove('hidden');
      setTimeout(() => {
        successToast.classList.add('hidden');
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left max-w-4xl mx-auto">
      
      {/* Banner Toast Success (iframe-compliant) */}
      <div 
        id="publish-success-banner" 
        className="hidden bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-fadeIn"
      >
        <div className="flex items-center gap-2.5 text-emerald-900 text-xs font-semibold">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Manuscript successfully launched! View state tracking in your **Account** page.</span>
        </div>
        <button 
          onClick={() => document.getElementById('publish-success-banner')?.classList.add('hidden')}
          className="text-emerald-700 hover:text-emerald-900 font-bold text-xs p-1"
        >
          ✕
        </button>
      </div>

      <div className="border-b border-gray-200 pb-4">
        <h2 className="font-serif font-black text-2xl text-brand-primary">Author Workbench</h2>
        <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">
          Upload your manuscript and activate the Zenjaura AI Design Engine. We instantly refine your layout, draft metadata, and generate a bespoke cover design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Side: Upload & Plot Form */}
        <form onSubmit={handleAIAnalysis} className="flex flex-col gap-4 bg-white border border-gray-200 rounded-[24px] p-5 shadow-sm">
          <h3 className="font-sans font-black text-sm text-brand-primary flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
            <FileText className="w-4 h-4 text-brand-secondary" />
            1. Book Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600" htmlFor="book-title-input">Book Title</label>
            <input
              id="book-title-input"
              type="text"
              required
              className="h-11 border border-gray-200 rounded-xl px-3 text-xs text-[#1b1b1b] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
              placeholder="e.g. Echoes in the Corridor"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600" htmlFor="author-name-input">Author Name</label>
              <input
                id="author-name-input"
                type="text"
                className="h-11 border border-gray-200 rounded-xl px-3 text-xs text-[#1b1b1b] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                placeholder="Your pen name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600" htmlFor="book-genre-select">Format & Genre</label>
              <select
                id="book-genre-select"
                className="h-11 border border-gray-200 rounded-xl px-2 text-xs text-[#1b1b1b] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary cursor-pointer"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="Hardcover">Hardcover Novel</option>
                <option value="Paperback">Paperback Fiction</option>
                <option value="Magazines">Magazine / Portfolio</option>
                <option value="Journals">Custom Journal</option>
                <option value="Poetry">Poetry Collection</option>
                <option value="Artbooks">Art Book / Catalog</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600" htmlFor="book-synopsis-textarea">Plot Synopsis or Core Idea</label>
            <textarea
              id="book-synopsis-textarea"
              required
              rows={4}
              className="border border-gray-200 rounded-xl p-3 text-xs text-[#1b1b1b] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary leading-relaxed"
              placeholder="Describe what your book is about. The AI uses this to craft a beautiful cover, chapters, and back-cover copy."
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>

          {/* Manuscript Uploader with Drag & Drop */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-600">Manuscript Draft File (Optional)</span>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-[20px] p-5 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                isDragging ? 'border-brand-secondary bg-brand-secondary/5' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />
              <Upload className={`w-8 h-8 ${isDragging ? 'text-brand-secondary' : 'text-gray-400'}`} />
              {fileName ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#1b1b1b] line-clamp-1">{fileName}</span>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-extrabold text-[#1b1b1b]">Drag & Drop your draft file here</span>
                  <span className="text-[10px] text-gray-450 font-semibold">Supports PDF, DOCX or TXT files</span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-750 text-[11px] p-3 rounded-xl border border-red-200 font-bold leading-relaxed">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-11 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-md cursor-pointer ${
              isLoading ? 'opacity-85 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Refining Cover and Layout...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white fill-current" />
                2. AI Design Refinement
              </>
            )}
          </button>
        </form>

        {/* Right Side: Visual Preview & Editor Output */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-[24px] p-5 shadow-sm min-h-[400px] flex flex-col items-center justify-center relative">
            {!suggestion && !isLoading && (
              <div className="text-center max-w-xs flex flex-col items-center gap-2.5 select-none py-10">
                <Paintbrush className="w-12 h-12 text-brand-primary/20 animate-pulse" />
                <h4 className="font-black text-sm text-brand-primary">Instant Preview</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                  Fill out your book specifics and click "AI Design Refinement". Your personalized cover mockup, chapter drafts, and styling parameters will render here.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="text-center max-w-xs flex flex-col items-center gap-3.5 select-none py-10">
                <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                <h4 className="font-black text-sm text-brand-primary">Analyzing Synopsis</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed animate-pulse font-semibold">
                  Gemini is digesting the plot themes, establishing color moods, drafting book jacket copy, and preparing typesetting layout profiles...
                </p>
              </div>
            )}

            {/* AI suggestion output cover mock + configs */}
            {suggestion && !isLoading && (
              <div className="w-full flex flex-col gap-5 animate-fadeIn text-[#1b1b1b]">
                <div className="flex justify-between items-center border-b border-gray-150 pb-2.5">
                  <span className="text-xs font-black text-brand-primary">Cover Layout Mockup</span>
                  <span className="bg-brand-primary/10 text-brand-primary text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase border border-brand-primary/20">
                    {suggestion.coverStyle}
                  </span>
                </div>

                {/* Cover rendering */}
                <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#faf8f5] p-4 rounded-2xl border border-gray-200">
                  
                  {/* The Interactive Book Mockup */}
                  <div 
                    style={{ backgroundColor: customCoverColor }}
                    className="w-36 h-52 rounded-r-md shadow-xl relative overflow-hidden flex flex-col justify-between p-4 border-l-2 border-black/20 transition-transform hover:scale-102 cursor-pointer select-none shrink-0"
                  >
                    {/* Visual Spine shadows */}
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
                    
                    <div className="border-b border-white/20 pb-1.5">
                      <span style={{ color: customTextColor }} className="text-[6px] tracking-widest font-mono font-black uppercase block leading-none opacity-80">
                        ZENJAURA MODERN
                      </span>
                    </div>

                    <div className="my-auto text-left">
                      <h4 
                        style={{ color: customTextColor, fontFamily: 'monospace' }}
                        className="text-xs font-black tracking-tight leading-tight uppercase font-mono"
                      >
                        {customTitle}
                      </h4>
                      <div style={{ backgroundColor: customTextColor }} className="w-6 h-0.5 mt-1.5 opacity-65" />
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-1.5 opacity-70">
                      <span style={{ color: customTextColor }} className="text-[5px] uppercase font-mono tracking-wider">
                        {authorName || 'INDEPENDENT AUTHOR'}
                      </span>
                      <span style={{ color: customTextColor }} className="text-[6px] font-mono font-bold leading-none">
                        2026
                      </span>
                    </div>
                  </div>

                  {/* Quick Color & Title Customizer (Overrides!) */}
                  <div className="flex-1 flex flex-col gap-3 text-xs w-full">
                    <div className="flex flex-col gap-1 text-left">
                      <span className="font-extrabold text-gray-500 text-[10px] tracking-wider uppercase">Refined Marketing Title</span>
                      <input
                        type="text"
                        className="h-9 border border-gray-200 rounded-lg px-2 text-xs bg-white text-[#1b1b1b] focus:outline-none focus:border-brand-primary"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <span className="font-extrabold text-gray-500 text-[10px] tracking-wider uppercase">Cover Board Color</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                          value={customCoverColor}
                          onChange={(e) => setCustomCoverColor(e.target.value)}
                        />
                        <input
                          type="text"
                          className="h-9 border border-gray-200 rounded-lg px-2 text-[10px] w-20 text-center bg-white text-[#1b1b1b] focus:outline-none"
                          value={customCoverColor}
                          onChange={(e) => setCustomCoverColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <span className="font-extrabold text-gray-500 text-[10px] tracking-wider uppercase">Cover Typeface Color</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                          value={customTextColor}
                          onChange={(e) => setCustomTextColor(e.target.value)}
                        />
                        <input
                          type="text"
                          className="h-9 border border-gray-200 rounded-lg px-2 text-[10px] w-20 text-center bg-white text-[#1b1b1b] focus:outline-none"
                          value={customTextColor}
                          onChange={(e) => setCustomTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Editorial Details */}
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex flex-col gap-1 bg-[#faf8f5] p-3 rounded-xl border border-gray-200 text-left">
                    <span className="font-black text-brand-primary text-[10px] uppercase tracking-wider">Typesetting Font Pairings</span>
                    <span className="text-[11px] text-brand-secondary font-black">{suggestion.fontStyle}</span>
                  </div>

                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-extrabold text-gray-500 text-[10px] uppercase tracking-wider">Book Jacket Back-Cover Blurb</span>
                    <textarea
                      rows={3}
                      className="border border-gray-200 rounded-xl p-2.5 text-[11px] text-[#1b1b1b] bg-white leading-relaxed focus:outline-none focus:border-brand-primary"
                      value={customBlurb}
                      onChange={(e) => setCustomBlurb(e.target.value)}
                    />
                  </div>

                  {/* Chapters drafts */}
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-extrabold text-gray-500 text-[10px] uppercase tracking-wider">Suggested Chapter Subdivisions</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {suggestion.chapterTitles.map((ch, idx) => (
                        <div key={idx} className="bg-[#faf8f5] p-2 rounded-xl border border-gray-150 flex items-center gap-1.5">
                          <span className="text-brand-secondary text-[10px] font-black">0{idx+1}</span>
                          <span className="text-[10px] text-brand-primary font-bold line-clamp-1">{ch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inner layout guidelines */}
                  <div className="bg-brand-primary/5 border border-brand-primary/10 p-3 rounded-xl flex items-start gap-2 mt-1">
                    <BookOpen className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 text-left text-brand-primary">
                      <span className="font-black text-[10px] uppercase tracking-wider">Inner Typesetting Profile</span>
                      <p className="text-[10px] text-gray-600 leading-relaxed font-semibold">
                        {suggestion.layoutGuidelines}
                      </p>
                    </div>
                  </div>

                  {/* Proceed launch button */}
                  <button
                    onClick={handlePublishLaunch}
                    className="mt-2 w-full h-11 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl font-black text-xs flex items-center justify-center gap-1 shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    Launch Publishing Run
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
