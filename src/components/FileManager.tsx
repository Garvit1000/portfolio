
import React, { useState, useMemo } from 'react';
import { Folder, File, Image, Code, Mail, User, Plus, ArrowLeft, Search } from 'lucide-react';
import { NewFolderDialog } from './NewFolderDialog';

export const FileManager = () => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [customFolders, setCustomFolders] = useState<{[key: string]: any[]}>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const baseFileStructure = {
    '/home/user': [
      { name: 'Desktop', type: 'folder', icon: Folder },
      { name: 'Documents', type: 'folder', icon: Folder },
      { name: 'Projects', type: 'folder', icon: Folder },
      { name: 'Pictures', type: 'folder', icon: Folder },
      { name: 'about.txt', type: 'file', icon: File },
      { name: 'resume.pdf', type: 'file', icon: File },
    ],
    '/home/user/Projects': [
      { name: '..', type: 'folder', icon: Folder },
      { name: 'portfolio-website', type: 'folder', icon: Code },
      { name: 'react-dashboard', type: 'folder', icon: Code },
      { name: 'nodejs-api', type: 'folder', icon: Code },
      { name: 'python-scripts', type: 'folder', icon: Code },
    ],
    '/home/user/Pictures': [
      { name: '..', type: 'folder', icon: Folder },
      { name: 'profile.jpg', type: 'file', icon: Image },
      { name: 'screenshots', type: 'folder', icon: Folder },
    ]
  };

  // Merge base structure with custom folders
  const fileStructure = { ...baseFileStructure };
  Object.keys(customFolders).forEach(path => {
    if (fileStructure[path as keyof typeof fileStructure]) {
      fileStructure[path as keyof typeof fileStructure] = [
        ...fileStructure[path as keyof typeof fileStructure],
        ...customFolders[path]
      ];
    }
  });

  const allFiles = fileStructure[currentPath as keyof typeof fileStructure] || [];

  // Filter files based on search query
  const currentFiles = useMemo(() => {
    if (!searchQuery.trim()) {
      return allFiles;
    }
    return allFiles.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allFiles, searchQuery]);

  const canGoBack = currentPath !== '/home/user';

  const handleBack = () => {
    if (canGoBack) {
      const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
      setCurrentPath(parentPath === '' ? '/' : parentPath);
      setSearchQuery(''); // Clear search when navigating
    }
  };

  const handleItemClick = (item: any) => {
    if (item.type === 'folder') {
      if (item.name === '..') {
        handleBack();
      } else {
        const newPath = `${currentPath}/${item.name}`;
        setCurrentPath(newPath);
        setSearchQuery(''); // Clear search when navigating
        
        // Initialize empty folder if it doesn't exist
        if (!fileStructure[newPath as keyof typeof fileStructure] && !customFolders[newPath]) {
          setCustomFolders(prev => ({
            ...prev,
            [newPath]: [{ name: '..', type: 'folder', icon: Folder }]
          }));
        }
      }
    }
  };

  const handleCreateFolder = (folderName: string) => {
    const newFolder = {
      name: folderName,
      type: 'folder' as const,
      icon: Folder
    };

    setCustomFolders(prev => ({
      ...prev,
      [currentPath]: [
        ...(prev[currentPath] || []),
        newFolder
      ]
    }));
  };

  return (
    <div className="h-full bg-gray-800/90 backdrop-blur-xl text-gray-200 border border-white/20 rounded-lg">
      {/* Toolbar */}
      <div className="bg-gray-700/80 backdrop-blur-md px-4 py-2 border-b border-gray-600/50 rounded-t-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {canGoBack && (
              <button
                onClick={handleBack}
                className="flex items-center space-x-1 bg-gray-600/80 hover:bg-gray-500/80 backdrop-blur-sm border border-gray-500/50 px-2 py-1 rounded-lg text-white text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="text-sm text-gray-400">Location:</span>
            <span className="text-sm bg-gray-600/80 backdrop-blur-sm px-2 py-1 rounded border border-gray-500/50">{currentPath}</span>
          </div>
          <button
            onClick={() => setShowNewFolderDialog(true)}
            className="flex items-center space-x-1 bg-blue-500/80 hover:bg-blue-500 backdrop-blur-sm border border-blue-400/50 px-3 py-1 rounded-lg text-white text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Folder</span>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 backdrop-blur-sm text-sm"
          />
        </div>
      </div>

      {/* File List */}
      <div className="p-4">
        {currentFiles.length === 0 && searchQuery ? (
          <div className="text-center text-gray-400 py-8">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No files or folders found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {currentFiles.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex flex-col items-center p-3 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-200 hover:scale-105"
                onDoubleClick={() => handleItemClick(item)}
              >
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-md border border-white/30">
                  <item.icon className={`w-6 h-6 ${
                    item.type === 'folder' ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                </div>
                <span className="text-xs text-center break-words mt-2 max-w-full">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Folder Dialog */}
      {showNewFolderDialog && (
        <NewFolderDialog
          onClose={() => setShowNewFolderDialog(false)}
          onConfirm={handleCreateFolder}
        />
      )}
    </div>
  );
};
