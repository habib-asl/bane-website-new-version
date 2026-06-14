import React from 'react';
import { 
  Radio, 
  FileText, 
  Plane, 
  Cloud, 
  Cpu, 
  Users, 
  ChevronRight, 
  Check,
  Compass
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onReadMore?: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService, onReadMore }: ServicesProps) {
  const services = [
    {
      icon: <Radio className="h-6 w-6 text-sky-600" />,
      emoji: "🛰",
      title: "ADS-B Flight Tracking",
      badge: "Real-time Telemetry",
      desc: "Real-time monitoring and analysis of aircraft movements for improved airspace visibility.",
      features: [
        "Live transponder coordination",
        "Fine ground & air radar telemetry",
        "Airspace flow visibility tracking"
      ],
      color: "from-sky-500/5 to-transparent",
      borderColor: "border-sky-200/50"
    },
    {
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      emoji: "📝",
      title: "Automated Flight Permit System",
      badge: "Digital Approvals",
      desc: "Digital system for managing flight permits, seasonal approvals, scheduling, reporting, and airline statistics.",
      features: [
        "Permits authorization indexing",
        "Airline schedule consolidation",
        "Seasonal operations statistics"
      ],
      color: "from-indigo-500/5 to-transparent",
      borderColor: "border-indigo-200/50"
    },
    {
      icon: <Compass className="h-6 w-6 text-amber-600" />,
      emoji: "🛩️",
      title: "General Aviation Flight Permits (Non-Scheduled)",
      badge: "Non-Scheduled Permits",
      desc: "Automated permit processing for general aviation and non-scheduled flights, including private flying, training, surveying, agriculture, and business aviation.",
      features: [
        "Private flying & corporate approvals",
        "Training, agriculture & survey flights",
        "Fast automated processing & syncing"
      ],
      color: "from-amber-500/5 to-transparent",
      borderColor: "border-amber-200/50"
    },
    {
      icon: <Plane className="h-6 w-6 text-purple-600" />,
      emoji: "✈️",
      title: "Electronic Flight Plan System",
      badge: "Workflow Automation",
      desc: "Simplifying digital flight plan submission and approval for faster, compliant, and efficient aviation operations.",
      features: [
        "Direct transponder submission link",
        "FAA & ICAO regulatory compliance",
        "Zero-delay dispatch approvals"
      ],
      color: "from-purple-500/5 to-transparent",
      borderColor: "border-purple-200/50"
    },
    {
      icon: <FileText className="h-6 w-6 text-emerald-600" />,
      emoji: "🧾",
      title: "Aeronautical Invoice Module",
      badge: "Automated Billing",
      desc: "An automated billing system that compiles flight activity data and generates accurate invoices based on applicable charges.",
      features: [
        "Dynamic flight activity compiling",
        "Applicable tariff charge rating",
        "Seamless digital reconciliation"
      ],
      color: "from-emerald-500/5 to-transparent",
      borderColor: "border-emerald-200/50"
    },
    {
      icon: <Cloud className="h-6 w-6 text-blue-600" />,
      emoji: "☁",
      title: "Cloud Services",
      badge: "Managed Infrastructure",
      desc: "Scalable cloud infrastructure to support modern aviation operations and digital transformation.",
      features: [
        "High availability hot standby",
        "Cloud virtualization setups",
        "Encrypted multi-node databases"
      ],
      color: "from-blue-500/5 to-transparent",
      borderColor: "border-blue-200/50"
    },
    {
      icon: <Cpu className="h-6 w-6 text-emerald-600" />,
      emoji: "💻",
      title: "IT Support",
      badge: "24/7 Response Desk",
      desc: "Reliable technical support ensuring smooth system performance, networks, and infrastructure stability.",
      features: [
        "Emergency ticketing support desk",
        "FIDS display panel troubleshooting",
        "Airfield hardware diagnostics"
      ],
      color: "from-emerald-500/5 to-transparent",
      borderColor: "border-emerald-200/50"
    },
    {
      icon: <Users className="h-6 w-6 text-pink-600" />,
      emoji: "📡",
      title: "Aviation Consultancy",
      badge: "Strategic ATM Plans",
      desc: "Expert advisory services in ATM operations, technical systems, and financial optimization.",
      features: [
        "ATM throughput optimizations",
        "Revenue tariff configurations",
        "IT infrastructure architecture"
      ],
      color: "from-pink-500/5 to-transparent",
      borderColor: "border-pink-200/50"
    }
  ];

  return (
    <section id="services-suite" className="services-section-wrapper py-20 sm:py-24 bg-white border-t border-slate-150 px-4 sm:px-8 xl:px-16">
      <div className="services-section-container max-w-[1600px] mx-auto space-y-16">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4">

          <p className="text-3.5xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            Creative Solutions
          </p>
          <div className="h-0.5 w-12 bg-indigo-500 mx-auto rounded-full" />
          <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
            Eliminate operational deficits and modernize backend ATM workflows with our specialized modular systems catalog.
          </p>
        </div>

        {/* Services Grid (6 Columns/Bento Grid style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <div 
              key={idx}
              className={`bg-white border ${item.borderColor} bg-gradient-to-br ${item.color} p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:scale-[1.015] hover:border-sky-350 hover:shadow-xl shadow-slate-100 smooth-transition relative group`}
            >
              <div className="space-y-5">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl inline-block shadow-sm group-hover:bg-sky-50 smooth-transition">
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-sky-600 smooth-transition leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>

                {/* Bullets lists */}
                <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2 text-xs text-slate-650 font-medium">
                      <span className="p-0.5 rounded bg-sky-50 border border-sky-100">
                        <Check className="h-3 w-3 text-sky-600" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action trigger buttons */}
              {idx < 5 && (
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => onReadMore?.(item.title)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 hover:bg-sky-600 hover:text-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg smooth-transition cursor-pointer group/btn"
                  >
                    <span>Read more</span>
                    <ChevronRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform shrink-0" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Help block bottom removed as requested */}

      </div>
    </section>
  );
}
