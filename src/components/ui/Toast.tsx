'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

type Props = {
  message: string;
  visible: boolean;
};

export default function Toast({ message, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl pointer-events-none whitespace-nowrap"
        >
          <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
