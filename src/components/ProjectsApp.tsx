import React from 'react';
import { Code, ExternalLink, Github, Star } from 'lucide-react';

export default function ProjectsApp() {
  const projects = [
    {
      name: 'Freshstart AI',
      description: 'Built a SaaS platform delivering AI-powered resume optimization with 80%+ ATS score targets. Integrated LinkedIn headline & About-section optimizers to boost recruiter visibility.and Developed edit suggestions and PDF export workflows for user-customized resumes. Implemented Transparency Mode to explain keyword choices and editing rationale. Added ATS score comparison, keyword insights, and skill-gap analysis dashboards',
      tech: ['React.js', 'postgreSQL', 'Tailwind CSS', 'Shadcn UI','Gemini API','Node.js', 'Express.js'],
      status: 'Completed',
      githubUrl: 'https://github.com/Garvit1000/freshstartAI',
      liveUrl: 'https://freshstartai-1.onrender.com/'
    },
    {
      name: 'Flexhunt',
      description: ' Developed a job platform with skill-based matchmaking and recruiter management tools. Built seller dashboard with PayPal payment integration and real-time transaction logging. Created a community forum module for discussions and professional networking',
      tech: ['React.js', 'Paypal', 'firebase', 'Tailwind CSS', 'Shadcn UI'],
      status: 'Completed',
      githubUrl: 'https://github.com/Garvit1000/flexhunt',
      liveUrl: 'https://www.flexhunt.co/'
    },
    {
      name: 'Mindflow',
      description: 'AI Chat Assistant: Engage in conversations with  AI assistant, designed to provide empathetic support and assess your mental health. Personalized Diet Plans: Discover diet plans tailored to your BMI and mental state, helping you nourish both your body and mind. Soothing Music: Relax and unwind with a curated selection of calming music. Profile Management: Keep your information up-to-date and personalize your experience. Location Services: Track your frequent locations to provide personalized insights and recommendations.',
      tech: ['ReactNative', 'Expo', 'EASbuild', 'firebase'],
      status: 'Completed',
      githubUrl: 'https://github.com/Garvit1000/mindflow',
      liveUrl: ''
    },
    {
      name: 'create-vite-shadcn-app',
      description: 'A CLI tool to quickly scaffold a React application with Vite, Tailwind CSS, and shadcn/ui components. Get started with a fully configured development environment in seconds.',
      tech: ['React.js', 'Vite', 'Tailwind CSS', 'Shadcn UI'],
      status: 'Completed',
      githubUrl: 'https://github.com/Garvit1000/create-vite-shadcn-app',
      liveUrl: 'https://www.npmjs.com/package/create-vite-shadcn-app'
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
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}