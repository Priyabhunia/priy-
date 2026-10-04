/**
 * Preprocesses markdown text so that multiple consecutive Enters (newlines)
 * create visible vertical line gaps instead of being collapsed by Markdown parsers.
 * Also preserves leading Enters at the top of the file, while keeping code blocks intact.
 */
export function preserveMarkdownSpacing(content: string): string {
  if (!content) return ""

  // Split by code blocks (```...```) so we don't alter code block formatting
  const parts = content.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g)

  return parts
    .map((part, index) => {
      // Odd index means it is inside a code block; leave unchanged
      if (index % 2 === 1) {
        return part
      }

      // Normalize line endings
      let text = part.replace(/\r\n/g, "\n")

      // Clear whitespace-only lines (spaces/tabs on empty lines)
      text = text.replace(/^[ \t]+$/gm, "")

      // Preserve leading enters at the very start of the file
      if (index === 0) {
        text = text.replace(/^(\n+)/, (match) => {
          return Array(match.length).fill("&nbsp;").join("\n\n") + "\n\n"
        })
      }

      // Handle 3 or more consecutive enters:
      // 2 newlines = standard paragraph break
      // 3+ newlines = user pressed Enter extra times -> insert &nbsp; spacer paragraphs
      text = text.replace(/\n{3,}/g, (match) => {
        const extraEnters = match.length - 2
        return "\n\n" + Array(extraEnters).fill("&nbsp;").join("\n\n") + "\n\n"
      })

      return text
    })
    .join("")
}
