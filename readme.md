const initialStructure: FileNode[] = [
  {
    name: "projects",           // Main projects folder
    type: "folder",
    children: [
      {
        name: "python-project-blogpost.md",
        type: "file",
        content: '# My Python Project Blog Post\n\nThis is a blog post about my awesome Python project. It uses Flask and a bit of machine learning.\n\n## Features\n\n- User authentication\n- Data visualization\n- API endpoints\n\n```python\nprint("Hello, Python!")\n```\n',
      },
      {
        name: "web-dev-project",
        type: "folder",
        children: [
          {
            name: "index.html",
            type: "file",
            content: "<h1>Web Dev Project</h1><p>A simple web development project.</p>",
          },
          {
            name: "styles.css",
            type: "file",
            content: "body { font-family: sans-serif; }",
          },
        ],
      },
      {
        name: "about.md",
        type: "file",
        content: "# About Me\n\nHello! I am a passionate developer with a focus on creating clean and efficient code.",
      },
      {
        name: "contact.md",
        type: "file",
        content: "# Contact Me\n\nYou can reach me at example@example.com",
      },
    ],
  },
  // Add more main folders here
];
```

### 2. **Adding New Project Categories**

**Example: Add a "Mobile Apps" section:**

```typescript
const initialStructure: FileNode[] = [
  {
    name: "projects",
    type: "folder",
    children: [
      // ... existing projects
    ],
  },
  {
    name: "mobile-apps",
    type: "folder",
    children: [
      {
        name: "react-native-app",
        type: "folder",
        children: [
          {
            name: "README.md",
            type: "file",
            content: `# React Native Fitness Tracker\n\nA mobile app for tracking workouts and nutrition.\n\n## Tech Stack\n- React Native\n- Redux Toolkit\n- Firebase\n\n## Features\n- Workout logging\n- Nutrition tracking\n- Progress charts`,
          },
          {
            name: "package.json",
            type: "file",
            content: `{\n  "name": "fitness-tracker",\n  "dependencies": {\n    "react-native": "^0.72.0",\n    "redux": "^4.2.0"\n  }\n}`,
          },
        ],
      },
    ],
  },
  // Add more categories...
];
```

### 3. **Adding Individual Project Files**

**Example: Add a new web project:**

```typescript
{
  name: "ecommerce-website",
  type: "folder",
  children: [
    {
      name: "README.md",
      type: "file",
      content: `# E-commerce Website\n\nFull-stack e-commerce platform with React and Node.js.\n\n## Features\n- User authentication\n- Product catalog\n- Shopping cart\n- Payment integration\n- Admin dashboard`,
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            {
              name: "ProductCard.tsx",
              type: "file",
              content: `import React from 'react';\n\nconst ProductCard = ({ product }) => {\n  return (\n    <div className="product-card">\n      <h3>{product.name}</h3>\n      <p>${product.price}</p>\n    </div>\n  );\n};\n\nexport default ProductCard;`,
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
      type: "file",
      content: `{\n  "name": "ecommerce-site",\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build"\n  },\n  "dependencies": {\n    "next": "^14.0.0",\n    "react": "^18.0.0"\n  }\n}`,
    },
  ],
},
```

### 4. **Adding Resume/About Section**

```typescript
{
  name: "resume",
  type: "folder",
  children: [
    {
      name: "experience.md",
      type: "file",
      content: `# Work Experience\n\n## Senior Developer\n**TechCorp Inc.** | 2022 - Present\n- Led development of React applications\n- Managed team of 5 developers\n\n## Full Stack Developer\n**StartupXYZ** | 2020 - 2022\n- Built Node.js APIs\n- Worked with MongoDB databases`,
    },
    {
      name: "skills.md",
      type: "file",
      content: `# Technical Skills\n\n## Frontend\n- React, Next.js, TypeScript\n- HTML5, CSS3, Tailwind CSS\n\n## Backend\n- Node.js, Python, Django\n- PostgreSQL, MongoDB\n\n## Tools\n- Git, Docker, AWS`,
    },
    {
      name: "education.md",
      type: "file",
      content: `# Education\n\n## Computer Science Degree\n**University of Technology** | 2016 - 2020\n- GPA: 3.8/4.0\n- Relevant Coursework: Data Structures, Algorithms, Web Development`,
    },
  ],
},
```

### 5. **Adding Blog Posts**

```typescript
{
  name: "blog",
  type: "folder",
  children: [
    {
      name: "how-i-built-my-portfolio.md",
      type: "file",
      content: `# How I Built My Portfolio Website\n\n## Choosing the Tech Stack\n\nI decided to use Next.js because...\n\n## Design Decisions\n\nThe color scheme uses OKLCH colors because...\n\n## Challenges Overcome\n\nSetting up the file structure was tricky but...`,
    },
    {
      name: "web-development-trends-2024.md",
      type: "file",
      content: `# Web Development Trends for 2024\n\n## 1. Server Components\n\nNext.js 13+ introduced...\n\n## 2. AI Integration\n\nMore developers are using AI tools...\n\n## 3. WebAssembly\n\nWASM is becoming more popular for...`,
    },
  ],
},
```

### 6. **File Naming Conventions**

- **Use descriptive names**: `react-portfolio-project.md` instead of `project1.md`
- **Include file extensions**: `.md` for markdown, `.tsx` for React components, `.json` for config files
- **Organize by technology**: Group similar projects together
- **Use README files**: Every project folder should have a `README.md` explaining the project

### 7. **Content Formatting Tips**

**For Markdown files (.md):**
- Use `#` for headings
- Use `**bold**` and `*italic*` text
- Use code blocks with ```language syntax
- Use bullet points with `-` 

**For Code files:**
- Include actual code snippets
- Show configuration files
- Include package.json for projects

This structure makes it easy for visitors to navigate your projects and understand your work. You can organize by technology, project type, or chronology - whatever makes sense for your portfolio!

Would you like me to help you add a specific project or reorganize your current structure?