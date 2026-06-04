import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  Database,
  Plane,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface FlightPermitDetailProps {
  onBack: () => void;
  onBookDemo: (serviceName: string) => void;
}

export default function FlightPermitDetail({ onBack, onBookDemo }: FlightPermitDetailProps) {
  // Let the user interact with the schedule module features!
  const [activeModule, setActiveModule] = useState<'seasonal' | 'calendar' | 'daily' | 'reporting' | 'statistics'>('seasonal');

  const keyBenefits = [
    "Advanced automated flight permit solution for Bangladesh airspace",
    "Streamlines aviation permit and flight permit processing",
    "Enhances efficiency in flight operations systems",
    "Reduces turnaround time with secure digital workflows",
    "Improves accuracy and stakeholder coordination",
    "Supports modern aviation management and operational performance"
  ];

  return (
    <div id="flight-permit-detail-page" className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Decorative Hero Top Header */}
      <section id="flight-permit-hero" className="flight-permit-hero-wrapper bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-505/20 via-transparent to-transparent opacity-60" />
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="flight-permit-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Back trigger button */}
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-mono tracking-wider text-sky-400 hover:text-sky-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 py-2 px-4 rounded-xl smooth-transition uppercase cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to services</span>
          </button>

          <div className="space-y-4 max-w-4xl font-sans">
            
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Automated Flight Permit System
            </h1>
            
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-light">
              A modern, fully digital solution designed to automate flight permit processing across Bangladesh airspace, replacing traditional paper-based workflows with a secure and efficient electronic system. It enhances aviation management, improves coordination, and supports smooth flight operations systems.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section id="flight-permit-content" className="flight-permit-content-wrapper py-12">
        <div className="flight-permit-content-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Key Benefits and general description */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Key Benefits Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-5.5 w-5.5 text-emerald-600" />
                <span>Key Benefits</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Engineered to streamline and accelerate validation compliance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyBenefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-slate-50 hover:bg-slate-100/50 border border-slate-150 rounded-xl space-y-2 smooth-transition"
                >
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                    <span className="text-xs font-mono font-bold tracking-wide uppercase text-slate-500">Feature 0{idx + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Informative workflow block */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10">
              <Plane className="h-64 w-64 transform -rotate-45 text-white" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-semibold tracking-wider text-indigo-400 uppercase">Operational Protocol</span>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">How Bangladesh Airspace Automation Works</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-light">
              By replacing legacy facsimile transmissions and physical ledger authorizations, this digitized gateway provides real-time civil aviation telemetry pipelines. Airlines submit automated permit requests mapped directly along registered Air Route networks, bypassing bureaucratic delays while maintaining complete compliance logs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-center">
              <div className="space-y-1 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-indigo-400 font-bold block text-lg font-mono">98%</span>
                <span className="text-slate-400 font-medium">Auto-Verification Rate</span>
              </div>
              <div className="space-y-1 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sky-400 font-bold block text-lg font-mono">&lt; 15m</span>
                <span className="text-slate-400 font-medium">Average Processing Time</span>
              </div>
              <div className="space-y-1 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-emerald-400 font-bold block text-lg font-mono">100%</span>
                <span className="text-slate-400 font-medium">Digital Audit Trail</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Schedule Module Features */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Module interactive container */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2 text-indigo-650">
                <Layers className="h-5 w-5" />
                <h2 className="text-lg font-bold font-display text-slate-900">Schedule Module Features</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">Select a module feature tab below to explore details.</p>
            </div>

            {/* Quick module selection list tabs */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveModule('seasonal')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border smooth-transition text-left cursor-pointer ${
                  activeModule === 'seasonal'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold'
                    : 'bg-slate-50 border-slate-150 text-slate-750 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <span className="text-base">📅</span>
                  <div>
                    <p className="font-semibold text-slate-900">Seasonal Permits</p>
                    <p className="text-[10px] text-slate-500 font-normal">Long-term flight schedules and recurring permits</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-md uppercase">Active</span>
              </button>

              <button
                onClick={() => setActiveModule('calendar')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border smooth-transition text-left cursor-pointer ${
                  activeModule === 'calendar'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold'
                    : 'bg-slate-50 border-slate-150 text-slate-750 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <span className="text-base">🗓</span>
                  <div>
                    <p className="font-semibold text-slate-900">Calendar View</p>
                    <p className="text-[10px] text-slate-500 font-normal">Visual multi-dimension scheduling grids</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveModule('daily')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border smooth-transition text-left cursor-pointer ${
                  activeModule === 'daily'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold'
                    : 'bg-slate-50 border-slate-150 text-slate-750 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <span className="text-base">📌</span>
                  <div>
                    <p className="font-semibold text-slate-900">Daily Permits View</p>
                    <p className="text-[10px] text-slate-500 font-normal">Real-time status updates and daily arrivals</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveModule('reporting')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border smooth-transition text-left cursor-pointer ${
                  activeModule === 'reporting'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold'
                    : 'bg-slate-50 border-slate-150 text-slate-750 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <span className="text-base">📊</span>
                  <div>
                    <p className="font-semibold text-slate-900">Reporting Facility</p>
                    <p className="text-[10px] text-slate-500 font-normal">Operational telemetry summaries & exports</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveModule('statistics')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border smooth-transition text-left cursor-pointer ${
                  activeModule === 'statistics'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold'
                    : 'bg-slate-50 border-slate-150 text-slate-750 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <span className="text-base">📈</span>
                  <div>
                    <p className="font-semibold text-slate-900">Airlines Statistics</p>
                    <p className="text-[10px] text-slate-500 font-normal">Carrier insights, schedules & metrics</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Dynamic Content Display Block based on Active Tab */}
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 sm:p-5 text-xs text-slate-700 space-y-3.5">
              {activeModule === 'seasonal' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-650 font-mono">📅 SEASONAL PERMITS MODULE</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[9px]">ONLINE</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 font-medium">
                    Manage long-term and seasonal flight permit requirements efficiently. Automatically coordinates recurring airline flight numbers, schedules, or clearance slots for summer and winter rosters.
                  </p>
                  <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1 font-mono text-[10.5px]">
                    <div className="flex justify-between font-bold text-slate-800 border-b border-dashed border-slate-100 pb-1 mb-1">
                      <span>Carrier Roster</span>
                      <span>Clearance Status</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BG-088 (DAC-JFK) - Daily</span>
                      <span className="text-emerald-600">✓ Seasonal Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SQ-446 (SIN-DAC) - Bi-weekly</span>
                      <span className="text-emerald-600">✓ Seasonal Active</span>
                    </div>
                  </div>
                </>
              )}

              {activeModule === 'calendar' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-650 font-mono">🗓 CALENDAR SCHEDULER</span>
                    <span className="px-1.5 py-0.5 bg-sky-100 text-sky-800 rounded font-bold text-[9px]">INTERACTIVE</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 font-medium">
                    Visual scheduling system for better planning and operational visibility. Avoid congested ground times with intuitive visual block mappings across airspace checkpoints.
                  </p>
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] mt-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <span key={i} className="bg-slate-200 rounded p-1 font-bold">{day}</span>
                    ))}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className={`rounded p-1 ${i === 4 || i === 9 ? 'bg-indigo-500 text-white font-bold' : 'bg-white border border-slate-205'}`}>
                        {i + 1}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {activeModule === 'daily' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-650 font-mono">📌 DAILY PERMITS PANEL</span>
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-850 rounded font-bold text-[9px]">REAL-TIME</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 font-medium">
                    Real-time tracking of daily permit approvals and activities. Immediate transponder registration checking for charter, medical, and ad-hoc VIP diplomatic movements entering Bangladesh FIR.
                  </p>
                  <div className="space-y-1.5 font-mono text-[10px] bg-white p-3 border border-slate-150 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 font-bold font-sans">#BG-DP-2026-904</span>
                      <span className="text-emerald-600 font-bold uppercase">Approved</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-500">
                      <span>B773 Overflight Entry: 14:22 UTC</span>
                      <span>HMR Active</span>
                    </div>
                  </div>
                </>
              )}

              {activeModule === 'reporting' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-650 font-mono">📊 DETAILED REPORTING FACILITY</span>
                    <span className="px-1.5 py-0.5 bg-violet-100 text-violet-850 rounded font-bold text-[9px]">CSV/PDF</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 font-medium">
                    Generate detailed operational reports for analysis and decision-making. Direct API feeds export air traffic control data patterns with precise timeline charts.
                  </p>
                  <div className="flex space-x-2 pt-1">
                    <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md font-bold uppercase tracking-wider text-[9px] hover:bg-indigo-700 transition">
                      Download PDF report
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-slate-205 text-slate-700 rounded-md font-bold uppercase tracking-wider text-[9px] hover:bg-slate-100 transition">
                      Export CSV
                    </button>
                  </div>
                </>
              )}

              {activeModule === 'statistics' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-655 font-mono">📈 AIRLINE STATISTICS</span>
                    <span className="px-1.5 py-0.5 bg-teal-100 text-teal-800 rounded font-bold text-[9px]">ANALYTICS</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 font-medium">
                    Comprehensive data insights and airline performance analytics. Track seasonal capacity ratios, flight compliance metrics, and billing invoice generation timelines live.
                  </p>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-505">
                    <span>Airspace Utilization Rate</span>
                    <span className="text-slate-805 font-bold">82% Capacity</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Quick System Access Inquiry Side Panel Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-150 p-6 sm:p-8 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold font-display text-slate-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Request Custom Deployment?</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We can guide your civil aviation regulators or airspace stakeholders through a real-world feasibility proposal tailored to your FIR boundaries.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('contact-and-outreach');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onBack(); // go back to services where the contact form is visible
                  setTimeout(() => {
                    const elHome = document.getElementById('contact-and-outreach');
                    if (elHome) elHome.scrollIntoView({ behavior: 'smooth' });
                  }, 180);
                }
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl text-xs uppercase tracking-wider smooth-transition cursor-pointer shadow-lg shadow-indigo-600/10"
            >
              Inquire System Access
            </button>
          </div>

        </div>

      </div>
      </section>

    </div>
  );
}
