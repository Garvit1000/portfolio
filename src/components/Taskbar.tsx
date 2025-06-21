
import React from 'react';
import { SystemTray } from './SystemTray';
import { Search, Grid3X3 } from 'lucide-react';

interface TaskbarProps {
  openWindows: any[];
  currentTime: Date;
  onWindowRestore: (id: string) => void;
  onApplicationOpen: (appConfig: any) => void;
  onSearchToggle: () => void;
  desktopApps: any[];
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  currentTime,
  onWindowRestore,
  onApplicationOpen,
  onSearchToggle,
  desktopApps
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 sm:h-14 backdrop-blur-xl bg-black/30 border-t border-white/30 flex items-center justify-between px-2 sm:px-4 shadow-2xl">
      {/* Application Menu / Start Button */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button 
          onClick={onSearchToggle}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm border border-orange-400/50 shadow-lg hover:scale-105"
        >
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white/90 rounded-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-xs"></div>
          </div>
          <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Ubuntu</span>
        </button>
        
        {/* Search Button */}
        <button
          onClick={onSearchToggle}
          className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-105"
          title="Search (Super key)"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 hover:text-white transition-colors" />
        </button>
        
        {/* Quick Launch Icons - Hide on mobile, show limited on tablet */}
        <div className="hidden md:flex items-center space-x-1">
          {desktopApps.slice(0, 3).map((app, index) => (
            <button
              key={app.name}
              onClick={() => onApplicationOpen({
                title: app.name,
                component: app.component,
                icon: app.icon,
                position: { 
                  x: Math.random() * Math.max(100, window.innerWidth - app.size.width), 
                  y: Math.random() * Math.max(50, window.innerHeight - app.size.height - 100) 
                },
                size: app.size
              })}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 relative group backdrop-blur-sm border border-white/20 hover:scale-105"
              title={app.name}
            >
              <app.icon className="w-4 h-4 text-gray-200 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Open Windows - Responsive */}
      <div className="flex-1 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 overflow-x-auto">
        {openWindows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowRestore(window.id)}
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 min-w-0 backdrop-blur-sm border shadow-lg hover:scale-105 ${
              window.isMinimized
                ? 'bg-white/10 hover:bg-white/20 border-white/30'
                : 'bg-orange-500/80 hover:bg-orange-600/80 border-orange-400/50'
            }`}
          >
            <div className="bg-white/20 p-0.5 sm:p-1 rounded-md flex-shrink-0">
              <window.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-white text-xs sm:text-sm truncate font-medium max-w-16 sm:max-w-32 lg:max-w-48">
              {window.title}
            </span>
          </button>
        ))}
      </div>

      {/* Enhanced System Tray - Hide some elements on mobile */}
      <div className="hidden sm:block">
        <SystemTray currentTime={currentTime} />
      </div>
      
      {/* Mobile-only time display */}
      <div className="sm:hidden text-white text-xs font-medium">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
