"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import { FileContent } from "@/components/file-content"

export function LayoutClient({
  // Renamed to LayoutClient
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [selectedFileContent, setSelectedFileContent] = useState("")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sidebar onFileSelect={setSelectedFileContent} />
      <main className="flex-1 overflow-auto">
        {selectedFileContent ? <FileContent content={selectedFileContent} /> : children}
      </main>
    </Suspense>
  )
}
