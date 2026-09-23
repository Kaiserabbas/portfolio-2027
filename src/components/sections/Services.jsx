import {
  RiPlantLine,
  RiDropLine,
  RiTreeLine,
  RiEarthLine,
  RiHomeSmile2Line,
  RiBuilding4Line,
  RiSeedlingLine,
  RiCpuLine,
} from 'react-icons/ri';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const services = [
  {
    icon: RiPlantLine,
    title: 'Master Landscape Design & Execution',
    description: 'Complete landscape transformations combining biophilic principles, hardscape construction, softscape palettes, and specimen plant selections for luxury villas, hospitality, and commercial sites.',
    badge: 'Landscape Architecture',
    color: 'green',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    bg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
  },
  {
    icon: RiDropLine,
    title: 'Smart & Sub-Surface Irrigation Engineering',
    description: 'Hydraulic flow calculations, automated drip and bubbler networks, weather-based smart controllers, and micro-irrigation systems delivering 35% to 40% water savings in arid UAE conditions.',
    badge: 'Water Conservation',
    color: 'blue',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
  },
  {
    icon: RiTreeLine,
    title: 'Date Palm Plantation & Mature Tree Care',
    description: 'Large-scale date palm installation, root aeration, integrated pest management for Red Palm Weevil prevention, crane-assisted transplanting, and specialized tree surgery.',
    badge: 'Arboriculture',
    color: 'emerald',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bg: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
  },
  {
    icon: RiEarthLine,
    title: 'Soil Health, Agritech & Lite-Soil Substrates',
    description: 'Salinity remediation, soil testing, lightweight substrate integration (Lite-Soil), hydrogel conditioning, and scientific fertigation regimes to support healthy root systems in desert soils.',
    badge: 'Soil Science & R&D',
    color: 'amber',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    bg: 'hover:bg-amber-50 dark:hover:bg-amber-900/20',
  },
  {
    icon: RiHomeSmile2Line,
    title: 'Villa & Community Landscape Maintenance',
    description: 'Long-term grounds maintenance programs for premier master-planned communities including Al Barari, Dubai Hills, Emirates Hills, and Meadows, covering manicured turf care, IPM, and seasonal planting.',
    badge: 'Estate Management',
    color: 'teal',
    border: 'border-teal-200 dark:border-teal-800',
    iconColor: 'text-teal-600 dark:text-teal-400',
    bg: 'hover:bg-teal-50 dark:hover:bg-teal-900/20',
  },
  {
    icon: RiBuilding4Line,
    title: 'Commercial Biophilic Interiors & Atriums',
    description: 'High-rise residential and corporate interior planting, living vertical walls, ramp planters, and custom architectural planter solutions for iconic towers such as 1JBR Tower at Jumeirah Beach Residence.',
    badge: 'Biophilic Interiors',
    color: 'cyan',
    border: 'border-cyan-200 dark:border-cyan-800',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    bg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
  },
  {
    icon: RiSeedlingLine,
    title: 'Greenhouse & Controlled Agriculture Hubs',
    description: 'Turnkey setup and maintenance of climate-controlled research greenhouses, evaporative cooling pads, fogging mist systems, nursery supply pipelines, and urban farming hubs (e.g. DM Warsan).',
    badge: 'Controlled Environment',
    color: 'purple',
    border: 'border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-400',
    bg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
  },
  {
    icon: RiCpuLine,
    title: 'AI-Powered Estimating & Field Telemetry',
    description: 'Bridging landscape engineering with modern technology: generative AI proposal generators, real-time IoT soil moisture telemetry, and automated BOQ material estimation for contractors.',
    badge: 'Smart Agritech',
    color: 'indigo',
    border: 'border-indigo-200 dark:border-indigo-800',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    bg: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-12`}>
          <h2 className="section-title mb-3">Services I Offer</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            Specialized landscape engineering, water conservation systems, and intelligent agritech solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, description, badge, border, iconColor, bg }, i) => (
            <div
              key={title}
              className={`border-2 ${border} rounded-2xl p-6 ${bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default group flex flex-col justify-between`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={iconColor} />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {badge}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white leading-snug">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
