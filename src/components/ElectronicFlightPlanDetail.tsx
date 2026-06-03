import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Activity, 
  Send, 
  CheckCircle2, 
  Cpu, 
  ShieldAlert, 
  Compass, 
  Layers, 
  ClipboardCheck, 
  ChevronRight, 
  TrendingUp, 
  Database,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface ElectronicFlightPlanDetailProps {
  onBack: () => void;
  onBookDemo: (serviceName: string) => void;
}

export default function ElectronicFlightPlanDetail({ onBack, onBookDemo }: ElectronicFlightPlanDetailProps) {
  const [activeSubmissions, setActiveSubmissions] = useState(384);
  const [approvalRate, setApprovalRate] = useState(99.4);
  const [pendingCounter, setPendingCounter] = useState(5);

  // Live telemetry metrics simulator to mimic dynamic high fidelity aviation control rooms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubmissions(prev => Math.max(370, Math.min(410, prev + Math.floor(Math.random() * 3) - 1)));
      setApprovalRate(prev => Math.max(99.1, Math.min(99.8, parseFloat((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)))));
      setPendingCounter(prev => Math.max(2, Math.min(9, prev + Math.floor(Math.random() * 3) - 1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Electronic Flight Plan Submission System",
      desc: "Fully digitized interface that transmits plan packets to Eurocontrol, FAA, and target FIRs with zero physical overhead.",
      icon: Send,
      category: "Digital Dispatch",
      color: "bg-purple-55 text-purple-700 border-purple-100"
    },
    {
      title: "Automated Approval Process for Faster Clearance",
      desc: "Embedded validation rule processor matches airframe speed and altitude indices against active airway slots automatically.",
      icon: ClipboardCheck,
      category: "Routing & Airspace",
      color: "bg-[#009FE3]/10 text-[#009FE3] border-cyan-100"
    },
    {
      title: "Integrated Flight Tracking with Flight Plan Data",
      desc: "Continuous real-time correlation between physical radar plots and active pre-filed navigation route profiles.",
      icon: Activity,
      category: "Data Calibration",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      title: "Supports Flight Operations and Air Traffic Coordination",
      desc: "Instant shared visual ledger shared simultaneously across multiple controllers, flight bureaus, and dispatch desks.",
      icon: Compass,
      category: "ATM Operations",
      color: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
      title: "Ensures Compliance with Aviation Authority Requirements",
      desc: "Continuous schema validation with up-to-date ICAO/FAA Flight Plan forms and air traffic safety parameters.",
      icon: Database,
      category: "Safety & Sovereignty",
      color: "bg-rose-50 text-rose-700 border-rose-100"
    },
    {
      title: "Improves Efficiency and Reduces Manual Processing Time",
      desc: "Bypasses legacy fax and voice systems, shortening submission-to-release loop from hours to mere seconds.",
      icon: TrendingUp,
      category: "Performance Analysis",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100"
    }
  ];

  return (
    <div id="electronic-flight-plan-detail-page" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Simulated URL Path indicator for precise web-route fidelity */}
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
              <span className="text-purple-600 font-bold">/electronic-flight-plan-system</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-ping" />
            <span>Digital Signature Verified</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Navigation & Breadcrumbs Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button 
            onClick={onBack}
            className="group/btn inline-flex items-center space-x-2 text-xs font-mono font-black uppercase tracking-wider text-slate-700 hover:text-purple-600 bg-white border-2 border-slate-200/80 hover:border-purple-600/40 py-3 px-6 rounded-2xl transition duration-250 cursor-pointer shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover/btn:-translate-x-1 transition-transform" />
            <span>Back to core services</span>
          </button>
          
          <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-150 text-purple-700 px-4 py-2 rounded-2xl text-xs font-mono font-bold tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span>Flight Operations Terminal</span>
          </div>
        </div>

        {/* Hero Section Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Slate & Purple Block layout */}
          <div className="lg:col-span-8 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between border border-purple-900/40">
            {/* Visual background accents */}
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-12 right-12 text-purple-500/10 pointer-events-none">
              <FileText className="h-64 w-64" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-white border border-white/10 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>State-of-the-Art Operations Planning</span>
              </div>
              <h1 className="text-3.5xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white">
                Electronic Flight <br />
                <span className="text-purple-400 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">Plan System</span>
              </h1>
              
              <p className="text-slate-300 font-medium text-base sm:text-lg max-w-2xl leading-relaxed">
                The Electronic Flight Plan System enables easy, accurate, and fully digital flight plan filing and approval. It supports efficient flight operations and air traffic coordination, while ensuring compliance with aviation authority requirements. The system is integrated with aviation IT platforms to improve efficiency and reduce processing time.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-purple-900/70 grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Submissions / day</span>
                <span className="text-lg font-bold text-white font-mono">{activeSubmissions} filings</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Approval Rate</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{approvalRate}%</span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Approval Speed</span>
                <span className="text-lg font-bold text-sky-400 font-mono">&lt; 15 seconds</span>
              </div>
            </div>
          </div>

          {/* Right Column Status Board Card */}
          <div className="lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-2xl text-purple-600 inline-block">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Queue Monitor</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Direct connection with airway control registries and international airspace flow slots, ensuring optimal dispatch clearance.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3.5">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Pending Approvals</span>
                <span className="text-xs font-mono font-bold bg-amber-50 text-amber-600 border border-amber-150 px-2.5 py-1 rounded-lg">
                  {pendingCounter} in queue
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Filing Standard</span>
                <span className="text-xs font-mono font-bold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg">
                  ICAO FPL 2012
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Key Features Block */}
        <div id="flight-plan-features" className="space-y-6">
          <div>
            <span className="text-xs font-mono font-extrabold text-purple-600 uppercase tracking-widest block mb-2">Technical Matrix</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900">
              Key Features & Operational Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => {
              const IconComponent = feat.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white border-2 border-slate-200/95 hover:border-purple-600/30 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-600">
                      {feat.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 transition-colors duration-350 ${feat.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-bold">
                        MODULE FEATURE {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-base text-slate-900 leading-relaxed font-black">
                      {feat.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {feat.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Telemetric State</span>
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

        {/* Live CTA Box for Operator and Admin booking */}
        <div className="bg-purple-50/70 border-2 border-purple-100 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Ready to Connect with Your Airport FDP System?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Let our aviation systems integration squad custom build or link your local Air Traffic databases securely with minimal friction.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-sm"
            >
              Back to Panel
            </button>
            <button 
              onClick={() => onBookDemo("Electronic Flight Plan System Demo")}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-lg shadow-purple-500/10"
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
