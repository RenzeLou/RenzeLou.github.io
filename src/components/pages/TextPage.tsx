'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { TextPageConfig } from '@/types/page';

interface TextPageProps {
    config: TextPageConfig;
    content: string;
    embedded?: boolean;
}

function VisitorMapEmbed({ src }: { src: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = '';

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        script.type = 'text/javascript';
        script.id = 'clustrmaps-widget';

        container.appendChild(script);

        return () => {
            container.innerHTML = '';
        };
    }, [src]);

    return <div ref={containerRef} className="min-h-[292px]" />;
}

function PhotoGallery({
    title,
    items,
}: {
    title: string;
    items: NonNullable<TextPageConfig['photo_gallery_items']>;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollByCard = (direction: 'left' | 'right') => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = Math.min(container.clientWidth * 0.9, 360);
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#d9cfbf] bg-[linear-gradient(180deg,#f8f2e8_0%,#f4ecdf_100%)] p-5 shadow-[0_18px_55px_rgba(80,62,32,0.08)] dark:border-neutral-800 dark:bg-[linear-gradient(180deg,#18181b_0%,#111827_100%)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(60,41,19,0.95)_0.7px,transparent_0.7px)] [background-size:14px_14px] dark:opacity-[0.06]" />
            <div className="pointer-events-none absolute -left-10 top-8 h-28 w-28 rounded-full bg-[#e8d2a7]/40 blur-3xl dark:bg-amber-200/5" />
            <div className="pointer-events-none absolute -right-6 bottom-6 h-24 w-24 rounded-full bg-[#d7b98a]/30 blur-3xl dark:bg-amber-100/5" />

            <div className="relative mb-4 flex items-center justify-between gap-3">
                <div>
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                        Personal Archive
                    </p>
                    <h2 className="text-xl font-serif font-semibold text-primary">
                        {title}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scrollByCard('left')}
                        className="rounded-full border border-[#d6c7b1] bg-white/85 px-3 py-1 text-sm text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCard('right')}
                        className="rounded-full border border-[#d6c7b1] bg-white/85 px-3 py-1 text-sm text-neutral-600 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                    >
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((item, index) => (
                    <div
                        key={`${item.image}-${index}`}
                        className={`min-w-[280px] max-w-[280px] snap-start rounded-[1.7rem] border border-[#dbcdb8] bg-[#fffaf2] p-4 shadow-[0_18px_40px_rgba(87,62,34,0.14)] dark:border-neutral-700 dark:bg-neutral-950 ${
                            index % 3 === 0 ? 'rotate-[-1.4deg]' : index % 3 === 1 ? 'rotate-[0.8deg]' : 'rotate-[-0.35deg]'
                        }`}
                    >
                        <div className="relative rounded-[1.25rem] border border-[#e5d8c7] bg-white p-3 pb-4 shadow-inner dark:border-neutral-700 dark:bg-neutral-900">
                            <div className="absolute left-1/2 top-2 h-6 w-16 -translate-x-1/2 rounded-sm bg-[#f1df9d]/70 shadow-sm dark:bg-amber-100/10" />
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem] bg-neutral-200 dark:bg-neutral-800">
                                <Image
                                    src={item.image}
                                    alt={item.caption}
                                    fill
                                    className="object-cover sepia-[0.06] saturate-[0.92]"
                                    sizes="280px"
                                />
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-500">
                                Frame {String(index + 1).padStart(2, '0')}
                            </p>
                            <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                                {item.caption}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TextPage({ config, content, embedded = false }: TextPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={embedded ? "" : "max-w-3xl mx-auto"}
        >
            <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
            {config.description && (
                <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 mb-8 max-w-2xl`}>
                    {config.description}
                </p>
            )}
            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            />
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {config.photo_gallery_items && config.photo_gallery_items.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-neutral-200 dark:via-neutral-700 dark:to-neutral-800" />
                        <div className="shrink-0 rounded-full border border-neutral-200 bg-white px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
                            Photo Memories
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-300 to-neutral-200 dark:via-neutral-700 dark:to-neutral-800" />
                    </div>
                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                        A few moments from the road, the city, and everyday life.
                    </p>
                </div>
            )}

            {config.visitor_map_src && (
                <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
                    <h2 className="mb-3 text-lg font-serif font-semibold text-primary">
                        {config.visitor_map_title || 'Visitor Map'}
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-950">
                        <VisitorMapEmbed src={config.visitor_map_src} />
                    </div>
                </div>
            )}

            {config.photo_gallery_items && config.photo_gallery_items.length > 0 && (
                <PhotoGallery
                    title={config.photo_gallery_title || 'Snapshots'}
                    items={config.photo_gallery_items}
                />
            )}
        </motion.div>
    );
}
