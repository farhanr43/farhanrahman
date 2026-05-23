"use client";

import { useMemo, useState, useEffect } from "react";

const codeChars = [
  "</>", "{}", "[]", "()", "=>", "/*", "*/",
  "const", "let", "var", "function", "return",
  "import", "export", "class", "new", "async",
  "await", "try", "catch", "throw", "if", "else",
  "for", "while", "switch", "case", "break",
  "true", "false", "null", "undef", "type",
  "int", "str", "bool", "void", "nil",
  "fn", "pub", "impl", "struct", "enum",
  "def", "self", "lambda", "yield", "raise",
  "0x0F", "0xFF", "0x00", "0x01",
  "&&", "||", "!=", "==", "=>", "->",
  "...", "::", "?.", "??", "|>",
];

const codeLines = [
  "import { Portfolio } from './components';",
  "const App: React.FC = () => {",
  "  return <Hero />;",
  "};",
  "export default function App() {",
  "  const [state, setState] = useState();",
  "  useEffect(() => {",
  "    fetchData().then(setData);",
  "  }, []);",
  "  await Promise.all([",
  "    loadUser(), loadPosts()",
  "  ]);",
  "  return app.render(<Root />);",
  "class App {",
  "  constructor(props) {",
  "    this.state = { count: 0 };",
  "  }",
  "  render() {",
  "    return <Main>{children}</Main>;",
  "  }",
  "}",
  "fn main() -> Result<()> {",
  "  let mut x = 42;",
  "  println!(\"Hello, world!\");",
  "  Ok(())",
  "}",
  "def fibonacci(n: int) -> int:",
  "  if n <= 1:",
  "    return n",
  "  return fib(n-1) + fib(n-2)",
  "<div className=\"container\">",
  "  <Header />",
  "  <MainContent />",
  "</div>",
  "npm run build -- --optimize",
  "docker compose up -d",
  "git commit -m \"fix: resolve edge case\"",
  "kubectl apply -f deploy.yaml",
  "npx create-next-app@latest",
];

function CodeRain({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 8 : 40;
  const selected = useMemo(() => {
    const items: { char: string; left: number; delay: number; duration: number; opacity: number; fontSize: number }[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 8 + Math.random() * 16,
        opacity: isMobile ? 0.01 + Math.random() * 0.02 : 0.02 + Math.random() * 0.05,
        fontSize: 10 + Math.random() * 6,
      });
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`absolute inset-y-0 left-0 overflow-hidden pointer-events-none select-none ${isMobile ? "w-16 opacity-30 blur-[1px]" : "w-24 md:w-32"}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      {selected.map((item, i) => (
        <span
          key={i}
          className="absolute font-mono text-accent"
          style={{
            left: `${item.left}%`,
            top: `-5%`,
            fontSize: `${item.fontSize}px`,
            opacity: item.opacity,
            animation: `codeFall ${item.duration}s linear ${item.delay}s infinite`,
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}

function CodeStream({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 2 : 6;
  const lines = useMemo(() => {
    const items: { text: string; top: number; delay: number; duration: number; opacity: number }[] = [];
    const shuffled = [...codeLines].sort(() => Math.random() - 0.5).slice(0, count);
    shuffled.forEach((text, i) => {
      items.push({
        text,
        top: 10 + (i * 25),
        delay: i * 3,
        duration: 6 + Math.random() * 4,
        opacity: isMobile ? 0.01 + Math.random() * 0.02 : 0.03 + Math.random() * 0.04,
      });
    });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`absolute inset-y-0 right-0 overflow-hidden pointer-events-none select-none ${isMobile ? "hidden" : "w-40 md:w-56"}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      {lines.map((item, i) => (
        <span
          key={i}
          className="absolute font-mono text-accent"
          style={{
            right: `${-20 + Math.random() * 10}%`,
            top: `${item.top}%`,
            fontSize: "9px",
            opacity: item.opacity,
            animation: `codeSlide ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
            whiteSpace: "nowrap",
            letterSpacing: "1px",
            willChange: "transform",
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}

function FloatingBrackets({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 4 : 14;
  const brackets = useMemo(() => {
    const items: { char: string; top: number; right: number; delay: number; duration: number; opacity: number; size: number }[] = [];
    const greenSymbols = ["{", "}", "<", "/", ">", "=>", "()", "[]", "/*", "*/", "::", "->", "|>", "//"];

    for (let i = 0; i < count; i++) {
      items.push({
        char: greenSymbols[Math.floor(Math.random() * greenSymbols.length)],
        top: 5 + Math.random() * 85,
        right: 2 + Math.random() * 22,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
        opacity: isMobile ? 0.015 + Math.random() * 0.03 : 0.03 + Math.random() * 0.07,
        size: 14 + Math.random() * 18,
      });
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`absolute inset-y-0 right-0 overflow-hidden pointer-events-none select-none ${isMobile ? "w-16 opacity-20 blur-[1px]" : "w-24 md:w-32"}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20 z-10" />
      {brackets.map((item, i) => (
        <span
          key={i}
          className="absolute font-mono text-accent"
          style={{
            top: `${item.top}%`,
            right: `${item.right}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animation: `float ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
            textShadow: "0 0 4px var(--accent)",
            fontWeight: 700,
            willChange: "transform",
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}

function CodeParticles({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 0 : 20;
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 3 + Math.random() * 4,
      opacity: 0.01 + Math.random() * 0.03,
      size: 2 + Math.random() * 3,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (count === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `pulseDot ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroCodeDecorations() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 pointer-events-none select-none" />
    );
  }

  return (
    <>
      <CodeRain isMobile={isMobile} />
      <FloatingBrackets isMobile={isMobile} />
      <CodeStream isMobile={isMobile} />
      <CodeParticles isMobile={isMobile} />
      <style jsx>{`
        @keyframes codeFall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          5% {
            opacity: inherit;
          }
          90% {
            opacity: inherit;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes codeSlide {
          0% {
            transform: translateX(20px);
            opacity: 0;
          }
          10% {
            opacity: inherit;
          }
          90% {
            opacity: inherit;
          }
          100% {
            transform: translateX(-40px);
            opacity: 0;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(-3deg);
          }
          100% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        @keyframes pulseDot {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: inherit;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </>
  );
}
