'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface EducationItem {
    logo: string;
    school: string;
    degree: string;
    date: string;
    active?: boolean;
}

interface EducationProps {
    items: EducationItem[];
    title?: string;
    variant?: 'default' | 'compact';
}

function abbreviateDegree(degree: string): string {
    return degree
        .replace('Computer Science & Engineering', 'CSE')
        .replace('Computer Science', 'CS');
}

function abbreviateSchool(school: string): string {
    if (school === 'Penn State University') return 'Penn State Univ.';
    if (school === 'Zhejiang University City College') return 'ZUCC';
    return school;
}

export default function Education({ items, title, variant = 'default' }: EducationProps) {
    const resolvedTitle = title || 'Education';
    const isCompact = variant === 'compact';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isCompact ? 0.18 : 0.3 }}
            className={isCompact ? 'rounded-2xl border border-neutral-200/70 bg-white/80 p-3.5 shadow-sm backdrop-blur-sm dark:border-neutral-700/60 dark:bg-neutral-900/70' : ''}
        >
            <div className={isCompact ? 'mb-2.5 flex items-center justify-between' : 'mb-4'}>
                <h2 className={isCompact ? 'text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500' : 'text-2xl font-serif font-bold text-primary'}>
                    {resolvedTitle}
                </h2>
                {isCompact && (
                    <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                        Academic
                    </span>
                )}
            </div>
            <div className={isCompact ? 'space-y-1.5' : 'space-y-3'}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 rounded-lg transition-colors ${
                            isCompact
                                ? 'px-2 py-1.5'
                                : 'px-3 py-2.5'
                        } ${
                            item.active
                                ? isCompact
                                    ? 'bg-accent/6 border border-accent/15'
                                    : 'bg-accent/5 border border-accent/20'
                                : isCompact
                                    ? 'bg-transparent'
                                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/30'
                        }`}
                    >
                        <div className={`relative flex-shrink-0 ${isCompact ? 'h-8 w-8' : 'h-8 w-8'}`}>
                            <Image
                                src={item.logo}
                                alt={item.school}
                                width={isCompact ? 32 : 32}
                                height={isCompact ? 32 : 32}
                                className="rounded object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`flex ${isCompact ? 'items-start' : 'items-baseline'} justify-between gap-2 flex-wrap`}>
                                <h3 className={`${isCompact ? 'text-[0.9rem] leading-5' : 'text-sm'} font-medium ${
                                    item.active ? 'text-accent' : 'text-primary'
                                }`}>
                                    {isCompact ? abbreviateDegree(item.degree) : item.degree}
                                </h3>
                                <span className={`${isCompact ? 'text-[10px] tracking-wide' : 'text-xs'} flex-shrink-0 text-neutral-500`}>
                                    {item.date}
                                </span>
                            </div>
                            <p className={`${isCompact ? 'text-[11px]' : 'text-xs'} text-neutral-500`}>
                                {isCompact ? abbreviateSchool(item.school) : item.school}
                            </p>
                        </div>
                        {item.active && !isCompact && (
                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent/10 text-accent uppercase tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                Current
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
