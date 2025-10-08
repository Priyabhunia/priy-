import fs from "fs"
import path from "path"
import { marked } from "marked"

export default async function Home() {
  // Read the about.md file from the content directory
  const aboutPath = path.join(process.cwd(), "content", "about.md")
  const aboutContent = fs.readFileSync(aboutPath, "utf8")
  const html = marked.parse(aboutContent)

  return (
    <div>
      <div className="prose max-w-xl" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
