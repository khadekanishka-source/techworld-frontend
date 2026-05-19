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
    info:  { bg: "bg-blue-500/10 border-blue-500/30", icon: "💡", text: "text-blue-300" },
    warn:  { bg: "bg-yellow-500/10 border-yellow-500/30", icon: "⚠️", text: "text-yellow-300" },
    tip:   { bg: "bg-green-500/10 border-green-500/30", icon: "✅", text: "text-green-300" },
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
        id: "what-is-react",
        title: "What is React?",
        duration: "6 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">What is React?</h2>
<p class="text-gray-300 mb-4">React is a JavaScript library for building user interfaces, developed by Facebook. It is component‑based, declarative, and uses a virtual DOM for efficient rendering.</p>
<h3 class="text-xl font-semibold text-white mb-3">Key Features</h3>
<ul class="list-disc pl-6 space-y-2 text-gray-300">
  <li>Declarative: Describe the UI for each state, React updates and renders efficiently.</li>
  <li>Component‑Based: Encapsulate behaviour and look into reusable pieces.</li>
  <li>Learn Once, Write Anywhere: Works with React DOM (web) and React Native (mobile).</li>
</ul>`,
        codeBlocks: []
      },
      {
        id: "first-component",
        title: "Your First Component",
        duration: "8 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Creating a Component</h2>
<p class="text-gray-300 mb-4">A React component is a function that returns JSX (HTML‑like syntax).</p>`,
        codeBlocks: [{ lang: "jsx", label: "Greeting.jsx", code: `function Greeting() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default Greeting;` }]
      }
    ]
  },
  {
    id: "basics",
    title: "React Basics",
    icon: () => <span className="text-blue-400">📘</span>,
    color: "text-blue-400",
    lessons: [
      {
        id: "jsx",
        title: "JSX",
        duration: "10 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">JSX – JavaScript XML</h2>
<p class="text-gray-300 mb-4">JSX allows you to write HTML inside JavaScript. It gets transpiled to <code>React.createElement()</code> calls.</p>
<ul class="list-disc pl-6 space-y-2 text-gray-300">
  <li>Embed expressions with <code>{}</code>.</li>
  <li>Use <code>className</code> instead of <code>class</code>.</li>
  <li>Self‑close tags like <code>&lt;img /&gt;</code>.</li>
</ul>`,
        codeBlocks: [{ lang: "jsx", label: "JSXExample.jsx", code: `const name = "Alice";\nconst element = <h1>Hello, {name}!</h1>;\n\n// Equivalent to:\n// const element = React.createElement('h1', null, 'Hello, Alice!');` }]
      },
      {
        id: "props",
        title: "Props (Properties)",
        duration: "12 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Passing Data with Props</h2>
<p class="text-gray-300 mb-4">Props are read‑only inputs passed from parent to child.</p>`,
        codeBlocks: [{ lang: "jsx", label: "PropsExample.jsx", code: `function Welcome(props) {\n  return <h1>Welcome, {props.name}!</h1>;\n}\n\n// Usage\n<Welcome name="Alice" />` }]
      },
      {
        id: "state",
        title: "State & useState Hook",
        duration: "15 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Managing State</h2>
<p class="text-gray-300 mb-4">State is data that can change over time. The <code>useState</code> hook lets you add state to function components.</p>`,
        codeBlocks: [{ lang: "jsx", label: "Counter.jsx", code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}` }]
      },
      {
        id: "events",
        title: "Handling Events",
        duration: "8 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Events in React</h2>
<p class="text-gray-300 mb-4">Event handlers are named <code>onClick</code>, <code>onChange</code>, etc. Use camelCase.</p>`,
        codeBlocks: [{ lang: "jsx", label: "EventHandler.jsx", code: `function ActionButton() {\n  function handleClick() {\n    alert('Button clicked!');\n  }\n  return <button onClick={handleClick}>Click</button>;\n}` }]
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced React",
    icon: () => <span className="text-purple-400">🚀</span>,
    color: "text-purple-400",
    lessons: [
      {
        id: "useEffect",
        title: "useEffect Hook",
        duration: "14 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Side Effects with useEffect</h2>
<p class="text-gray-300 mb-4"><code>useEffect</code> lets you perform side effects (data fetching, subscriptions, DOM updates). It runs after every render by default, but you can control when it runs with dependencies.</p>`,
        codeBlocks: [{ lang: "jsx", label: "UseEffectExample.jsx", code: `import { useState, useEffect } from 'react';\n\nfunction DataFetcher() {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    fetch('https://api.example.com/data')\n      .then(res => res.json())\n      .then(data => setData(data));\n  }, []); // empty array = run once on mount\n\n  return <div>{/* render data */}</div>;\n}` }]
      },
      {
        id: "context",
        title: "Context API",
        duration: "12 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Sharing Data with Context</h2>
<p class="text-gray-300 mb-4">Avoid prop drilling by using React Context to share global data (theme, user, etc.).</p>`,
        codeBlocks: [{ lang: "jsx", label: "ThemeContext.jsx", code: `import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}` }]
      },
      {
        id: "lists-keys",
        title: "Lists and Keys",
        duration: "10 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Rendering Lists</h2>
<p class="text-gray-300 mb-4">Use <code>map()</code> to render arrays of elements. Each list item needs a unique <code>key</code> prop.</p>`,
        codeBlocks: [{ lang: "jsx", label: "TodoList.jsx", code: `function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}>{todo.text}</li>\n      ))}\n    </ul>\n  );\n}` }]
      },
      {
        id: "forms",
        title: "Forms & Controlled Components",
        duration: "12 min",
        content: `<h2 class="text-2xl font-bold text-white mb-4">Controlled Components</h2>
<p class="text-gray-300 mb-4">React forms are typically "controlled" – the input’s value is bound to state and updated via <code>onChange</code>.</p>`,
        codeBlocks: [{ lang: "jsx", label: "Form.jsx", code: `import { useState } from 'react';\n\nfunction LoginForm() {\n  const [email, setEmail] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log('Submitted:', email);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        type="email"\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n      />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}` }]
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