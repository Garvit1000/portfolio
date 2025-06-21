
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose: () => void;
  onAppOpen: (appConfig: any) => void;
  apps: any[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose, onAppOpen, apps }) => {
  const [query, setQuery] = useState('');
  const [filteredApps, setFilteredApps] = useState(apps);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredApps(apps);
    } else {
      setFilteredApps(
        apps.filter(app => 
          app.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, apps]);

  const handleAppSelect = (app: any) => {
    onAppOpen({
      title: app.name,
      component: app.component,
      icon: app.icon,
      position: { 
        x: Math.random() * Math.max(100, window.innerWidth - app.size.width), 
        y: Math.random() * Math.max(50, window.innerHeight - app.size.height - 100) 
      },
      size: app.size
    });
    onClose();
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 border border-white/30 rounded-2xl shadow-2xl p-6 min-w-96 max-w-md mx-4">
      {/* Search Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Search Applications</h2>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 backdrop-blur-sm"
          autoFocus
        />
      </div>

      {/* App Results */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredApps.map((app, index) => (
          <button
            key={app.name}
            onClick={() => handleAppSelect(app)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/20 transition-all duration-200 text-left border border-transparent hover:border-white/30"
          >
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <app.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-medium">{app.name}</span>
          </button>
        ))}
        
        {filteredApps.length === 0 && (
          <div className="text-gray-400 text-center py-4">
            No applications found for "{query}"
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-gray-400 text-sm mb-2">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg p-2 text-white text-sm transition-colors">
            Settings
          </button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg p-2 text-white text-sm transition-colors">
            Power Off
          </button>
        </div>
      </div>
    </div>
  );
};
