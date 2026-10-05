import fs from 'fs';
import path from 'path';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

export function buildFileTree(relativePath: string = ''): FileNode[] {
  const items: FileNode[] = [];
  const fullPath = path.join(process.cwd(), 'content', relativePath);

  try {
    const entries = fs.readdirSync(fullPath);

    for (const entry of entries) {
      const entryPath = path.join(fullPath, entry);
      const relativeEntryPath = path.join(relativePath, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        const children = buildFileTree(relativeEntryPath);
        items.push({
          name: entry,
          type: 'folder',
          children,
          path: relativeEntryPath,
        });
      } else {
        let content = '';
        try {
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
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}
