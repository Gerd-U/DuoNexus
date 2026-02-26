import logo from "../assets/DuoNexus.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950 border-b border-yellow-600/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="DuoNexus" className="h-9 w-auto" />
          <span className="text-white font-bold text-lg tracking-wide">
            Duo<span className="text-yellow-500">Nexus</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Inicio", href: "/", active: true },
            { label: "Descubrir", href: "/descubrir", active: false },
            { label: "Perfil", href: "/perfil", active: false },
            { label: "Mensajes", href: "/mensajes", active: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors border-b-2 ${
                item.active
                  ? "text-yellow-500 border-yellow-500"
                  : "text-zinc-400 hover:text-white border-transparent hover:border-zinc-600"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-yellow-500 hover:border-yellow-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-yellow-500 hover:border-yellow-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}