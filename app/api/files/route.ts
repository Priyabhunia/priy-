import { NextResponse } from 'next/server';
import { buildFileTree } from '@/lib/files';

export async function GET() {
  try {
    const fileTree = buildFileTree();
    return NextResponse.json({ files: fileTree });
  } catch (error) {
    console.error('Error building file tree:', error);
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 });
  }
}