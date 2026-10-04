import fs from "fs"
import path from "path"
import { marked } from "marked"
import { preserveMarkdownSpacing } from "@/lib/markdown"

export const dynamic = "force-dynamic"

export default async function Home() {
  // Read the markdown file from the content directory
  const aboutPath = path.join(process.cwd(), "content", "only-markdown-test.md")
  const rawContent = fs.readFileSync(aboutPath, "utf8")
  const processedContent = preserveMarkdownSpacing(rawContent)
  const html = marked.parse(processedContent, { breaks: true })
  
  return (
    <div className="flex flex-col items-center justify-start min-h-full w-full py-10 px-6">
      <div className="prose max-w-2xl w-full text-center" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
