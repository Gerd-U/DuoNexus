import { NavLink } from 'react-router-dom';
import logo from '../assets/DuoNexus.png';

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Descubrir', href: '/discover' },
  { label: 'Perfil', href: '/profile' },
  { label: 'Mensajes', href: '/messages' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950 border-b border-yellow-600/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="DuoNexus" className="h-9 w-auto" />
          <span className="text-white font-bold text-lg tracking-wide">
            Duo<span className="text-yellow-500">Nexus</span>
          </span>
        </NavLink>

        {/* Nav */}
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



      </div>
    </header>
  );
}