
import React, { useRef, useState, useEffect } from 'react';
import { QuoteData, Preferences, FontStyle, CardStyle, BorderStyle } from '../types';

interface ResultProps {
  quote: QuoteData | null;
  isLoading: boolean;
  onBack: () => void;
  onNewQuote: () => void;
  prefs: Preferences;
  onUpdatePrefs: (update: Partial<Preferences>) => void;
}

const FONTS: { id: FontStyle; label: string; class: string }[] = [
  { id: 'elegant', label: 'Elegant', class: 'font-serif' },
  { id: 'modern', label: 'Modern', class: 'font-display' },
  { id: 'handwritten', label: 'Script', class: 'font-handwritten' },
  { id: 'classic', label: 'Classic', class: 'font-classic' },
];

const STYLES: { id: CardStyle; label: string; icon: string }[] = [
  { id: 'clean', label: 'Solid', icon: 'check_box_outline_blank' },
  { id: 'gradient', label: 'Gradient', icon: 'gradient' },
  { id: 'glass', label: 'Glass', icon: 'blur_on' },
  { id: 'dots', label: 'Dots', icon: 'grid_view' },
  { id: 'stripes', label: 'Stripes', icon: 'reorder' },
  { id: 'hearts', label: 'Hearts', icon: 'favorite' },
];

const BORDERS: { id: BorderStyle; label: string; class: string }[] = [
  { id: 'none', label: 'None', class: 'border-transparent' },
  { id: 'thin', label: 'Thin', class: 'border-[1px]' },
  { id: 'thick', label: 'Thick', class: 'border-[4px]' },
  { id: 'double', label: 'Double', class: 'border-[6px] border-double' },
  { id: 'dashed', label: 'Dashed', class: 'border-2 border-dashed' },
];

const ACCENT_COLORS = [
  '#ee2b5b', '#ff4d6d', '#ff85a1', '#c8b6ff', '#ffd6ba', 
  '#f8edeb', '#4cc9f0', '#7209b7', '#f72585', '#2b2d42'
];

type CustomTab = 'pattern' | 'color' | 'font' | 'border';

const Result: React.FC<ResultProps> = ({ quote, isLoading, onBack, onNewQuote, prefs, onUpdatePrefs }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<CustomTab>('pattern');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCopy = () => {
    if (quote) {
      navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!quote) return;
    const shareData = {
      title: "Valentine's Vibe Gift",
      text: `"${quote.text}" — ${quote.author}`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleSaveToGallery = () => {
    if (!quote) return;
    setIsSaving(true);
    
    // Simulate a complex generation process
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([`VALENTINE'S VIBE GIFT\n\n"${quote.text}"\n\n— ${quote.author}\n\nCustomized with: ${prefs.bloom}, ${prefs.companion}, ${prefs.treat}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `valentine-gift-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setIsSaving(false);
    }, 1500);
  };

  const getCardClasses = () => {
    let base = "p-10 flex flex-col items-center transition-all duration-500 min-h-[340px] justify-center relative overflow-hidden ";
    
    // Background Patterns
    switch (prefs.cardStyle) {
      case 'gradient': base += "quote-card-gradient "; break;
      case 'clean': base += "bg-white "; break;
      case 'glass': base += "glass-effect "; break;
      case 'dots': base += "bg-white pattern-dots text-primary/10 "; break;
      case 'stripes': base += "bg-white pattern-stripes text-primary/5 "; break;
      case 'hearts': base += "pattern-hearts "; break;
    }

    // Border Styles
    const border = BORDERS.find(b => b.id === prefs.borderStyle);
    if (border) base += border.class + " ";

    return base;
  };

  const getQuoteFontClass = () => {
    const font = FONTS.find(f => f.id === prefs.fontStyle);
    return font ? font.class : 'font-serif';
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden bg-white/30">
      {/* Top Navigation */}
      <div className="flex items-center p-4 pb-2 justify-between z-10">
        <div 
          onClick={onBack}
          className="text-[#181113] flex size-12 shrink-0 items-center justify-start cursor-pointer hover:text-primary transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined font-bold">arrow_back_ios_new</span>
        </div>
        <h2 className="text-[#181113] text-lg font-bold leading-tight tracking-tight flex-1 text-center">Your Custom Gift</h2>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={handleShare}
            className="flex items-center justify-center rounded-full h-12 w-12 bg-transparent text-[#181113] hover:bg-black/5 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined">ios_share</span>
          </button>
        </div>
      </div>

      {/* Main Preview */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative py-4">
        {isLoading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center">
              <div className="size-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <span className="material-symbols-outlined absolute text-primary animate-pulse text-3xl">favorite</span>
            </div>
            <div className="text-center space-y-2">
              <p className="text-primary font-bold text-xl">Curating your message...</p>
              <p className="text-black/40 text-sm font-medium animate-pulse">Personalizing with your favorites</p>
            </div>
          </div>
        ) : quote && (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
            <div 
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl envelope-shadow relative z-20 transition-all duration-500 hover:scale-[1.02]"
            >
              <div 
                ref={cardRef}
                className={getCardClasses()} 
                style={{ 
                    borderColor: prefs.borderStyle !== 'none' ? prefs.color : 'transparent',
                    color: (prefs.cardStyle === 'dots' || prefs.cardStyle === 'stripes') ? `${prefs.color}20` : 'inherit'
                }}
              >
                {/* Visual Accent */}
                <div className="mb-8">
                  <div 
                    className="size-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-inner float-animation"
                    style={{ backgroundColor: `${prefs.color}15` }}
                  >
                    <span className="material-symbols-outlined text-4xl" style={{ color: prefs.color }}>favorite</span>
                  </div>
                </div>

                {/* The Quote */}
                <h2 className={`text-[#181113] tracking-tight text-2xl md:text-3xl font-bold leading-[1.3] text-center pb-6 pt-2 px-2 ${getQuoteFontClass()}`}>
                  "{quote.text}"
                </h2>

                <div className="w-16 h-[3px] rounded-full my-4" style={{ backgroundColor: `${prefs.color}40` }}></div>
                
                {/* Author */}
                <p className={`text-sm md:text-base font-bold leading-tight tracking-[0.25em] text-center uppercase ${getQuoteFontClass()}`} style={{ color: prefs.color }}>
                  — {quote.author}
                </p>
              </div>
            </div>

            {/* Customization Controls Panel */}
            <div className="w-full bg-white rounded-3xl p-5 shadow-xl border border-black/5 flex flex-col gap-5">
              {/* Tab Selector */}
              <div className="flex gap-1 p-1 bg-black/5 rounded-full">
                {(['pattern', 'color', 'font', 'border'] as CustomTab[]).map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-[#181113]/50 hover:text-primary active:scale-95'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Sub-Option Scroller */}
              <div className="flex gap-4 overflow-x-auto custom-scrollbar py-2 px-1 min-h-[90px] items-center">
                {activeTab === 'pattern' && STYLES.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => onUpdatePrefs({ cardStyle: s.id })}
                    className={`shrink-0 flex flex-col items-center justify-center gap-2 w-20 h-20 rounded-2xl border-2 transition-all active:scale-95 ${prefs.cardStyle === s.id ? 'border-primary bg-primary/5 scale-105 shadow-md' : 'border-transparent bg-background-light'}`}
                  >
                    <span className="material-symbols-outlined text-2xl text-primary">{s.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight opacity-70">{s.label}</span>
                  </button>
                ))}

                {activeTab === 'color' && ACCENT_COLORS.map(c => (
                  <button 
                    key={c}
                    onClick={() => onUpdatePrefs({ color: c })}
                    className={`shrink-0 size-11 rounded-full border-4 transition-all active:scale-90 ${prefs.color === c ? 'border-primary scale-110 shadow-lg' : 'border-white shadow-sm'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}

                {activeTab === 'font' && FONTS.map(f => (
                  <button 
                    key={f.id}
                    onClick={() => onUpdatePrefs({ fontStyle: f.id })}
                    className={`shrink-0 px-6 h-12 rounded-xl border-2 transition-all active:scale-95 whitespace-nowrap ${prefs.fontStyle === f.id ? 'border-primary bg-primary/5 font-bold' : 'border-transparent bg-background-light'}`}
                  >
                    <span className={`text-sm ${f.class}`}>{f.label}</span>
                  </button>
                ))}

                {activeTab === 'border' && BORDERS.map(b => (
                  <button 
                    key={b.id}
                    onClick={() => onUpdatePrefs({ borderStyle: b.id })}
                    className={`shrink-0 px-5 h-12 rounded-xl border-2 transition-all flex flex-col items-center justify-center active:scale-95 ${prefs.borderStyle === b.id ? 'border-primary bg-primary/5 font-bold shadow-sm' : 'border-transparent bg-background-light'}`}
                  >
                    <div className={`w-8 h-[2px] mb-1.5 ${b.class} border-primary`} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="p-6 pb-10 flex flex-col gap-4 z-10 bg-gradient-to-t from-white via-white/80 to-transparent">
        <button 
          onClick={handleSaveToGallery}
          disabled={isLoading || isSaving}
          className="w-full bg-primary text-white h-16 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale relative overflow-hidden group"
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              <span>Saving...</span>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">download</span>
              Finalize & Save
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </>
          )}
        </button>

        <div className="flex gap-4">
          <button 
            onClick={onNewQuote}
            disabled={isLoading || isSaving}
            className="flex-1 bg-white border-2 border-primary/10 text-[#181113] h-14 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:border-primary/30"
          >
            <span className="material-symbols-outlined text-xl">refresh</span>
            New Vibe
          </button>
          <button 
            onClick={handleCopy}
            disabled={isLoading || isSaving}
            className={`flex-1 h-14 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm border-2 ${copied ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-primary/10 text-[#181113] hover:border-primary/30'}`}
          >
            <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
