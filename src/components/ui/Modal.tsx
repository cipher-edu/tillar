import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
  dark?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidthClass = 'max-w-6xl',
  dark = false,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className={`relative w-full ${maxWidthClass} ${
              dark ? 'bg-[#001c30] border-[#013d8c]/30 text-white' : 'bg-[#fffdfa] border-[#d6e6f7]'
            } rounded-[3rem] border overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[90vh] flex flex-col z-10`}
          >
            {!dark && <div className="gov-gradient h-1.5 w-full shrink-0" />}
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 z-20 p-3 rounded-full border transition-all active:scale-90 ${
                dark
                  ? 'bg-white/5 border-white/10 text-white hover:bg-red-500/20'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600'
              }`}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="overflow-y-auto scrollbar-hide flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
