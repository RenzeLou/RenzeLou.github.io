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
}

export default function Education({ items, title }: EducationProps) {
    const resolvedTitle = title || 'Education';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            item.active
                                ? 'bg-accent/5 border border-accent/20'
                                : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/30'
                        }`}
                    >
                        <div className="flex-shrink-0 w-8 h-8 relative">
                            <Image
                                src={item.logo}
                                alt={item.school}
                                width={32}
                                height={32}
                                className="rounded object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2 flex-wrap">
                                <h3 className={`text-sm font-medium ${
                                    item.active ? 'text-accent' : 'text-primary'
                                }`}>
                                    {item.degree}
                                </h3>
                                <span className="text-xs text-neutral-500 flex-shrink-0">{item.date}</span>
                            </div>
                            <p className="text-xs text-neutral-500">{item.school}</p>
                        </div>
                        {item.active && (
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
