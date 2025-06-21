
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';

export const WeatherWidget = () => {
  const [weather] = useState({
    temperature: 22,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12
  });

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return Sun;
      case 'cloudy': return Cloud;
      case 'rainy': return CloudRain;
      default: return Sun;
    }
  };

  const WeatherIcon = getWeatherIcon();

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-xl p-4 text-white min-w-48 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold drop-shadow-sm">Weather</h3>
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <WeatherIcon className="w-5 h-5" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-1 rounded-md">
            <Thermometer className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold drop-shadow-sm">{weather.temperature}°C</span>
        </div>
        <div className="text-xs text-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span>Humidity:</span>
            <span className="font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Wind className="w-3 h-3" />
              <span>Wind:</span>
            </div>
            <span className="font-medium">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SystemInfoWidget = () => {
  const [systemInfo] = useState({
    cpu: Math.floor(Math.random() * 30) + 20,
    memory: Math.floor(Math.random() * 40) + 30,
    disk: Math.floor(Math.random() * 20) + 45
  });

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-xl p-4 text-white min-w-48 shadow-2xl">
      <h3 className="text-sm font-semibold mb-4 drop-shadow-sm">System Monitor</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium">CPU</span>
            <span className="font-bold">{systemInfo.cpu}%</span>
          </div>
          <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 border border-white/30">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${systemInfo.cpu}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium">Memory</span>
            <span className="font-bold">{systemInfo.memory}%</span>
          </div>
          <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 border border-white/30">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${systemInfo.memory}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium">Disk</span>
            <span className="font-bold">{systemInfo.disk}%</span>
          </div>
          <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 border border-white/30">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${systemInfo.disk}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
