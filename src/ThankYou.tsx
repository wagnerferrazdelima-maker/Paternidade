import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Download, 
  MessageCircle, 
  ExternalLink, 
  ArrowRight,
  Instagram,
  Youtube,
  ShieldCheck,
  Lock,
  Play,
  Pause,
  Truck,
  Volume2,
  VolumeX,
  Users,
  Video,
  ShoppingBag,
  Heart,
  Plus,
  ChevronDown
} from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function ThankYou() {
  const [selectedBumps, setSelectedBumps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('paternidade_selected_bumps');
      return saved ? JSON.parse(saved) : ['physical_book'];
    } catch (e) {
      console.error("Error parsing saved bumps", e);
      return ['physical_book'];
    }
  });
  const [viewerIndex, setViewerIndex] = useState(0);
  const [showDelayedContent, setShowDelayedContent] = useState(() => {
    return localStorage.getItem('vsl_content_revealed') === 'true';
  });
  const [vslProgress, setVslProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const vslDuration = 220; // seconds
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('vsl_elapsed_seconds');
    return saved ? parseFloat(saved) : 0;
  });
  const viewerNumbers = [37, 23, 17, 45, 67];

  // YouTube Player Ref
  const playerRef = useRef<any>(null);

  // Restore scroll position and save it on scroll
  useEffect(() => {
    const savedScroll = localStorage.getItem('thank_you_scroll_pos');
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
      }, 100);
    }

    const handleScroll = () => {
      localStorage.setItem('thank_you_scroll_pos', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    function createPlayer() {
      playerRef.current = new window.YT.Player('vsl-player', {
        height: '100%',
        width: '100%',
        videoId: 'YZtez0yxJ_Y',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          mute: 0,
          start: Math.floor(elapsedSeconds)
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(100);
            // Video ready - not autoplaying to ensure sound works on first interaction
            if (elapsedSeconds >= vslDuration) {
              setShowDelayedContent(true);
            }
          },
          onStateChange: (event: any) => {
            // 1 = playing, 2 = paused
            if (event.data === 1) {
              setIsPlaying(true);
              setIsMuted(false);
            }
            else if (event.data === 2) setIsPlaying(false);
          }
        }
      });
    }

    return () => {
      // Clean up if needed
    };
  }, []);

  // Sync Progress and Disclosure
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 0.1;
          localStorage.setItem('vsl_elapsed_seconds', next.toString());
          
          // Progressive reveal check
          if (next >= vslDuration) {
            setShowDelayedContent(true);
            localStorage.setItem('vsl_content_revealed', 'true');
          }
          
          return next;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle Play/Pause and Unmute
  const handleVslInteraction = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  // UI Progress Calculation
  useEffect(() => {
    const percentTime = elapsedSeconds / vslDuration;
    let simulatedProgress = 0;
    
    if (percentTime < 0.2) {
      simulatedProgress = (percentTime / 0.2) * 40;
    } else if (percentTime < 0.7) {
      simulatedProgress = 40 + ((percentTime - 0.2) / 0.5) * 45;
    } else {
      simulatedProgress = 85 + ((percentTime - 0.7) / 0.3) * 14;
    }
    
    setVslProgress(Math.min(simulatedProgress, 100));
  }, [elapsedSeconds]);

  useEffect(() => {
    // Persiste as seleções sempre que mudarem
    localStorage.setItem('paternidade_selected_bumps', JSON.stringify(selectedBumps));
  }, [selectedBumps]);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerIndex((prev) => (prev + 1) % viewerNumbers.length);
    }, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);
  
  const physicalBook = { 
    id: 'physical_book', 
    title: 'LIVRO FÍSICO: PATERNIDADE COM PROPÓSITO', 
    price: 39.90, 
    oldPrice: 97.00,
    icon: <ShoppingBag size={20} />, 
    description: 'Edição Premium com Frete Grátis para todo Brasil 🇧🇷. Aprenda a deixar um legado forte na vida dos seus filhos.' 
  };

  const bumps = [
    { 
      id: 'audiobook', 
      title: '🎧 AUDIOLIVRO COMPLETO EM MP3', 
      price: 10.00, 
      oldPrice: 27.00,
      icon: <Volume2 size={20} />, 
      description: 'Paternidade com Propósito 🎧: Manual Prático para Treinar Filhos Fortes. Ouça no carro, no trabalho, na academia ou em casa. Este é um guia prático para pais que desejam deixar um legado forte. 🔥'
    },
    { 
      id: 'mothers', 
      title: '🌿 TREINAMENTO DIGITAL: MESA COM PROPÓSITO', 
      price: 10.00, 
      oldPrice: 37.00,
      icon: <Heart size={20} />, 
      description: 'By Katia Ferraz ✨. Transforme a mesa de sua casa em um ambiente de conexão, ensino e legado 💒. Aprenda a liderar o destino emocional e espiritual da sua família, construindo memórias eternas. 🌿'
    },
    { 
      id: 'vip', 
      title: '👨‍👩‍👧‍👦 GRUPO VIP ANUAL PARA PAIS', 
      price: 67.00, 
      oldPrice: 197.00,
      icon: <Users size={20} />, 
      description: 'Uma jornada anual de transformação 👨‍👩‍👧‍👦. Conteúdo prático semanal, encontros ao vivo exclusivos e estratégias reais para educar filhos com valores sólidos e propósito. Não eduque sozinho, faça parte dessa comunidade! 🚀'
    },
    { 
      id: 'course', 
      title: '🎓 CURSO GRAVADO: CRIANDO FILHOS FORTES', 
      price: 97.00, 
      oldPrice: 297.00,
      icon: <Video size={20} />,
      description: 'Forme filhos resilientes com 18 aulas práticas (média de 5 min) e 5 módulos completos 🎓. Estratégias reais para fortalecer o comportamento e a segurança emocional sem gritos ou culpa. 🔥'
    },
    { 
      id: 'combo', 
      title: '💎 COMBO PREMIUM: ACESSO TOTAL (TUDO LIBERADO)', 
      price: 197.00, 
      oldPrice: 655.00,
      icon: <Play size={24} />,
      description: 'PARE DE TENTAR SOZINHO! A maioria dos pais falha porque não tem um mapa. Este é o seu arsenal completo para blindar sua família e deixar um legado. Você economizou R$ 458,00 agora.'
    },
  ];

  const allItems = [physicalBook, ...bumps];

  const toggleBump = (id: string) => {
    setSelectedBumps(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const getShortTitle = (title: string) => {
    // Remove emojis and common prefixes, then take the first part or use a map
    const clean = title
      .replace(/[🎧🌿👨‍👩‍👧‍👦🎓💎]/g, '')
      .replace(/LIVRO FÍSICO: /g, '')
      .replace(/TREINAMENTO DIGITAL: /g, '')
      .replace(/CURSO GRAVADO: /g, '')
      .replace(/GRUPO VIP ANUAL PARA PAIS/g, 'GRUPO VIP PAIS')
      .replace(/AUDIOLIVRO COMPLETO EM MP3/g, 'AUDIOLIVRO MP3')
      .replace(/COMBO PREMIUM: ACESSO TOTAL/g, 'COMBO PREMIUM 💎')
      .trim();
    return clean;
  };

  const totalPrice = allItems
    .filter(b => selectedBumps.includes(b.id))
    .reduce((sum, b) => sum + b.price, 0);

  const handleWhatsAppOrder = () => {
    const selectedItems = allItems.filter(b => selectedBumps.includes(b.id));
    const phone = "5569992294953";
    
    if (selectedItems.length === 0) {
      alert("Por favor, selecione ao menos um item para adicionar ao seu pedido.");
      return;
    }

    let message = `Olá Wagner! Gostaria de adicionar os seguintes itens ao meu pedido:\n\n`;
    
    selectedItems.forEach(item => {
      message += `✅ *${getShortTitle(item.title)}* - R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
    });
    
    message += `\n*TOTAL:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n\n`;
    message += `Pode me enviar as informações para o pagamento?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const handleDownloadEbook = () => {
    const phone = "5569992294953";
    const message = `Olá Wagner Ferraz Oficial! Acabei de me inscrever e gostaria de receber o meu ebook gratuito “Paternidade com Propósito” 📘\n\nVocê pode me enviar o link de download por aqui, por favor?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 overflow-x-hidden">
      {/* Top Progress Banner */}
      <div className="bg-black text-white py-3 px-4 text-center text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4 sticky top-0 z-50">
        <ShieldCheck size={14} className="text-orange-500 animate-pulse" />
        <span>PASSO 2 DE 2: CONFIGURANDO SEU ACESSO</span>
      </div>

      <div className="relative min-h-[100dvh] lg:min-h-0 pt-4 sm:pt-12 pb-12 sm:pb-20 bg-white">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 blur-3xl -z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 max-w-5xl h-full flex flex-col justify-center relative z-10">
          <div className="text-center mb-6 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-[10px] sm:text-sm font-black uppercase tracking-widest mb-4 sm:mb-8 shadow-xl shadow-green-100"
            >
              <CheckCircle2 size={14} className="sm:w-5 sm:h-5" />
              <span>VOCÊ GANHOU SEU PRESENTE</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[28px] xs:text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-8 tracking-tighter leading-[0.95] uppercase sm:leading-[0.9]"
            >
              RECEBA SEU <br/> <span className="text-orange-600">LIVRO FÍSICO</span> EM CASA
            </motion.h1>
            <p className="text-[13px] sm:text-xl md:text-2xl lg:text-3xl text-slate-500 max-w-4xl mx-auto leading-tight sm:leading-relaxed font-bold px-2 sm:px-0 uppercase tracking-tight">
              ASSISTA AO VÍDEO ABAIXO PARA SABER COMO RECEBER O SEU <span className="text-slate-900 underline decoration-orange-500 decoration-2 sm:decoration-4">LIVRO FÍSICO EM CASA</span> COM FRETE GRÁTIS.
            </p>
          </div>

          {/* VSL Section - Premium Smartphone Frame with Real-time Progress Bar */}
          <div className="w-full max-w-[340px] sm:max-w-xl mx-auto mb-8 sm:mb-20 px-4 sm:px-2 text-left">
            <div className="relative aspect-[9/16] bg-black rounded-[2.5rem] sm:rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(249,115,22,0.3)] sm:shadow-[0_60px_150px_-30px_rgba(249,115,22,0.3)] overflow-hidden border-[6px] sm:border-[20px] border-slate-900 ring-2 sm:ring-8 ring-slate-800 group">
              
              {/* Glossy Overlay Reflection */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent z-30 opacity-40"></div>

              <div id="vsl-player" className="absolute inset-0 w-full h-full pointer-events-none"></div>

              {/* Fake Internal UI Controls (Retention Hacks) - Removed PDF and Volume as requested */}
              <div className="absolute top-2 left-0 w-full z-40 pointer-events-none flex items-center justify-center px-4">
              </div>

              {/* Play/Pause/Mute Interaction Area */}
              <div 
                className="absolute inset-0 z-[60] cursor-pointer group/vcenter flex items-center justify-center p-6"
                onClick={handleVslInteraction}
              >
                {/* Subtle pause hint when playing */}
                {!isMuted && isPlaying && (
                  <div className="absolute inset-0 opacity-0 group-hover/vcenter:opacity-100 transition-opacity flex items-center justify-center bg-black/10">
                     <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                        <Pause size={40} className="text-white" fill="currentColor" />
                     </div>
                  </div>
                )}
              </div>

              {/* VTurb Style Progress Bar System */}
              <div className="absolute bottom-0 left-0 w-full z-50">
                {/* Thin, high-contrast progress tracker */}
                <div className="w-full h-1 sm:h-2 bg-black/40 overflow-hidden">
                  <div 
                     style={{ width: `${vslProgress}%` }}
                     className="h-full bg-orange-600 relative transition-all duration-300 shadow-[0_0_10px_rgba(234,88,12,0.8)]"
                  >
                    {/* Glossy lead edge for VTurb look */}
                    <div className="absolute right-0 top-0 h-full w-2 bg-white/40 blur-[1px]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
                   {[
                     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                     "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                   ].map((url, i) => (
                     <div key={i} className="h-6 w-6 sm:h-9 sm:w-9 rounded-full bg-slate-100 border-[1.5px] sm:border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                       <img src={url} alt="Person" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                     </div>
                   ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-900">
                      {viewerNumbers[viewerIndex]} pessoas assistindo agora
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tempo estimado para liberar o bônus: {Math.max(0, Math.floor((vslDuration * (1 - vslProgress/100)) / 60))}:{(Math.max(0, Math.floor(vslDuration * (1 - vslProgress/100) % 60))).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {showDelayedContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span id="offers-section" className="text-orange-600 font-black uppercase text-2xl sm:text-5xl tracking-tighter text-center block w-full mb-8 sm:mb-12 px-4 leading-none">
                APROVEITE TODOS PRODUTOS EM OFERTA
              </span>

              {/* Offer Section */}
              <div className="bg-slate-50 rounded-[1.5rem] sm:rounded-[3rem] p-4 sm:p-10 lg:p-16 border-2 border-slate-100 mb-10 sm:mb-16">
                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
                  <div className="flex-1">
                    <span className="inline-block text-orange-600 font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 text-center w-full lg:text-left">FRETE GRÁTIS PARA TODO BRASIL</span>
                    
                    {/* Physical Book Choice Card */}
                    <div 
                      onClick={() => toggleBump(physicalBook.id)}
                      className={`p-4 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group mb-5 sm:mb-8 ${
                        selectedBumps.includes(physicalBook.id) 
                        ? 'bg-orange-50 border-orange-500 shadow-lg shadow-orange-100' 
                        : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                          selectedBumps.includes(physicalBook.id) ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {physicalBook.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1.5">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-tighter line-through text-slate-400">De R$ {physicalBook.oldPrice.toFixed(2).replace('.', ',')}</span>
                            <p className="text-[11px] sm:text-sm font-black uppercase tracking-tighter text-orange-600 px-2 py-0.5 bg-orange-100/50 rounded-md">Por Apenas R$ {physicalBook.price.toFixed(2).replace('.', ',')}</p>
                          </div>
                          <p className="text-sm sm:text-lg font-black text-slate-700 uppercase tracking-tighter mb-1 leading-tight break-words">{physicalBook.title}</p>
                          <p className="text-[11px] sm:text-sm text-slate-500 leading-tight font-medium max-w-xl">{physicalBook.description}</p>
                        </div>
                      </div>
                      <div className={`h-6 w-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-all ${
                        selectedBumps.includes(physicalBook.id) ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-200'
                      }`}>
                         {selectedBumps.includes(physicalBook.id) && <CheckCircle2 size={16} />}
                      </div>
                    </div>

                    {/* Order Bumps Header */}
                    <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-4 sm:mb-6 flex items-center gap-2">
                      <Plus size={14} /> <span className="line-clamp-1">CONDIÇÃO ESPECIAL COM SUPERDESCONTO</span>
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      {bumps.map((bump) => {
                        const isCombo = bump.id === 'combo';
                        const isSelected = selectedBumps.includes(bump.id);
                        
                        if (isCombo) {
                          return (
                            <div 
                              key={bump.id}
                              onClick={() => toggleBump(bump.id)}
                              className={`relative p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-[3px] transition-all cursor-pointer group mb-8 mt-6 ${
                                isSelected
                                  ? 'bg-slate-900 border-orange-500 ring-2 sm:ring-4 ring-orange-500/20 shadow-2xl scale-[1.01]' 
                                  : 'bg-slate-800 border-slate-700 shadow-xl hover:border-orange-500/50'
                              }`}
                            >
                              {/* Floating Persuasion Badge */}
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-auto whitespace-nowrap bg-orange-600 text-white py-2 px-3 sm:px-6 rounded-full shadow-2xl z-30 flex items-center justify-center gap-1 sm:gap-2 border-2 border-white/20">
                                 <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap text-center">
                                   COMBO TRANSFORMAÇÃO TOTAL 💎 <span className="text-orange-200 hidden xs:inline">ECONOMIZE R$ 458 HOJE</span>
                                 </span>
                              </div>

                              {/* Sabri Suby Style Badge */}
                              <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded-bl-xl z-20 uppercase tracking-widest">
                                 Última Unidade
                              </div>

                              <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`h-12 w-12 shrink-0 rounded-lg flex items-center justify-center shadow-inner ${
                                    isSelected ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300'
                                  }`}>
                                    <Play size={24} fill="currentColor" />
                                  </div>
                                  <div>
                                    <span className="block text-xs font-black text-orange-500 uppercase tracking-[0.2em] leading-none mb-1">Oferta Irrecusável</span>
                                    <h4 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                                      {bump.title}
                                    </h4>
                                  </div>
                                </div>

                                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-tight mb-4 border-l-2 border-orange-500 pl-3">
                                  <span className="text-white font-bold">PARE DE TENTAR SOZINHO!</span> A maioria dos pais falha porque não tem um mapa. Este é o seu arsenal completo para <span className="text-white font-bold underline decoration-orange-500">blindar sua família</span> e deixar um legado. <span className="text-orange-400 font-bold">Você economizou R$ 458,00 agora.</span>
                                </p>

                                <div className="grid grid-cols-2 gap-2 mb-4">
                                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-700/50 flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-tight">Ebooks + Curso</span>
                                  </div>
                                  <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-700/50 flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-tight">Grupo VIP Pais</span>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest line-through">De R$ 655,00</span>
                                    <p className="text-4xl sm:text-5xl font-black text-green-500 tracking-tighter leading-none">
                                      R$ {bump.price.toFixed(2).replace('.', ',')}
                                    </p>
                                  </div>
                                  
                                  <div className={`h-14 w-full rounded-xl border-2 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs sm:text-sm transition-all bg-orange-600 border-orange-600 text-white shadow-lg ${
                                    isSelected 
                                      ? 'shadow-orange-500/40 ring-2 sm:ring-4 ring-orange-500/20' 
                                      : 'hover:bg-orange-700 hover:border-orange-700'
                                  }`}>
                                     {isSelected ? <CheckCircle2 size={20} /> : null}
                                     <span>{isSelected ? 'SELECIONADO' : 'ADICIONAR AO PEDIDO'}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Warning text */}
                              <div className="mt-4 pt-3 border-t border-slate-700/50">
                                 <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] text-center italic">
                                   *Não disponível em nenhum outro lugar por este valor
                                 </p>
                              </div>
                            </div>
                          );
                        }


                        return (
                          <div 
                            key={bump.id}
                            onClick={() => toggleBump(bump.id)}
                            className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                              isSelected
                                ? 'bg-orange-50 border-orange-500 shadow-lg shadow-orange-100' 
                                : 'bg-white border-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start gap-3 sm:gap-4 flex-1">
                              <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
                              }`}>
                                {bump.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter line-through text-slate-400">De R$ {bump.oldPrice.toFixed(2).replace('.', ',')}</span>
                                  <p className={`text-[10px] sm:text-xs font-black uppercase tracking-tighter text-orange-600`}>Por Apenas + R$ {bump.price.toFixed(2).replace('.', ',')}</p>
                                </div>
                                <p className="text-sm sm:text-base font-black text-slate-700 uppercase tracking-tighter mb-1 leading-tight">{bump.title}</p>
                                {bump.description && (
                                  <p className={`text-[11px] sm:text-xs leading-tight font-medium max-w-sm text-slate-500`}>
                                    {bump.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className={`h-6 w-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-all ml-4 ${
                              isSelected ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-200'
                            }`}>
                               {isSelected && <CheckCircle2 size={16} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="xl:w-[400px] shrink-0 mt-8 xl:mt-0">
                    <div className="bg-white p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 xl:sticky xl:top-24">
                      <div className="flex items-center justify-center gap-2 mb-4 bg-orange-50 py-2 rounded-xl border border-orange-100">
                        <ShieldCheck size={16} className="text-orange-600" />
                        <span className="text-[9px] sm:text-xs font-black text-orange-700 uppercase tracking-widest">GARANTIA DE 7 DIAS ABSOLUTA</span>
                      </div>
                      <img 
                        src="https://i.postimg.cc/zvkhpzsN/capa-Paternidade-Proposito-By-Wagner-Ferraz.png" 
                        alt="Livro Físico" 
                        className="w-full max-w-[180px] sm:max-w-[240px] mx-auto xl:max-w-none h-auto rounded-xl shadow-lg mb-6 sm:mb-8"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                         {selectedBumps.length === 0 && (
                           <p className="text-xs font-bold text-slate-400 italic text-center py-4">Nenhum item selecionado</p>
                         )}
                         <div className="space-y-2">
                           {allItems.filter(b => selectedBumps.includes(b.id)).map(b => (
                             <motion.div 
                               key={b.id} 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, x: 10 }}
                               className="flex justify-between items-center text-[13px] sm:text-sm font-bold text-orange-600"
                             >
                                <span className="max-w-[180px] sm:max-w-[200px] break-words line-clamp-1">+ {getShortTitle(b.title)}</span>
                                <span className="shrink-0 ml-2">R$ {b.price.toFixed(2).replace('.', ',')}</span>
                             </motion.div>
                           ))}
                         </div>
                         {selectedBumps.length > 0 && <div className="h-px bg-slate-100 my-4"></div>}
                         <div className="flex flex-col gap-1 py-1 text-center lg:text-left">
                            <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-500">VALOR TOTAL SELECIONADO</span>
                            <motion.div 
                              key={totalPrice}
                              initial={{ scale: 1.1, color: "#16a34a" }}
                              animate={{ scale: 1, color: "#16a34a" }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="text-4xl sm:text-5xl font-black tracking-tighter text-green-600"
                            >
                              R$ {totalPrice.toFixed(2).replace('.', ',')}
                            </motion.div>
                         </div>
                      </div>

                      <button 
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 sm:py-6 rounded-2xl transition-all shadow-xl shadow-orange-200 hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <ShoppingBag size={20} className="sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                          <span className="text-lg sm:text-2xl uppercase tracking-tighter">GARANTIR MEU PEDIDO</span>
                        </div>
                        <span className="text-[10px] sm:text-sm opacity-80 font-bold uppercase tracking-widest bg-orange-700/50 px-3 py-1 rounded-full">
                          Total: R$ {totalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </button>
                      
                      <p className="mt-4 text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <Lock size={12} /> Pagamento 100% Seguro
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-10 sm:pt-16 border-t border-slate-100">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="max-w-xl mx-auto"
                >
                  <button 
                    onClick={handleDownloadEbook}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 sm:py-8 px-6 sm:px-8 rounded-2xl sm:rounded-[2.5rem] transition-all shadow-[0_20px_50px_-15px_rgba(22,163,74,0.4)] hover:-translate-y-2 active:scale-95 flex flex-col items-center justify-center gap-1 sm:gap-2 group text-base sm:text-2xl uppercase tracking-tighter"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <Download className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-y-1 transition-transform" />
                      <span>BAIXAR EBOOK GRATUITO</span>
                    </div>
                    <span className="text-[9px] sm:text-sm font-bold opacity-90 tracking-[0.1em] sm:tracking-[0.2em] line-clamp-1">SE PREFERIR, APENAS BAIXE SEU BRINDE</span>
                  </button>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-10 border-t border-slate-100"
              >
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/wagnerferrazoficial" target="_blank" rel="noopener noreferrer" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-orange-600 transition-all border border-slate-100">
                    <Instagram size={18} />
                  </a>
                  <a href="https://www.youtube.com/@wagnerferrazoficial" target="_blank" rel="noopener noreferrer" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-orange-600 transition-all border border-slate-100">
                    <Youtube size={18} />
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">
                  <Lock size={10} />
                  <span className="hidden xs:inline">Conexão Segura e Criptografada</span>
                  <span className="xs:hidden">Segurança Total</span>
                </div>

                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                  Wagner Ferraz Oficial © 2026
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
