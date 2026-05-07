import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Truck,
  Volume2,
  Users,
  Video,
  ShoppingBag,
  Heart,
  Plus,
  ChevronDown
} from 'lucide-react';

export default function ThankYou() {
  const [selectedBumps, setSelectedBumps] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const viewerNumbers = [37, 23, 17, 45, 67];

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
      title: '💎 COMBO PREMIUM: ACESSO TOTAL', 
      price: 197.00, 
      oldPrice: 655.00,
      icon: <Play size={20} />,
      description: '🚨 ESTA É SUA ÚNICA CHANCE! Leve TUDO (Ebooks + Curso) por preço de banana. Pare de tentar sozinho! Garanta o arsenal completo e forme filhos resilientes agora. ECONOMIA REAL DE R$ 458,00! 🎯'
    },
  ];

  const allItems = [physicalBook, ...bumps];

  const toggleBump = (id: string) => {
    setSelectedBumps(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
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
      const cleanTitle = item.title
        .replace('🎧 ', '')
        .replace('🌿 ', '')
        .replace('👨‍👩‍👧‍👦 ', '')
        .replace('🎓 ', '')
        .replace('💎 ', '');
      message += `✅ *${cleanTitle}* - R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
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

      <div className="relative h-[100dvh] lg:h-auto pt-4 sm:pt-12 pb-20 bg-white">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 blur-3xl -z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 max-w-5xl h-full flex flex-col justify-center relative z-10">
          <div className="text-center mb-4 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 sm:mb-6 border border-green-100"
            >
              <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
              <span>Inscrição Confirmada</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-4xl md:text-6xl font-black mb-2 sm:mb-6 tracking-tighter leading-[0.95] uppercase"
            >
              NÃO FECHE <br/> <span className="text-orange-600">ESTA PÁGINA!</span>
            </motion.h1>
            <p className="text-[10px] sm:text-xl text-slate-500 max-w-2xl mx-auto leading-tight sm:leading-relaxed font-medium px-2 sm:px-0">
              ASSISTA AO VÍDEO ABAIXO PARA SABER COMO RECEBER O SEU <span className="text-slate-900 font-bold underline decoration-orange-500 decoration-1 sm:decoration-4">LIVRO FÍSICO EM CASA</span> COM FRETE GRÁTIS.
            </p>
          </div>

          {/* VSL Section - Portrait format, size optimized for mobile first fold */}
          <div className="max-w-[160px] sm:max-w-md mx-auto mb-4 sm:mb-16 px-2">
            <div className="relative aspect-[9/16] bg-black rounded-[1.5rem] sm:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border-[4px] sm:border-[12px] border-slate-900 group">
              {/* Fake Video Player Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-8 bg-gradient-to-b from-slate-900 to-black">
                <div className="w-12 h-12 sm:w-24 sm:h-24 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-orange-500 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={24} className="sm:w-12 sm:h-12" fill="currentColor" />
                </div>
                <p className="mt-4 sm:mt-8 text-white font-black uppercase tracking-widest text-[8px] sm:text-xs animate-pulse">Clique para Iniciar</p>
              </div>
              
              {/* Decorative Frame */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-900 rounded-full"></div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
                 {[
                   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                   "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                 ].map((url, i) => (
                   <div key={i} className="h-5 w-5 sm:h-8 sm:w-8 rounded-full bg-slate-100 border-[1.5px] sm:border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                     <img src={url} alt="Person" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                 ))}
              </div>
              <span className="text-[8px] sm:text-xs font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
                {viewerNumbers[viewerIndex]} assistindo agora
              </span>
            </div>
          </div>

          {/* Scroll Indicator - Fixed to viewport bottom on small screens if layout is tight */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center pb-4 sm:pb-12"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 bg-black px-2 py-0.5 rounded-full border border-orange-500/20 shadow-xl">Ver Ofertas Especiais</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-lg border border-orange-500/20">
                <ChevronDown size={12} strokeWidth={4} />
              </div>
            </motion.div>
          </motion.div>

          <span className="text-orange-600 font-black uppercase text-[12px] sm:text-4xl tracking-tighter text-center whitespace-nowrap block w-full mb-8 sm:mb-12 px-4">
            APROVEITE TODOS PRODUTOS EM OFERTA
          </span>

          {/* Offer Section */}
          <div className="bg-slate-50 rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-16 border-2 border-slate-100 mb-10 sm:mb-16">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <span className="inline-block text-orange-600 font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 text-center w-full lg:text-left">FRETE GRÁTIS PARA TODO BRASIL</span>
                
                {/* Physical Book Choice Card */}
                <div 
                  onClick={() => toggleBump(physicalBook.id)}
                  className={`p-4 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group mb-6 sm:mb-8 ${
                    selectedBumps.includes(physicalBook.id) 
                    ? 'bg-orange-50 border-orange-500 shadow-lg shadow-orange-100' 
                    : 'bg-white border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                      selectedBumps.includes(physicalBook.id) ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {physicalBook.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter line-through text-slate-400">De R$ {physicalBook.oldPrice.toFixed(2).replace('.', ',')}</span>
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-orange-600">Por Apenas R$ {physicalBook.price.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-tighter mb-1 leading-tight">{physicalBook.title}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight font-medium max-w-sm">{physicalBook.description}</p>
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
                    return (
                      <div 
                        key={bump.id}
                        onClick={() => toggleBump(bump.id)}
                        className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                          isCombo 
                            ? isSelected
                              ? 'bg-orange-100 border-orange-600 ring-4 ring-orange-600/20 shadow-2xl scale-[1.02]' 
                              : 'bg-orange-50 border-orange-300 shadow-md hover:border-orange-500'
                            : isSelected
                              ? 'bg-orange-50 border-orange-500 shadow-lg shadow-orange-100' 
                              : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {isCombo && (
                          <div className="absolute -top-3 left-6 bg-orange-600 text-white text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10">
                            💎 MELHOR ESCOLHA - ECONOMIZE R$ 458,00 💎
                          </div>
                        )}
                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                          <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-orange-600 text-white' : isCombo ? 'bg-orange-200 text-orange-700' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {bump.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter line-through text-slate-400">De R$ {bump.oldPrice.toFixed(2).replace('.', ',')}</span>
                              <p className={`text-[10px] sm:text-xs font-black uppercase tracking-tighter ${isCombo ? 'text-orange-700' : 'text-orange-600'}`}>Por Apenas + R$ {bump.price.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <p className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-tighter mb-1 leading-tight">{bump.title}</p>
                            {bump.description && (
                              <p className={`text-[10px] sm:text-[11px] leading-tight font-medium max-w-sm ${isCombo ? 'text-slate-700' : 'text-slate-500'}`}>
                                {isCombo ? (
                                  <>
                                    <span className="text-orange-700 font-bold">🚨 ESTA É SUA ÚNICA CHANCE!</span> Leve TUDO (Ebooks + Curso) por preço de custo. <span className="text-orange-600 font-bold uppercase">Pare de lutar sozinho!</span> Tenha o arsenal completo para formar filhos resilientes agora. <span className="text-orange-600 font-bold">ÚLTIMA CHANCE DE LEVAR TUDO POR ESTE VALOR!</span> 🎯
                                  </>
                                ) : bump.description}
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

              <div className="lg:w-96 shrink-0 mt-8 lg:mt-0">
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 lg:sticky lg:top-24">
                  <div className="flex items-center justify-center gap-2 mb-4 bg-orange-50 py-2 rounded-xl border border-orange-100">
                    <ShieldCheck size={16} className="text-orange-600" />
                    <span className="text-[10px] sm:text-xs font-black text-orange-700 uppercase tracking-widest">GARANTIA DE 7 DIAS ABSOLUTA</span>
                  </div>
                  <img 
                    src="https://i.postimg.cc/zvkhpzsN/capa-Paternidade-Proposito-By-Wagner-Ferraz.png" 
                    alt="Livro Físico" 
                    className="w-full h-auto rounded-xl shadow-lg mb-6 sm:mb-8"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                     {selectedBumps.length === 0 && (
                       <p className="text-xs font-bold text-slate-400 italic text-center py-4">Nenhum item selecionado</p>
                     )}
                     {allItems.filter(b => selectedBumps.includes(b.id)).map(b => (
                       <div key={b.id} className="flex justify-between items-center text-sm font-bold text-orange-600 animate-in fade-in slide-in-from-left-2 transition-all">
                          <span className="max-w-[180px] break-words line-clamp-1">+ {b.title.split(': ')[1] || b.title.split(' ')[1]}</span>
                          <span className="shrink-0 ml-2">R$ {b.price.toFixed(2).replace('.', ',')}</span>
                       </div>
                     ))}
                     {selectedBumps.length > 0 && <div className="h-px bg-slate-100 my-4"></div>}
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Investimento</span>
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                     </div>
                  </div>

                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 sm:py-6 rounded-2xl transition-all shadow-xl shadow-orange-200 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group text-base sm:text-lg uppercase tracking-tighter cursor-pointer"
                  >
                    <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                    <span>GARANTIR MEU PEDIDO</span>
                  </button>
                  
                  <p className="mt-4 text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={12} /> Pagamento 100% Seguro
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center pb-16">
            <motion.div
              animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 bg-black px-2 py-0.5 rounded-full border border-orange-500/20 shadow-xl">Baixar meu Brinde</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-lg border border-orange-500/20">
                <ChevronDown size={12} strokeWidth={4} />
              </div>
            </motion.div>
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
            transition={{ delay: 0.8 }}
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
        </div>
      </div>
    </div>
  );
}
