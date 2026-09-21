import {
  RiPlantLine, RiRobotLine, RiBarChartLine, RiSmartphoneLine,
  RiDatabase2Line, RiSettings3Line,
} from 'react-icons/ri';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const services = [
  {
    icon: RiPlantLine,
    title: 'Landscape Redesign',
    description: 'Complete landscape transformations incorporating biophilic design, sustainable agriculture, and smart irrigation systems.',
    color: 'green',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600',
    bg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
  },
  {
    icon: RiRobotLine,
    title: 'Custom AI Agents',
    description: 'Build intelligent systems powered by Claude API to automate business workflows, client communication, and project management.',
    color: 'blue',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600',
    bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
  },
  {
    icon: RiBarChartLine,
    title: 'Web Applications',
    description: 'Full-stack web apps for project tracking, client portals, and data visualization dashboards with real-time monitoring.',
    color: 'purple',
    border: 'border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600',
    bg: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
  },
  {
    icon: RiSmartphoneLine,
    title: 'Mobile Applications',
    description: 'Android & iOS apps for on-site monitoring, sensor integration, and field management with AI-powered analytics.',
    color: 'orange',
    border: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600',
    bg: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
  },
  {
    icon: RiDatabase2Line,
    title: 'Database Architecture',
    description: 'Design and implement scalable database systems, data pipelines, and backend infrastructure for complex applications.',
    color: 'red',
    border: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600',
    bg: 'hover:bg-red-50 dark:hover:bg-red-900/20',
  },
  {
    icon: RiSettings3Line,
    title: 'Workflow Automation',
    description: 'Streamline business operations with AI-powered automation, reducing manual tasks and improving efficiency across teams.',
    color: 'indigo',
    border: 'border-indigo-200 dark:border-indigo-800',
    iconColor: 'text-indigo-600',
    bg: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} mb-12`}>
          <h2 className="section-title mb-3">Services I Offer</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            Tailored solutions combining landscape expertise with AI-powered technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, border, iconColor, bg }, i) => (
            <div
              key={title}
              className={`border-2 ${border} rounded-2xl p-7 ${bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default group`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-sm mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} className={iconColor} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
