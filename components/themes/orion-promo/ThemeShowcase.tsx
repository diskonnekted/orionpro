import Link from 'next/link';
import { 
  Waves, 
  Truck, 
  Home, 
  Car, 
  CloudRain, 
  Video, 
  Factory, 
  Activity,
  Printer,
  BookOpen,
  School,
  Briefcase,
  Map,
  Code,
  Cpu,
  LucideIcon 
} from 'lucide-react';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  image: string;
}

function SolutionCard({ title, description, icon: Icon, color, bgColor, image }: SolutionCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px] flex flex-col">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 mt-auto">
        <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
             <Icon className={`w-7 h-7 ${color}`} />
        </div>
        <h3 className="text-white font-black text-2xl mb-3 tracking-tight uppercase italic">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {description}
        </p>
        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
          Explore Solution <span className="text-xl">→</span>
        </div>
      </div>
      
      {/* Border Highlight */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-2xl transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}

export default function ThemeShowcase() {
  const solutions = [
    {
      title: "Orion Promo",
      description: "Default promotional theme for Orion CMS",
      icon: Code,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Orion Learning",
      description: "Educational Platform & Course Management",
      icon: BookOpen,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Orion School",
      description: "Academic Institution & School Management",
      icon: School,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      image: "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Orion Portfolio",
      description: "Creative Portfolio & Personal Resume",
      icon: Briefcase,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Smart Village",
      description: "Specialized theme for Smart Village and IoT monitoring",
      icon: Map,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      image: "/smart farm.jpg"
    },
    {
      title: "Orion EWS Pro",
      description: "Flood, Landslide, Quake & Tsunami Detection",
      icon: Waves,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      image: "/ews03.jpg"
    },
    {
      title: "Orion Load Scanner",
      description: "Mining Material Volume Calculation",
      icon: Truck,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      image: "/loadscanner.jpg"
    },
    {
      title: "Orion Smarthome",
      description: "Integrated Home Automation",
      icon: Home,
      color: "text-indigo-400",
      bgColor: "bg-indigo-400/10",
      image: "/smart-home.jpg"
    },
    {
      title: "Orion Smartpark",
      description: "Intelligent Parking System",
      icon: Car,
      color: "text-slate-400",
      bgColor: "bg-slate-400/10",
      image: "/smart-parking.jpg"
    },
    {
      title: "Weather Station",
      description: "Real-time Environmental Monitoring",
      icon: CloudRain,
      color: "text-sky-400",
      bgColor: "bg-sky-400/10",
      image: "/weatherstation.jpg"
    },
    {
      title: "Orion Livecam",
      description: "Live CCTV Streaming Integration",
      icon: Video,
      color: "text-rose-400",
      bgColor: "bg-rose-400/10",
      image: "/livecam.jpg"
    },
    {
      title: "Industrial Automation",
      description: "Process Control & Efficiency",
      icon: Factory,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Machine Monitor",
      description: "Industrial Equipment Health Check",
      icon: Activity,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      image: "/machine-monitor.jpg"
    }
  ];

  return (
    <section id="themes" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 rounded-sm">
              Explore Our Ecosystem
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">
              Ready-to-Use <br />
              <span className="text-blue-600">Thematic Solutions.</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed">
            Pilih tema yang sesuai dengan kebutuhan bisnis Anda. Setiap tema dirancang khusus dengan fitur dan alur kerja yang relevan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/custom-development" className="inline-block px-12 py-5 bg-slate-900 text-white font-black uppercase italic tracking-widest text-xs hover:bg-blue-600 transition shadow-2xl shadow-slate-200">
            View Custom Development Options
          </Link>
        </div>
      </div>
    </section>
  );
}
