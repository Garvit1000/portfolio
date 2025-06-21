
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export const Window: React.FC<WindowProps> = ({
  title,
  icon: Icon,
  children,
  onClose,
  onMinimize,
  onFocus,
  position,
  size,
  zIndex,
  onPositionChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [savedPosition, setSavedPosition] = useState(position);
  const [savedSize, setSavedSize] = useState(size);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-header')) {
      onFocus();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - 60, e.clientY - dragOffset.y));
      onPositionChange({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      onPositionChange(savedPosition);
      setIsMaximized(false);
    } else {
      // Maximize
      setSavedPosition(position);
      setSavedSize(size);
      onPositionChange({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, position, size]);

  const windowStyle = isMaximized
    ? { 
        left: 0, 
        top: 0, 
        width: '100vw', 
        height: 'calc(100vh - 60px)', 
        zIndex 
      }
    : { 
        left: position.x, 
        top: position.y, 
        width: size.width, 
        height: size.height, 
        zIndex 
      };

  return (
    <div
      ref={windowRef}
      className="absolute backdrop-blur-xl bg-black/20 border border-white/30 rounded-xl shadow-2xl overflow-hidden"
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header with Glass Morphism */}
      <div className="window-header backdrop-blur-md bg-white/10 border-b border-white/20 px-6 py-3 flex items-center justify-between cursor-move select-none">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg border border-white/30">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-medium drop-shadow-sm">{title}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="w-7 h-7 bg-yellow-500/80 hover:bg-yellow-400 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-yellow-300/50 shadow-lg"
            title="Minimize"
          >
            <Minus className="w-3 h-3 text-yellow-900" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-7 h-7 bg-green-500/80 hover:bg-green-400 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-green-300/50 shadow-lg"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 className="w-3 h-3 text-green-900" />
            ) : (
              <Maximize2 className="w-3 h-3 text-green-900" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-red-500/80 hover:bg-red-400 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-red-300/50 shadow-lg"
            title="Close"
          >
            <X className="w-3 h-3 text-red-900" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-hidden">
        <div className="h-full backdrop-blur-sm bg-white/5" style={{ height: 'calc(100% - 52px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
