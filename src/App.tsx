/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  X, 
  Shield, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Smartphone as AppleIcon,
  Monitor as AndroidIcon,
  Info
} from 'lucide-react';
import { GAMES } from './constants';
import { Game } from './types';

// --- Components ---

const AdBanner = ({ adKey, height, width, className = "" }: { adKey: string, height: number, width: number, className?: string }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      // Clear existing content to avoid duplicate ads on re-render
      containerRef.current.innerHTML = '';
      
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
      
      containerRef.current.appendChild(confScript);
      containerRef.current.appendChild(invokeScript);
    }
  }, [adKey, height, width]);

  return (
    <div 
      className={`flex justify-center overflow-hidden pointer-events-auto ${className}`} 
      style={{ minWidth: `${width}px`, minHeight: `${height}px` }}
      ref={containerRef} 
    />
  );
};

const OSBadge = () => {
  const [os, setOs] = useState<'iOS' | 'Android' | 'Desktop'>('Desktop');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setOs('iOS');
    } else if (/android/.test(userAgent)) {
      setOs('Android');
    }
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-gray-100 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {os === 'iOS' ? (
        <>
          <AppleIcon className="w-3.5 h-3.5 text-[#0F172A]" />
          <span>iOS Detected</span>
        </>
      ) : os === 'Android' ? (
        <>
          <AndroidIcon className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Android Detected</span>
        </>
      ) : (
        <>
          <Smartphone className="w-3.5 h-3.5 text-gray-400" />
          <span>Universal Device</span>
        </>
      )}
      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
    </div>
  );
};

const Header = ({ onAdminClick, onLogoClick, searchQuery, onSearchChange }: { 
  onAdminClick: () => void, 
  onLogoClick: () => void,
  searchQuery: string,
  onSearchChange: (val: string) => void
}) => {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0 cursor-pointer group" onClick={onLogoClick}>
          <div className="w-8 h-8 rounded-lg bg-[#007AFF] flex items-center justify-center transition-all group-hover:bg-[#007AFF] group-hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0F172A]">GamesArena</span>
        </div>

        <div className="flex-1 max-w-md hidden sm:block mx-8 text-[#0F172A]">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#007AFF] transition-colors" />
            <input 
              type="text" 
              placeholder="Search premium games..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-full bg-[#FAFAFA] border-none focus:ring-2 focus:ring-[#007AFF]/20 text-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 text-gray-400 transition-colors"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <OSBadge />
        </div>
      </div>
    </header>
  );
};

const HeroSlider = ({ games, onOpenGame }: { games: Game[], onOpenGame: (game: Game) => void }) => {
  const [index, setIndex] = useState(0);
  const featuredGames = games.slice(0, 3);

  useEffect(() => {
    if (featuredGames.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  if (featuredGames.length === 0) return null;

  return (
    <section className="relative h-[500px] sm:h-[600px] overflow-hidden bg-[#FAFAFA] pt-6 px-6">
      <div className="max-w-7xl mx-auto h-full rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl border border-gray-100 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${featuredGames[index].screenshots[0]})` }}
            >
              {/* Deep gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            </div>

            <div className="relative z-20 h-full max-w-7xl mx-auto px-12 flex flex-col justify-center gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#007AFF] text-white text-[11px] font-black uppercase tracking-[0.2em]">
                    Premium Choice
                  </span>
                </div>
                <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 max-w-2xl leading-[1.1] tracking-tighter drop-shadow-sm">
                  {featuredGames[index].title}
                </h2>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  {featuredGames[index].features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onOpenGame(featuredGames[index])}
                  className="px-10 py-5 bg-white text-[#0F172A] rounded-full font-black text-sm w-fit shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                >
                  Explore Details
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 right-12 z-30 flex gap-3">
          {featuredGames.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const GameCard = ({ game, onClick }: { game: Game; onClick: () => void; key?: React.Key }) => {
  return (
    <motion.div
      layoutId={`game-${game.id}`}
      onClick={onClick}
      whileHover={{ y: -8 }}
      className="group cursor-pointer bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Glossy overlay effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl">
        <img 
          src={game.icon} 
          alt={game.title} 
          className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Verification Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 px-1 relative z-10">
        <div className="flex flex-col min-w-0">
          <span className="text-base font-black text-[#0F172A] leading-tight mb-1 truncate">{game.title}</span>
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.1em]">{game.size}</span>
             <span className="w-1 h-1 rounded-full bg-blue-500" />
             <span className="text-[10px] text-[#007AFF] font-black uppercase tracking-[0.1em]">Ultra Port</span>
          </div>
        </div>
        <button className="bg-[#007AFF] text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 active:scale-90 transition-all shrink-0">
          <Download className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};


const FEATURE_PRESETS = [
  'Full Cross-Play Supported',
  'Uncapped FPS',
  'Haptic Feedback',
  '4K Texture Pack',
  'Ray Tracing Enabled',
  'Cloud Save Sync',
  'Offline Mode',
  'Controller Support'
];

const AdminPanel = ({ games, onAdd, onUpdate, onDelete, onClose }: { 
  games: Game[], 
  onAdd: (game: Game) => void, 
  onUpdate: (game: Game) => void,
  onDelete: (id: string) => void,
  onClose: () => void 
}) => {
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gameToSave = {
      ...editingGame,
      screenshots: Array.isArray(editingGame?.screenshots) 
        ? editingGame.screenshots 
        : (editingGame?.screenshots as unknown as string || '').split(',').map(s => s.trim()).filter(s => s),
      features: editingGame?.features || []
    };

    if (editingGame?.id && games.find(g => g.id === editingGame.id)) {
      onUpdate(gameToSave as Game);
    } else {
      const newGame = { 
        ...gameToSave, 
        id: Math.random().toString(36).substr(2, 9),
        size: editingGame?.size || '1.0 GB',
        price: editingGame?.price || 'Free'
      } as Game;
      onAdd(newGame);
    }
    setEditingGame(null);
  };

  const toggleFeature = (feature: string) => {
    const currentFeatures = editingGame?.features || [];
    if (currentFeatures.includes(feature)) {
      setEditingGame({ ...editingGame, features: currentFeatures.filter(f => f !== feature) });
    } else {
      setEditingGame({ ...editingGame, features: [...currentFeatures, feature] });
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black text-[#0F172A] tracking-tighter">Arena Studio</h2>
          <p className="text-gray-400 text-sm font-medium mt-1">Deploy and manage high-performance gaming entities.</p>
        </div>
        <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-500 transition-all border border-gray-100">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-gray-400 uppercase tracking-[0.2em] text-[10px]">Registry ({games.length})</h3>
            <button 
              onClick={() => setEditingGame({ title: '', size: '', price: 'Free', features: FEATURE_PRESETS.slice(0, 2), screenshots: [], description: '', icon: '' })}
              className="px-3 py-1 rounded-lg bg-blue-50 text-[10px] font-black text-[#007AFF] hover:bg-blue-100 uppercase tracking-wider transition-colors"
            >
              + Create New
            </button>
          </div>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
            {games.map(game => (
              <div key={game.id} className="group flex items-center justify-between p-4 bg-white rounded-3xl border border-gray-100 hover:border-[#007AFF]/30 transition-all shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4">
                  <img src={game.icon} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100" alt="" />
                  <div>
                    <p className="font-bold text-sm text-[#0F172A]">{game.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{game.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => setEditingGame(game)} className="p-2 text-gray-400 hover:text-[#007AFF] transition-colors"><Info className="w-5 h-5" /></button>
                  <button onClick={() => onDelete(game.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          {editingGame ? (
            <form onSubmit={handleSubmit} className="bg-[#FAFAFA] p-10 rounded-[3rem] border border-gray-100 space-y-8 h-fit sticky top-24 shadow-sm">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#007AFF] animate-pulse" />
                <h3 className="font-black text-xl text-[#0F172A] tracking-tight">{editingGame.id ? 'Modify Entity' : 'New Deployment'}</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Game Title</label>
                    <input 
                      placeholder="e.g. Cyberpunk 2077 Mobile" 
                      className="w-full h-14 px-6 rounded-2xl border border-gray-200 bg-white text-sm font-bold focus:ring-[6px] focus:ring-[#007AFF]/5 focus:border-[#007AFF]/30 outline-none transition-all"
                      value={editingGame.title || ''}
                      onChange={e => setEditingGame({ ...editingGame, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Icon Identity (URL)</label>
                    <input 
                      placeholder="https://..." 
                      className="w-full h-14 px-6 rounded-2xl border border-gray-200 bg-white text-sm font-bold focus:ring-[6px] focus:ring-[#007AFF]/5 outline-none transition-all"
                      value={editingGame.icon || ''}
                      onChange={e => setEditingGame({ ...editingGame, icon: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Binary Weight</label>
                    <input 
                      placeholder="e.g. 2.4 GB" 
                      className="w-full h-14 px-6 rounded-2xl border border-gray-200 bg-white text-sm font-bold focus:ring-[6px] focus:ring-[#007AFF]/5 outline-none transition-all"
                      value={editingGame.size || ''}
                      onChange={e => setEditingGame({ ...editingGame, size: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Listed Value</label>
                    <input 
                      placeholder="e.g. $9.99" 
                      className="w-full h-14 px-6 rounded-2xl border border-gray-200 bg-white text-sm font-bold focus:ring-[6px] focus:ring-[#007AFF]/5 outline-none transition-all"
                      value={editingGame.price || ''}
                      onChange={e => setEditingGame({ ...editingGame, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Core Features (Check to include in Hero Section)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-white rounded-2xl border border-gray-100">
                    {FEATURE_PRESETS.map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className={`px-3 py-2 rounded-xl text-[10px] font-bold text-center transition-all ${
                          editingGame.features?.includes(feature)
                            ? 'bg-[#007AFF] text-white shadow-md shadow-blue-500/20'
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Visual Feed (CSV URLs)</label>
                  <textarea 
                    placeholder="https://image1.jpg, https://image2.jpg" 
                    className="w-full p-6 rounded-2xl border border-gray-200 bg-white text-xs font-medium min-h-24 focus:ring-[6px] focus:ring-[#007AFF]/5 outline-none transition-all"
                    value={Array.isArray(editingGame.screenshots) ? editingGame.screenshots.join(', ') : (editingGame.screenshots as unknown as string || '')}
                    onChange={e => setEditingGame({ ...editingGame, screenshots: e.target.value as any })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Product Synthesis</label>
                  <textarea 
                    placeholder="Deep details about the title..." 
                    className="w-full p-6 rounded-2xl border border-gray-200 bg-white text-sm font-medium min-h-32 focus:ring-[6px] focus:ring-[#007AFF]/5 outline-none transition-all leading-relaxed"
                    value={editingGame.description || ''}
                    onChange={e => setEditingGame({ ...editingGame, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 h-14 bg-[#0F172A] text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">Synchronize Entity</button>
                <button type="button" onClick={() => setEditingGame(null)} className="px-8 h-14 bg-white text-gray-500 border border-gray-200 rounded-2xl font-black text-sm hover:bg-gray-50 transition-colors">Abort</button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center p-20 bg-[#FAFAFA] rounded-[3.5rem] border-2 border-dashed border-gray-200 text-center gap-8 shadow-inner">
              <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center shadow-xl rotate-3">
                <Plus className="w-10 h-10 text-gray-200" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-black text-[#0F172A] tracking-tight">Systems Operational</p>
                <p className="text-gray-400 text-sm max-w-xs mx-auto font-medium">Select a data node from the registry or initialize a new distribution package.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ game, onClose }: { game: Game; onClose: () => void }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'verify'>('idle');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Allocating resources...');

  const startDownload = useCallback(() => {
    setDownloadState('loading');
    setProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5;
      
      if (currentProgress < 30) {
        setStatusText('Securing cloud buffer...');
      } else if (currentProgress < 60) {
        setStatusText('Optimizing local cache...');
      } else if (currentProgress < 88) {
        setStatusText('Decrypting package...');
      }

      if (currentProgress >= 88) {
        clearInterval(interval);
        setProgress(88);
        setDownloadState('verify');
        setStatusText('Verification Required. Please confirm your identity to release the final bits.');
      } else {
        setProgress(currentProgress);
      }
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FAFAFA] text-[#0F172A] hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#007AFF] flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-sm rotate-45" />
            </div>
            <span className="text-xl font-black tracking-tighter text-[#0F172A]">GamesArena</span>
          </div>

          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Core Product Info */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-20">
          <div className="w-full md:w-48 shrink-0 flex flex-col items-center gap-4">
            <img src={game.icon} className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] shadow-2xl shadow-[#0F172A]/10 object-cover border border-gray-100" alt="" />
          </div>

          <div className="flex-1 space-y-8 text-center md:text-left">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter mb-2">{game.title}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-black uppercase tracking-[0.1em] text-gray-400">
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Port
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                <span>{game.size}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                <span>Premium Quality</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={startDownload}
                className="w-full sm:w-64 h-16 bg-[#007AFF] text-white rounded-full font-black text-lg shadow-2xl shadow-[#007AFF]/30 active:scale-95 transition-all"
              >
                Get Free
              </button>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Standard Market Rate</p>
                <p className="text-lg font-black text-slate-300 line-through tracking-tight">{game.price} USD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Atmospheric Gameplay</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6">
            {game.screenshots?.length > 0 ? game.screenshots.map((s, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[450px] aspect-video bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 shrink-0">
                <img src={s} className="w-full h-full object-cover" alt="" />
              </div>
            )) : (
              <div className="w-full h-64 bg-slate-50 flex items-center justify-center rounded-[2.5rem] text-gray-300 font-black uppercase tracking-widest text-xs border border-dashed">Visual feed unavailable</div>
            )}
          </div>
        </div>

        {/* Detail Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-16">
          <div className="md:col-span-2 space-y-10">
            <div className="space-y-4">
              <h4 className="text-xl font-black text-[#0F172A] tracking-tight">The Narrative</h4>
              <p className="text-gray-500 leading-relaxed font-medium">
                {game.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {game.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <span className="text-sm font-bold text-[#0F172A]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Technical Specs</h5>
              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] text-gray-400 font-black uppercase mb-1">Architecture</span>
                  <span className="text-sm font-black text-[#0F172A]">ARM-Native (No Emulation)</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-black uppercase mb-1">Rendering Engine</span>
                  <span className="text-sm font-black text-[#0F172A]">Metal / Vulkan Optimized</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-black uppercase mb-1">Encrypted Payload</span>
                  <span className="text-sm font-black text-[#10B981]">SHA-256 Verified</span>
                </div>
              </div>
            </div>

            {/* Sidebar Ad 160x600 */}
            <div className="hidden lg:block sticky top-24">
              <AdBanner adKey="6c434e01ee85902add79a8569d179c4f" height={600} width={160} />
            </div>
          </div>
        </div>

        {/* Bottom Ad 300x250 */}
        <div className="mt-20 pt-20 border-t border-gray-100 flex flex-col items-center gap-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Sponsored Content</h3>
          <AdBanner adKey="0825d8195c5f64cafb73f179d46e3602" height={250} width={300} className="shadow-lg rounded-xl" />
        </div>
      </div>

      {/* Download Alert Modal */}
      <AnimatePresence>
        {downloadState !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0F172A]/40 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl flex flex-col items-center text-center gap-8 border border-white/20"
            >
              {downloadState === 'verify' ? (
                <div className="flex flex-col gap-8 w-full">
                  <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck className="w-10 h-10 text-[#10B981]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-[#0F172A] tracking-tighter">Verify Security</h4>
                    <p className="text-gray-500 font-medium px-4 leading-relaxed">
                      To safeguard our distribution network, a biometric-grade human verification is required.
                    </p>
                  </div>
                  <motion.button
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-black text-lg shadow-xl"
                  >
                    Verify & Release
                  </motion.button>
                  <button onClick={() => setDownloadState('idle')} className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#0F172A] transition-colors">Abort Installation</button>
                </div>
              ) : (
                <div className="flex flex-col gap-8 w-full">
                  <div className="w-20 h-20 border-[6px] border-blue-50 border-t-[#007AFF] rounded-full animate-spin mx-auto shadow-sm" />
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black text-[#0F172A] tracking-tighter">{statusText}</h4>
                    <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#007AFF] shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <button onClick={() => setDownloadState('idle')} className="text-gray-400 text-sm font-bold hover:text-[#0F172A] transition-colors">Cancel Handshake</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem('gamesarena_games');
    return saved ? JSON.parse(saved) : GAMES;
  });
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [view, setView] = useState<'home' | 'details' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('gamesarena_games', JSON.stringify(games));
  }, [games]);

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddGame = (game: Game) => setGames([...games, game]);
  const handleUpdateGame = (game: Game) => setGames(games.map(g => g.id === game.id ? game : g));
  const handleDeleteGame = (id: string) => setGames(games.filter(g => g.id !== id));

  const openDetails = (game: Game) => {
    setSelectedGame(game);
    setView('details');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setView('home');
    setSelectedGame(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#007AFF]/10 selection:text-[#007AFF]">
      <Header 
        onAdminClick={() => setView('admin')} 
        onLogoClick={goHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="bg-[#FAFAFA]">
        {view === 'details' && selectedGame ? (
          <ProductPage game={selectedGame} onClose={goHome} />
        ) : view === 'admin' ? (
          <AdminPanel 
            games={games} 
            onAdd={handleAddGame} 
            onUpdate={handleUpdateGame} 
            onDelete={handleDeleteGame}
            onClose={goHome}
          />
        ) : (
          <>
            <HeroSlider games={filteredGames} onOpenGame={openDetails} />

            <section className="max-w-7xl mx-auto px-6 py-16">
              <div className="flex items-center justify-between gap-4 mb-10">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                    {searchQuery ? `Search results for "${searchQuery}"` : 'Verified Premium Ports'}
                  </h2>
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredGames.map((game) => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onClick={() => openDetails(game)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">No games found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria.</p>
                </div>
              )}

              {/* Value Prop Bento */}
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-[32px] bg-white border border-gray-100 flex flex-col gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#007AFF]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Bit-Perfect Integrity</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Every port is binary-scanned and hash-verified for authentic gameplay without compromises.
                  </p>
                </div>
                <div className="p-8 rounded-[32px] bg-white border border-gray-100 flex flex-col gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-[#007AFF]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Native Optimization</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Zero emulation. Each title is natively compiled for ARM architecture for maximum FPS.
                  </p>
                </div>
                <div className="p-8 rounded-[32px] bg-white border border-gray-100 flex flex-col gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] flex items-center justify-center">
                    <Download className="w-6 h-6 text-[#007AFF]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Instant Deployment</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Global CDN network ensures lightning-fast distribution of heavy game assets worldwide.
                  </p>
                </div>
              </div>

              {/* Home Page Ad 300x250 */}
              <div className="mt-24 flex flex-col items-center gap-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Recommended for You</h3>
                <AdBanner adKey="0825d8195c5f64cafb73f179d46e3602" height={250} width={300} className="shadow-xl rounded-2xl" />
              </div>
            </section>
          </>
        )}

        {/* Footer info */}
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#007AFF] flex items-center justify-center shadow-lg shadow-blue-500/10">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-bold text-[#0F172A]">GamesArena</span>
              <span className="text-gray-200">|</span>
              <span className="text-gray-400 text-sm font-medium">Digital Distribution Refined</span>
            </div>
            <div className="flex items-center gap-8 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              <button 
                onClick={() => setView('admin')}
                className="hover:text-[#007AFF] transition-colors"
                id="admin-access"
              >
                Admin Access
              </button>
              <a href="#" className="hover:text-[#007AFF] transition-colors">Safety Guide</a>
              <a href="#" className="hover:text-[#007AFF] transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

