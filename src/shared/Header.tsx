import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/DuoNexus.png';

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Descubrir', href: '/discover' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Mensajes', href: '/messages' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950 border-b border-yellow-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="DuoNexus" className="h-7 sm:h-9 w-auto" />
          <span className="text-white font-bold text-base sm:text-lg tracking-wide">
            Duo<span className="text-yellow-500">Nexus</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold tracking-wide transition-colors border-b-2 ${
                  isActive
                    ? 'text-yellow-500 border-yellow-500'
                    : 'text-zinc-400 hover:text-white border-transparent hover:border-zinc-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Abrir menú"
        >
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-yellow-600/20 px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-yellow-500 bg-yellow-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}