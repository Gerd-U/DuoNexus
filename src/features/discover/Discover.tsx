import { useState, useEffect, useRef } from "react";
import type { DiscoverProfile } from "../../models/discover.models";
import MatchModal from "./MatchModal";

const RANK_CFG: Record<string, { text: string; glow: string; from: string; to: string }> = {
  Hierro:          { text: "text-zinc-300",    glow: "#71717a44",  from: "#52525b", to: "#27272a" },
  Bronce:          { text: "text-amber-400",   glow: "#b4530944",  from: "#92400e", to: "#1c0a00" },
  Plata:           { text: "text-slate-200",   glow: "#94a3b844",  from: "#475569", to: "#0f172a" },
  Oro:             { text: "text-yellow-300",  glow: "#ca8a0444",  from: "#a16207", to: "#1c1100" },
  Platino:         { text: "text-teal-300",    glow: "#0d948844",  from: "#0f766e", to: "#042f2e" },
  Esmeralda:       { text: "text-emerald-300", glow: "#05966944",  from: "#065f46", to: "#022c22" },
  Diamante:        { text: "text-blue-300",    glow: "#2563eb44",  from: "#1d4ed8", to: "#0c1445" },
  Maestro:         { text: "text-purple-300",  glow: "#7c3aed44",  from: "#6d28d9", to: "#1e0a3c" },
  "Gran Maestro":  { text: "text-red-300",     glow: "#dc262644",  from: "#b91c1c", to: "#1f0000" },
  Retador:         { text: "text-orange-200",  glow: "#ea580c44",  from: "#c2410c", to: "#1c0900" },
};

const ROLE_ICON: Record<string, string> = {
  Top: "⚔️", Jungle: "🌿", Mid: "✨", ADC: "🏹", Support: "🛡️", Fill: "🎲",
};
const ROLE_COLOR: Record<string, string> = {
  Top: "text-red-400", Jungle: "text-green-400", Mid: "text-blue-400",
  ADC: "text-orange-400", Support: "text-cyan-400", Fill: "text-purple-400",
};

function RankShield({ tier, size = 28 }: { tier: string; size?: number }) {
  const c = RANK_CFG[tier] ?? { text: "text-slate-300" };
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none" className={c.text}>
      <path d="M50 4 L92 20 L92 62 Q92 98 50 118 Q8 98 8 62 L8 20 Z"
        fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="4" />
      <path d="M50 18 L78 30 L78 60 Q78 84 50 100 Q22 84 22 60 L22 30 Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <text x="50" y="74" textAnchor="middle" fontSize="36" fontWeight="900"
        fill="currentColor" fontFamily="Georgia,serif">{tier[0]}</text>
    </svg>
  );
}

export default function Discover() {
  const [profiles, setProfiles] = useState<DiscoverProfile[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [action, setAction] = useState<"like" | "skip" | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startX = useRef(0);
  const [matchProfile, setMatchProfile] = useState<DiscoverProfile | null>(null);

  useEffect(() => {
    fetch("/discover.json")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((d: DiscoverProfile[]) => { setProfiles(d); setLoading(false); })
      .catch((e: Error) => { setError(e.message); setLoading(false); });
  }, []);

  function trigger(type: "like" | "skip") {
    if (action) return;
    if (type === "like") {
      setMatchProfile(profiles[index]);
      setAction(type);
      setTimeout(() => { setAction(null); setDragX(0); }, 400);
    } else {
      setAction(type);
      setTimeout(() => { setIndex(i => i + 1); setAction(null); setDragX(0); }, 400);
    }
  }

  function onMouseDown(e: React.MouseEvent) { startX.current = e.clientX; setDragging(true); }
  function onMouseMove(e: React.MouseEvent) { if (dragging) setDragX(e.clientX - startX.current); }
  function onMouseUp() {
    if (!dragging) return; setDragging(false);
    if (dragX > 80) trigger("like");
    else if (dragX < -80) trigger("skip");
    else setDragX(0);
  }

  const likeOpacity = Math.min(Math.max(dragX / 80, 0), 1);
  const skipOpacity = Math.min(Math.max(-dragX / 80, 0), 1);

  function cardExitClass() {
    if (action === "like") return "translate-x-[140%] rotate-[16deg] opacity-0";
    if (action === "skip") return "-translate-x-[140%] -rotate-[16deg] opacity-0";
    return "";
  }

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07090d] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-yellow-500/50 text-xs tracking-[5px] uppercase animate-pulse">Cargando...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07090d] flex flex-col items-center justify-center gap-3">
      <p className="text-red-400 font-bold">Error: {error}</p>
    </div>
  );

  const profile = profiles[index];
  const next = profiles[index + 1];
  const cfg = profile ? (RANK_CFG[profile.rank.tier] ?? RANK_CFG["Platino"]) : null;

  if (!profile) return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07090d] flex flex-col items-center justify-center gap-5">
      <div className="text-7xl animate-bounce">⚔️</div>
      <p className="text-white font-black text-3xl">Sin más invocadores</p>
      <p className="text-slate-500 text-sm">Todos los perfiles han sido revisados</p>
      <button onClick={() => setIndex(0)}
        className="mt-3 px-10 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 text-black font-black hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-amber-900/40">
        Reiniciar
      </button>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#07090d] relative overflow-hidden flex flex-col">

      {/* ── Fullscreen ambient background from splash ── */}
      <div className="absolute inset-0 z-0">
        <img src={profile.splashUrl} alt=""
          className="w-full h-full object-cover object-center opacity-10 scale-110 blur-xl"
          onError={e => { (e.target as HTMLImageElement).src = ""; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090d]/60 via-[#07090d]/40 to-[#07090d]" />
      </div>

      {/* ── Rank color glow orb ── */}
      {cfg && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-700"
          style={{ background: cfg.glow }} />
      )}

      {/* ── Main layout ── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 flex-1 px-6 py-6 max-w-6xl mx-auto w-full">

        {/* ─── LEFT: Card stack ─── */}
        <div className="flex flex-col items-center gap-6">

          {/* Progress */}
          <div className="flex gap-2">
            {profiles.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${
                i < index ? "w-2 h-2 bg-yellow-600/30" :
                i === index ? "w-8 h-2 bg-yellow-400" :
                "w-2 h-2 bg-white/10"
              }`} />
            ))}
          </div>

          {/* Card */}
          <div className="relative select-none" style={{ width: 380, height: 560 }}>

            {/* Stack shadow cards */}
            {profiles[index + 2] && (
              <div className="absolute inset-0 rounded-[28px] bg-white/[0.03] border border-white/5 scale-[0.88] -translate-y-8 z-0" />
            )}
            {next && (
              <div className="absolute inset-0 rounded-[28px] overflow-hidden scale-[0.94] -translate-y-4 z-[1] pointer-events-none border border-white/10">
                <img src={next.splashUrl} alt="" className="w-full h-full object-cover object-center opacity-40"
                  onError={e => { (e.target as HTMLImageElement).src = ""; }} />
                <div className="absolute inset-0 bg-black/70" />
              </div>
            )}

            {/* Main card */}
            <div
              onMouseDown={onMouseDown} onMouseMove={onMouseMove}
              onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
              className={`absolute inset-0 rounded-[28px] overflow-hidden z-[2] cursor-grab active:cursor-grabbing
                border border-white/[0.12] shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                transition-all ${action ? "duration-400 ease-in" : dragging ? "duration-0" : "duration-200 ease-out"}
                ${cardExitClass()}`}
              style={{ transform: action ? undefined : `translateX(${dragX}px) rotate(${dragX * 0.04}deg)` }}
            >
              {/* Splash */}
              <img src={profile.splashUrl} alt={profile.summonerName}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: profile.splashFocus ?? "center" }}
                onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg"; }}
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-white/80 font-semibold">Buscando duo</span>
                </div>
                <div className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                  <span className="text-[11px] text-white/60 font-mono font-bold">{profile.region}</span>
                </div>
              </div>

              {/* DUO / SKIP */}
              <div className="absolute top-16 left-5 z-20 pointer-events-none"
                style={{ opacity: likeOpacity, transform: `rotate(-12deg)` }}>
                <div className="border-[3px] border-green-400 rounded-2xl px-5 py-1.5 bg-green-400/10 backdrop-blur-sm shadow-lg shadow-green-900/40">
                  <span className="text-green-300 font-black text-3xl tracking-widest">DUO!</span>
                </div>
              </div>
              <div className="absolute top-16 right-5 z-20 pointer-events-none"
                style={{ opacity: skipOpacity, transform: `rotate(12deg)` }}>
                <div className="border-[3px] border-red-500 rounded-2xl px-5 py-1.5 bg-red-500/10 backdrop-blur-sm shadow-lg shadow-red-900/40">
                  <span className="text-red-400 font-black text-3xl tracking-widest">SKIP</span>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h2 className="text-[2rem] font-black text-white leading-none tracking-tight">{profile.summonerName}</h2>
                <p className="text-slate-400 text-xs mt-0.5 mb-3">#{profile.tagLine}</p>

                {/* 3 stat chips */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded-xl p-2.5 border border-white/10 backdrop-blur-md"
                    style={{ background: `linear-gradient(135deg, ${cfg?.from}cc, ${cfg?.to}ee)` }}>
                    <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Rank</p>
                    <div className="flex items-center gap-1">
                      <RankShield tier={profile.rank.tier} size={18} />
                      <div>
                        <p className={`font-black text-xs leading-none ${cfg?.text}`}>{profile.rank.tier}</p>
                        <p className={`text-[9px] ${cfg?.text} opacity-70`}>{profile.rank.division} · {profile.rank.lp}LP</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 bg-black/50 border border-white/10 backdrop-blur-md">
                    <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Rol</p>
                    <div className="flex items-center gap-1">
                      <span className="text-base">{ROLE_ICON[profile.mainRole]}</span>
                      <p className={`font-black text-xs ${ROLE_COLOR[profile.mainRole] ?? "text-white"}`}>{profile.mainRole}</p>
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 bg-black/50 border border-white/10 backdrop-blur-md">
                    <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Win Rate</p>
                    <p className={`font-black text-lg leading-none ${profile.winRate >= 50 ? "text-green-400" : "text-red-400"}`}>{profile.winRate}%</p>
                    <div className="mt-1 h-0.5 rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${profile.winRate >= 50 ? "bg-green-400" : "bg-red-400"}`} style={{ width: `${profile.winRate}%` }} />
                    </div>
                  </div>
                </div>

                {/* Play styles */}
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {profile.playStyles.map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-[10px] font-bold text-yellow-300 tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Champions */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {profile.topChampions.map((c, i) => (
                      <img key={c.id} src={c.iconUrl} alt={c.name}
                        className="w-10 h-10 rounded-full border-2 border-black object-cover shadow-lg"
                        style={{ zIndex: 3 - i }}
                        onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Lux.png"; }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-[8px] text-white/30 uppercase tracking-widest">Top Campeones</p>
                    <p className="text-xs text-white/70 font-semibold">{profile.topChampions.map(c => c.name).join(" · ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-14">
            <div className="flex flex-col items-center gap-1.5">
              <button onClick={() => trigger("skip")}
                className="w-16 h-16 rounded-full border-2 border-red-500/60 bg-red-950/40 flex items-center justify-center
                  hover:bg-red-500/20 hover:border-red-400 hover:scale-110 active:scale-95 transition-all
                  shadow-xl shadow-red-950/40 backdrop-blur-sm group">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="text-[9px] text-white/20 uppercase tracking-[3px]">Saltar</span>
            </div>
            <span className="text-white/15 text-sm font-mono">{index + 1}/{profiles.length}</span>
            <div className="flex flex-col items-center gap-1.5">
              <button onClick={() => trigger("like")}
                className="w-16 h-16 rounded-full border-2 border-green-500/60 bg-green-950/40 flex items-center justify-center
                  hover:bg-green-500/20 hover:border-green-400 hover:scale-110 active:scale-95 transition-all
                  shadow-xl shadow-green-950/40 backdrop-blur-sm group">
                <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <span className="text-[9px] text-white/20 uppercase tracking-[3px]">Duo</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Profile detail panel ─── */}
        <div className="hidden lg:flex flex-col gap-4 w-72">

          {/* Avatar + name */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-sm flex items-center gap-4">
            <div className="relative">
              <img src={profile.avatarUrl} alt={profile.summonerName}
                className={`w-16 h-16 rounded-2xl object-cover border-2`}
                style={{ borderColor: cfg?.from ?? "#888" }}
                onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/1.png"; }}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#07090d]" />
            </div>
            <div>
              <p className="font-black text-white text-lg leading-tight">{profile.summonerName}</p>
              <p className="text-slate-500 text-xs">#{profile.tagLine} · {profile.region}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <RankShield tier={profile.rank.tier} size={14} />
                <span className={`text-xs font-bold ${cfg?.text}`}>{profile.rank.tier} {profile.rank.division}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-sm">
            <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-4">Estadísticas</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-400">Win Rate</span>
                  <span className={`text-xs font-black ${profile.winRate >= 50 ? "text-green-400" : "text-red-400"}`}>{profile.winRate}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${profile.winRate >= 50 ? "bg-gradient-to-r from-green-600 to-green-400" : "bg-gradient-to-r from-red-700 to-red-400"}`}
                    style={{ width: `${profile.winRate}%` }} />
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-center">
                  <p className="text-green-400 font-black text-base">{profile.wins}</p>
                  <p className="text-white/30 uppercase tracking-widest text-[9px]">Victorias</p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-red-400 font-black text-base">{profile.losses}</p>
                  <p className="text-white/30 uppercase tracking-widest text-[9px]">Derrotas</p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-white font-black text-base">{profile.wins + profile.losses}</p>
                  <p className="text-white/30 uppercase tracking-widest text-[9px]">Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Play style */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-sm">
            <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-3">Estilo de juego</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.playStyles.map(s => (
                <span key={s} className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-xs font-bold text-yellow-300">{s}</span>
              ))}
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-3">Rol principal</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{ROLE_ICON[profile.mainRole]}</span>
              <span className={`font-black text-base ${ROLE_COLOR[profile.mainRole] ?? "text-white"}`}>{profile.mainRole}</span>
            </div>
          </div>

          {/* Champions */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-sm">
            <p className="text-[10px] text-white/30 uppercase tracking-[3px] mb-3">Top campeones</p>
            <div className="space-y-2.5">
              {profile.topChampions.map((champ, i) => (
                <div key={champ.id} className="flex items-center gap-3">
                  <span className="text-white/20 text-xs font-mono w-3">{i + 1}</span>
                  <img src={champ.iconUrl} alt={champ.name}
                    className="w-9 h-9 rounded-xl border border-white/10 object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Lux.png"; }}
                  />
                  <span className="text-sm font-semibold text-white/80">{champ.name}</span>
                  <span className={`ml-auto text-[10px] font-black px-1.5 py-0.5 rounded ${
                    champ.mastery === "M7" ? "bg-red-800 text-red-200" :
                    champ.mastery === "M6" ? "bg-purple-800 text-purple-200" :
                    "bg-blue-800 text-blue-200"
                  }`}>{champ.mastery}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      {/* Match Modal */}
      {matchProfile !== null && (
        <MatchModal
          matchedProfile={matchProfile}
          onClose={() => { setMatchProfile(null); setIndex(i => i + 1); }}
        />
      )}
    </div>
  );
}