export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center gap-4">
      <p className="text-7xl sm:text-9xl font-black text-yellow-500/20">404</p>
      <h3 className="text-2xl sm:text-3xl font-black text-white">Página no encontrada</h3>
      <p className="text-zinc-500 text-sm">La página que buscas no existe o fue movida.</p>
      <a href="/" className="mt-2 px-6 py-3 border-2 border-yellow-500 text-yellow-500 font-bold text-sm uppercase tracking-widest hover:bg-yellow-500 hover:text-zinc-950 transition-all duration-200">
        Volver al Inicio
      </a>
    </div>
  );
}