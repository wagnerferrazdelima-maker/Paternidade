import { motion } from 'motion/react';
import { CheckCircle2, Download, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-orange-500 rounded-full mb-8 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
        >
          <CheckCircle2 className="w-12 h-12 text-black" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
        >
          ACESSO <span className="text-orange-500 text-stroke-orange">LIBERADO!</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed"
        >
          Parabéns! Seus dados foram recebidos. O seu <span className="text-white font-bold italic">Manual Paternidade com Propósito</span> já está pronto para download.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Action Card: Download */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl text-left hover:border-orange-500/50 transition-all group"
          >
            <Download className="w-10 h-10 text-orange-500 mb-4 group-hover:bounce" />
            <h3 className="text-xl font-bold mb-2 uppercase">Download Imediato</h3>
            <p className="text-zinc-500 text-sm mb-6">Clique no botão abaixo para baixar o PDF completo agora.</p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-orange-400 transition-colors"
            >
              Baixar PDF <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Action Card: WhatsApp Community */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl text-left hover:border-green-500/50 transition-all group"
          >
            <MessageCircle className="w-10 h-10 text-green-500 mb-4 group-hover:bounce" />
            <h3 className="text-xl font-bold mb-2 uppercase">Comunidade VIP</h3>
            <p className="text-zinc-500 text-sm mb-6">Entre no nosso grupo de pais para receber conteúdos exclusivos.</p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-green-400 transition-colors"
            >
              Entrar no Grupo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t border-zinc-900"
        >
          <p className="text-xs text-zinc-600 font-medium uppercase tracking-[0.3em]">
            Wagner Ferraz Oficial © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
