import logo from "../../assets/DuoNexus.png";

export function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative flex flex-col items-center justify-center min-h-[88vh] text-center px-6 overflow-hidden">

        {/* Background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-700/10 rounded-full blur-2xl pointer-events-none" />

        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-40 h-40 rounded-full bg-zinc-900/80 border border-yellow-600/20 flex items-center justify-center shadow-2xl shadow-yellow-600/10">
            <img src={logo} alt="DuoNexus" className="w-28 h-28 object-contain" />
          </div>
          <div className="absolute inset-0 rounded-full border border-yellow-500/20 scale-110 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-blue-500/10 scale-125 pointer-events-none" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 max-w-3xl">
          DuoNexus:{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Encuentra Tu Sinergia
          </span>
          <br />
          <span className="text-zinc-300">Perfecta en la Grieta</span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-lg max-w-xl mb-10 leading-relaxed">
          Conecta con jugadores de tu nivel. Forma el duo ideal y domina la Grieta del Invocador juntos.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 font-bold text-sm uppercase tracking-widest hover:bg-yellow-500 hover:text-zinc-950 transition-all duration-200">
            Encontrar Duo Ahora
          </button>
          <button className="px-8 py-4 border border-zinc-700 text-zinc-400 font-bold text-sm uppercase tracking-widest hover:border-zinc-500 hover:text-white transition-all duration-200">
            Ver Perfiles
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex items-center gap-12">
          {[
            { value: "24K+", label: "Jugadores" },
            { value: "89%", label: "Match rate" },
            { value: "4.8★", label: "Valoración" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-yellow-500">{stat.value}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] mb-2">¿Cómo funciona?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Tu Próximo Duo, en 3 Pasos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", emoji: "👤", title: "Crea tu Perfil", desc: "Conecta tu cuenta, muestra tu rango, rol y campeones favoritos.", color: "text-blue-400", border: "border-blue-500/30" },
              { step: "02", emoji: "🔍", title: "Descubre Jugadores", desc: "Nuestro algoritmo muestra duos compatibles con tu estilo de juego.", color: "text-yellow-400", border: "border-yellow-500/30" },
              { step: "03", emoji: "⚔️", title: "¡A la Grieta!", desc: "Conecta por chat, coordina estrategias y sube de rango juntos.", color: "text-purple-400", border: "border-purple-500/30" },
            ].map((item) => (
              <div
                key={item.step}
                className={`relative p-8 bg-zinc-900 border rounded-sm hover:-translate-y-1 transition-transform duration-200 ${item.border}`}
              >
                <span className="absolute top-5 right-6 text-4xl font-black text-zinc-800">{item.step}</span>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className={`text-lg font-bold mb-2 ${item.color}`}>{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full border border-yellow-600/10" />
          <div className="absolute w-72 h-72 rounded-full border border-blue-600/10" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            ¿Listo para{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Dominar?
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Únete a miles de jugadores que ya encontraron su sinergia perfecta.
          </p>
          <button className="px-12 py-4 border-2 border-yellow-500 text-yellow-500 font-bold text-sm uppercase tracking-widest hover:bg-yellow-500 hover:text-zinc-950 transition-all duration-200">
            Unirse Gratis
          </button>
        </div>
      </section>

    </div>
  );
}