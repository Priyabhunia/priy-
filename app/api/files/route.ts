import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

function buildFileTree(dirPath: string, relativePath: string = ''): FileNode[] {
  const items: FileNode[] = [];
  const fullPath = path.join(process.cwd(), 'content', relativePath);

  try {
    const entries = fs.readdirSync(fullPath);

    for (const entry of entries) {
      const entryPath = path.join(fullPath, entry);
      const relativeEntryPath = path.join(relativePath, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        // It's a folder
        const children = buildFileTree(dirPath, relativeEntryPath);
        items.push({
          name: entry,
          type: 'folder',
          children,
          path: relativeEntryPath,
        });
      } else {
        // It's a file
        let content = '';
        try {
          // Only read text files, skip images, etc.
          if (entry.match(/\.(md|txt|json|js|ts|tsx|jsx|css|html)$/i)) {
            content = fs.readFileSync(entryPath, 'utf-8');
          }
        } catch (error) {
          console.error(`Error reading file ${entry}:`, error);
        }

        items.push({
          name: entry,
          type: 'file',
          content,
          path: relativeEntryPath,
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${fullPath}:`, error);
  }

  return items.sort((a, b) => {
    // Folders first, then files, alphabetically
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function GET() {
  try {
    const fileTree = buildFileTree('content');
    return NextResponse.json({ files: fileTree });
  } catch (error) {
    console.error('Error building file tree:', error);
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 });
  }
}