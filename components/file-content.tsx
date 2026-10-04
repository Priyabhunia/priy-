"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { preserveMarkdownSpacing } from "@/lib/markdown"

interface FileContentProps {
  content: string
}

export const FileContent: React.FC<FileContentProps> = ({ content }) => {
  const processedContent = preserveMarkdownSpacing(content)

  return (
    <div className="flex flex-col items-center justify-start min-h-full w-full py-10 px-6">
      <div className="prose dark:prose-invert max-w-2xl w-full text-center">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return match ? (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-left inline-block max-w-full">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  )
}