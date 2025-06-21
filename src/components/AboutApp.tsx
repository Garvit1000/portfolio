
import React from 'react';
import { User, MapPin, Calendar, Mail, Phone, Github, Linkedin } from 'lucide-react';

export const AboutApp = () => {
  return (
    <div className="h-full bg-gray-800 text-gray-200 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Garvit Joshi</h1>
          <p className="text-blue-400 text-lg">Full Stack Developer</p>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-400" />
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Passionate full-stack developer with 1+ years of experience building scalable web applications. 
            I love creating efficient, elegant solutions and staying up-to-date with the latest technologies. 
            When I'm not coding, you can find me contributing to open source projects or exploring new frameworks.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-blue-400" />
              <span>garvitjoshi543@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-blue-400" />
              <span>+91 8619513776</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-blue-400" />
              <span>India, Rajasthan</span>
            </div>
            <div className="flex items-center">
              <Github className="w-5 h-5 mr-3 text-blue-400" />
              <span>github.com/Garvit1000</span>
            </div>
            <div className="flex items-center">
              <Linkedin className="w-5 h-5 mr-3 text-blue-400" />
              <span>linkedin.com/in/garvit-joshi1</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Frontend</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Reacts</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>javaScript</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-400 mb-2">Backend</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Node.js</li>
                <li>express.js</li>
                <li>firebase</li>
                <li>MongoDB</li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
