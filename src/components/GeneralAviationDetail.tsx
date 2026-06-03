import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Compass, 
  Map, 
  Calendar, 
  TrendingUp, 
  Database, 
  ShieldCheck, 
  Check, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Compass as CompassIcon, 
  Award,
  ArrowUpRight,
  ClipboardList
} from 'lucide-react';

interface GeneralAviationDetailProps {
  onBack: () => void;
  onBookDemo: (serviceName: string) => void;
}

type FlightCategory = 'private' | 'training' | 'survey' | 'agriculture' | 'business';

export default function GeneralAviationDetail({ onBack, onBookDemo }: GeneralAviationDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState<FlightCategory>('private');
  const [permitsIssued, setPermitsIssued] = useState<number>(842);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Flight category requirements & dynamic estimates
  const categorySpecs: Record<FlightCategory, { name: string; estimate: string; requirement: string; urgency: string; docCode: string }> = {
    'private': { 
      name: 'Private & Recreation Flying', 
      estimate: '< 10 minutes', 
      requirement: 'Airworthiness & Pilot Licensing Verification, Route Mapping', 
      urgency: 'Standard Handling', 
      docCode: 'GA-PERMIT-PV' 
    },
    'training': { 
      name: 'Training & Academy Operations', 
      estimate: '< 5 minutes (Auto-renew)', 
      requirement: 'Registered Training Area Boundaries, Ground Instructor Signoff', 
      urgency: 'Roster Schedule Integration', 
      docCode: 'GA-PERMIT-TR' 
    },
    'survey': { 
      name: 'Geographical Surveying & Mapping', 
      estimate: '15 - 30 minutes', 
      requirement: 'Airspace Boundary Segment Blocks, High-Res Telemetry Approval', 
      urgency: 'Prior Notice Required', 
      docCode: 'GA-PERMIT-SV' 
    },
    'agriculture': { 
      name: 'Agricultural Aviation', 
      estimate: '< 5 minutes', 
      requirement: 'Low Altitude Buffer Slot, Airfield Supervisor Clearance', 
      urgency: 'Local FIR Coordination', 
      docCode: 'GA-PERMIT-AG' 
    },
    'business': { 
      name: 'Business Jet & Corporate Travel', 
      estimate: '< 8 minutes (Priority Queue)', 
      requirement: 'Diplomatic / VIP Clearance Credentials, Parking slot allocation', 
      urgency: 'Express Handling', 
      docCode: 'GA-PERMIT-BZ' 
    }
  };

  useEffect(() => {
    setIsProcessing(true);
    const delay = setTimeout(() => {
      setIsProcessing(false);
    }, 350);
    return () => clearTimeout(delay);
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPermitsIssued(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const generalAviationFeatures = [
    {
      title: "Automated Non-Scheduled Scheduling",
      desc: "Eliminates legacy paperwork by automatically processing digital permits for ad-hoc business jet movements and charter operators.",
      icon: Calendar,
      category: "Workflow Agility",
      color: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
      title: "Training Academy Slot Automation",
      desc: "Streamlines flight school operations with recurring multi-entry approvals and dynamic local training area flight zone monitoring.",
      icon: Compass,
      category: "Instruction & Flight Academies",
      color: "bg-sky-50 text-sky-700 border-sky-100"
    },
    {
      title: "Surveying & Agricultural Grid Clearing",
      desc: "Enables precise geo-fenced operations clearances for drone, helicopter, and light aircraft survey loops.",
      icon: Map,
      category: "Altitude Mapping",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      title: "Instant Multi-agency Compliance Validation",
      desc: "Coordinates automatically across Defense ministries, Civil Aviation, and Border Security to ensure rapid flight authorization.",
      icon: ShieldCheck,
      category: "Government Compliance",
      color: "bg-purple-50 text-purple-700 border-purple-100"
    },
    {
      title: "Unified Billing Integration Hub",
      desc: "Immediately calculates non-scheduled fee coefficients based on weight indices and links they securely to ARMS for invoicing.",
      icon: Database,
      category: "Operational Finance Link",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
      title: "Operational Dashboard Analytics",
      desc: "Inspect live active non-scheduled airframes, historic regional movements, and training hour accumulations in an eye-safe visual chart.",
      icon: TrendingUp,
      category: "Business Intelligence",
      color: "bg-rose-50 text-rose-700 border-rose-100"
    }
  ];

  return (
    <div id="general-aviation-detail-page" className="min-h-screen bg-[#fafafc] text-slate-900 font-sans pb-16 animate-fade-in text-xs sm:text-sm">
      
      {/* Dynamic Simulated Page URL to indicate highly detailed web routing */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 w-full max-w-xl">
            <div className="flex space-x-1.5 shrink-0">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-300 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-slate-300 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-slate-300 inline-block" />
            </div>
            <div className="flex-1 bg-white border border-slate-200/80 px-4 py-1.5 rounded-lg text-xs font-mono text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap shadow-inner flex items-center space-x-1">
              <span className="text-slate-400">https://</span>
              <span className="text-slate-800 font-semibold">bane.aviation</span>
              <span className="text-amber-600 font-bold">/general-aviation-flight-permits-non-scheduled</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
            <span>FAA & Civil Aviation Auth Sync Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Navigation and return tools */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button 
            onClick={onBack}
            className="group/btn inline-flex items-center space-x-2 text-xs font-mono font-black uppercase tracking-wider text-slate-700 hover:text-amber-700 bg-white border-2 border-slate-200/80 hover:border-amber-600/40 py-3 px-6 rounded-2xl transition duration-250 cursor-pointer shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover/btn:-translate-x-1 transition-transform" />
            <span>Back to core services</span>
          </button>
          
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-150 text-amber-705 px-4 py-2 rounded-2xl text-xs font-mono font-bold tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span>General Aviation Facility</span>
          </div>
        </div>

        {/* Hero Banner Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Description card */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#231a0c] via-slate-950 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between border border-amber-900/40">
            {/* Soft decorative visual background items */}
            <div className="absolute top-1/2 right-0 transform translate-x-12 -translate-y-12 opacity-[0.03] pointer-events-none">
              <CompassIcon className="h-96 w-96 text-amber-400" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-white border border-white/10 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Next-Gen Civil Permits Automation</span>
              </div>
              
              <h1 className="text-3.5xl sm:text-5xl lg:text-5xl font-black font-display tracking-tight leading-none text-white">
                General Aviation Flight <br className="hidden sm:inline" />
                <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-400">Permits (Non-Scheduled)</span>
              </h1>

              <p className="text-slate-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
                BANE enables automated permit processing for general aviation and non-scheduled flights, including private flying, training, surveying, agriculture, and business aviation, improving efficiency across the aviation business with advanced aeronautical technology.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Our lightweight operational permit console takes the traditional week-long civil aviation submission processes down to simple minutes.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-amber-900/40 grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Permit Processing Queues</span>
                <span className="text-sm font-semibold flex items-center text-amber-400 space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Interactive Live</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Permits Approved (Today)</span>
                <span className="text-sm font-extrabold font-mono text-white">
                  {permitsIssued} clearances
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Average Processing Wait</span>
                <span className="text-sm font-extrabold font-mono text-emerald-400">
                  7.2 Minutes
                </span>
              </div>
            </div>
          </div>

          {/* Interactive GA Flight Clearance Simulator */}
          <div className="lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-3 bg-amber-50 border border-amber-100 text-amber-600 rounded-2xl inline-block">
                <ClipboardList className="h-6 w-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">GA Flight Rules Checker</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose an aviation domain category below to see its exact pre-clearance rules framework and ICAO verification index.
                </p>
              </div>

              {/* Grid Selector */}
              <div className="space-y-2">
                {(['private', 'training', 'survey', 'agriculture', 'business'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center justify-between ${
                      selectedCategory === cat 
                        ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-sm' 
                        : 'border-slate-250 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{categorySpecs[cat].name}</span>
                    <span className="text-[10px] font-mono font-bold bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 uppercase">
                      {cat}
                    </span>
                  </button>
                ))}
              </div>

              {/* Live Rules Output Display */}
              <div className="pt-4 border-t border-slate-150 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 leading-none">
                  <span>SYSTEM DOCUMENT CODE</span>
                  <span className="font-bold text-slate-800 bg-slate-100 py-0.5 px-1.5 rounded">{categorySpecs[selectedCategory].docCode}</span>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-slate-500">Wait Estimate</span>
                    <span className="text-emerald-600 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                      {categorySpecs[selectedCategory].estimate}
                    </span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="space-y-1">
                    <span className="block text-[9px] font-mono text-slate-400 uppercase font-black leading-none">CORE AUDIT CRITERIA</span>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">{categorySpecs[selectedCategory].requirement}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Handling Priority:</span>
              <span className="text-[#009FE3] font-bold">{categorySpecs[selectedCategory].urgency}</span>
            </div>
          </div>

        </div>

        {/* Feature Grid describing items */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-extrabold text-amber-600 uppercase tracking-widest block mb-1">Systems Capabilities</span>
            <h2 className="text-3xl font-black font-display tracking-tight text-slate-900">
              Technical Guidelines & Strategic Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generalAviationFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white border-2 border-slate-200/90 hover:border-amber-600/30 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-default shadow-sm"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-600">
                      {feature.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 transition-colors duration-350 ${feature.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-bold">
                        MODULE FEATURE {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-base text-slate-900 leading-tight font-black">
                      {feature.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {feature.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Clearance State</span>
                    <span className="text-emerald-500 font-bold flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Compliant</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live CTA for demo arrangement */}
        <div className="bg-amber-50/70 border-2 border-amber-150 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Automating General Aviation Clearance Protocols
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Link private flying, aerial mapping and agricultural permits with regulatory portals seamlessly while maintaining perfect audit compliance logs.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-sm"
            >
              Back to Catalog
            </button>
            <button 
              onClick={() => onBookDemo("General Aviation Flight Permits Demo")}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-705 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <span>Schedule Live Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
