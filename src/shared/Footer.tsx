export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-600/20 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 flex items-center justify-center">
            <span className="text-white font-black text-xs">DN</span>
          </div>
          <span className="text-white font-bold text-sm">
            Duo<span className="text-yellow-500">Nexus</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {["Términos", "Privacidad", "Contacto"].map((item) => (
            <a key={item} href="#" className="text-zinc-500 hover:text-yellow-500 text-xs uppercase tracking-widest transition-colors">
              {item}
            </a>
          ))}
        </div>

        <p className="text-zinc-600 text-xs">
          © 2026 DuoNexus. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
}