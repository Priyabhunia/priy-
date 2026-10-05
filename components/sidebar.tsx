"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronRightIcon, FolderIcon, FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
  path: string;
}

interface FileExplorerProps {
  nodes: FileNode[]
  onFileSelect: (content: string) => void
}

const FileExplorer: React.FC<FileExplorerProps> = ({ nodes, onFileSelect }) => {
  return (
    <div className="space-y-1">
      {nodes.map((node) => (
        <FileNodeComponent 
          key={node.path}  // Use path as key for uniqueness
          node={node} 
          onFileSelect={onFileSelect} 
        />
      ))}
    </div>
  );
};

interface FileNodeComponentProps {
  node: FileNode
  onFileSelect: (content: string) => void
}

const FileNodeComponent: React.FC<FileNodeComponentProps> = ({ node, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNodeClick = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    } else if (node.type === "file" && node.content) {
      onFileSelect(node.content);
    }
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer py-1 px-2 rounded-md hover:bg-accent hover:text-accent-foreground"
        onClick={handleNodeClick}
      >
        {node.type === "folder" && (
          <ChevronRightIcon className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
        )}
        {node.type === "folder" ? (
          <FolderIcon className="h-4 w-4 mr-2 text-yellow-1000" />
        ) : (
          <FileIcon className="h-4 w-4 mr-2 text-gray-500" />
        )}
        <span>{node.name}</span>
      </div>
      {node.type === "folder" && isOpen && node.children && (
        <div className="ml-4 border-l border-border pl-2">
          <FileExplorer nodes={node.children} onFileSelect={onFileSelect} />
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  initialFiles?: FileNode[]
  onFileSelect: (content: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ initialFiles, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [fileStructure, setFileStructure] = useState<FileNode[]>(initialFiles || []);
  const [loading, setLoading] = useState(!initialFiles || initialFiles.length === 0);

  // Only fetch client-side if no initialFiles were provided from the server
  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        const data = await response.json();
        setFileStructure(data.files || []);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [initialFiles]);

  if (loading) {
    return (
      <div className="relative h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="flex items-center justify-center p-4">
          <div className="text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-12",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {isOpen && <h2 className="text-lg font-semibold">Priy@ Bhunia</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <ChevronRightIcon className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")} />
        </button>
      </div>
      {isOpen && (
        <div className="p-4 overflow-auto h-[calc(100%-64px)]">
          <FileExplorer nodes={fileStructure} onFileSelect={onFileSelect} />
        </div>
      )}
    </div>
  );
};