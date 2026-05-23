export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Page not found</h2>
        <a
          href="/"
          className="px-4 py-2 bg-cyan-500 text-zinc-950 rounded-lg font-medium hover:bg-cyan-400 transition-colors"
        >
          Go home
        </a>
      </div>
    </div>
  );
}