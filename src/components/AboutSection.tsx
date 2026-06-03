import React from 'react';
import { 
  Activity, 
  Receipt, 
  Share2, 
  TrendingUp, 
  Cloud, 
  Wrench, 
  HelpCircle,
  CheckCircle2,
  Target,
  Eye
} from 'lucide-react';

export default function AboutSection() {
  const keyFeatures = [
    {
      icon: <Activity className="h-6 w-6 text-sky-600" />,
      title: "Real-time ADS-B tracking",
      desc: "Real-time ADS-B flight & aircraft tracking"
    },
    {
      icon: <Receipt className="h-6 w-6 text-indigo-600" />,
      title: "Aeronautical billing",
      desc: "Integrated aeronautical billing system"
    },
    {
      icon: <Share2 className="h-6 w-6 text-indigo-600" />,
      title: "Data workflow support",
      desc: "Supports air traffic management & operational data flow"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-sky-600" />,
      title: "Aviation efficiency",
      desc: "Enhances commercial & business aviation efficiency"
    },
    {
      icon: <Cloud className="h-6 w-6 text-indigo-600" />,
      title: "Cloud-based solutions",
      desc: "Scalable cloud-based aviation IT solutions"
    },
    {
      icon: <Wrench className="h-6 w-6 text-sky-600" />,
      title: "Reliable IT support",
      desc: "Reliable IT support services"
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-indigo-600" />,
      title: "Expert consultancy",
      desc: "Expert aviation consultancy services"
    }
  ];

  return (
    <>
      {/* Key Features Bento Grid */}
      <section id="about-section" className="about-section-wrapper py-20 sm:py-24 bg-[#fafafc] border-t border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="about-section-container max-w-7xl mx-auto space-y-16">
          
          {/* Headings */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 text-sky-600">
              <span className="text-md">✈️</span>
              <h2 className="text-xs font-mono tracking-widest uppercase font-bold text-sky-600">Overview Features</h2>
            </div>
            <p className="text-3.5xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Key Features
            </p>
            <div className="h-0.5 w-12 bg-sky-500 mx-auto rounded-full" />
            <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Comprehensive suite of custom, modular IT configurations and digital systems engineered to optimize airfield capacities.
            </p>
          </div>

          {/* Bento Grid Features Layout with high contrast and precision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((f, idx) => (
              <div 
                key={idx} 
                className={`bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 rounded-2xl space-y-4 hover:shadow-md smooth-transition group hover:border-sky-350 ${
                  idx === keyFeatures.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl inline-block shadow-sm group-hover:bg-sky-50 smooth-transition">
                  {f.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-sky-600 smooth-transition">
                  {f.title}
                </h3>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* About BANE Company Details Section */}
      <section id="about-bane-company-narrative" className="py-24 bg-white border-t border-b border-slate-200/60 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,159,227,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,159,227,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Polished Visual Feature Block */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#009FE3]/10 rounded-full blur-3xl group-hover:bg-[#009FE3]/15 transition-all duration-500" />
                
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-xl text-[10px] font-mono tracking-widest text-[#009FE3] font-bold uppercase">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Global Competence</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight">
                    Operational & Aeronautical Success
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Connecting complex telemetry registries with reliable financial metrics to secure operational excellence.
                  </p>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <span className="block text-xl sm:text-2xl font-extrabold text-[#009FE3] font-mono">ANSPs</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Trusted Integration</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <span className="block text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">100%</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Operational Transparency</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimalist interactive badge row */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500">SYSTEM ARCHITECTURE</span>
                <span className="text-[11px] font-mono font-black text-[#009FE3] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">CLOUD-NATIVE V2.4</span>
              </div>
            </div>

            {/* Right Column: Structured Narrative Paragraphs from User */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-[#009FE3]">
                  <span className="text-lg">🏢</span>
                  <h2 className="text-xs font-mono tracking-widest uppercase font-black text-[#009FE3]">ABOUT OUR COMPANY</h2>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
                  About BANE
                </h3>
                <div className="h-1 w-16 bg-[#009FE3] rounded-full" />
              </div>

              <div className="space-y-6 text-slate-700">
                {/* Paragraph 1 */}
                <div className="p-5 bg-sky-50/50 border-l-4 border-[#009FE3] rounded-r-2xl">
                  <p className="text-base sm:text-lg font-semibold leading-relaxed text-slate-800">
                    BANE is a company with experience in providing a comprehensive range of reliable and innovative solutions for the Aviation Industry.
                  </p>
                </div>

                {/* Paragraph 2 */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase font-bold">Solutions Breakdown</h4>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                    Working with Air Navigations Service Providers (ANSPs) and Airports we have developed Operational and Aeronautical Finance Systems that are unique across the industry. Our understanding of aviation business helped us to develop operational and financial data into real-world context, delivering meaningful information to support aviation business operations. BANE provides advanced analytics tools addressing the most pressing industry issues.
                  </p>
                </div>

                {/* Paragraph 3 */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase font-bold">Our Philosophy & Dedication</h4>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                    With a personal based approach, BANE delivers the highest standards of service and technical competence to reflect both industry and individual requirements. We are dedicated to enhancing the efficiency, accuracy, and transparency of aviation operations through innovative technology.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="bane-mission-vision" className="py-20 sm:py-24 bg-[#fafafc] border-b border-slate-200/60 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative target background */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.02] transform translate-x-12 translate-y-12">
          <Target className="h-96 w-96 text-[#009FE3]" />
        </div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
            <div className="inline-flex items-center space-x-2 text-[#009FE3]">
              <span className="text-md">🚀</span>
              <h2 className="text-xs font-mono tracking-widest uppercase font-black text-[#009FE3]">PURPOSE & OUTLOOK</h2>
            </div>
            <p className="text-3.5xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Our Strategic Framework
            </p>
            <div className="h-0.5 w-12 bg-[#009FE3] mx-auto rounded-full" />
            <p className="text-slate-500 font-medium text-xs sm:text-sm max-w-lg mx-auto">
              Shaping the future of aeronautical telemetry and operational accuracy with dedicated industry leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Mission Card */}
            <div className="bg-white border-2 border-slate-200/85 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-lg hover:border-[#009FE3]/30 smooth-transition flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl text-sky-600 inline-block group-hover:bg-[#009FE3] group-hover:text-white transition-all duration-305 shrink-0">
                  <Target className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight flex items-center space-x-2">
                    <span>Mission</span>
                  </h3>
                  <div className="h-0.5 w-8 bg-[#009FE3]" />
                  <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed pt-2">
                    At BANE, our mission is to transform the industry and aviation sector by offering innovative IT solutions that elevate operational efficiency. We strive to empower regulatory authorities and industry stakeholders with advanced technologies that streamline processes, improve safety, and drive growth.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Core Catalyst</span>
                <span className="text-[#009FE3] font-bold">Operational Efficiency</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white border-2 border-slate-200/85 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-lg hover:border-indigo-500/30 smooth-transition flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 inline-block group-hover:bg-indigo-650 group-hover:text-white transition-all duration-305 shrink-0">
                  <Eye className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight flex items-center space-x-2">
                    <span>Vision</span>
                  </h3>
                  <div className="h-0.5 w-8 bg-indigo-500" />
                  <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed pt-2">
                    Our vision at BANE is to be renowned for our innovation, expertise, and commitment to reshaping industries, particularly in the aviation sector. We aim to set new standards in airspace management and operational efficiency by leveraging advanced technology and fostering strong partnerships with our clients.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Future Horizon</span>
                <span className="text-indigo-650 font-bold">Global Industry Standard</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
