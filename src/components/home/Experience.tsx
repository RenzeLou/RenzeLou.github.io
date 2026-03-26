'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface ExperienceItem {
    logo: string;
    company: string;
    role: string;
    date: string;
    location?: string;
    tags?: string[];
}

interface ExperienceProps {
    items: ExperienceItem[];
    title?: string;
}

function getRoleBadgeClasses(role: string) {
    const normalizedRole = role.toLowerCase();

    if (normalizedRole.includes('intern')) {
        return 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400';
    }

    return 'border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/30 dark:text-violet-400';
}

export default function Experience({ items, title }: ExperienceProps) {
    const resolvedTitle = title || 'Experience';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 transition-colors"
                    >
                        <div className="flex-shrink-0 w-10 h-10 relative mt-0.5">
                            <Image
                                src={item.logo}
                                alt={item.company}
                                width={40}
                                height={40}
                                className="rounded-md object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2 flex-wrap">
                                <div className="flex min-w-0 items-baseline gap-1.5 flex-wrap">
                                    <h3 className="text-sm font-semibold text-primary">{item.company}</h3>
                                    {item.location && (
                                        <span className="text-sm text-neutral-500 dark:text-neutral-500">
                                            · {item.location}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-neutral-500 flex-shrink-0">{item.date}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-mono font-semibold ${getRoleBadgeClasses(item.role)}`}>
                                    {item.role}
                                </span>
                            </div>
                            {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {item.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-block px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
