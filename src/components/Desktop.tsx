
import React, { useState } from 'react';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { FileManager } from './FileManager';
import { Terminal } from './Terminal';
import { AboutApp } from './AboutApp';
import  ProjectsApp  from './ProjectsApp';
import { ContactApp } from './ContactApp';
import { ContextMenu } from './ContextMenu';
import { NotificationSystem } from './NotificationSystem';
import { WeatherWidget, SystemInfoWidget } from './DesktopWidgets';
import { SearchBar } from './SearchBar';
import { Folder, Terminal as TerminalIcon, User, Code, Mail, Calendar } from 'lucide-react';

interface WindowState {
  id: string;
  title: string;
  component: React.ComponentType;
  icon: React.ComponentType<any>;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'desktop' | 'file' | 'folder' } | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  // Ubuntu-style wallpapers
  const wallpapers = [
    'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800',
    'bg-gradient-to-br from-orange-600 via-red-500 to-purple-600',
    'bg-gradient-to-br from-green-600 via-teal-500 to-blue-600',
    'bg-gradient-to-br from-pink-600 via-purple-500 to-indigo-600'
  ];

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Welcome notification on load
  React.useEffect(() => {
    addNotification({
      type: 'info',
      title: 'Welcome to Ubuntu Desktop',
      message: 'Press Super key or click search to explore!',
      duration: 5000
    });
  }, []);

  // Add keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Meta' || e.key === 'Super') { // Super/Windows key
        setShowSearch(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const addNotification = (notification: any) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'desktop' });
  };

  const handleContextAction = (action: string) => {
    switch (action) {
      case 'refresh':
        addNotification({
          type: 'success',
          title: 'Desktop Refreshed',
          message: 'Desktop has been refreshed successfully',
          duration: 3000
        });
        break;
      case 'new-folder':
        // Open file manager and trigger new folder creation
        const fileManagerWindow = windows.find(w => w.title === 'File Manager');
        if (fileManagerWindow) {
          // Focus existing file manager window
          focusWindow(fileManagerWindow.id);
        } else {
          // Open new file manager window
          openApplication({
            title: 'File Manager',
            component: FileManager,
            icon: Folder,
            position: { x: 100, y: 100 },
            size: { width: Math.min(800, window.innerWidth - 100), height: Math.min(600, window.innerHeight - 150) }
          });
        }
        addNotification({
          type: 'info',
          title: 'File Manager Opened',
          message: 'Use the "New Folder" button to create folders',
          duration: 3000
        });
        break;
      case 'open-terminal':
        openApplication({
          title: 'Terminal',
          component: Terminal,
          icon: TerminalIcon,
          position: { x: Math.random() * 200 + 100, y: Math.random() * 150 + 100 },
          size: { width: Math.min(900, window.innerWidth - 100), height: Math.min(500, window.innerHeight - 200) }
        });
        break;
      case 'display-settings':
        setWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
        addNotification({
          type: 'success',
          title: 'Wallpaper Changed',
          message: 'Desktop wallpaper has been updated',
          duration: 3000
        });
        break;
    }
  };

  const openApplication = (appConfig: Omit<WindowState, 'id' | 'isMinimized' | 'zIndex'>) => {
    const newWindow: WindowState = {
      ...appConfig,
      id: Date.now().toString(),
      isMinimized: false,
      zIndex: nextZIndex,
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false, zIndex: nextZIndex } : window
    ));
    setNextZIndex(prev => prev + 1);
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, zIndex: nextZIndex } : window
    ));
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, position } : window
    ));
  };

  const desktopApps = [
    {
      name: 'File Manager',
      icon: Folder,
      component: FileManager,
      position: { x: 100, y: 100 },
      size: { width: Math.min(800, window.innerWidth - 100), height: Math.min(600, window.innerHeight - 150) }
    },
    {
      name: 'Terminal',
      icon: TerminalIcon,
      component: Terminal,
      position: { x: 200, y: 150 },
      size: { width: Math.min(900, window.innerWidth - 100), height: Math.min(500, window.innerHeight - 200) }
    },
    {
      name: 'About Me',
      icon: User,
      component: AboutApp,
      position: { x: 150, y: 200 },
      size: { width: Math.min(600, window.innerWidth - 100), height: Math.min(450, window.innerHeight - 200) }
    },
    {
      name: 'Projects',
      icon: Code,
      component: ProjectsApp,
      position: { x: 250, y: 100 },
      size: { width: Math.min(700, window.innerWidth - 100), height: Math.min(550, window.innerHeight - 150) }
    },
    {
      name: 'Contact',
      icon: Mail,
      component: ContactApp,
      position: { x: 300, y: 250 },
      size: { width: Math.min(500, window.innerWidth - 100), height: Math.min(400, window.innerHeight - 200) }
    }
  ];

  return (
    <div 
      className={`h-screen ${wallpapers[wallpaperIndex]} overflow-hidden relative transition-all duration-1000`}
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu(null)}
    >
      {/* Ubuntu Unity-inspired Desktop Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,165,0,0.3) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255,165,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px, 80px 80px'
        }}></div>
        
        {/* Ubuntu logo pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <div className="w-96 h-96 rounded-full border-8 border-orange-500 flex items-center justify-center">
            <div className="w-32 h-32 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Responsive Desktop Icons with Glass Morphism */}
      <div className="absolute top-4 left-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
        {desktopApps.map((app, index) => (
          <div
            key={app.name}
            className="flex flex-col items-center p-2 sm:p-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 cursor-pointer transition-all duration-300 group hover:scale-105"
            onDoubleClick={() => openApplication({
              title: app.name,
              component: app.component,
              icon: app.icon,
              position: { 
                x: Math.random() * Math.max(100, window.innerWidth - app.size.width), 
                y: Math.random() * Math.max(50, window.innerHeight - app.size.height - 100) 
              },
              size: app.size
            })}
          >
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-md group-hover:bg-white/30 transition-all duration-300 border border-white/30">
              <app.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
            </div>
            <span className="text-white text-xs text-center mt-1 drop-shadow-md font-medium max-w-16 truncate">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Responsive Desktop Widgets with Glass Morphism */}
      <div className="absolute top-4 right-4 space-y-3 hidden lg:block">
        <WeatherWidget />
        <SystemInfoWidget />
      </div>

      {/* Mobile-friendly widgets */}
      <div className="absolute top-4 right-4 space-y-2 lg:hidden">
        <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-lg p-2 text-white text-xs">
          <div className="font-semibold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-start justify-center pt-32">
          <SearchBar 
            onClose={() => setShowSearch(false)}
            onAppOpen={openApplication}
            apps={desktopApps}
          />
        </div>
      )}

      {/* Windows */}
      {windows
        .filter(window => !window.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(window => (
          <Window
            key={window.id}
            title={window.title}
            icon={window.icon}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
          >
            <window.component />
          </Window>
        ))}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          type={contextMenu.type}
          onClose={() => setContextMenu(null)}
          onAction={handleContextAction}
        />
      )}

      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Enhanced Taskbar */}
      <Taskbar 
        openWindows={windows}
        currentTime={currentTime}
        onWindowRestore={restoreWindow}
        onApplicationOpen={openApplication}
        onSearchToggle={() => setShowSearch(prev => !prev)}
        desktopApps={desktopApps}
      />
    </div>
  );
};
