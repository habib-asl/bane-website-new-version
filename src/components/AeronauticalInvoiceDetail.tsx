import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Receipt, 
  Coins, 
  Clock, 
  TrendingUp, 
  Database, 
  ShieldCheck, 
  Check, 
  CheckCircle2, 
  Calculator, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  FileSpreadsheet, 
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface AeronauticalInvoiceDetailProps {
  onBack: () => void;
  onBookDemo: (serviceName: string) => void;
}

export default function AeronauticalInvoiceDetail({ onBack, onBookDemo }: AeronauticalInvoiceDetailProps) {
  // Simulator states for interactive billing showcase
  const [selectedAirframe, setSelectedAirframe] = useState<'A320' | 'B777' | 'ATR72'>('A320');
  const [airspaceDistance, setAirspaceDistance] = useState<number>(310);
  const [calculatedCost, setCalculatedCost] = useState<number>(0);
  const [billsProcessed, setBillsProcessed] = useState<number>(1428);
  const [isComputing, setIsComputing] = useState<boolean>(false);

  // Constants for simulated formulas
  const airframeRates: Record<'A320' | 'B777' | 'ATR72', { weightCoeff: number; codeName: string; baseCharge: number }> = {
    'ATR72': { weightCoeff: 1.2, codeName: 'Aviation Category B', baseCharge: 150 },
    'A320': { weightCoeff: 2.1, codeName: 'Aviation Category C', baseCharge: 280 },
    'B777': { weightCoeff: 3.8, codeName: 'Aviation Category D', baseCharge: 450 }
  };

  useEffect(() => {
    setIsComputing(true);
    const delay = setTimeout(() => {
      const rate = airframeRates[selectedAirframe];
      const formulaResult = rate.baseCharge + (airspaceDistance * rate.weightCoeff);
      setCalculatedCost(Math.round(formulaResult));
      setIsComputing(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [selectedAirframe, airspaceDistance]);

  // Live total parsed counter ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setBillsProcessed(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const coreAeronauticalInvoicingFacts = [
    {
      title: "Automated aeronautical billing and invoice generation",
      desc: "Instantly compiles active airfield logs, flight plans, and tracking telemetry into detailed financial declarations ready for clearance.",
      icon: Receipt,
      category: "Invoice Automation",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      title: "Flight data compilation with accurate invoicing",
      desc: "Intelligently gathers real-time airframe movement data and computes precise navigation, parking, and terminal charges on-the-fly.",
      icon: Database,
      category: "Big Data Ingress",
      color: "bg-sky-50 text-sky-700 border-sky-100"
    },
    {
      title: "Payment gateway integration and auto-charging",
      desc: "Linked directly with global settlement systems and regional payment gateways to prompt instantaneous, secure clearing.",
      icon: Coins,
      category: "Secure Transactions",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    {
      title: "Flight matching and syncing",
      desc: "Synchronizes active airborne transponder tracks with corresponding pre-filed flight plans to verify exact visual paths flown.",
      icon: RefreshCw,
      category: "Data Calibration",
      color: "bg-purple-50 text-purple-700 border-purple-100"
    },
    {
      title: "Client statistics and reporting tools",
      desc: "Equipped with rich diagnostic dashboards presenting airspace usage, bill histories, and live seasonal revenue estimations.",
      icon: TrendingUp,
      category: "Business Intelligence",
      color: "bg-rose-50 text-rose-700 border-rose-100"
    },
    {
      title: "Individual client portal for transparency",
      desc: "Self-service online hub where air operators scan transparent details of active invoices, tracking telemetry logs, and dispute histories.",
      icon: ShieldCheck,
      category: "Self-Service",
      color: "bg-teal-50 text-teal-700 border-teal-100"
    },
    {
      title: "Reduces manual errors and improves efficiency",
      desc: "Completely replaces error-prone paperwork and legacy manual entry with automated calculation rules and rapid electronic filing.",
      icon: FileSpreadsheet,
      category: "Operational Efficiency",
      color: "bg-amber-50 text-amber-750 border-amber-100"
    }
  ];

  return (
    <div id="aeronautical-invoice-detail-page" className="min-h-screen bg-[#fafafc] text-slate-900 font-sans pb-16">
      

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-16 py-12 space-y-12">
        
        {/* Navigation row / return buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button 
            onClick={onBack}
            className="group/btn inline-flex items-center space-x-2 text-xs font-mono font-black uppercase tracking-wider text-slate-700 hover:text-emerald-700 bg-white border-2 border-slate-200/80 hover:border-emerald-600/40 py-3 px-6 rounded-2xl transition duration-250 cursor-pointer shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover/btn:-translate-x-1 transition-transform" />
            <span>Back to services catalog</span>
          </button>
          
        </div>

        {/* Hero Section of Aeronautical Invoice Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual intro card */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#0c231f] via-slate-950 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between border border-emerald-900/40">
            {/* Visual background indicators */}
            <div className="absolute top-1/2 right-0 transform translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
              <Receipt className="h-96 w-96 text-emerald-400" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-white border border-white/10 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span>Next-Gen Operational Finance Systems</span>
              </div>
              
              <h1 className="text-3.5xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white">
                Aeronautical <br className="hidden sm:inline" />
                <span className="text-emerald-400 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">Invoice Module</span>
              </h1>

              <p className="text-slate-350 font-medium text-base sm:text-lg max-w-xl leading-relaxed">
                The Aeronautical Invoice Module is an automated billing system that compiles flight activity data and generates accurate invoices based on applicable charges. It streamlines financial processes for aviation operations, ensuring transparency, efficiency, and faster reconciliation. The system integrates with aviation IT and flight operations systems, supporting effective air traffic management and airport financial workflows.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-emerald-900/50 grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Compiling Engine Status</span>
                <span className="text-sm font-semibold flex items-center text-emerald-400 space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Live</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Total Invoiced (This month)</span>
                <span className="text-sm font-extrabold font-mono text-white">
                  {billsProcessed} invoices
                </span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Audit Agreement Index</span>
                <span className="text-sm font-extrabold font-mono text-white">
                  99.98% Agreed
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Calculation Simulator Block */}
          <div className="lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl inline-block">
                <Calculator className="h-6 w-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Fee Estimation Simulator</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select an aircraft airframe category and airspace miles to view how BANE’s rule engine instantly compiles charges.
                </p>
              </div>

              {/* Airframe toggle */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">Airframe Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ATR72', 'A320', 'B777'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedAirframe(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedAirframe === type 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm' 
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for miles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">Airspace Path Miles</label>
                  <span className="text-xs font-mono font-black text-[#009FE3]">{airspaceDistance} NM</span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={airspaceDistance}
                  onChange={(e) => setAirspaceDistance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Live Cost Output */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none">ESTIMATED BILL</span>
                  <span className="block text-[10px] font-mono text-emerald-600 font-bold leading-tight">
                    {airframeRates[selectedAirframe].codeName}
                  </span>
                </div>
                
                <div className="text-right">
                  {isComputing ? (
                    <RefreshCw className="h-6 w-6 text-slate-400 animate-spin mr-4" />
                  ) : (
                    <span className="text-3xl font-mono font-black text-slate-900">
                      ${calculatedCost.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Calculated Rate Coefficients:</span>
                <span className="text-slate-800 font-bold">x{airframeRates[selectedAirframe].weightCoeff} dynamic</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature grid describing items */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest block mb-2">Systems Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900">
              Financial Integrity & Revenue Assurance Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreAeronauticalInvoicingFacts.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white border-2 border-slate-200/90 hover:border-emerald-600/30 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-default shadow-sm"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-600">
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
                    <span>Validation Compliance</span>
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
        <div className="bg-emerald-50/70 border-2 border-emerald-150 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Reshape Airport Financial Audit Workflows
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our technology team can interface this module with your existing FDP/ATC radar feeds, enabling instantaneous, compliant billing and lightning-fast reconciliations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-sm"
            >
              Back to Catalog
            </button>
            <button 
              onClick={() => onBookDemo("Aeronautical Invoice Module Live Demo")}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-2xl transition duration-150 cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <span>Arrange Integrated Trial</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
