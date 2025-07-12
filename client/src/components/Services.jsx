import React from 'react';
import { BarChart3, Brain, FileText, MessageSquare } from 'lucide-react';

const services = [
  {
    icon: <FileText className="h-8 w-8 text-green-400" />,
    title: 'Dataset Analysis',
    description: 'Upload CSV files and receive instant EDA and ML insights.',
    gradient: 'from-green-400/10 to-emerald-500/10',
    delay: '0ms'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-green-400" />,
    title: 'Chart Recognition',
    description: 'Extract and understand charts using AI vision tools.',
    gradient: 'from-emerald-400/10 to-teal-500/10',
    delay: '100ms'
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-green-400" />,
    title: 'AI Chat',
    description: 'Converse with your datasets and extract meaningful insights.',
    gradient: 'from-teal-400/10 to-cyan-500/10',
    delay: '200ms'
  },
  {
    icon: <Brain className="h-8 w-8 text-green-400" />,
    title: 'Machine Learning',
    description: 'Auto-train models and compare performance with ease.',
    gradient: 'from-cyan-400/10 to-green-500/10',
    delay: '300ms'
  },
];

const ServiceCard = ({ icon, title, description, gradient, delay }) => (
  <div
    role="button"
    aria-label={`Learn more about ${title}`}
    className="group relative animate-fade-in"
    style={{ animationDelay: delay }}
  >
    <div className="relative h-full bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm p-8 rounded-3xl border border-zinc-700/50 hover:border-green-400/50 shadow-lg shadow-zinc-900/50 hover:shadow-2xl hover:shadow-green-400/25 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
     style={{
      boxShadow: `
        2px 10px 25px -5px rgba(34, 197, 94, 0.1),
        2px 8px 10px -6px rgba(34, 197, 94, 0.3)
      `,
    }}>

      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500`}>
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-green-400/0 via-green-400/80 to-green-400/0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm animate-pulse"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <div className="relative mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-2xl border border-zinc-600 group-hover:border-green-400/70 group-hover:shadow-xl group-hover:shadow-green-400/30 group-hover:bg-gradient-to-br group-hover:from-zinc-700 group-hover:to-zinc-600 transition-all duration-500">
            <div className="transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
              {icon}
            </div>
          </div>
          <div className="absolute inset-0 bg-green-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-100 group-hover:drop-shadow-lg transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 group-hover:drop-shadow-md transition-all duration-300">
          {description}
        </p>

        <div className="mt-6 flex items-center text-green-400 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 group-hover:drop-shadow-lg">
          <span className="text-sm font-medium mr-2 group-hover:text-green-300">Learn More</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 group-hover:drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-green-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-all duration-500"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-emerald-400/80 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-700" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-8 left-6 w-2 h-2 bg-teal-400/70 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-12 left-10 w-1 h-1 bg-cyan-400/90 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-800" style={{ animationDelay: '1.5s' }}></div>
    </div>
  </div>
);

const Services = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 text-white overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover powerful AI-driven tools designed to transform your data analysis workflow
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={`card-${index}`} {...service} />
          ))}
        </div>

        {/* Bottom Indicator */}
        <div className="mt-20 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-teal-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
