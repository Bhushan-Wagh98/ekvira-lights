'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const completeLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => setDone(true), 400);
  }, []);

  useEffect(() => {
    // Skip if already loaded this session
    if (sessionStorage.getItem('ekvira-ready')) {
      setDone(true);
      return;
    }

    let progressInterval: NodeJS.Timeout;

    // Simulate progress while assets load
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    // Actual load detection
    const onReady = async () => {
      clearInterval(progressInterval);
      await document.fonts.ready;
      completeLoading();
      sessionStorage.setItem('ekvira-ready', 'true');
    };

    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady);
      return () => {
        clearInterval(progressInterval);
        window.removeEventListener('load', onReady);
      };
    }

    return () => clearInterval(progressInterval);
  }, [completeLoading]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'hsl(240, 10%, 4%)' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-2xl flex items-center justify-center shadow-[0_0_40px_hsla(280,100%,60%,0.4)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#06b6d4]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ boxShadow: '0 0 10px hsla(280, 100%, 60%, 0.5)' }}
            />
          </div>

          {/* Text */}
          <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
            Ekvira Lights
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
