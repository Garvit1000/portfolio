
import React, { useState, useEffect } from 'react';
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onRemove }) => {
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration) {
        setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration);
      }
    });
  }, [notifications, onRemove]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Info;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-400/50 bg-green-500/20';
      case 'warning': return 'border-yellow-400/50 bg-yellow-500/20';
      case 'error': return 'border-red-400/50 bg-red-500/20';
      default: return 'border-blue-400/50 bg-blue-500/20';
    }
  };

  return (
    <div className="fixed top-4 right-4 space-y-3 z-50 max-w-sm sm:max-w-md">
      {notifications.map(notification => {
        const Icon = getIcon(notification.type);
        return (
          <div
            key={notification.id}
            className={`p-3 sm:p-4 rounded-xl border backdrop-blur-xl ${getColor(notification.type)} min-w-72 sm:min-w-80 animate-fade-in shadow-2xl transform transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="bg-white/20 p-1 sm:p-1.5 rounded-lg backdrop-blur-sm flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold drop-shadow-sm text-sm sm:text-base truncate">{notification.title}</h4>
                <p className="text-gray-200 text-xs sm:text-sm mt-1 break-words">{notification.message}</p>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="text-gray-300 hover:text-white transition-colors bg-white/20 hover:bg-white/30 rounded-lg p-1 backdrop-blur-sm flex-shrink-0 hover:scale-110"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
