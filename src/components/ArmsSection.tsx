import React from 'react';
import { Shield, Calculator, CheckCircle2, RefreshCw, FileText, Settings, Layers } from 'lucide-react';

export default function ArmsSection() {
  const armsBenefits = [
    {
      title: "Surveillance & Flight Portals",
      desc: "Instant collection of positional data directly from surveillance systems and FDPs.",
      icon: Layers,
      color: "text-sky-600 bg-sky-50 border-sky-100"
    },
    {
      title: "Flexible Rule Engine",
      desc: "Customizable parameter setting for tailored discounts, surcharges, or distinct client categories.",
      icon: Settings,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Automated Invoicing",
      desc: "Generates flawless financial receipts down to the exact airspace coordinate used.",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    }
  ];

  return (
    <section id="arms-revenue-system" className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      
      {/* Decorative cyber grid accent lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header Text */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl text-[10px] font-mono tracking-widest text-[#009FE3] font-bold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#009FE3] animate-pulse" />
            <span>Operational Finance Suite</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-none text-white">
            Aeronautical Revenue <br className="hidden sm:inline" />
            <span className="text-[#009FE3] bg-clip-text text-transparent bg-gradient-to-r from-[#009FE3] to-sky-450">Management System (ARMS)</span>
          </h2>
          <div className="h-1 w-16 bg-[#009FE3] rounded-full" />
          <p className="text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">
            Aeronautical Revenue Management System provides the only proven fully integrated solution for Air Navigation Service Providers, Airports and Airlines delivering a cost effective and powerful billing solution.
          </p>
        </div>

        {/* Feature Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Core Description & Rule Engine Feature Spec */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Calculator className="h-40 w-40" />
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase">FULLY AUTOMATED</span>
                <p className="text-sm sm:text-base text-slate-350 font-normal leading-relaxed">
                  Aeronautical Revenue Management System is a fully automated billing system for ANSPs, Airports and Airlines, that collects and processes data from surveillance, airports, and flight data processing systems.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-[#009FE3]/10 border border-[#009FE3]/20 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2.5 text-white">
                  <Calculator className="h-5 w-5 text-[#009FE3]" />
                  <span className="font-bold text-sm tracking-tight">Flexible Calculation Rule Engine</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  The calculation of the amounts to be actually invoiced is performed by a flexible rule engine. The engine enables the handling of customer specific conditions such as rebates or surcharges as well.
                </p>
              </div>
            </div>

            {/* Quick Benefits list row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {armsBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 hover:bg-white/10 transition-colors">
                    <div className={`p-2 rounded-lg border inline-block ${benefit.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">{benefit.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: ARMS Umbrella Architectural Diagram Image */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3.5xl p-6 sm:p-8 flex flex-col justify-center items-center relative shadow-2xl overflow-hidden min-h-[350px] sm:min-h-[420px] group">
            <div className="absolute top-4 right-4 flex space-x-1.5 z-10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#009FE3] animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">ARMS Dynamic Architecture</span>
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center min-h-[250px]">
              {/* Soft decorative background glow behind the diagram */}
              <div className="absolute w-44 h-44 bg-[#009FE3]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#009FE3]/20 transition-all duration-300" />
              
              <img 
                src="https://bane.aero/wp-content/uploads/2025/05/ARMS-Umbrella-v2.png" 
                alt="Aeronautical Revenue Management System ARMS Umbrella Architecture"
                className="relative z-10 w-full h-auto object-contain max-h-[380px] rounded-2xl smooth-transition transform group-hover:scale-[1.03] duration-350"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Simulated Live counter */}
            <div className="mt-6 w-full pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-[10px] font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ARMS Diagram Verified</span>
              </span>
              <span className="font-extrabold text-[#009FE3]">HIGH DEFINITION SYSTEM SUMMARY</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
