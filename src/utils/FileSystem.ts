
export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FileNode };
  permissions?: string;
  size?: string;
  modified?: string;
}

export class FileSystem {
  private root: FileNode;

  constructor() {
    this.root = {
      name: 'home',
      type: 'directory',
      children: {
        user: {
          name: 'user',
          type: 'directory',
          children: {
            'about.txt': {
              name: 'about.txt',
              type: 'file',
              content: `About Me
========

Hello! I'm a passionate software developer with expertise in:
- Full-stack web development
- Linux system administration
- DevOps and cloud technologies
- Open source contributions

I love working with cutting-edge technologies and solving complex problems.
When I'm not coding, you can find me contributing to open source projects
or exploring the latest Linux distributions.

Skills: JavaScript, Python, React, Node.js, Docker, Kubernetes, AWS`,
              permissions: '-rw-r--r--',
              size: '1.2K',
              modified: 'Dec 20 10:30'
            },
            'contact.txt': {
              name: 'contact.txt',
              type: 'file',
              content: `Contact Information
==================

Email: developer@example.com
GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourprofile
Website: https://yourportfolio.dev

Location: San Francisco, CA
Available for: Full-time opportunities, Contract work, Open source collaboration

Feel free to reach out for any inquiries or collaboration opportunities!`,
              permissions: '-rw-r--r--',
              size: '512B',
              modified: 'Dec 20 10:25'
            },
            'projects': {
              name: 'projects',
              type: 'directory',
              children: {
                'web-app': {
                  name: 'web-app',
                  type: 'directory',
                  children: {
                    'README.md': {
                      name: 'README.md',
                      type: 'file',
                      content: `# Modern Web Application

A full-stack web application built with React, Node.js, and PostgreSQL.

## Features
- User authentication and authorization
- Real-time data updates with WebSockets
- Responsive design with Tailwind CSS
- RESTful API with comprehensive documentation
- Automated testing and CI/CD pipeline

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- DevOps: Docker, GitHub Actions, AWS

## Live Demo
https://your-web-app.com

## Repository
https://github.com/yourusername/web-app`,
                      permissions: '-rw-r--r--',
                      size: '2.1K',
                      modified: 'Dec 19 15:45'
                    }
                  },
                  permissions: 'drwxr-xr-x',
                  size: '4.0K',
                  modified: 'Dec 19 15:45'
                },
                'cli-tool': {
                  name: 'cli-tool',
                  type: 'directory',
                  children: {
                    'README.md': {
                      name: 'README.md',
                      type: 'file',
                      content: `# Developer CLI Tool

A command-line utility for automating common development tasks.

## Features
- Project scaffolding and boilerplate generation
- Automated code formatting and linting
- Git workflow automation
- Environment setup scripts
- Performance monitoring and analysis

## Installation
\`\`\`bash
npm install -g dev-cli-tool
\`\`\`

## Usage
\`\`\`bash
dev-tool init my-project
dev-tool format --all
dev-tool deploy --environment production
\`\`\`

## Repository
https://github.com/yourusername/cli-tool`,
                      permissions: '-rw-r--r--',
                      size: '1.8K',
                      modified: 'Dec 18 14:20'
                    }
                  },
                  permissions: 'drwxr-xr-x',
                  size: '4.0K',
                  modified: 'Dec 18 14:20'
                },
                'open-source': {
                  name: 'open-source',
                  type: 'directory',
                  children: {
                    'contributions.txt': {
                      name: 'contributions.txt',
                      type: 'file',
                      content: `Open Source Contributions
========================

React.js
- Fixed memory leak in useEffect hook
- Improved TypeScript definitions
- Added accessibility features

Vue.js
- Performance optimizations for large lists
- Bug fixes in reactive system
- Documentation improvements

Node.js
- Security vulnerability patches
- HTTP/2 implementation enhancements
- Testing framework improvements

Linux Kernel
- Driver updates for new hardware
- Performance improvements in memory management
- Bug fixes in file system operations

Total Contributions: 150+ PRs across 25+ repositories
Recognition: Contributor badges from major projects`,
                      permissions: '-rw-r--r--',
                      size: '1.5K',
                      modified: 'Dec 17 09:15'
                    }
                  },
                  permissions: 'drwxr-xr-x',
                  size: '4.0K',
                  modified: 'Dec 17 09:15'
                }
              },
              permissions: 'drwxr-xr-x',
              size: '4.0K',
              modified: 'Dec 19 15:45'
            },
            'skills': {
              name: 'skills',
              type: 'directory',
              children: {
                'programming.txt': {
                  name: 'programming.txt',
                  type: 'file',
                  content: `Programming Languages & Frameworks
==================================

JavaScript/TypeScript ████████████████████ 95%
- React, Vue.js, Angular
- Node.js, Express, Nest.js
- Modern ES6+ features

Python ██████████████████░░ 90%
- Django, Flask, FastAPI
- Data analysis with pandas
- Machine learning with scikit-learn

Go ████████████████░░░░ 80%
- Microservices architecture
- Concurrent programming
- CLI tool development

Rust ██████████████░░░░░░ 70%
- Systems programming
- WebAssembly development
- Performance-critical applications

C/C++ ████████████░░░░░░░░ 60%
- System-level programming
- Embedded systems
- Performance optimization`,
                  permissions: '-rw-r--r--',
                  size: '1.3K',
                  modified: 'Dec 20 08:45'
                },
                'devops.txt': {
                  name: 'devops.txt',
                  type: 'file',
                  content: `DevOps & Infrastructure
=======================

Cloud Platforms:
- AWS (EC2, S3, Lambda, RDS, CloudFront)
- Google Cloud Platform
- Microsoft Azure

Containerization:
- Docker ████████████████████ 95%
- Kubernetes ██████████████████░░ 85%
- Docker Compose

CI/CD:
- GitHub Actions ████████████████████ 90%
- Jenkins ██████████████░░░░░░ 75%
- GitLab CI ████████████████░░░░ 80%

Infrastructure as Code:
- Terraform ██████████████████░░ 85%
- Ansible ████████████████░░░░ 75%
- CloudFormation ██████████████░░░░░░ 70%

Monitoring:
- Prometheus & Grafana
- ELK Stack (Elasticsearch, Logstash, Kibana)
- DataDog, New Relic`,
                  permissions: '-rw-r--r--',
                  size: '1.1K',
                  modified: 'Dec 20 08:40'
                }
              },
              permissions: 'drwxr-xr-x',
              size: '4.0K',
              modified: 'Dec 20 08:45'
            },
            'resume.txt': {
              name: 'resume.txt',
              type: 'file',
              content: `RESUME
======

John Developer
Software Engineer & Linux Enthusiast
Email: john@example.com | GitHub: github.com/johndev

EXPERIENCE
----------

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Led development of microservices architecture serving 1M+ users
• Reduced deployment time by 80% through automated CI/CD pipelines
• Mentored junior developers and established coding standards

Software Engineer | StartupXYZ | 2019 - 2021
• Built scalable web applications using React and Node.js
• Implemented real-time features using WebSockets and Redis
• Optimized database queries resulting in 50% performance improvement

Junior Developer | WebSolutions | 2018 - 2019
• Developed responsive websites using modern web technologies
• Collaborated with designers to implement pixel-perfect UIs
• Participated in code reviews and agile development processes

EDUCATION
---------

Bachelor of Computer Science | University of Technology | 2018
• Graduated Summa Cum Laude (GPA: 3.9/4.0)
• Relevant Coursework: Data Structures, Algorithms, Software Engineering

CERTIFICATIONS
--------------

• AWS Certified Solutions Architect
• Certified Kubernetes Administrator (CKA)
• Red Hat Certified Engineer (RHCE)`,
              permissions: '-rw-r--r--',
              size: '2.3K',
              modified: 'Dec 20 09:00'
            }
          },
          permissions: 'drwxr-xr-x',
          size: '4.0K',
          modified: 'Dec 20 10:30'
        }
      },
      permissions: 'drwxr-xr-x',
      size: '4.0K',
      modified: 'Dec 20 10:30'
    };
  }

  private resolvePath(path: string, currentPath: string): string {
    if (path.startsWith('/')) {
      return path;
    }

    if (path === '.') {
      return currentPath;
    }

    if (path === '..') {
      const parts = currentPath.split('/').filter(p => p);
      if (parts.length > 2) { // Don't go above /home/user
        parts.pop();
      }
      return '/' + parts.join('/');
    }

    return currentPath === '/' ? `/${path}` : `${currentPath}/${path}`;
  }

  private getNode(path: string): FileNode | null {
    const parts = path.split('/').filter(p => p);
    let current = this.root;

    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }

    return current;
  }

  ls(path: string = '', currentPath: string): string {
    const targetPath = this.resolvePath(path, currentPath);
    const node = this.getNode(targetPath);

    if (!node) {
      return `ls: cannot access '${path}': No such file or directory`;
    }

    if (node.type === 'file') {
      return node.name;
    }

    if (!node.children) {
      return '';
    }

    const items = Object.values(node.children);
    const maxNameLength = Math.max(...items.map(item => item.name.length));

    return items
      .sort((a, b) => {
        // Directories first, then files
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      })
      .map(item => {
        const color = item.type === 'directory' ? '\x1b[34m' : '\x1b[32m';
        const reset = '\x1b[0m';
        return `${color}${item.name.padEnd(maxNameLength)}${reset}`;
      })
      .join('  ');
  }

  cat(filename: string, currentPath: string): string {
    const targetPath = this.resolvePath(filename, currentPath);
    const node = this.getNode(targetPath);

    if (!node) {
      return `cat: ${filename}: No such file or directory`;
    }

    if (node.type === 'directory') {
      return `cat: ${filename}: Is a directory`;
    }

    return node.content || '';
  }

  cd(path: string, currentPath: string): { path: string; error?: string } {
    const targetPath = this.resolvePath(path, currentPath);
    const node = this.getNode(targetPath);

    if (!node) {
      return { path: currentPath, error: `cd: ${path}: No such file or directory` };
    }

    if (node.type !== 'directory') {
      return { path: currentPath, error: `cd: ${path}: Not a directory` };
    }

    return { path: targetPath };
  }

  pwd(currentPath: string): string {
    return currentPath;
  }

  find(pattern: string, currentPath: string): string {
    const results: string[] = [];

    const search = (node: FileNode, path: string) => {
      if (node.name.includes(pattern)) {
        results.push(path);
      }

      if (node.children) {
        Object.values(node.children).forEach(child => {
          const childPath = path === '/' ? `/${child.name}` : `${path}/${child.name}`;
          search(child, childPath);
        });
      }
    };

    const startNode = this.getNode(currentPath);
    if (startNode) {
      search(startNode, currentPath);
    }

    return results.length > 0 ? results.join('\n') : `No files matching '${pattern}' found`;
  }

  tree(path: string = '', currentPath: string, prefix: string = ''): string {
    const targetPath = this.resolvePath(path, currentPath);
    const node = this.getNode(targetPath);

    if (!node) {
      return `tree: ${path}: No such file or directory`;
    }

    if (node.type === 'file') {
      return node.name;
    }

    if (!node.children) {
      return node.name;
    }

    let result = node.name === 'user' ? '.' : node.name;
    const items = Object.values(node.children);

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      const currentPrefix = isLast ? '└── ' : '├── ';
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');

      result += '\n' + prefix + currentPrefix + item.name;

      if (item.type === 'directory' && item.children) {
        const subtree = this.tree(item.name, targetPath, nextPrefix);
        const subtreeLines = subtree.split('\n').slice(1); // Remove the root name
        if (subtreeLines.length > 0) {
          result += '\n' + subtreeLines.join('\n');
        }
      }
    });

    return result;
  }
}
