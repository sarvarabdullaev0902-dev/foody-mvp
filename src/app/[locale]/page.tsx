'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Croissant, ShoppingCart, Coffee, Store, TrendingDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/HeroSection';
import ListingCard from '@/components/listings/ListingCard';
import PageTransition from '@/components/ui/PageTransition';
import CountUp from '@/components/ui/CountUp';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { MagnetizeCategory } from '@/components/ui/magnetize-category';
import { useListings } from '@/lib/listings-context';

const CATEGORIES = [
  { key: 'restaurant', Icon: UtensilsCrossed },
  { key: 'bakery',     Icon: Croissant },
  { key: 'supermarket',Icon: ShoppingCart },
  { key: 'cafe',       Icon: Coffee },
  { key: 'store',      Icon: Store },
] as const;



const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HomePage() {
  const t = useTranslations('home');
  const tMap = useTranslations('map');
  const tCat = useTranslations('supplier.categories');

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { listings: allListings } = useListings();
  const featured = allListings.filter((l) => l.status !== 'paused').slice(0, 6);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const listings = activeCategory
    ? featured.filter((l) => l.category === activeCategory)
    : featured;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5ECDE]">
        <Navbar />

        {/* ── Hero ── */}
        <HeroSection t={t} tMap={tMap} tCat={tCat} />

        {/* ── Category Filter ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-8 px-4 bg-white border-b border-slate-100"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-700 mb-4 text-center">
              {t('categories_title')}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-10 justify-start md:justify-center scrollbar-none pt-10">
              {CATEGORIES.map(({ key, Icon }, i) => {
                const isActive = activeCategory === key;
                return (
                  <motion.div
                    key={key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <MagnetizeCategory
                      categoryKey={key}
                      isActive={isActive}
                      onClick={() => setActiveCategory(isActive ? null : key)}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-semibold whitespace-nowrap">{tCat(key)}</span>
                    </MagnetizeCategory>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ── Featured Deals ── */}
        <section className="py-14 px-4 bg-[#F5ECDE]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-end justify-between mb-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t('featured_deals_title')}
                </h2>
                <p className="text-slate-500 mt-1.5 text-sm">{t('featured_deals_subtitle')}</p>
              </div>
              <a
                href="browse"
                className="hidden md:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <TrendingDown className="w-4 h-4" />
                {t('browse_deals')} →
              </a>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-medium">{t('no_results_category')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((item, i) => (
                  <ListingCard key={item.id} listing={item} view="grid" index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Stats Banner ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="bg-[#FAD6CC] py-16 px-4"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {[
              { end: 1200, suffix: '+', label: t('stats_meals_saved'), Icon: UtensilsCrossed },
              { end: 50,   suffix: '+', label: t('stats_suppliers'),   Icon: Store },
              { end: 30,   suffix: '%', label: t('stats_avg_discount'), Icon: TrendingDown },
            ].map(({ end, suffix, label, Icon }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-[#E8594F]/15 rounded-2xl flex items-center justify-center mb-1">
                  <Icon className="w-6 h-6 text-[#E8594F]" />
                </div>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1E1E]">
                  <CountUp end={end} suffix={suffix} />
                </p>
                <p className="text-[#4B5563] text-sm font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Footer />
      </div>
    </PageTransition>
  );
}
