
import React, { useState, useEffect } from 'react';
import { Preferences } from '../types';

interface PreferencesScreenProps {
  onBack: () => void;
  onGenerate: (prefs: Preferences) => void;
}

const COLORS = [
  { id: 'rose', value: '#ee2b5b' },
  { id: 'pink', value: '#ff85a1' },
  { id: 'lavender', value: '#c8b6ff' },
  { id: 'peach', value: '#ffd6ba' },
  { id: 'sky', value: '#4cc9f0' },
  { id: 'grape', value: '#7209b7' },
  { id: 'mint', value: '#b7e4c7' },
  { id: 'gold', value: '#ffb703' },
  { id: 'coral', value: '#fb8500' },
  { id: 'charcoal', value: '#2b2d42' },
];

const FLOWERS = [
  { label: 'Rose', icon: 'local_florist' },
  { label: 'Tulip', icon: 'spa' },
  { label: 'Daisy', icon: 'filter_vintage' },
  { label: 'Lily', icon: 'psychiatry' },
  { label: 'Sunflower', icon: 'filter_vintage' },
  { label: 'Spider Lily', icon: 'psychiatry' }
];

const COMPANIONS = [
  { label: 'Dog', icon: 'pets' },
  { label: 'Cat', icon: 'cat' }, 
  { label: 'Rabbit', icon: 'cruelty_free' },
  { label: 'Bird', icon: 'flutter_dash' }
];

const TREATS = [
  { label: 'Chocolate', icon: 'cookie' },
  { label: 'Pasta', icon: 'dinner_dining' },
  { label: 'Pastry', icon: 'cake' },
  { label: 'Fruit', icon: 'nutrition' }
];

const PreferencesScreen: React.FC<PreferencesScreenProps> = ({ onBack, onGenerate }) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [selectedBloom, setSelectedBloom] = useState(FLOWERS[0].label);
  const [selectedCompanion, setSelectedCompanion] = useState(COMPANIONS[0].label);
  const [selectedTreat, setSelectedTreat] = useState(TREATS[0].label);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = () => {
    onGenerate({
      color: selectedColor,
      bloom: selectedBloom,
      companion: selectedCompanion,
      treat: selectedTreat,
      fontStyle: 'elegant',
      cardStyle: 'gradient',
      borderStyle: 'none'
    });
  };

  const getBloomIcon = () => FLOWERS.find(f => f.label === selectedBloom)?.icon || 'local_florist';
  const getCompanionIcon = () => COMPANIONS.find(c => c.label === selectedCompanion)?.icon || 'pets';
  const getTreatIcon = () => TREATS.find(t => t.label === selectedTreat)?.icon || 'cookie';

  return (
    <div 
      className="relative flex flex-col flex-1 pb-32 overflow-hidden transition-all duration-1000 ease-in-out" 
      style={{ backgroundColor: `${selectedColor}15` }}
    >
      
      {/* --- BACKGROUND LAYER: ANIMATED ICONS --- */}
      {/* Bloom Background Icon (Top Right) */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transition-all duration-1000 transform scale-150 rotate-12 float-animation">
        <span 
          className="material-symbols-outlined text-[180px] transition-colors duration-1000" 
          style={{ color: selectedColor }}
        >
          {getBloomIcon()}
        </span>
      </div>
      
      {/* Companion Background Icon (Bottom Left) */}
      <div className="absolute bottom-40 -left-10 p-4 opacity-10 pointer-events-none transition-all duration-1000 transform -rotate-12 float-animation" style={{ animationDelay: '0.5s' }}>
        <span 
          className="material-symbols-outlined text-[220px] transition-colors duration-1000" 
          style={{ color: selectedColor }}
        >
          {getCompanionIcon()}
        </span>
      </div>

      {/* Treat Background Icon (Center Right) */}
      <div className="absolute top-1/2 -right-12 p-4 opacity-5 pointer-events-none transition-all duration-1000 transform rotate-45 float-animation" style={{ animationDelay: '1s' }}>
        <span 
          className="material-symbols-outlined text-[140px] transition-colors duration-1000" 
          style={{ color: selectedColor }}
        >
          {getTreatIcon()}
        </span>
      </div>
      {/* ----------------------------------------- */}

      {/* Header */}
      <div className={`flex items-center p-4 pb-2 justify-between z-10 transition-all duration-500 ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div 
          onClick={onBack}
          className="text-[#181113] flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-black/5 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        <h2 className="text-lg font-bold flex-1 text-center pr-12 transition-colors duration-500" style={{ color: selectedColor }}>Valentine's Vibe</h2>
      </div>

      {/* Title */}
      <div className={`px-4 py-6 z-10 transition-all duration-700 delay-100 ${isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <h1 className="font-serif italic text-4xl font-bold text-center transition-colors duration-500" style={{ color: selectedColor }}>Craft Your Moment</h1>
        <p className="text-[#181113]/70 text-base font-normal pt-2 text-center max-w-xs mx-auto">
          Choose your favorite details to curate your special message.
        </p>
      </div>

      <div className="flex flex-col gap-10 px-4 z-10 overflow-y-auto custom-scrollbar">
        {/* Color Palette */}
        <section className={`transition-all duration-700 delay-200 ${isMounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
          <div className="flex items-center gap-2 pb-3">
            <span className="material-symbols-outlined text-xl transition-colors duration-500" style={{ color: selectedColor }}>palette</span>
            <h3 className="text-[#181113] text-lg font-bold">Your Palette</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto custom-scrollbar py-3 px-1">
            {COLORS.map((c, idx) => (
              <label 
                key={c.id}
                className={`shrink-0 size-10 rounded-full border-2 transition-all cursor-pointer shadow-sm active:scale-90 hover:scale-110 ${selectedColor === c.value ? 'border-white ring-4' : 'border-transparent'}`}
                style={{ backgroundColor: c.value, boxShadow: selectedColor === c.value ? `0 0 0 4px ${c.value}40` : 'none', transitionDelay: `${idx * 50}ms` }}
              >
                <input 
                  type="radio" 
                  className="hidden" 
                  name="color" 
                  checked={selectedColor === c.value} 
                  onChange={() => setSelectedColor(c.value)}
                />
              </label>
            ))}
          </div>
        </section>

        {/* Bloom */}
        <section className={`transition-all duration-700 delay-300 ${isMounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
          <div className="flex items-center gap-2 pb-3">
            <span className="material-symbols-outlined text-xl transition-colors duration-500" style={{ color: selectedColor }}>favorite</span>
            <h3 className="text-[#181113] text-lg font-bold">Your Bloom</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {FLOWERS.map((f) => (
              <label 
                key={f.label}
                className={`relative flex flex-col items-center justify-center p-6 border rounded-2xl cursor-pointer transition-all duration-500 group overflow-hidden ${selectedBloom === f.label ? 'border-transparent text-white shadow-lg scale-105' : 'bg-white border-black/5 text-[#181113] opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: selectedBloom === f.label ? selectedColor : '' }}
              >
                <input 
                  type="radio" 
                  className="hidden" 
                  name="bloom" 
                  checked={selectedBloom === f.label}
                  onChange={() => setSelectedBloom(f.label)}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-center">{f.label}</span>
                {selectedBloom === f.label && (
                  <div className="absolute top-1 right-1 opacity-60">
                    <span className="material-symbols-outlined text-[10px]">check_circle</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </section>

        {/* Companion */}
        <section className={`transition-all duration-700 delay-400 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-2 pb-3">
            <span className="material-symbols-outlined text-xl transition-colors duration-500" style={{ color: selectedColor }}>pets</span>
            <h3 className="text-[#181113] text-lg font-bold">Your Companion</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMPANIONS.map((c) => (
              <label 
                key={c.label}
                className={`flex items-center justify-center px-8 py-3.5 border rounded-full cursor-pointer transition-all shadow-sm active:scale-95 ${selectedCompanion === c.label ? 'text-white border-transparent' : 'bg-white border-black/5 text-[#181113] opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: selectedCompanion === c.label ? selectedColor : '' }}
              >
                <input 
                  type="radio" 
                  className="hidden" 
                  name="companion" 
                  checked={selectedCompanion === c.label}
                  onChange={() => setSelectedCompanion(c.label)}
                />
                <span className="text-sm font-bold uppercase tracking-tight">{c.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Treat */}
        <section className={`transition-all duration-700 delay-500 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-2 pb-3">
            <span className="material-symbols-outlined text-xl transition-colors duration-500" style={{ color: selectedColor }}>restaurant</span>
            <h3 className="text-[#181113] text-lg font-bold">Your Treat</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TREATS.map((t) => (
              <label 
                key={t.label}
                className={`flex items-center justify-center px-6 py-4 border rounded-2xl cursor-pointer transition-all shadow-sm active:scale-95 ${selectedTreat === t.label ? 'text-white border-transparent' : 'bg-white border-black/5 text-[#181113] opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: selectedTreat === t.label ? selectedColor : '' }}
              >
                <input 
                  type="radio" 
                  className="hidden" 
                  name="treat" 
                  checked={selectedTreat === t.label}
                  onChange={() => setSelectedTreat(t.label)}
                />
                <span className="text-sm font-bold uppercase tracking-tighter">{t.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light/95 to-transparent pb-8 z-20 flex justify-center">
        <div className="w-full max-w-[480px]">
          <button 
            onClick={handleSubmit}
            className="w-full text-white font-bold py-5 rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-base uppercase tracking-widest flex items-center justify-center gap-2 group overflow-hidden relative"
            style={{ backgroundColor: selectedColor, boxShadow: `0 10px 25px -5px ${selectedColor}60` }}
          >
            <span className="z-10 flex items-center gap-2">
              Create My Card
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">favorite</span>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesScreen;
