import { useState, useRef, useEffect } from 'react';
import type { ChatContact, ChatMessage } from '../../models/messages.models';
import { messageService } from '../../service/messages.service';


function RankBadge() {
  return (
    <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9.5 8.5H3l5.5 4-2 6.5L12 15l5.5 4-2-6.5L21 8.5h-6.5z" />
    </svg>
  );
}

function OnlineDot({ online }: { online: boolean }) {
  return (
    <span
      className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${
        online ? 'bg-green-400' : 'bg-zinc-600'
      }`}
    />
  );
}

function Avatar({ contact, size = 'md' }: { contact: ChatContact; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-10 h-10 text-base', md: 'w-12 h-12 text-lg', lg: 'w-14 h-14 text-2xl' };
  return (
    <div className="relative shrink-0">
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${contact.avatarGradient} flex items-center justify-center font-bold text-white shadow-lg`}>
        {contact.championEmoji}
      </div>
      <OnlineDot online={contact.isOnline} />
    </div>
  );
}

function MessageBubble({ msg, contactName }: { msg: ChatMessage; contactName: string }) {
  const isUser = msg.sender === 'user';

  if (msg.isSystemNote) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs px-4 py-2 rounded-2xl rounded-br-sm bg-zinc-800/60 border border-zinc-700/50">
          <p className="text-xs italic text-zinc-400">{msg.content}</p>
          <span className="text-[10px] text-zinc-600 mt-1 block text-right">{msg.timestamp}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] sm:max-w-sm px-4 py-2.5 rounded-2xl shadow-lg ${
        isUser
          ? 'bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-600/50 rounded-br-sm'
          : 'bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-700/50 rounded-bl-sm'
      }`}>
        {!isUser && (
          <span className="text-xs font-bold text-purple-300 block mb-0.5">{contactName}:</span>
        )}
        <p className="text-sm text-zinc-100 leading-relaxed">{msg.content}</p>
        <span className={`text-[10px] mt-1 block ${isUser ? 'text-zinc-500 text-right' : 'text-purple-400/70'}`}>
          {msg.timestamp}
        </span>
      </div>
    </div>
  );
}

function ContactItem({ contact, isActive, onClick }: { contact: ChatContact; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-left group ${
        isActive
          ? 'bg-gradient-to-r from-yellow-900/40 to-zinc-800/80 border border-yellow-600/40'
          : 'hover:bg-zinc-800/60 border border-transparent'
      }`}
    >
      <Avatar contact={contact} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm font-bold truncate ${isActive ? 'text-yellow-400' : 'text-zinc-200 group-hover:text-white'}`}>
            {contact.summonerName}
          </span>
          <span className="text-[10px] text-zinc-600 shrink-0">{contact.lastTime}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <RankBadge />
          <span className="text-[10px] text-yellow-600 font-medium">{contact.rank}</span>
          <span className="text-[10px] text-zinc-600">•</span>
          <span className="text-[10px] text-zinc-500">{contact.role}</span>
        </div>
        <p className="text-xs text-zinc-500 truncate mt-0.5">{contact.lastMessage}</p>
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <div className="w-20 h-20 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
        <svg className="w-9 h-9 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div>
        <p className="text-zinc-400 font-semibold">Selecciona un DuoChat</p>
        <p className="text-zinc-600 text-sm mt-1">Elige una conversación de la lista para comenzar.</p>
      </div>
    </div>
  );
}

export function Messages() {
  const contacts = messageService.getAllChats();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filterOnline, setFilterOnline] = useState(false);
  const [showChat, setShowChat] = useState(false); // mobile: toggle between list and chat
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat: ChatContact | undefined = contacts.find((c) => c.id === activeId);

  const filtered = contacts.filter((c) => {
    const matchSearch = c.summonerName.toLowerCase().includes(search.toLowerCase());
    const matchOnline = filterOnline ? c.isOnline : true;
    return matchSearch && matchOnline;
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId]);

  function handleSend() {
    if (!inputValue.trim()) return;
    setInputValue('');
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  function selectContact(id: string) {
    setActiveId(id);
    setShowChat(true); // on mobile, show the chat panel
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div
          className="flex rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl"
          style={{ minHeight: 'calc(100vh - 7rem)' }}
        >
          {/* LEFT PANEL – contact list */}
          {/* On mobile: show only if !showChat; on desktop: always show */}
          <aside className={`${showChat ? 'hidden' : 'flex'} md:flex w-full md:w-64 lg:w-72 shrink-0 bg-zinc-900/90 flex-col border-r border-zinc-800`}>
            {/* header */}
            <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-3 border-b border-zinc-800">
              <h2 className="text-white font-bold text-base sm:text-lg tracking-wide mb-3">
                Duo<span className="text-yellow-500">Chats</span>
              </h2>

              {/* search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-800/80 border border-zinc-700/60 rounded-lg text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-yellow-600/60 transition-colors"
                />
              </div>

              {/* filters */}
              <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 flex-wrap">
                <button className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs hover:border-yellow-600/50 hover:text-yellow-500 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  By Role
                </button>
                <button className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs hover:border-yellow-600/50 hover:text-yellow-500 transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  By Rank
                </button>
                <button
                  onClick={() => setFilterOnline((v) => !v)}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md border text-xs transition-colors ${
                    filterOnline
                      ? 'bg-green-900/40 border-green-600/60 text-green-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-green-600/50 hover:text-green-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${filterOnline ? 'bg-green-400' : 'bg-zinc-500'}`} />
                  Online
                </button>
              </div>
            </div>

            {/* list */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
              {filtered.length === 0 ? (
                <p className="text-center text-zinc-600 text-xs py-8">Sin resultados</p>
              ) : (
                filtered.map((c) => (
                  <ContactItem
                    key={c.id}
                    contact={c}
                    isActive={c.id === activeId}
                    onClick={() => selectContact(c.id)}
                  />
                ))
              )}
            </div>
          </aside>

          {/* RIGHT PANEL – chat area */}
          {/* On mobile: show only if showChat; on desktop: always show */}
          <main className={`${showChat ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-zinc-950/95 relative min-w-0`}>
            {/* decorative background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #a16207 0, #a16207 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />

            {activeChat ? (
              <>
                {/* chat header */}
                <div className="relative z-10 flex items-center justify-between px-3 sm:px-5 py-3 sm:py-3.5 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {/* Mobile: back button */}
                    <button
                      className="md:hidden shrink-0 p-1 text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setShowChat(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <Avatar contact={activeChat} size="lg" />
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider hidden sm:block">Chat con</p>
                      <h3 className="text-white font-bold text-sm sm:text-base leading-tight truncate">
                        {activeChat.summonerName}
                        <span className="text-zinc-400 font-normal text-xs sm:text-sm ml-1 hidden sm:inline">
                          ({activeChat.rank}, {activeChat.role})
                        </span>
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <RankBadge />
                        <span className="text-xs text-yellow-500 font-semibold">{activeChat.rank}</span>
                        <span className="text-zinc-600 text-xs">•</span>
                        <span className={`text-xs font-medium ${activeChat.isOnline ? 'text-green-400' : 'text-zinc-500'}`}>
                          {activeChat.isOnline ? 'En línea' : 'Desconectado'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button className="hidden sm:block px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-zinc-300 border border-zinc-700 rounded-lg hover:border-yellow-600/60 hover:text-yellow-400 transition-colors">
                      Ver Perfil
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(activeChat.summonerName)}
                      className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-zinc-300 border border-zinc-700 rounded-lg hover:border-yellow-600/60 hover:text-yellow-400 transition-colors"
                    >
                      <span className="hidden sm:inline">Copiar Nick</span>
                      <span className="sm:hidden">⎘</span>
                    </button>
                  </div>
                </div>

                {/* messages scroll area */}
                <div className="relative z-10 flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 space-y-3">
                  {activeChat.messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      contactName={activeChat.summonerName}
                    />
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* input bar */}
                <div className="relative z-10 px-3 sm:px-5 py-3 sm:py-3.5 border-t border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-zinc-800/80 border border-zinc-700/60 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 focus-within:border-yellow-600/50 transition-colors">
                      <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKey}
                        className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none"
                      />
                      <button className="hidden sm:block text-zinc-600 hover:text-yellow-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>

                    <button
                      onClick={handleSend}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold text-sm rounded-xl shadow-lg shadow-yellow-900/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}