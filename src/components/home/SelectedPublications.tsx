'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

const MAX_VISIBLE_AUTHORS = 5;

function getVisibleAuthors(authors: Publication['authors']) {
    if (authors.length <= MAX_VISIBLE_AUTHORS) {
        return { authors, truncated: false };
    }

    const highlightedIndex = authors.findIndex((author) => author.isHighlighted);
    const cutoffIndex = highlightedIndex >= MAX_VISIBLE_AUTHORS
        ? highlightedIndex + 1
        : MAX_VISIBLE_AUTHORS;

    return {
        authors: authors.slice(0, cutoffIndex),
        truncated: cutoffIndex < authors.length,
    };
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? '/#publications' : '/publications'}
                    prefetch={true}
                    className="rounded text-sm font-medium text-accent transition-all duration-200 hover:bg-accent/10 hover:text-accent-dark hover:shadow-sm"
                >
                    {messages.home.viewAll} &rarr;
                </Link>
            </div>

            <div className="space-y-4">
                {publications.map((pub, index) => {
                    const { authors: visibleAuthors, truncated } = getVisibleAuthors(pub.authors);
                    const cardClassName = `block rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm transition-all duration-200 dark:border-[rgba(148,163,184,0.24)] dark:bg-neutral-800 ${pub.url ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/40' : ''}`;

                    const content = (
                        <>
                            <h3 className="mb-2 leading-tight font-semibold text-primary">
                                {pub.title}
                            </h3>
                            <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-500">
                                {visibleAuthors.map((author, idx) => (
                                    <span key={idx}>
                                        <span className={`${author.isHighlighted ? 'font-semibold text-primary dark:text-neutral-100' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-neutral-700 dark:decoration-neutral-200' : 'decoration-neutral-400'}` : ''}`}>
                                            {author.name}
                                        </span>
                                        {author.isCorresponding && (
                                            <sup className={`ml-0 ${author.isHighlighted ? 'text-primary dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                        )}
                                        {idx < visibleAuthors.length - 1 && ', '}
                                    </span>
                                ))}
                                {truncated && <span>, et al.</span>}
                            </p>

                            {((pub.venue || pub.journal || pub.conference) || pub.tag) && (
                                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                                    {(pub.venue || pub.journal || pub.conference) && (
                                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                            {pub.venue || pub.journal || pub.conference}
                                        </span>
                                    )}
                                    {pub.tag && (
                                        <>
                                            <span className="text-neutral-300 dark:text-neutral-600">|</span>
                                            <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400">
                                                {pub.tag}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    );

                    return (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                            {pub.url ? (
                                <a
                                    href={pub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cardClassName}
                                >
                                    {content}
                                </a>
                            ) : (
                                <div className={cardClassName}>
                                    {content}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
}
