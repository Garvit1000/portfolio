
import { FileSystem } from './FileSystem';

export interface CommandResult {
  output?: string;
  error?: string;
  newPath?: string;
}

export class CommandProcessor {
  private fileSystem: FileSystem;

  constructor(fileSystem: FileSystem) {
    this.fileSystem = fileSystem;
  }

  async execute(command: string, currentPath: string): Promise<CommandResult> {
    const [cmd, ...args] = command.trim().split(/\s+/);
    
    switch (cmd.toLowerCase()) {
      case 'help':
        return { output: this.getHelpText() };
      
      case 'ls':
        return { output: this.fileSystem.ls(args[0], currentPath) };
      
      case 'cat':
        if (!args[0]) {
          return { error: 'cat: missing file operand' };
        }
        return { output: this.fileSystem.cat(args[0], currentPath) };
      
      case 'cd':
        const cdResult = this.fileSystem.cd(args[0] || '/home/user', currentPath);
        return { 
          newPath: cdResult.path, 
          error: cdResult.error 
        };
      
      case 'pwd':
        return { output: this.fileSystem.pwd(currentPath) };
      
      case 'find':
        if (!args[0]) {
          return { error: 'find: missing search pattern' };
        }
        return { output: this.fileSystem.find(args[0], currentPath) };
      
      case 'tree':
        return { output: this.fileSystem.tree(args[0], currentPath) };
      
      case 'whoami':
        return { output: 'user' };
      
      case 'date':
        return { output: new Date().toString() };
      
      case 'uname':
        const flag = args[0];
        if (flag === '-a') {
          return { output: 'Linux portfolio 5.15.0-generic #72-Ubuntu SMP x86_64 GNU/Linux' };
        }
        return { output: 'Linux' };
      
      case 'echo':
        return { output: args.join(' ') };
      
      case 'clear':
        return { output: '\x1b[2J\x1b[H' };
      
      case 'history':
        return { output: 'Command history feature coming soon!' };
      
      case 'grep':
        if (args.length < 2) {
          return { error: 'grep: missing pattern or file' };
        }
        const [pattern, filename] = args;
        const fileContent = this.fileSystem.cat(filename, currentPath);
        if (fileContent.startsWith('cat:')) {
          return { error: fileContent };
        }
        const matches = fileContent.split('\n').filter(line => 
          line.toLowerCase().includes(pattern.toLowerCase())
        );
        return { output: matches.join('\n') || `No matches found for '${pattern}'` };
      
      case 'wc':
        if (!args[0]) {
          return { error: 'wc: missing file operand' };
        }
        const content = this.fileSystem.cat(args[0], currentPath);
        if (content.startsWith('cat:')) {
          return { error: content };
        }
        const lines = content.split('\n').length;
        const words = content.split(/\s+/).filter(w => w).length;
        const chars = content.length;
        return { output: `${lines} ${words} ${chars} ${args[0]}` };
      
      case 'head':
        if (!args[0]) {
          return { error: 'head: missing file operand' };
        }
        const headContent = this.fileSystem.cat(args[0], currentPath);
        if (headContent.startsWith('cat:')) {
          return { error: headContent };
        }
        const headLines = headContent.split('\n').slice(0, 10);
        return { output: headLines.join('\n') };
      
      case 'tail':
        if (!args[0]) {
          return { error: 'tail: missing file operand' };
        }
        const tailContent = this.fileSystem.cat(args[0], currentPath);
        if (tailContent.startsWith('cat:')) {
          return { error: tailContent };
        }
        const tailLines = tailContent.split('\n').slice(-10);
        return { output: tailLines.join('\n') };
      
      case 'neofetch':
        return { output: this.getNeofetch() };
      
      case 'skills':
        return { output: 'Available skill files:\n- programming.txt\n- devops.txt\n\nUse: cat skills/programming.txt or cat skills/devops.txt' };
      
      case 'projects':
        return { output: 'Available projects:\n- web-app/\n- cli-tool/\n- open-source/\n\nUse: cd projects && ls to explore' };
      
      case 'contact':
        return { output: this.fileSystem.cat('contact.txt', currentPath) };
      
      case 'about':
        return { output: this.fileSystem.cat('about.txt', currentPath) };
      
      case 'resume':
        return { output: this.fileSystem.cat('resume.txt', currentPath) };
      
      default:
        return { error: `${cmd}: command not found. Type 'help' for available commands.` };
    }
  }

  private getHelpText(): string {
    return `Available Commands:
==================

File System:
  ls [directory]     - List directory contents
  cd [directory]     - Change directory
  pwd               - Print working directory
  cat [file]        - Display file contents
  find [pattern]    - Search for files/folders
  tree [directory]  - Display directory tree

File Operations:
  grep [pattern] [file]  - Search within files
  head [file]           - Show first 10 lines
  tail [file]           - Show last 10 lines
  wc [file]             - Count lines, words, characters

System:
  whoami            - Display current user
  date              - Show current date/time
  uname [-a]        - System information
  neofetch          - System info with style
  clear             - Clear terminal screen

Portfolio Shortcuts:
  about             - About me
  contact           - Contact information
  resume            - View resume
  skills            - View skills overview
  projects          - View projects overview

Utilities:
  echo [text]       - Display text
  history           - Command history
  help              - Show this help message

Navigation Tips:
- Use 'cd ..' to go back
- Use 'cd ~' or 'cd' to go home
- Use Tab for auto-completion (coming soon!)
- Use ↑/↓ arrows for command history`;
  }

  private getNeofetch(): string {
    return `                   -\`               user@portfolio 
                  .o+\`               --------------- 
                 \`ooo/               OS: Ubuntu 22.04 LTS x86_64 
                \`+oooo:              Host: Portfolio Terminal 
               \`+oooooo:             Kernel: 5.15.0-generic 
               -+oooooo+:            Uptime: Always online 
             \`/:-:++oooo+:           Packages: npm, yarn, docker 
            \`/++++/+++++++:          Shell: bash 5.1.16 
           \`/++++++++++++++:         Resolution: Responsive 
          \`/+++ooooooooooooo/\`       DE: Web Terminal 
         ./ooosssso++osssssso+\`      WM: Browser 
        .oossssso-\`\`\`\`/ossssss+\`     Theme: Linux Dark 
       -osssssso.      :ss ssss/     Icons: Lucide React 
      :osssssss/        osssso+.     Terminal: Custom React 
     /ossssssss/        +ssssooo:    CPU: Your Device 
   \`/ossssso+/:-        -:/+osssso+\` Memory: Optimized 
  \`+sso+:-\`                 \`.-/+oso: 
 \`++:.                           \`-/+/ 
 .\`                                 \`/.`;
  }
}
