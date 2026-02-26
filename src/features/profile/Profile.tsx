import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { MasteryLevel, UserProfile } from "../../models/profile.models";


// ── Rank config ────────────────────────────────────────────────────────────
const RANK_CFG: Record<string, { ring: string; glow: string; text: string; bg: string; initial: string }> = {
  Hierro:        { ring: "ring-zinc-500",       glow: "shadow-zinc-500/30",    text: "text-zinc-300",    bg: "from-zinc-900 to-zinc-950",        initial: "H" },
  Bronce:        { ring: "ring-amber-700",      glow: "shadow-amber-700/30",   text: "text-amber-500",   bg: "from-amber-950/60 to-stone-950",   initial: "B" },
  Plata:         { ring: "ring-slate-400",      glow: "shadow-slate-400/30",   text: "text-slate-300",   bg: "from-slate-900/60 to-slate-950",   initial: "P" },
  Oro:           { ring: "ring-yellow-400",     glow: "shadow-yellow-400/30",  text: "text-yellow-400",  bg: "from-yellow-950/60 to-stone-950",  initial: "O" },
  Platino:       { ring: "ring-teal-400",       glow: "shadow-teal-400/30",    text: "text-teal-300",    bg: "from-teal-950/60 to-slate-950",    initial: "P" },
  Esmeralda:     { ring: "ring-emerald-400",    glow: "shadow-emerald-400/30", text: "text-emerald-400", bg: "from-emerald-950/60 to-slate-950", initial: "E" },
  Diamante:      { ring: "ring-blue-400",       glow: "shadow-blue-400/30",    text: "text-blue-300",    bg: "from-blue-950/60 to-slate-950",    initial: "D" },
  Maestro:       { ring: "ring-purple-500",     glow: "shadow-purple-500/30",  text: "text-purple-300",  bg: "from-purple-950/60 to-slate-950",  initial: "M" },
  "Gran Maestro":{ ring: "ring-red-500",        glow: "shadow-red-500/30",     text: "text-red-400",     bg: "from-red-950/60 to-slate-950",     initial: "G" },
  Retador:       { ring: "ring-orange-400",     glow: "shadow-orange-400/30",  text: "text-orange-300",  bg: "from-orange-950/60 to-amber-950",  initial: "R" },
};

const MASTERY_BADGE: Record<MasteryLevel, string> = {
  M4: "bg-zinc-600 text-zinc-200",
  M5: "bg-blue-700 text-blue-100",
  M6: "bg-purple-700 text-purple-100",
  M7: "bg-red-700 text-red-100",
};

// ── Sub-components ─────────────────────────────────────────────────────────
function RankShield({ tier, size = 80 }: { tier: string; size?: number }) {
  const cfg = RANK_CFG[tier] ?? RANK_CFG["Platino"];
  return (
    <svg width={size} height={size} viewBox="0 0 100 120" fill="none">
      <path d="M50 4 L92 20 L92 62 Q92 98 50 118 Q8 98 8 62 L8 20 Z"
        className="fill-slate-800 opacity-80" strokeWidth="2" stroke="currentColor" />
      <path d="M50 16 L80 28 L80 60 Q80 86 50 102 Q20 86 20 60 L20 28 Z"
        fill="none" strokeWidth="1" strokeOpacity="0.3" stroke="currentColor" />
      <text x="50" y="72" textAnchor="middle" fontSize="32" fontWeight="900"
        fill="currentColor" fontFamily="serif">
        {cfg.initial}
      </text>
    </svg>
  );
}

function MasteryBadge({ level }: { level: MasteryLevel }) {
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${MASTERY_BADGE[level]}`}>
      {level}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Profile() {
  const { id } = useParams<{ id?: string }>();

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch("/profile.json")
      .then(res => res.json())
      .then((data: UserProfile[]) => {
        setProfiles(data);
        // Si hay :id en la URL usarlo, si no el primero
        const initial = id ? data.find(p => p.id === id)?.id ?? data[0].id : data[0].id;
        setActiveId(initial);
        setLoading(false);
        setTimeout(() => setMounted(true), 50);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleSearch() {
    const found = profiles.find(
      p => p.summonerName.toLowerCase() === search.trim().toLowerCase()
    );
    if (found) { setActiveId(found.id); setNotFound(false); }
    else setNotFound(true);
  }

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm tracking-widest uppercase">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <p className="text-zinc-500">No se encontraron perfiles.</p>
      </div>
    );
  }

  const profile = profiles.find(p => p.id === activeId) ?? profiles[0];
  const cfg = RANK_CFG[profile.rank.tier] ?? RANK_CFG["Platino"];
  const total = profile.wins + profile.losses;

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">

      <div className={`max-w-3xl mx-auto px-5 py-10 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

        {/* Profile switcher */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {profiles.map(p => (
            <button key={p.id}
              onClick={() => { setActiveId(p.id); setNotFound(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                p.id === activeId
                  ? "bg-amber-400/10 border-amber-400 text-amber-400"
                  : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300"
              }`}>
              {p.summonerName}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-amber-500/50 transition-colors"
            placeholder="Buscar invocador..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}
            className="px-5 py-2.5 rounded-lg bg-amber-400/10 border border-amber-500/40 text-amber-400 text-sm font-bold hover:bg-amber-400/20 transition-colors">
            Buscar
          </button>
        </div>
        {notFound && (
          <p className="text-red-400 text-xs -mt-3 mb-5">Invocador no encontrado.</p>
        )}

        {/* ── HEADER CARD ── */}
        <div className="flex items-center gap-5 mb-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm">
          <div className={`relative ring-2 ${cfg.ring} rounded-full shadow-lg ${cfg.glow}`}>
            <img
              src={profile.avatarUrl} alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/1.png"; }}
            />
            <span className="absolute -bottom-1 -right-1 bg-slate-800 border border-white/10 text-[10px] font-bold text-slate-300 px-1.5 rounded">
              {profile.region}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-[3px] text-slate-500 uppercase mb-0.5">Nombre de Invocador</p>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight truncate">{profile.summonerName}</h1>
            <p className="text-xs text-slate-500 mt-0.5">#{profile.tagLine}</p>
          </div>
          <button className={`px-5 py-2 rounded-lg border ${cfg.ring} ${cfg.text} text-sm font-semibold bg-transparent hover:bg-white/5 transition-colors`}>
            Encontrar Perfil
          </button>
        </div>

        {/* ── RANK CARD ── */}
        <div className={`flex items-center justify-between p-7 mb-5 rounded-2xl bg-gradient-to-br ${cfg.bg} border border-white/[0.06] shadow-xl ${cfg.glow}`}>
          <div className="flex items-center gap-5">
            <div className={cfg.text}>
              <RankShield tier={profile.rank.tier} size={90} />
            </div>
            <div>
              <p className="text-[10px] tracking-[3px] text-slate-500 uppercase mb-1">Rango Actual</p>
              <p className={`text-4xl font-black tracking-tight ${cfg.text}`}>
                {profile.rank.tier} {profile.rank.division}
              </p>
              <span className={`mt-2 inline-block text-xs font-semibold px-3 py-0.5 rounded-full bg-white/10 border border-white/10 ${cfg.text}`}>
                {profile.rank.lp} LP
              </span>
            </div>
          </div>
          <div className={`opacity-20 ${cfg.text}`}>
            <RankShield tier={profile.rank.tier} size={68} />
          </div>
        </div>

        {/* ── BOTTOM GRID ── */}
        <div className="grid grid-cols-2 gap-5">

          {/* Champions */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <p className="text-[10px] tracking-[3px] text-slate-500 uppercase mb-4">Campeones más jugados</p>
            <div className="flex gap-4 justify-around">
              {profile.topChampions.map(champ => (
                <div key={champ.id} className="flex flex-col items-center gap-1.5">
                  <img
                    src={champ.iconUrl} alt={champ.name}
                    className="w-14 h-14 rounded-full border-2 border-white/10 object-cover hover:border-amber-400/50 transition-colors"
                    onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Lux.png"; }}
                  />
                  <span className="text-xs font-semibold text-slate-300">{champ.name}</span>
                  <MasteryBadge level={champ.mastery} />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-500">
              <span className="text-green-400 font-semibold">{profile.wins}W</span>
              {" · "}
              <span className="text-red-400 font-semibold">{profile.losses}L</span>
              {" · "}
              <span>{total} partidas totales</span>
            </div>
          </div>

          {/* Win Rate + Play Style */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col justify-between">
            <div>
              <p className="text-[10px] tracking-[3px] text-slate-500 uppercase mb-3">Estilo de Juego</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {profile.playStyles.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[3px] text-slate-500 uppercase mb-1">
                Win Rate · últimos {profile.gamesAnalyzed} juegos
              </p>
              <div className="h-1.5 rounded-full bg-white/10 mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${profile.winRate >= 50 ? "bg-green-400" : "bg-red-400"}`}
                  style={{ width: `${profile.winRate}%` }}
                />
              </div>
              <p className={`text-5xl font-black tracking-tight ${profile.winRate >= 50 ? "text-green-400" : "text-red-400"}`}>
                {profile.winRate}%
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Win Rate</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}