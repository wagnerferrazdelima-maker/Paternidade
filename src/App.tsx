import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  ChevronRight, 
  AlertCircle,
  Instagram,
  Youtube,
  Lock,
  ArrowRight,
  TrendingUp,
  Heart,
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, doc, getDocFromServer } from 'firebase/firestore';
import { db } from './lib/firebase';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ThankYou from './ThankYou';

// Error handling types
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    authInfo: {}
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Types for form
interface FormData {
  name: string;
  email: string;
  whatsapp: string;
}

function LandingPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', whatsapp: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 24, seconds: 59 });
  const navigate = useNavigate();

  // Countdown timer for urgency
  useEffect(() => {
    // Test connection to Firestore
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
        console.log('Firebase connected successfully');
      } catch (error: any) {
        const message = error?.message || String(error);
        if (message.includes('permission-denied')) {
          // Expected if the document doesn't exist but we hit the rules
          console.log('Firebase connected (Rules enforced)');
        } else {
          console.error("Firebase connection error:", message);
          if (message.includes('the client is offline') || message.includes('failed-precondition')) {
             console.error("Please check your Firebase configuration or network.");
          }
        }
      }
    };
    testConnection();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const path = 'leads';
      await addDoc(collection(db, path), {
        name: formData.name,
        email: formData.email,
        phone: formData.whatsapp,
        createdAt: serverTimestamp(),
      });
      // Redireciona para a página de obrigado
      navigate('/obrigado');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 italic-selection:bg-orange-200 overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Urgency Banner */}
      <div className="bg-black text-white py-2 px-4 text-center text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-4 sticky top-0 z-50">
        <span className="hidden sm:inline">O treinamento gratuito será removido em:</span>
        <span className="sm:hidden">Expira em:</span>
        <div className="flex gap-2 font-mono text-orange-400 font-bold">
          <span>{formatNumber(timeLeft.hours)}h</span>
          <span>{formatNumber(timeLeft.minutes)}m</span>
          <span>{formatNumber(timeLeft.seconds)}s</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen lg:h-screen snap-start flex items-center overflow-hidden bg-white py-12 lg:py-0">
        <div className="container mx-auto px-6 max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Copy Side */}
            <div className="flex-1 text-center lg:text-left z-10 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] mb-4 sm:mb-8 border border-orange-100 shadow-sm">
                  <ShieldCheck size={14} className="animate-pulse" />
                  <span>Acesso Gratuito e Instantâneo</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-4 sm:mb-8 text-slate-900">
                  CRIE <span className="text-orange-600">FILHOS FORTES</span> EM UM MUNDO SEM VALORES.
                </h1>

                {/* Mobile Book Image - Optimized position for mobile fold */}
                <div className="lg:hidden mb-6 transform scale-90 sm:scale-100">
                  <div className="relative group max-w-[240px] mx-auto">
                    <div className="absolute inset-0 bg-orange-600/10 rounded-lg blur-2xl"></div>
                    <div className="relative z-10 flex justify-center">
                      <img 
                        src="https://i.postimg.cc/zvkhpzsN/capa-Paternidade-Proposito-By-Wagner-Ferraz.png" 
                        alt="Capa do Livro Paternidade com Propósito" 
                        className="rounded-r-lg shadow-xl h-auto w-auto max-h-[35vh] object-contain border-l-[6px] border-black"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm sm:text-xl lg:text-2xl mb-6 sm:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Descubra o <span className="text-slate-900 font-bold">Manual Prático de Paternidade com Propósito</span> e assuma de vez a liderança do seu lar.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center mb-6 lg:mb-0">
                  <a 
                    href="#form" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-black py-4 sm:py-6 px-12 rounded-2xl transition-all shadow-xl shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-1 active:scale-95 group text-base sm:text-lg"
                  >
                    <span>BAIXAR O MANUAL GRÁTIS</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="relative mb-6 sm:mb-10 pl-6 border-l-4 border-orange-500 py-2 hidden sm:block">
                  <p className="text-lg sm:text-2xl text-slate-600 leading-tight font-serif italic">
                    "O que você não corrige hoje, o mundo corrigirá amanhã — e o mundo não terá misericórdia."
                  </p>
                </div>

                <p className="hidden sm:flex mt-6 text-[10px] sm:text-xs text-slate-400 items-center justify-center lg:justify-start gap-2 font-bold uppercase tracking-widest">
                  <Lock size={14} />
                  Informações 100% protegidas
                </p>
              </motion.div>
            </div>

            {/* Image Side - Hidden on mobile, shown on desktop */}
            <motion.div 
              className="hidden lg:block flex-1 relative w-full lg:max-w-none"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative z-10 group">
                <div className="absolute inset-0 bg-orange-600/10 rounded-lg blur-2xl group-hover:bg-orange-600/20 transition-all"></div>
                
                {/* Book 3D Container - Optimized for desktop size */}
                <div className="relative z-10 transition-all duration-700 transform hover:scale-105 lg:max-h-[70vh] flex justify-center">
                  <img 
                    src="https://i.postimg.cc/zvkhpzsN/capa-Paternidade-Proposito-By-Wagner-Ferraz.png" 
                    alt="Capa do Livro Paternidade com Propósito" 
                    className="rounded-r-lg shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.4)] h-auto w-auto max-h-[50vh] lg:max-h-[70vh] object-contain border-l-[10px] border-black"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Spine highlight */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -bottom-6 -left-2 sm:-left-12 bg-white p-4 sm:p-7 rounded-[2rem] shadow-2xl z-20 border border-slate-100 flex items-center gap-3 sm:gap-5">
                  <div className="flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <TrendingUp size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <span className="block text-[8px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Impacto Familiar</span>
                    <span className="block text-lg sm:text-2xl font-black text-slate-800 tracking-tighter">+1.000 Alunos</span>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 bg-orange-500 text-black h-20 w-20 sm:h-32 sm:w-32 rounded-full flex flex-col items-center justify-center rotate-12 shadow-2xl border-4 border-white z-20">
                  <span className="text-lg sm:text-2xl font-black leading-none">GRÁTIS</span>
                  <span className="text-[8px] sm:text-xs font-bold uppercase tracking-widest mt-1">HOJE</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20"
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 bg-black px-2 py-0.5 rounded-full border border-orange-500/30 shadow-xl">Role para Explorar</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-lg border border-orange-500/20">
                <ChevronDown size={12} strokeWidth={4} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Author Section */}
      <section className="min-h-screen lg:h-screen snap-start flex items-center bg-black text-white relative overflow-hidden py-20 lg:py-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/5 blur-3xl -z-0"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-5/12 order-2 lg:order-1">
              <span className="inline-block text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-6">Autoridade e Vivência</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[0.95] tracking-tighter uppercase">Wagner <br/> <span className="text-orange-600">Ferraz</span></h2>
              
              <div className="space-y-6 sm:space-y-8 text-slate-400 text-base sm:text-lg leading-relaxed">
                <p className="border-l-4 border-orange-600 pl-6">
                  "Sou <span className="text-white font-bold">Pai de 3 filhos</span>, Sargento da PM e Pastor. Minha missão é transformar homens comuns em líderes inabaláveis dentro de seus lares."
                </p>
                <p>
                  Com quase 30 anos de casamento e uma carreira militar marcada pela disciplina, eu entendi que <span className="text-white">a criação de filhos não é sorte, é estratégia.</span>
                </p>
                <p className="hidden sm:block">
                  Preparei este manual para compartilhar as técnicas reais que usei para blindar minha família e que agora estão ajudando centenas de outros pais a retomarem o controle e o respeito em casa.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-orange-600 shrink-0"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Sgt. PM Rondônia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-orange-600 shrink-0"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Pai e Pastor</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-orange-600 shrink-0"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-orange-600">Legendário 128809</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2 w-full max-w-sm lg:max-w-md mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-orange-600 rounded-[3rem] translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)]"></div>
                <img 
                   src="https://i.postimg.cc/CxhN3t7R/fdb915e4-67be-44a4-a77b-60c33e0cc43c.jpg" 
                  alt="Wagner Ferraz e sua Família" 
                  className="rounded-[2.5rem] w-full aspect-[4/5] sm:aspect-[2/3] lg:max-h-[80vh] object-cover hover:brightness-110 transition-all duration-700 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-2 border-white/10"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-20">
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 bg-black px-2 py-0.5 rounded-full border border-orange-500/20 shadow-xl">Continue lendo</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-lg border border-orange-500/20">
                <ChevronDown size={12} strokeWidth={4} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="min-h-screen lg:min-h-screen snap-start flex items-center bg-slate-50 py-16 sm:py-24">
        <div className="container mx-auto px-6 max-w-7xl w-full">
          <div className="max-w-3xl mb-10 sm:mb-20">
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Conteúdo Exclusivo</span>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-none uppercase tracking-tighter">O QUE ESTÁ <br/> EM <span className="text-orange-600">JOGO?</span></h2>
            <p className="text-slate-500 text-lg sm:text-xl">Este não é um simples livro digital. É um treinamento estratégico dividido em pilares fundamentais para a sobrevivência da sua família.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                title: "LIDERANÇA ATIVA",
                desc: "Assuma o comando e seja a maior referência de valores para seus filhos, antes que o celular o faça.",
                icon: <Users size={32} />
              },
              {
                title: "O PODER DO NÃO",
                desc: "Como impor limites com autoridade sem perder a ternura e a conexão emocional.",
                icon: <ShieldCheck size={32} />
              },
              {
                title: "DIÁLOGO E HONRA",
                desc: "Técnicas para ser ouvido e respeitado sem precisar gritar ou perder o controle.",
                icon: <Heart size={32} />
              },
              {
                title: "VALORES BÍBLICOS",
                desc: "A base moral que servirá como bússola para seus filhos em momentos de incerteza.",
                icon: <BookOpen size={32} />
              },
              {
                title: "FILHOS ANTIFRÁGEIS",
                desc: "Como preparar seus filhos para o fracasso e a resistência emocional necessária no futuro.",
                icon: <TrendingUp size={32} />
              },
              {
                title: "LEGADO E FÉ",
                desc: "Construindo uma história que orgulhará as próximas gerações da sua linhagem.",
                icon: <AlertCircle size={32} />
              }
            ].map((box, i) => (
              <div key={i} className="group p-6 sm:p-10 bg-white rounded-[2rem] border border-slate-200 hover:border-orange-200 transition-all hover:shadow-2xl hover:shadow-orange-100/50">
                <div className="text-orange-600 mb-6 sm:mb-8 p-4 sm:p-5 bg-orange-50 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  {React.cloneElement(box.icon as React.ReactElement, { size: 24, className: "sm:w-8 sm:h-8" })}
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 tracking-tight uppercase">{box.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">{box.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-12 mb-12 pointer-events-none">
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 bg-black px-2 py-0.5 rounded-full border border-orange-500/20 shadow-xl">Mãos à obra</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-lg border border-orange-500/20">
                <ChevronDown size={12} strokeWidth={4} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="min-h-screen lg:h-screen snap-start flex items-center bg-orange-600 relative overflow-hidden py-20 lg:py-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-black rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 w-full">
          <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] p-8 sm:p-16">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Passo Final</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-[0.9] uppercase tracking-tighter">DOWNLOAD <span className="text-orange-600">IMEDIATO</span></h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] sm:text-xs tracking-widest">Preencha com seus melhores dados para receber o treinamento.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <input 
                  required
                  type="text" 
                  placeholder="NOME COMPLETO"
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all font-bold placeholder:text-slate-300 placeholder:uppercase placeholder:text-[10px]"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  required
                  type="email" 
                  placeholder="SEU MELHOR E-MAIL"
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all font-bold placeholder:text-slate-300 placeholder:uppercase placeholder:text-[10px]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <input 
                required
                type="tel" 
                placeholder="WHATSAPP COM DDD (Ex: 00 00000-0000)"
                className="w-full bg-slate-50 border-2 border-slate-100 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all font-bold placeholder:text-slate-300 placeholder:uppercase placeholder:text-[10px]"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
              
              <button 
                disabled={isSubmitting}
                className="w-full py-5 sm:py-7 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg sm:text-xl rounded-[1.5rem] shadow-2xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 disabled:opacity-70 uppercase tracking-tighter"
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>RECEBER O MANUAL AGORA</span>
                    <ChevronRight />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] pt-4">
                Seus dados estão 100% seguros com nossa política de privacidade.
              </p>
            </form>
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-12 mb-8 pointer-events-none">
            <motion.div 
              animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 bg-black px-2 py-0.5 rounded-full border border-orange-500/20 shadow-xl">Nossas Redes</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-lg border border-orange-500/20">
                <ChevronDown size={12} strokeWidth={4} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Not snapped to allow natural finish */}
      <footer className="py-20 bg-white snap-start">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black tracking-tighter uppercase mb-2">Paternidade <br/> com <span className="text-orange-600">Propósito</span></h4>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Treinando Homens e Mulheres para o Legado.</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/wagnerferrazoficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 transition-all"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.youtube.com/@wagnerferrazoficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 transition-all"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 text-center">
            <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em] leading-relaxed max-w-4xl mx-auto">
              TODA A RESPONSABILIDADE É DE WAGNER FERRAZ OFICIAL. OS RESULTADOS PODEM VARIAR DE ACORDO COM A APLICAÇÃO INDIVIDUAL DOS ENSINAMENTOS. ESTE SITE NÃO É DO FACEBOOK/META NEM DO GOOGLE/YOUTUBE. TODA A RESPONSABILIDADE É DA BIBLIO EDITORA E WAGNER FERRAZ.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/obrigado" element={<ThankYou />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
