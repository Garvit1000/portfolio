
import React from 'react';
import { Wifi, Battery, Volume2, Bluetooth, Calendar, Clock } from 'lucide-react';

interface SystemTrayProps {
  currentTime: Date;
}

export const SystemTray: React.FC<SystemTrayProps> = ({ currentTime }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getBatteryLevel = () => Math.floor(Math.random() * 40) + 60; // Mock battery 60-100%
  const getWifiStrength = () => Math.floor(Math.random() * 3) + 2; // Mock wifi 2-4 bars

  return (
    <div className="flex items-center space-x-3 text-gray-300">
      {/* System Icons */}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Wifi className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative">
          <Battery className="w-4 h-4" />
          <span className="text-xs ml-1">{getBatteryLevel()}%</span>
        </div>
        
        <Volume2 className="w-4 h-4" />
        <Bluetooth className="w-4 h-4 text-blue-400" />
      </div>

      {/* Time and Date */}
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4" />
        <div className="text-sm">
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};
