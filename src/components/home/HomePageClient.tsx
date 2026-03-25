'use client';

import { motion } from 'framer-motion';
import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import Experience, { ExperienceItem } from '@/components/home/Experience';
import Education, { EducationItem } from '@/components/home/Education';
import HomeIntroGate from '@/components/home/HomeIntroGate';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list' | 'experience' | 'education';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
  experienceItems?: ExperienceItem[];
  educationItems?: EducationItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;
  const aboutPage = data?.pagesToShow.find((page): page is Extract<PageData, { type: 'about' }> => page.type === 'about');
  const sidebarEducation = aboutPage?.sections.find((section) => section.type === 'education')?.educationItems || [];

  if (!data) {
    return null;
  }

  return (
    <>
      <HomeIntroGate authorName={data.author.name} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
        className="max-w-6xl mx-auto min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.78fr)] lg:gap-12">
          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <Profile
              author={data.author}
              social={data.social}
              features={data.features}
            />

            {sidebarEducation.length > 0 && (
              <Education
                items={sidebarEducation}
                title="Education"
                variant="compact"
              />
            )}
          </div>

          <div className="space-y-8">
            {data.pagesToShow.map((page) => (
              <section key={page.id} id={page.id} className="scroll-mt-24 space-y-8">
                {page.type === 'about' && page.sections.map((section: SectionConfig) => {
                  switch (section.type) {
                    case 'markdown':
                      return (
                        <About
                          key={section.id}
                          content={section.content || ''}
                          title={section.title}
                        />
                      );
                    case 'publications':
                      return (
                        <SelectedPublications
                          key={section.id}
                          publications={section.publications || []}
                          title={section.title}
                          enableOnePageMode={data.enableOnePageMode}
                        />
                      );
                    case 'list':
                      return (
                        <News
                          key={section.id}
                          items={section.items || []}
                          title={section.title}
                        />
                      );
                    case 'experience':
                      return (
                        <Experience
                          key={section.id}
                          items={section.experienceItems || []}
                          title={section.title}
                        />
                      );
                    case 'education':
                      return null;
                    default:
                      return null;
                  }
                })}
                {page.type === 'publication' && (
                  <PublicationsList
                    config={page.config}
                    publications={page.publications}
                    embedded={true}
                  />
                )}
                {page.type === 'text' && (
                  <TextPage
                    config={page.config}
                    content={page.content}
                    embedded={true}
                  />
                )}
                {page.type === 'card' && (
                  <CardPage
                    config={page.config}
                    embedded={true}
                  />
                )}
              </section>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
