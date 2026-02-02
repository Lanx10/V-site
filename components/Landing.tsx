
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 px-6 text-center overflow-hidden">
      {/* Decorative background flowers */}
      <div className="absolute -top-10 -left-10 opacity-20 rotate-12 pointer-events-none">
        <span className="material-symbols-outlined text-[120px] text-primary">local_florist</span>
      </div>
      <div className="absolute top-20 -right-10 opacity-15 -rotate-12 pointer-events-none">
        <span className="material-symbols-outlined text-[100px] text-primary">filter_vintage</span>
      </div>
      <div className="absolute bottom-10 -left-5 opacity-15 rotate-45 pointer-events-none">
        <span className="material-symbols-outlined text-[80px] text-primary">filter_vintage</span>
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-20 -rotate-12 pointer-events-none">
        <span className="material-symbols-outlined text-[140px] text-primary">local_florist</span>
      </div>

      <div className="z-10 w-full flex flex-col items-center">
        {/* Envelope Graphic */}
        <div className="relative w-64 h-48 mb-12 flex items-center justify-center float-animation">
          <div className="absolute inset-0 bg-white rounded-lg shadow-xl border border-primary/10"></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white rounded-t-lg border-b border-primary/5" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="size-16 rounded-full bg-primary shadow-lg flex items-center justify-center ring-4 ring-primary/20">
              <span className="material-symbols-outlined text-white text-3xl font-bold">favorite</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h1 className="text-primary font-serif italic text-5xl font-bold leading-tight tracking-tight">
            Craft Your Moment
          </h1>
          <p className="text-[#181113]/70 text-lg font-normal leading-relaxed max-w-xs mx-auto">
            A personalized motivational journey through flowers, pets, and the things you love.
          </p>
        </div>

        <button 
          onClick={onStart}
          className="w-full bg-primary text-white font-bold py-5 rounded-full shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-lg uppercase tracking-widest flex items-center justify-center gap-3"
        >
          Start Your Journey
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>

        <div className="mt-8 flex items-center gap-2 opacity-40">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Premium Valentine Experience</span>
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
