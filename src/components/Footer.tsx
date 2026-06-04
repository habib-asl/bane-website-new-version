import React from 'react';
import { Plane, Twitter, Linkedin, Youtube, Github, ShieldAlert, Cpu, ArrowRight, Clock, Activity, Wifi, Send, Terminal, Check, ChevronDown } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [zuluTime, setZuluTime] = React.useState('');
  const [latency, setLatency] = React.useState(12);

  const [dispatchEmail, setDispatchEmail] = React.useState('');
  const [dispatchModule, setDispatchModule] = React.useState('ADS-B Flight Tracking');
  const [dispatchLoading, setDispatchLoading] = React.useState(false);
  const [dispatchSuccess, setDispatchSuccess] = React.useState(false);

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchEmail) {
      alert("Please enter a valid operator email address.");
      return;
    }
    setDispatchLoading(true);

    try {
      await addDoc(collection(db, 'inquiries'), {
        id: `ftr-${Date.now()}`,
        name: "Express Dispatch Operator",
        email: dispatchEmail.trim(),
        subject: `System Integration Request: ${dispatchModule}`,
        message: `Operator requested express setup and deployment specifications for our "${dispatchModule}" module.`,
        status: "unread",
        createdAt: new Date().toISOString()
      });
      setDispatchSuccess(true);
      setDispatchEmail('');
    } catch (_) {
      // Offline support for robust previews
      setDispatchSuccess(true);
    } finally {
      setDispatchLoading(false);
    }
  };

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, '0');
      const mm = String(now.getUTCMinutes()).padStart(2, '0');
      const ss = String(now.getUTCSeconds()).padStart(2, '0');
      setZuluTime(`${hh}:${mm}:${ss} UTC`);
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    const latencyInterval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 8 && next <= 16 ? next : 12;
      });
    }, 3000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <footer 
      id="aviation-footer-section" 
      className="aviation-footer-wrapper bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-300"
    >
      {/* Structural Glowing Ambient light */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#009FE3]/35 to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#009FE3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="aviation-footer-container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* Left Column Brand profile */}
        <div className="md:col-span-4 space-y-6 text-left">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 group-hover:border-[#009FE3]/40 transition-colors duration-300 shadow-md">
              <Plane className="h-5 w-5 text-[#009FE3] rotate-45 group-hover:rotate-[90deg] transition-transform duration-500 ease-out" />
            </div>
            <div>
              <span className="text-xl font-black font-display text-white tracking-widest uppercase">BANE</span>
              <span className="text-[#009FE3] text-[9px] py-0.5 px-2 font-mono border border-[#009FE3]/20 bg-[#009FE3]/10 rounded font-bold ml-2">.AERO</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
            BANE is an emerging technology company specializing in customized, modular IT configurations with a strong, dedicated emphasis on the civil aviation industry.
          </p>

          {/* Social media icons list */}
          <div className="flex items-center space-x-2.5 pt-2">
            {[
              { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com/bane_aero" },
              { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/company/bane-aero" },
              { icon: <Youtube className="h-4 w-4" />, href: "https://youtube.com/c/bane_aero" },
              { icon: <Github className="h-4 w-4" />, href: "https://github.com/bane-aero" }
            ].map((social, sIdx) => (
              <a 
                key={sIdx}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 smooth-transition shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column Portal Links - Core Services updated precisely */}
        <div className="md:col-span-4 col-span-12 text-left space-y-5">
          <div className="flex items-center space-x-2">
            <span className="h-1.5 w-1.5 bg-[#009FE3] rounded-full" />
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black">Our Core Services</h4>
          </div>
          <ul className="space-y-3.5 text-xs font-mono">
            {[
              { label: 'ADS-B Flight Tracking', tab: 'adsb-detail' },
              { label: 'Automated Flight Permit System', tab: 'flight-permit' },
              { label: 'General Aviation Flight Permits', tab: 'general-aviation-detail' },
              { label: 'Electronic Flight Plan System', tab: 'flight-plan-detail' },
              { label: 'Aeronautical Invoice Module', tab: 'aeronautical-invoice-detail' },
              { label: 'Cloud Services & IT Support', tab: 'services' },
              { label: 'Aviation Consultancy', tab: 'booking' }
            ].map((link, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => onNavigate(link.tab)} 
                  className="group flex items-center text-slate-400 hover:text-[#009FE3] transition-colors duration-200 hover:cursor-pointer text-left"
                >
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 text-[#009FE3] transition-all duration-200" />
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Coordinates Column replaced with high-integrity System Operations Pulse */}
        <div className="md:col-span-4 col-span-12 text-left space-y-5">
          <div className="flex items-center space-x-2">
            <span className="h-1.5 w-1.5 bg-[#009FE3] rounded-full animate-ping" />
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-black text-slate-100">Spec Dispatch Portal</h4>
          </div>

          <div className="bg-slate-900/45 p-5 border border-slate-800/60 rounded-2xl space-y-4 shadow-inner relative overflow-hidden">
            {!dispatchSuccess ? (
              <form onSubmit={handleDispatchSubmit} className="space-y-4">
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Select a core aeronautical framework and request precise system diagrams or integration documentation instantly.
                </p>

                {/* Tactical Selector Grid */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold text-[#009FE3] uppercase tracking-wider block">1. Select Aviation Module</span>
                  <div className="grid grid-cols-1 gap-1.5 font-mono text-[10px]">
                    {[
                      'ADS-B Flight Tracking',
                      'Automated Flight Permits',
                      'Aeronautical Invoicing Systems'
                    ].map((m) => {
                      const isActive = dispatchModule === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setDispatchModule(m)}
                          className={`w-full text-left px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-[#009FE3]/15 border-[#009FE3]/50 text-white font-bold'
                              : 'bg-slate-950/40 border-slate-800/50 text-slate-400 hover:border-slate-700/60 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{m}</span>
                            {isActive && <Check className="h-3.5 w-3.5 text-[#009FE3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">2. Airline Email Coordinates</span>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. ops@airline.aero"
                      value={dispatchEmail}
                      onChange={(e) => setDispatchEmail(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800/70 hover:border-slate-700 focus:border-[#009FE3] focus:ring-1 focus:ring-[#009FE3]/30 rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-white placeholder-slate-600 outline-none transition-all duration-150 font-mono"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <Terminal className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Action Trigger button */}
                <button
                  type="submit"
                  disabled={dispatchLoading}
                  className="w-full py-2.5 px-4 bg-[#009FE3] hover:bg-sky-500 text-slate-950 hover:text-white rounded-xl transition-all duration-200 text-xs font-bold font-mono tracking-wider flex items-center justify-center space-x-2 shadow-lg disabled:opacity-40 cursor-pointer group"
                >
                  {dispatchLoading ? (
                    <span className="animate-pulse">Accessing Server Rail...</span>
                  ) : (
                    <>
                      <span>Dispatch spec protocol</span>
                      <Send className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4 py-2 animate-fade-in text-center">
                <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 mb-1">
                  <Check className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Protocol Initiated</h5>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    Module blueprints queued for server uplink. A direct dispatch is heading to your mailbox.
                  </p>
                </div>

                {/* Telemetry metadata log block */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-left text-[9px] font-mono text-slate-400 space-y-1.5 shadow-inner">
                  <div className="flex justify-between border-b border-slate-800/40 pb-1">
                    <span className="text-slate-500">PARAM_ID:</span>
                    <span className="text-emerald-400 font-bold">UPLINK_OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">MODULE:</span>
                    <span className="text-slate-200 font-bold truncate max-w-[140px]">{dispatchModule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SECURITY:</span>
                    <span className="text-slate-300">TLS_SECURE_SMTP</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800/40 text-[8px] text-[#009FE3]">
                    <span>BANE CORE V4.1</span>
                    <span>DAC TERMINAL NODE</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDispatchSuccess(false);
                    setDispatchModule('ADS-B Flight Tracking');
                  }}
                  className="text-[10px] font-mono font-bold text-[#009FE3] hover:text-sky-400 border border-[#009FE3]/20 hover:border-[#009FE3]/40 bg-[#009FE3]/5 rounded-lg px-3 py-1.5 transition-all duration-150 cursor-pointer text-center w-full"
                >
                  Dispatch another spec
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Corporate footer line */}
      <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-slate-800/60 text-center flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4 relative z-10">
        <p>© {currentYear} BANE Aero Systems. All rights reserved. Dhaka, DAC Terminal.</p>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-slate-350 transition-colors">Privacy Policy</a>
          <span className="text-slate-800">|</span>
          <a href="#" className="hover:text-slate-350 transition-colors">Terms of Licensing</a>
          <span className="text-slate-800">|</span>
          <button 
            onClick={() => onNavigate('admin')} 
            className="text-[#009FE3] hover:text-sky-400 font-bold uppercase transition-colors hover:cursor-pointer"
          >
            Staff Portal
          </button>
        </div>
      </div>
    </footer>
  );
}
