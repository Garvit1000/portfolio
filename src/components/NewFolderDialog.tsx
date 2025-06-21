
import React, { useState } from 'react';
import { X, Folder } from 'lucide-react';

interface NewFolderDialogProps {
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export const NewFolderDialog: React.FC<NewFolderDialogProps> = ({ onClose, onConfirm }) => {
  const [folderName, setFolderName] = useState('New Folder');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onConfirm(folderName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-6 min-w-80 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-semibold text-lg">Create New Folder</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 backdrop-blur-sm"
              autoFocus
              onFocus={(e) => e.target.select()}
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white transition-colors backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500/80 hover:bg-blue-500 border border-blue-400/50 rounded-lg px-4 py-2 text-white transition-colors backdrop-blur-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
