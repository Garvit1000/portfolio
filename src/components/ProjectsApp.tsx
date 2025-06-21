
import React from 'react';
import { Code, ExternalLink, Github, Star } from 'lucide-react';

export const ProjectsApp = () => {
  const projects = [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      tech: ['React', 'Node.js', 'express.js', 'MongoDB', 'Stripe'],
      status: 'Completed',
      stars: 1
    },
    {
      name: 'Task Management App',
      description: 'Real-time collaborative task management with drag-and-drop functionality',
      tech: ['Next.js', 'Socket.io', 'MongoDB'],
      status: 'In Progress',
      stars: 28
    },
    {
      name: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with charts and forecasts',
      tech: ['Vue.js', 'Chart.js', 'OpenWeather API'],
      status: 'Completed',
      stars: 15
    },
    {
      name: 'Blog CMS',
      description: 'Content management system with markdown support and SEO optimization',
      tech: ['Gatsby', 'GraphQL', 'Netlify CMS'],
      status: 'Completed',
      stars: 33
    }
  ];

  return (
    <div className="h-full bg-gray-800 text-gray-200 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Code className="w-8 h-8 mr-3 text-blue-400" />
            My Projects
          </h1>
          <p className="text-gray-400">A showcase of my recent work and contributions</p>
        </div>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-400">{project.stars}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'Completed' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                  <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300">
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </button>
                  <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
