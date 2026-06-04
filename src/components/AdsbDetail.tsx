import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Radio, 
  Plane, 
  Navigation, 
  TrendingUp, 
  Cpu, 
  Users, 
  ShieldCheck, 
  Layers, 
  FileCheck, 
  Map, 
  Activity, 
  Globe, 
  Wifi, 
  Clock, 
  Database,
  ArrowRight
} from 'lucide-react';

interface AdsbDetailProps {
  onBack: () => void;
}

export default function AdsbDetail({ onBack }: AdsbDetailProps) {
  const [activeFeeds, setActiveFeeds] = useState(142);
  const [dataIngress, setDataIngress] = useState(1842);

  // Gentle live stats fluctuation to bring life to the operations dashboard
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeeds(prev => Math.max(135, Math.min(155, prev + Math.floor(Math.random() * 5) - 2)));
      setDataIngress(prev => Math.max(1750, Math.min(1950, prev + Math.floor(Math.random() * 20) - 10)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      text: "Advanced real-time flight tracking software for live aircraft monitoring",
      icon: Plane,
      category: "Flight Operations",
      color: "bg-sky-50 text-sky-600 border-sky-100"
    },
    {
      text: "Provides accurate updates on airplane traffic, route, position, and status",
      icon: Navigation,
      category: "Telemetry & Data",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    {
      text: "Enhances flight operations and air traffic management efficiency",
      icon: TrendingUp,
      category: "Operations",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      text: "Supports better decision-making for aviation authorities and operators",
      icon: Users,
      category: "Collaborative Decision-Making",
      color: "bg-violet-50 text-violet-600 border-violet-100"
    },
    {
      text: "Integrates with aviation IT systems and flight operations systems",
      icon: Cpu,
      category: "System Integration",
      color: "bg-slate-100 text-slate-700 border-slate-200"
    },
    {
      text: "Improves coordination with ground handling operations",
      icon: Database,
      category: "Ground Handling",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      text: "Ensures safety, visibility, and on-time operational performance",
      icon: ShieldCheck,
      category: "Safety & Compliance",
      color: "bg-teal-50 text-teal-600 border-teal-100"
    },
    {
      text: "Monitoring and visualization of flight movements using ADS-B and integrated data sources via graphical user interface",
      icon: Layers,
      category: "Visualization",
      color: "bg-sky-50 text-sky-600 border-sky-100"
    },
    {
      text: "Flight path tracking and distance flown validation",
      icon: FileCheck,
      category: "Validation",
      color: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      text: "FIR in/out capture for controlled airspace monitoring",
      icon: Map,
      category: "Airspace Sovereignty",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      text: "Live flight activity tracking across the airspace in real time",
      icon: Activity,
      category: "Air Traffic Management",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    }
  ];

  return (
    <div id="adsb-flight-tracking-detail-page" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 py-12 space-y-12">
        
        {/* Navigation & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button 
            onClick={onBack}
            className="group/btn inline-flex items-center space-x-2 text-xs font-mono font-black uppercase tracking-wider text-slate-700 hover:text-[#009FE3] bg-white border-2 border-slate-200/80 hover:border-[#009FE3]/40 py-3 px-6 rounded-2xl transition duration-250 cursor-pointer shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover/btn:-translate-x-1 transition-transform" />
            <span>Back to operations suite</span>
          </button>
          
          <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-100 text-sky-700 px-4 py-2 rounded-2xl text-xs font-mono font-bold tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Active Software Module</span>
          </div>
        </div>

        {/* Hero Section of File / Full Page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Hero Header Title Info block */}
          <div className="lg:col-span-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Globe className="h-96 w-96 text-white" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-white border border-white/10 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase">
                <Radio className="h-3.5 w-3.5 text-[#009FE3] animate-pulse" />
                <span>Next-Gen Telemetry Hardware Interface</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white max-w-2xl">
                ADS-B Flight <br className="hidden sm:inline" />
                <span className="text-[#009FE3] bg-clip-text text-transparent bg-gradient-to-r from-[#009FE3] to-sky-400">Tracking Engine</span>
              </h1>
              <p className="text-slate-300 font-medium text-base sm:text-lg max-w-xl leading-relaxed">
                Empowering civil aviation, ground handlers, and airport authorities with millisecond telemetry tracking, route validation, and airspace analytics.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-1">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Feed Source Status</span>
                <span className="text-sm font-semibold flex items-center text-emerald-400 space-x-1.5">
                  <Wifi className="h-4 w-4 shrink-0" />
                  <span>Online & Stable</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Active Airplanes</span>
                <span className="text-sm font-extrabold font-mono text-white">
                  {activeFeeds} Aircraft
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Ingress Speed</span>
                <span className="text-sm font-extrabold font-mono text-white">
                  {dataIngress} plots/s
                </span>
              </div>
            </div>
          </div>

          {/* Core Telemetry Quick Stats card */}
          <div className="lg:col-span-4 bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-3 bg-sky-50 border border-sky-100 rounded-2xl text-sky-600 inline-block">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Transponder Feeds</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Direct connection with Class C aviation transponders, delivering fully resolved radar data securely to system registries.
                </p>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Sovereignty FIR Code</span>
                <span className="text-xs font-mono font-bold bg-[#009FE3]/10 text-[#009FE3] px-2.5 py-1 rounded-lg">VGHS / DAC</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Encryption Method</span>
                <span className="text-xs font-mono font-bold bg-[#009FE3]/10 text-[#009FE3] px-2.5 py-1 rounded-lg">AES-GCM-256</span>
              </div>
            </div>
          </div>

        </div>

        {/* Requirements, Capabilities & Features Specifications Grid */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-extrabold text-[#009FE3] uppercase tracking-widest block mb-2">Detailed Capabilites</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900">
              System Specifications & Core Content
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white border-2 border-slate-200/80 hover:border-[#009FE3]/30 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#009FE3]">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 transition-colors duration-350 ${item.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-bold">
                        FEATURE #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold pt-1">
                      {item.text}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Telemetric State</span>
                    <span className="text-emerald-500 font-bold flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Validated</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live CTA / Operator action panel at bottom */}
        <div className="bg-sky-50 border-2 border-sky-100 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Need Live Integration Demonstration for Airport Authorities?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our expert engineers are ready to facilitate end-to-end sandbox connectivity with your specific Air Traffic Command interfaces.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl hover:bg-slate-800 transition duration-150 cursor-pointer shadow-sm"
            >
              Back to Panel
            </button>
            <button 
              onClick={() => {
                const doc = document.getElementById('aviation-booking-demo');
                if (doc) {
                  doc.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onBack();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-[#009FE3] hover:bg-sky-600 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-lg shadow-sky-500/10"
            >
              <span>Schedule Live Demo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
