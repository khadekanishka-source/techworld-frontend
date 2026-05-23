// src/pages/fundamentals/react/index.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Clock, BookOpen, CheckCircle, Circle, Search,
  Code, Coffee, Layers, Zap, GitBranch, Shield, Menu,
  LogIn, UserPlus, Sparkles, TrendingUp, Copy, Check,
  Terminal, FileCode, BookMarked, Home
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Types
interface CodeBlock { lang: string; code: string; label?: string; }
interface Lesson {
  id: string; title: string; duration: string;
  content: string; codeBlocks?: CodeBlock[];
}
interface Module { id: string; title: string; icon: any; color: string; lessons: Lesson[]; }

// Code Editor Component
function CodeEditor({ lang = "jsx", code, label }: { lang?: string; code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-gray-700/60 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e] border-b border-gray-700/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 ml-2 px-3 py-0.5 bg-[#2a2a3d] rounded-md">
          <FileCode className="w-3 h-3 text-blue-400" />
          <span className="text-xs text-gray-300 font-mono">{label || "App.jsx"}</span>
        </div>
        <button onClick={copy} className="ml-auto flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-white bg-[#2a2a3d] hover:bg-[#3a3a50] rounded-md transition-all">
          {copied ? <><Check className="w-3 h-3 text-green-400" /><span className="text-green-400">Copied</span></> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <div className="bg-[#1a1a2e] overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={lang}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{ margin: 0, padding: "1rem", background: "#1a1a2e", fontSize: "0.875rem", lineHeight: "1.5" }}
          lineNumberStyle={{ color: "#6b7280", paddingRight: "1rem", borderRight: "1px solid #2d2d3a", marginRight: "1rem" }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// Note Component (optional info box)
function Note({ type = "info", children }: { type?: "info" | "warn" | "tip" | "error"; children: React.ReactNode }) {
  const styles = {
    info: { bg: "bg-blue-500/10 border-blue-500/30", icon: "💡", text: "text-blue-300" },
    warn: { bg: "bg-yellow-500/10 border-yellow-500/30", icon: "⚠️", text: "text-yellow-300" },
    tip: { bg: "bg-green-500/10 border-green-500/30", icon: "✅", text: "text-green-300" },
    error: { bg: "bg-red-500/10 border-red-500/30", icon: "❌", text: "text-red-300" },
  };
  const s = styles[type];
  return (
    <div className={`my-4 px-4 py-3 rounded-lg border ${s.bg} flex gap-3 items-start`}>
      <span className="text-base mt-0.5 flex-shrink-0">{s.icon}</span>
      <div className={`text-sm ${s.text} leading-relaxed`}>{children}</div>
    </div>
  );
}

// Table Component
function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto my-5 rounded-xl border border-gray-700/50">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#1e1e2e]">
            {headers.map((h, i) => <th key={i} className="px-4 py-3 text-left text-blue-300 font-semibold border-b border-gray-700/50 whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-900/20" : "bg-gray-900/40"}>
              {row.map((cell, j) => <td key={j} className="px-4 py-2.5 text-gray-300 border-b border-gray-800/30 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// React Fundamentals Curriculum
// ============================================================================
const curriculum: Module[] = [
  {
    id: "intro",
    title: "React Introduction",
    icon: () => <span className="text-cyan-400">⚛️</span>,
    color: "text-cyan-400",
    lessons: [
    
      {
      id: "installation-guide",
      title: "1. Project Setup & Installation",
      duration: "10 min",
      content: `<h2 class="text-2xl font-bold text-white mb-4">Setting Up Your React Environment</h2>
<p class="text-gray-300 mb-4">Before starting with code development, every student needs to configure their local development machine with Node.js and pull down the project core package dependencies.</p>

<h3 class="text-xl font-semibold text-cyan-400 mb-3">Prerequisites</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-4">
  <li><strong>Node.js:</strong> Ensure you have the latest LTS version installed from <a href="https://nodejs.org/" target="_blank" class="text-cyan-400 underline">nodejs.org</a>.</li>
</ul>

<h3 class="text-xl font-semibold text-cyan-400 mb-3">Step-by-Step Instructions</h3>
<ol class="list-decimal pl-6 space-y-3 text-gray-300 mb-4">
  <li><strong>Navigate to Your Project Folder:</strong> Open your terminal/command prompt and make sure you are working in the root directory where the code lives.</li>
  <li><strong>Install Packages:</strong> Execute the package installer command to pull in React, Vite, and CSS dependencies.</li>
  <li><strong>Boot the Environment:</strong> Start up the local fast-refresh engine server.</li>
</ol>`,
      codeBlocks: [
        {
          lang: "bash",
          label: "Terminal Commands",
          code: `# Step 1: Install all package dependencies\nnpm install\n\n# Step 2: Spin up the local development web server\nnpm run dev`
        }
      ]
    },
      {
        id: "what-is-react",
        title: "What is React?",
        duration: "5 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Introduction to React</h2>
<p class="text-gray-300 mb-4">React is a popular open-source JavaScript library developed by Facebook. It is used exclusively for building fast, interactive, and scalable user interfaces (UIs) for single-page applications.</p>

<h3 class="text-xl font-semibold text-cyan-400 mb-3">Why Use React? (W3Schools Style)</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-6">
  <li><strong>Component-Based:</strong> You build small, isolated pieces of code called components (like a button or a navigation bar) and combine them to create complex UIs.</li>
  <li><strong>Virtual DOM:</strong> Instead of reloading the entire page when something changes, React updates only the specific part that changed, making your apps incredibly fast.</li>
  <li><strong>Declarative Syntax:</strong> You simply design how the UI should look based on the current data, and React handles updating the screen automatically.</li>
</ul>

<div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
  <p class="text-sm text-amber-400 font-medium">💡 Quick Note for Students:</p>
  <p class="text-xs text-gray-400 mt-1">To learn React effectively, you should already have a basic understanding of HTML, CSS, and modern JavaScript (ES6+ arrays, arrow functions, and destructuring).</p>
</div>`,
        codeBlocks: [
          {
            lang: "jsx",
            label: "BasicComponent.jsx",
            code: `// A simple React component looks like this:\nfunction WelcomeMessage() {\n  return (\n    <div>\n      <h1>Welcome to Tech World!</h1>\n      <p>Let's master React step by step.</p>\n    </div>\n  );\n}\n\nexport default WelcomeMessage;`
          }
        ]
      },
      {
        id: "first-component",
        title: "Your First Component",
        duration: "8 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">React Components</h2>
<p class="text-gray-300 mb-4">Components are the building blocks of any React application. They allow you to split the UI into independent, reusable pieces.</p>
<h3 class="text-xl font-semibold text-cyan-400 mb-3">Crucial Component Rules</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-6">
  <li><strong>Naming Convention:</strong> Component names <em>must</em> always start with an uppercase letter.</li>
  <li><strong>Single Return Root:</strong> A component can only return a single parent element.</li>
</ul>
<div class="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-4 mb-4">
  <p class="text-sm text-emerald-400 font-medium">Task for Students:</p>
  <p class="text-xs text-gray-300 mt-1">Look at the workspace editor. Modify the component code to see updates.</p>
</div>`,
        codeBlocks: [
          {
            lang: "jsx",
            label: "ButtonComponent.jsx",
            code: `import React from 'react';\n\nfunction CustomButton() {\n  return (\n    <button>Click Me</button>\n  );\n}`
          }
        ]
    
      },
    
      {
        id: "react-basics",
        title: "React Basics",
        duration: "10 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">React JSX Introduction</h2>
<p class="text-gray-300 mb-4">JSX is an extension of JavaScript that allows developers to write HTML-like markup directly inside a React file. It simplifies the process of creating and structuring user interfaces.</p>
<div class="bg-slate-800/50 border-l-4 border-cyan-500 p-4 mb-4 rounded-r-lg">
  <p class="text-gray-300 font-semibold"><strong>W3Schools Tip:</strong> JSX is not mandatory for React, but it makes your code much cleaner and easier to maintain.</p>
</div>
<h3 class="text-xl font-semibold text-cyan-400 mb-3">Core Syntax Rules:</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-4">
  <li><strong>Single Parent Element:</strong> Your markup must return a solitary root element like a <code>&lt;div&gt;</code> or an empty fragment <code>&lt;&gt;&lt;/&gt;</code>.</li>
  <li><strong>Strict Closing Tags:</strong> Every element must be explicitly closed. Self-closing tags must end with a slash, such as <code>&lt;input /&gt;</code>.</li>
  <li><strong>JavaScript Expressions:</strong> You can embed dynamic logic or variables into your HTML by wrapping them in curly braces <code>{ }</code>.</li>
  <li><strong>Naming Conventions:</strong> Because JSX compiles into JavaScript, it uses camelCase for attributes like <code>className</code>.</li>
</ul>`,
        codeBlocks: [
          {
            lang: "jsx",
            label: "App.jsx",
            code: `import React from 'react';\n\nfunction App() {\n  const greeting = "Welcome to React Tutorial";\n  return (\n    <div>\n      <h1>{greeting}</h1>\n      <p>JSX makes UI development simple.</p>\n    </div>\n  );\n}`
          }
        ]
      },
      {
        id: "props",
        title: "React Props",
        duration: "12 min",
        content: `
          <h2 class="text-2xl font-bold text-white mb-4">React Components Props</h2>
          <p class="text-gray-300 mb-4">Props (short for properties) are read-only configuration objects passed into React components. They act exactly like custom HTML attributes and allow components to talk to one another.</p>
          
          <div class="bg-slate-800/50 border-l-4 border-yellow-500 p-4 mb-4 rounded-r-lg">
            <p class="text-gray-300 font-semibold"><strong>Important Rule:</strong> Props are immutable. A component can read incoming data but must never attempt to change it directly.</p>
          </div>

          <h3 class="text-xl font-semibold text-cyan-400 mb-3">Data Flow Concept:</h3>
          <p class="text-gray-300 mb-4">In React, data flows in a single direction (downwards from parent to child). You assign attributes in the parent element, and the child component receives them as an grouped object parameter.</p>
          
          <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
            <p class="text-gray-400 text-sm mb-1">// Parent passing a string variable named 'user'</p>
            <code class="text-emerald-400">&lt;UserDashboard user="Alex" /&gt;</code>
          </div>
        `,
        codeBlocks: [
          {
            lang: "jsx",
            label: "UserDashboard.jsx",
            code: `// Child component extracting and reading data\nfunction UserDashboard(props) {\n  return (\n    <section>\n      <h3>Active Profile</h3>\n      <p>Logged in user: {props.user}</p>\n    </section>\n  );\n}\n\nexport default UserDashboard;`
          }
        ],
      
    
  

      },  
  {
    id: "state",
    title: "React State",
    duration: "12min",
    content: `<h2 class="text-2xl font-bold text-white mb-4">React State Introduction</h2>
<p class="text-gray-300 mb-4">React components have a built-in state object. State is where you store local property values that belong directly to the component. When the state value changes, the component automatically re-renders.</p>
<div class="bg-slate-800/50 border-l-4 border-cyan-500 p-4 mb-4 rounded-r-lg">
  <p class="text-gray-300 font-semibold"><strong>Core Concept:</strong> In modern functional development, we use the <code>useState</code> Hook to track, monitor, and update application data states seamlessly.</p>
</div>
<h3 class="text-xl font-semibold text-cyan-400 mb-3">State Management Rules:</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-4">
  <li><strong>Initialization:</strong> State variable blocks are declared inside a component function using Hook destructuring arrays.</li>
  <li><strong>Immutability:</strong> Never modify state properties directly. Always execute edits via its dedicated setter mutation function.</li>
</ul>
`,
    codeBlocks: [
      {
        lang: "jsx",
        label: "Counter.jsx",
        code: `import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}`
      }
    ]
  },
  {
    id: "handling-events",
    title: "Handling Events",
    duration: "9 min",
    content: `<h2 class="text-2xl font-bold text-white mb-4">React Event Handling</h2>
<p class="text-gray-300 mb-4">React can trigger specific operational code functions based on active user input behaviors like button clicks, form mutations, or hover triggers.</p>
<h3 class="text-xl font-semibold text-cyan-400 mb-3">Key Event Rules:</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-4">
  <li><strong>CamelCase Listeners:</strong> Event listeners follow camelCase rules (e.g., use <code>onClick</code> instead of standard lowercase <code>onclick</code>).</li>
  <li><strong>Function References:</strong> Pass full executable handler method declarations directly within curly braces instead of layout string symbols.</li>
</ul>`,
    codeBlocks: [
      {
        lang: "jsx",
        label: "Football.jsx",
        code: `function Football() {\n  const shoot = () => {\n    alert("Great Shot!");\n  };\n  return (\n    <button onClick={shoot}>Take the shot!</button>\n  );\n}`
      }
    ]
  },
  {
      id: "forms",
      title: "React Forms",
      duration: "11 min",
      content: `<h2 class="text-2xl font-bold text-white mb-4">Managing Forms in React</h2>
<p class="text-gray-300 mb-4">In React, form data is usually handled by the component's state. This pattern is known as <em>controlled components</em>, where the state serves as the single source of truth.</p>
<h3 class="text-xl font-semibold text-cyan-400 mb-3">Key Form Concepts:</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-4">
  <li><strong>onChange Handler:</strong> Every input element updates the state using an <code>onChange</code> event tracking function.</li>
  <li><strong>onSubmit Handler:</strong> Form submission is captured with <code>onSubmit</code>, where you must use <code>event.preventDefault()</code> to stop the page from refreshing.</li>
</ul>`,
      codeBlocks: [
        {
          lang: "jsx",
          label: "MyForm.jsx",
          code: `import React, { useState } from 'react';\n\nfunction MyForm() {\n  const [name, setName] = useState("");\n  const handleSubmit = (event) => {\n    event.preventDefault();\n    alert(\`Submitted name: \${name}\`);\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}`
        }
      ]
    },
      {
        id: "react-router",
        title: "React Router (Navigation)",
        duration: "18 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Multi-Page Navigation</h2>\n<p class="text-gray-300 mb-4">React apps are Single Page Applications (SPAs). We use React Router to switch views instantly by syncing the UI components with the browser URL without page reloads.</p>`,
        codeBlocks: [
          {
            lang: "jsx",
            label: "AppRouter.jsx",
            code: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nexport default function AppRouter() {\n  return (\n    <BrowserRouter>\n      <nav class="flex gap-4 mb-4">\n        <Link to="/" class="text-cyan-400">Home</Link>\n        <Link to="/about" class="text-cyan-400">About</Link>\n      </nav>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}`
          }
        ]
      },
      {
        id: "api-fetching",
        title: "API Data Fetching",
        duration: "15 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Connecting to External APIs</h2>\n<p class="text-gray-300 mb-4">Real-world applications load dynamic data from servers. Using the standard <code>useEffect</code> hook alongside <code>fetch</code> or <code>axios</code> handles this cleanly side-effect style.</p>`,
        codeBlocks: [
          {
            lang: "jsx",
            label: "DataList.jsx",
            code: `import React, { useState, useEffect } from 'react';\n\nexport default function DataList() {\n  const [items, setItems] = useState([]);\n\n  useEffect(() => {\n    fetch('https://api.example.com/items')\n      .then(res => res.json())\n      .then(data => setItems(data));\n  }, []);\n\n  return (\n    <ul class="text-gray-300">\n      {items.map(item => <li key={item.id}>{item.name}</li>)}\n    </ul>\n  );\n}`
          }
        ]
      },
      {
      id: "context-api",
      title: "React Context API",
      duration: "15 min",
      content: `<h2 class="text-2xl font-bold text-white mb-4">Global State via Context API</h2>\n<p class="text-gray-300 mb-4">Passing props manually through nested child components is called Prop Drilling. Context API solves this by broadcasting data directly to any component that needs it.</p>`,
      codeBlocks: [
        {
          lang: "jsx",
          label: "ThemeContext.jsx",
          code: `import React, { createContext, useState } from 'react';\n\nexport const ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('dark');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}`
        }
      ]
    },
    {
      id: "custom-hooks",
      title: "Custom React Hooks",
      duration: "12 min",
      content: `<h2 class="text-2xl font-bold text-white mb-4">Building Custom Hooks</h2>\n<p class="text-gray-300 mb-4">When you have stateful logic that needs to be shared across multiple components, you can extract it into a reusable function. Custom hooks must always start with the word "use".</p>`,
      codeBlocks: [
        {
          lang: "jsx",
          label: "useFetch.jsx",
          code: `import { useState, useEffect } from 'react';\n\nexport function useToggle(initialValue = false) {\n  const [value, setValue] = useState(initialValue);\n  const toggle = () => setValue(!value);\n  return [value, toggle];\n}`
        }
      ]
    },
    {
      id: "react-optimization",
      title: "React Performance (useMemo & useCallback)",
      duration: "18 min",
      content: `<h2 class="text-2xl font-bold text-white mb-4">Optimizing React Performance</h2>\n<p class="text-gray-300 mb-4">By default, React components re-render whenever their parent re-renders or state changes. To avoid heavy calculation lags or unnecessary function recreations, we use caching hooks.</p>\n<h3 class="text-xl font-semibold text-cyan-400 mb-3">Core Performance Hooks:</h3>\n<ul class="list-disc pl-6 space-y-2 text-gray-300 mb-4">\n  <li><strong>useMemo:</strong> Caches the calculated <em>result value</em> of an expensive computation.</li>\n  <li><strong>useCallback:</strong> Caches the <em>function definition itself</em> between renders to maintain strict reference checks.</li>\n</ul>`,
      codeBlocks: [
        {
          lang: "jsx",
          label: "MemoComponent.jsx",
          code: `import React, { useState, useMemo, useCallback } from 'react';\n\nexport default function MemoComponent() {\n  const [count, setCount] = useState(0);\n  const [items] = useState([1, 2, 3, 4, 5]);\n\n  const heavyCalculation = useMemo(() => {\n    return items.map(i => i * 100).reduce((a, b) => a + b, 0);\n  }, [items]);\n\n  const logMessage = useCallback(() => {\n    console.log("Button clicked!");\n  }, []);\n\n  return <button onClick={logMessage}>Total: {heavyCalculation}</button>;\n}`
        }
      ]
    },
    {
      id: "advanced-forms",
      title: "Advanced Forms & Validation",
      duration: "15 min",
      content: `<h2 class="text-2xl font-bold text-white mb-4">Advanced Form Management</h2>\n<p class="text-gray-300 mb-4">Handling complex production-grade forms with multiple fields requires structured logic constraints for tracking submission errors and instant validation handling.</p>`,
      codeBlocks: [
        {
          lang: "jsx",
          label: "ValidatedForm.jsx",
          code: `import React, { useState } from 'react';\n\nexport default function ValidatedForm() {\n  const [email, setEmail] = useState("");\n  const [error, setError] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!email.includes("@")) {\n      setError("Invalid Email Address");\n    } else {\n      setError("");\n      alert("Form submitted safely!");\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      {error && <span class="text-red-500">{error}</span>}\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}`
        }
      ]
    }
  ]
}
];
  


    
  

  
  

  // ============================================================================
  // LessonView Component
  // ============================================================================
  function LessonView({ lesson, completedLessons, onComplete }: {
    lesson: Lesson;
    completedLessons: string[];
    onComplete: (id: string) => void;
  }) {
    const isDone = completedLessons.includes(lesson.id);
    return (
      <div className="min-h-full">
        <div
          className="prose prose-invert max-w-none
          prose-h2:text-2xl prose-h2:font-bold prose-h2:text-white prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-700/50 prose-h2:pb-3
          prose-h3:text-lg prose-h3:font-semibold prose-h3:text-blue-300 prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-300 prose-p:leading-7 prose-p:mb-4
          prose-ul:text-gray-300 prose-ol:text-gray-300
          prose-li:mb-1 prose-li:leading-7
          prose-strong:text-white
          prose-code:text-blue-300 prose-code:bg-blue-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
        {lesson.codeBlocks?.map((cb, i) => <CodeEditor key={i} lang={cb.lang} code={cb.code} label={cb.label} />)}
        {!isDone && (
          <button
            onClick={() => onComplete(lesson.id)}
            className="mt-10 flex items-center gap-2 px-5 py-2.5 bg-green-600/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-600/30 transition-all text-sm font-medium"
          >
            <CheckCircle className="w-4 h-4" />
            Mark Lesson as Complete
          </button>
        )}
        {isDone && (
          <div className="mt-10 flex items-center gap-2 px-5 py-2.5 bg-green-600/10 text-green-400 border border-green-500/20 rounded-xl text-sm font-medium w-fit">
            <CheckCircle className="w-4 h-4" />
            Lesson Completed!
          </div>
        )}
      </div>
    );
  }

// ============================================================================
// Main Component
// ============================================================================
export default function ReactCourse() {
  const allLessons = curriculum.flatMap(m => m.lessons);
  const totalLessons = allLessons.length;

  const [activeId, setActiveId] = useState(allLessons[0]?.id || "");
  const [expanded, setExpanded] = useState<string[]>(["intro"]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentLesson = allLessons.find(l => l.id === activeId)!;
  const currentModule = curriculum.find(m => m.lessons.some(l => l.id === activeId))!;
  const currentIdx = allLessons.findIndex(l => l.id === activeId);
  const completedCount = completed.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  // Load completed from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("react_completed");
    if (stored) setCompleted(JSON.parse(stored));
  }, []);

  // Save completed to localStorage
  useEffect(() => {
    localStorage.setItem("react_completed", JSON.stringify(completed));
  }, [completed]);

  // Scroll tracking & auto-complete
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handler = () => {
      const total = el.scrollHeight - el.clientHeight;
      if (total <= 0) return;
      const pct = Math.round((el.scrollTop / total) * 100);
      setReadProgress(pct);
      if (pct > 85 && !completed.includes(activeId)) {
        setCompleted(prev => [...prev, activeId]);
      }
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, [activeId, completed]);

  const goToLesson = useCallback((id: string) => {
    setActiveId(id);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleModule = (id: string) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const markComplete = (id: string) => {
    if (!completed.includes(id)) setCompleted(prev => [...prev, id]);
  };

  const filteredModules = curriculum.map(mod => ({
    ...mod,
    lessons: search ? mod.lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase())) : mod.lessons
  })).filter(mod => !search || mod.lessons.length > 0);

  if (!currentLesson) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#0d0d14] text-white overflow-hidden font-sans">
      {/* LEFT SIDEBAR */}
      <aside className={`
        relative flex-shrink-0 flex flex-col border-r border-gray-800/60 bg-[#11111c]
        transition-all duration-300
        ${sidebarOpen ? "w-72" : "w-14"}
      `}>
        <button
          onClick={() => setSidebarOpen(b => !b)}
          className="absolute -right-3.5 top-8 z-10 w-7 h-7 bg-[#1a1a2e] border border-gray-700 rounded-full flex items-center justify-center hover:bg-[#252535] transition shadow-lg"
        >
          {sidebarOpen ? <ChevronLeft className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
        </button>

        {sidebarOpen ? (
          <>
            <div className="p-4 border-b border-gray-800/60">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Home className="w-3 h-3" />
                <span>/</span>
                <span className="text-cyan-400 font-medium">React Fundamentals</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-gray-400">Course Progress</span>
                  <span className="text-cyan-400 font-semibold">{completedCount}/{totalLessons}</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }} />
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search lessons..."
                  className="w-full pl-9 pr-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-800">
              {filteredModules.map(mod => (
                <div key={mod.id} className="mb-1">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/[0.04] transition group"
                  >
                    <mod.icon className={`w-4 h-4 ${mod.color} flex-shrink-0`} />
                    <span className="flex-1 text-left text-xs font-semibold text-gray-300 group-hover:text-white truncate">{mod.title}</span>
                    <span className="text-xs text-gray-600">
                      {mod.lessons.filter(l => completed.includes(l.id)).length}/{mod.lessons.length}
                    </span>
                    {expanded.includes(mod.id) ? <ChevronUp className="w-3.5 h-3.5 text-gray-600" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-600" />}
                  </button>

                  {expanded.includes(mod.id) && (
                    <div className="pl-3 pb-1">
                      {mod.lessons.map(lesson => (
                        <button
                          key={lesson.id}
                          onClick={() => goToLesson(lesson.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left mb-0.5
                            ${activeId === lesson.id
                              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20"
                              : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]"}`}
                        >
                          {completed.includes(lesson.id)
                            ? <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            : <Circle className={`w-3 h-3 flex-shrink-0 ${activeId === lesson.id ? "text-cyan-400" : "text-gray-700"}`} />}
                          <span className="text-xs flex-1 truncate">{lesson.title}</span>
                          <span className="text-[10px] text-gray-600 flex-shrink-0">{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-800/60 space-y-1.5">
              <Link to="/login" className="flex items-center gap-2 px-3 py-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600/20 transition text-xs">
                <LogIn className="w-3.5 h-3.5" /><span>Log in to save progress</span>
              </Link>
              <Link to="/signup" className="flex items-center gap-2 px-3 py-2 bg-purple-600/10 text-purple-400 rounded-lg hover:bg-purple-600/20 transition text-xs">
                <UserPlus className="w-3.5 h-3.5" /><span>Sign up free</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center py-4 gap-4">
            <Menu className="w-4 h-4 text-gray-600 mt-4" />
            {curriculum.map(mod => (
              <button key={mod.id} onClick={() => { setSidebarOpen(true); setExpanded([mod.id]); }}
                className="p-2 rounded-lg hover:bg-white/[0.05] transition" title={mod.title}>
                <mod.icon className={`w-4 h-4 ${mod.color}`} />
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main ref={mainRef} className="flex-1 overflow-y-auto bg-[#0d0d14]">
        <div className="sticky top-0 z-10 h-0.5 bg-gray-900">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-200" style={{ width: `${readProgress}%` }} />
        </div>

        <div className="max-w-3xl mx-auto px-8 py-10">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-6">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/courses" className="hover:text-gray-300 transition">Courses</Link>
            <ChevronRight className="w-3 h-3" />
            <span className={currentModule?.color}>React Fundamentals</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{currentLesson?.title}</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              {currentModule && <currentModule.icon className={`w-5 h-5 ${currentModule.color}`} />}
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{currentModule?.title}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{currentLesson?.title}</h1>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{currentLesson?.duration}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />Lesson {currentIdx + 1} of {totalLessons}</span>
              {completed.includes(activeId) && <span className="flex items-center gap-1.5 text-green-400"><CheckCircle className="w-3.5 h-3.5" />Completed</span>}
            </div>
          </div>

          <div className="border-b border-gray-800/60 mb-8" />

          <LessonView lesson={currentLesson} completedLessons={completed} onComplete={markComplete} />

          <div className="mt-12 pt-8 border-t border-gray-800/60 flex items-center justify-between gap-4">
            <button
              disabled={currentIdx === 0}
              onClick={() => currentIdx > 0 && goToLesson(allLessons[currentIdx - 1].id)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/60 hover:bg-gray-700/60 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition text-sm text-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:block">Previous</span>
            </button>
            <div className="text-xs text-gray-600">{currentIdx + 1} / {totalLessons}</div>
            <button
              disabled={currentIdx === totalLessons - 1}
              onClick={() => currentIdx < totalLessons - 1 && goToLesson(allLessons[currentIdx + 1].id)}
              className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600/80 hover:bg-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition text-sm text-white font-medium"
            >
              <span className="hidden sm:block">Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-56 flex-shrink-0 border-l border-gray-800/60 bg-[#11111c] p-4 overflow-y-auto hidden xl:flex flex-col gap-5">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500">Reading</span>
            <span className="text-cyan-400 font-medium">{readProgress}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" style={{ width: `${readProgress}%` }} />
          </div>
        </div>

        <div className="p-3 bg-[#1a1a2e] rounded-xl border border-gray-800/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-gray-300">Overall</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{progressPct}%</div>
          <div className="text-[10px] text-gray-600 mt-0.5">{completedCount}/{totalLessons} lessons done</div>
          <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-2">Modules</div>
          {curriculum.map(mod => {
            const modDone = mod.lessons.filter(l => completed.includes(l.id)).length;
            return (
              <button
                key={mod.id}
                onClick={() => { setExpanded([mod.id]); goToLesson(mod.lessons[0].id); if (!sidebarOpen) setSidebarOpen(true); }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition mb-0.5 text-left"
              >
                <mod.icon className={`w-3.5 h-3.5 ${mod.color} flex-shrink-0`} />
                <span className="text-xs text-gray-400 truncate flex-1">{mod.title}</span>
                <span className="text-[10px] text-gray-600">{modDone}/{mod.lessons.length}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl mt-auto">
          <div className="text-xs font-medium text-cyan-400 mb-1">React Tip</div>
          <div className="text-xl font-bold text-white">{completedCount > 0 ? `${completedCount} done` : "Start!"}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">
            {completedCount === 0 ? "Complete your first lesson" : `${totalLessons - completedCount} remaining`}
          </div>
        </div>
      </aside>
    </div>
  );
}