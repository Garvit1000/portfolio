
import React, { useState, useEffect, useRef } from 'react';
import { CommandProcessor } from '@/utils/CommandProcessor';
import { FileSystem } from '@/utils/FileSystem';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  prompt?: string;
}

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Ubuntu Terminal v1.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('/home/user');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fileSystem = new FileSystem();
  const commandProcessor = new CommandProcessor(fileSystem);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    const prompt = `user@ubuntu:${currentPath}$`;
    
    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    // Add command line to terminal
    setLines(prev => [...prev, { type: 'command', content: command, prompt }]);

    try {
      const result = await commandProcessor.execute(command, currentPath);
      
      if (result.output) {
        const outputLines = result.output.split('\n').filter(line => line !== '');
        outputLines.forEach(line => {
          setLines(prev => [...prev, { type: 'output', content: line }]);
        });
      }
      
      if (result.newPath) {
        setCurrentPath(result.newPath);
      }
      
      if (result.error) {
        setLines(prev => [...prev, { type: 'error', content: result.error }]);
      }
    } catch (error) {
      setLines(prev => [...prev, { type: 'error', content: 'Command failed' }]);
    }

    // Add empty line for spacing
    setLines(prev => [...prev, { type: 'output', content: '' }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality could be added here
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="h-full bg-gray-900 text-green-400 font-mono cursor-text flex flex-col"
      onClick={handleTerminalClick}
    >
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'command' ? (
              <div className="flex">
                <span className="text-green-400 mr-2">{line.prompt}</span>
                <span className="text-white">{line.content}</span>
              </div>
            ) : (
              <div className={`${
                line.type === 'error' ? 'text-red-400' : 'text-green-400'
              } ${line.content === '' ? 'h-4' : ''}`}>
                {line.content}
              </div>
            )}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-green-400 mr-2">user@ubuntu:{currentPath}$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white flex-1 font-mono"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="animate-pulse text-white">▋</span>
        </div>
      </div>
    </div>
  );
};
