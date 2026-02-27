import { useState } from "react";
import type { DiscoverProfile } from "../../models/discover.models";

interface MatchModalProps {
  matchedProfile: DiscoverProfile;
  onClose: () => void;
}

export default function MatchModal({ matchedProfile, onClose }: MatchModalProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`${matchedProfile.summonerName} #${matchedProfile.tagLine}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" onClick={onClose}>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src={matchedProfile.splashUrl} alt=""
          className="w-full h-full object-cover opacity-10 scale-110 blur-3xl" />
      </div>

      {/* Card */}
      <div
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl border border-yellow-600/25
          bg-gradient-to-b from-[#111318] to-[#07090d]
          shadow-[0_0_60px_rgba(202,138,4,0.1)] px-5 sm:px-8 py-7 sm:py-10 flex flex-col items-center gap-5 sm:gap-7"
        style={{ animation: "matchIn 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}
      >
        {/* Title */}
        <div className="text-center">
          <p className="text-[9px] tracking-[6px] text-yellow-600/50 uppercase mb-2">Nuevo duo encontrado</p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-none"
            style={{
              background: "linear-gradient(180deg, #fde68a 0%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 24px rgba(202,138,4,0.5))",
            }}>
            ¡ES UN MATCH!
          </h2>
        </div>

        {/* Avatars */}
        <div className="flex items-center gap-3 sm:gap-4 w-full justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-slate-800 border-2 border-white/10
              flex items-center justify-center text-2xl sm:text-3xl ring-4 ring-yellow-500/20 shadow-xl">
              👤
            </div>
            <span className="text-xs text-white/40">Tú</span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-1.5 max-w-[80px] sm:max-w-[100px]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-500/60" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/80 animate-pulse" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-500/60" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden border-2 border-yellow-500/40
              ring-4 ring-yellow-500/20 shadow-xl">
              <img src={matchedProfile.avatarUrl} alt={matchedProfile.summonerName}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = "https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/1.png"; }}
              />
            </div>
            <span className="text-xs text-white font-semibold text-center max-w-[80px] truncate">{matchedProfile.summonerName}</span>
          </div>
        </div>

        {/* Info chips */}
        <div className="flex gap-2 flex-wrap justify-center">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
            {matchedProfile.rank.tier} {matchedProfile.rank.division}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
            {matchedProfile.mainRole}
          </span>
          <span className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold
            ${matchedProfile.winRate >= 50 ? "text-green-400" : "text-red-400"}`}>
            {matchedProfile.winRate}% WR
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
          <button className="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm
            bg-gradient-to-r from-yellow-700 to-amber-600 text-black
            hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-900/20">
            💬 Enviar Mensaje
          </button>
          <button onClick={handleCopy}
            className={`w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm border transition-all
              hover:scale-[1.02] active:scale-[0.98]
              ${copied
                ? "bg-green-500/10 border-green-500/40 text-green-400"
                : "bg-white/[0.04] border-white/10 text-white/50 hover:text-white hover:bg-white/[0.07]"
              }`}>
            {copied ? "✓ Copiado" : "⎘ Copiar Nombre de Invocador"}
          </button>
          <button onClick={onClose}
            className="text-white/20 text-xs hover:text-white/40 transition-colors text-center mt-1">
            Seguir buscando →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes matchIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}