'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

interface WelcomeSplashProps {
  authorName: string;
  isExiting: boolean;
}

export default function WelcomeSplash({ authorName, isExiting }: WelcomeSplashProps) {
  const firstName = authorName.split(' ')[0] || authorName;
  const headline = useMemo(
    () => `Hi, I'm ${firstName}. Welcome to my little corner of the web.`,
    [firstName]
  );
  const [typedHeadline, setTypedHeadline] = useState('');

  useEffect(() => {
    if (isExiting) {
      setTypedHeadline(headline);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedHeadline(headline.slice(0, index));

      if (index >= headline.length) {
        window.clearInterval(timer);
      }
    }, 12);

    return () => {
      window.clearInterval(timer);
    };
  }, [headline, isExiting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={isExiting ? { y: '-102%' } : { y: 0 }}
        transition={{ duration: 0.52, ease: [0.77, 0, 0.18, 1] }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_20%_18%,_rgba(228,185,118,0.24),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,0.99),_rgba(23,37,84,0.96)_52%,_rgba(30,41,59,0.98))]"
      />
      <motion.div
        initial={false}
        animate={isExiting ? { y: '102%' } : { y: 0 }}
        transition={{ duration: 0.52, ease: [0.77, 0, 0.18, 1] }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_80%_78%,_rgba(148,163,184,0.18),_transparent_34%),linear-gradient(315deg,_rgba(10,15,26,0.99),_rgba(15,23,42,0.96)_48%,_rgba(30,41,59,0.98))]"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,165,98,0.20),_transparent_34%),radial-gradient(circle_at_85%_20%,_rgba(96,165,250,0.14),_transparent_28%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(30,41,59,0.95)_45%,_rgba(10,15,26,0.98))]" />
        <motion.div
          animate={{ x: ['-8%', '8%', '-8%'], y: ['-6%', '8%', '-6%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#e4b976]/15 blur-3xl"
        />
        <motion.div
          animate={{ x: ['10%', '-6%', '10%'], y: ['0%', '-8%', '0%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl"
        />
        <motion.div
          animate={{ y: ['0%', '10%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/6 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_40%,transparent_58%)] opacity-60" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isExiting ? { opacity: 0, y: -28 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.03, duration: 0.28 }}
            className="mb-5 text-[0.72rem] font-medium uppercase tracking-[0.45em] text-white/50"
          >
            Hello there
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={isExiting ? { opacity: 0, y: -40, scale: 0.985 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.06, duration: 0.34 }}
            className="mx-auto max-w-3xl font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {typedHeadline}
            {!isExiting && typedHeadline.length < headline.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                className="ml-1 inline-block text-accent"
              >
                |
              </motion.span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={isExiting ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.28 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/74 sm:text-lg"
          >
            Thanks for stopping by 😊.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={isExiting ? { opacity: 0, scaleX: 1.25 } : { opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.16, duration: 0.3 }}
            className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#e4b976] to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isExiting ? { opacity: 0, y: 16 } : { opacity: 0.55, y: 0 }}
            transition={{ delay: 0.2, duration: 0.26 }}
            className="mt-5 text-xs uppercase tracking-[0.35em] text-white/45"
          >
            The site will open in a moment
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
