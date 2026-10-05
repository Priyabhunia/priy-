"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import { FileContent } from "@/components/file-content"

interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
  path: string;
}

export function LayoutClient({
  children,
  initialFiles,
}: Readonly<{
  children: React.ReactNode
  initialFiles: FileNode[]
}>) {
  const [selectedFileContent, setSelectedFileContent] = useState("")

  return (
    <>
      <Sidebar initialFiles={initialFiles} onFileSelect={setSelectedFileContent} />
      <main className="flex-1 overflow-auto">
        {selectedFileContent ? <FileContent content={selectedFileContent} /> : children}
      </main>
    </>
  )
}
