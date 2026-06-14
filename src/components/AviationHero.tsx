import React from 'react';
import { 
  ChevronRight, 
  Compass
} from 'lucide-react';
// @ts-ignore
import heroImage from '../assets/images/ANSP.png';

interface HeroProps {
  onExploreServices: () => void;
  onBookDemo: () => void;
}

export default function AviationHero({ onExploreServices, onBookDemo }: HeroProps) {
  return (
    <section id="aviation-hero-platform" className="aviation-hero-wrapper relative flex items-center justify-center overflow-hidden bg-slate-50 px-4 sm:px-8 xl:px-16 py-16 sm:py-24 xl:py-32 border-b border-slate-200">
      
      {/* Inline styles for custom high-fidelity animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.08); }
        }
        @keyframes image-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes radar-scanner {
          0% { transform: translateY(-20%); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(320%); opacity: 0; }
        }
        @keyframes locator-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .animate-custom-pulse-glow { animation: custom-pulse-glow 6s ease-in-out infinite; }
        .animate-image-float { animation: image-float 6s ease-in-out infinite; }
        .animate-radar-scanner { animation: radar-scanner 8s linear infinite; }
        .animate-locator-pulse { animation: locator-pulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      `}} />

      {/* Decorative premium dynamic glowing gradient backdrops in Light theme tones */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/10 left-1/10 w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-[120px] animate-custom-pulse-glow" />
        <div className="absolute bottom-1/10 right-1/10 w-[700px] h-[700px] rounded-full bg-sky-100/40 blur-[140px] animate-custom-pulse-glow" style={{ animationDelay: '2.5s' }} />
        
        {/* Soft engineering matrix line grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Modern fluid ultra-wide responsive configuration */}
      <div className="aviation-hero-container w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Premium Typography and Content Container */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
          


          {/* Majestic Header Block with beautiful gradients resembling the screenshot */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[62px] font-black font-display tracking-tight leading-none text-slate-900 max-w-2xl mx-auto lg:mx-0">
              <span className="block text-slate-800 tracking-tight font-extrabold uppercase">
                BANE- <span className="text-[#009FE3]">AVIATION</span>
              </span>
              <span className="block mt-1 text-[#009FE3] font-black pb-1">
                Solutions
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-[15px] xl:text-[16px] text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed font-sans">
              Billing for Air Navigation Enterprise (BANE) is a modular aviation platform supporting Air Traffic Management (ATM) reporting, operations, and financial efficiency through integrated software systems.
            </p>
          </div>

          {/* CTA Links with premium button spacing and layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onBookDemo}
              className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-[#009FE3] hover:bg-[#0089c4] text-white border border-[#009FE3] rounded-xl font-bold text-xs uppercase tracking-wider smooth-transition cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.01]"
            >
              <span>Request Portal Demo</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Transparent, Borderless & Significantly Larger Image Container */}
        <div className="lg:col-span-7 relative w-full flex justify-center items-center">
          
          <div className="relative w-full max-w-[820px] flex items-center justify-center group/canvas smooth-transition">
            
            {/* Elegant, clean grid pattern background layer floating behind the diagram for reference context */}
            <div className="absolute inset-0 -m-8 bg-[linear-gradient(to_right,rgba(0,159,227,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,159,227,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none z-0" />
            
            {/* Styled card container with pristine border and modern soft shadow */}
            <div className="relative z-10 w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-3 sm:p-5 shadow-2xl shadow-slate-350/50">
              <img 
                src={heroImage} 
                alt="BANE Aviation System Diagram (Radar, IT Support, Billing & Ledger Systems)" 
                className="w-full h-auto object-contain rounded-xl relative z-10 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
