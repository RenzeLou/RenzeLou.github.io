'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import WelcomeSplash from '@/components/home/WelcomeSplash';

const INTRO_SESSION_KEY = 'reza-home-intro-seen';
const HOLD_DURATION_MS = 5300;
const EXIT_DURATION_MS = 1250;

interface HomeIntroGateProps {
  authorName: string;
}

export default function HomeIntroGate({ authorName }: HomeIntroGateProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';

    if (prefersReducedMotion || hasSeenIntro) {
      return;
    }

    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'auto' });

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    }, HOLD_DURATION_MS);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, HOLD_DURATION_MS + EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!mounted || isVisible) {
      return;
    }

    document.body.style.overflow = '';
  }, [isVisible, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <WelcomeSplash authorName={authorName} isExiting={isExiting} />
      )}
    </AnimatePresence>
  );
}
