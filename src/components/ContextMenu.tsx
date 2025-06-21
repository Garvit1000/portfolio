
import React, { useState, useEffect } from 'react';
import { Folder, Terminal as TerminalIcon, User, Code, Mail, Settings, RefreshCw, Trash2, Copy, Scissors, Clipboard } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
  type: 'desktop' | 'file' | 'folder';
  fileName?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onAction, type, fileName }) => {
  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  const desktopItems = [
    { icon: RefreshCw, label: 'Refresh', action: 'refresh' },
    { icon: Folder, label: 'New Folder', action: 'new-folder' },
    { icon: TerminalIcon, label: 'Open Terminal', action: 'open-terminal' },
    { icon: Settings, label: 'Display Settings', action: 'display-settings' }
  ];

  const fileItems = [
    { icon: Code, label: 'Open', action: 'open' },
    { icon: Copy, label: 'Copy', action: 'copy' },
    { icon: Scissors, label: 'Cut', action: 'cut' },
    { icon: Trash2, label: 'Delete', action: 'delete' }
  ];

  const items = type === 'desktop' ? desktopItems : fileItems;

  return (
    <div
      className="fixed backdrop-blur-xl bg-black/30 border border-white/30 rounded-xl shadow-2xl z-50 min-w-48 py-2 overflow-hidden"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => (
        <button
          key={item.action}
          onClick={() => {
            onAction(item.action);
            onClose();
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border-b border-white/10 last:border-b-0"
        >
          <div className="bg-white/20 p-1 rounded-md">
            <item.icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
