'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Croissant, ShoppingCart, Pill, Coffee, Store, MapPin, TrendingDown, Leaf } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListingCard from '@/components/listings/ListingCard';
import PageTransition from '@/components/ui/PageTransition';
import { DEMO_LISTINGS } from '@/lib/demo-listings';

const CATEGORIES = [
  { key: 'restaurant', Icon: UtensilsCrossed },
  { key: 'bakery',     Icon: Croissant },
  { key: 'supermarket',Icon: ShoppingCart },
  { key: 'pharmacy',   Icon: Pill },
  { key: 'cafe',       Icon: Coffee },
  { key: 'store',      Icon: Store },
] as const;

const FEATURED = DEMO_LISTINGS.slice(0, 6);

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

  const listings = activeCategory
    ? FEATURED.filter((l) => l.category === activeCategory)
    : FEATURED;

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative text-white overflow-hidden">
          {/* Animated gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #0d9488 40%, #047857 80%, #059669 100%)',
              backgroundSize: '300% 300%',
              animation: 'heroGradient 8s ease infinite',
            }}
          />
          {/* Subtle radial overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          {/* Floating decoration circles */}
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-teal-300/10 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-emerald-50 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase"
            >
              <Leaf className="w-3.5 h-3.5" />
              {t('tagline_badge')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight"
            >
              {t('hero_title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero_subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="browse"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-emerald-700 font-bold px-8 py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-shadow"
              >
                {t('browse_deals')} →
              </motion.a>
              <motion.a
                href="/map"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-full text-base flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {tMap('title')}
              </motion.a>
            </motion.div>
          </div>

          <style>{`
            @keyframes heroGradient {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </section>

        {/* ── Category Filter ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-10 px-4 bg-white border-b border-slate-100"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-700 mb-5 text-center">
              {t('categories_title')}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-1 justify-start md:justify-center scrollbar-none">
              {CATEGORIES.map(({ key, Icon }, i) => {
                const isActive = activeCategory === key;
                return (
                  <motion.button
                    key={key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveCategory(isActive ? null : key)}
                    className={`flex flex-col items-center gap-2 min-w-[88px] px-4 py-3 rounded-2xl border-2 transition-all shrink-0 ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-semibold whitespace-nowrap">{tCat(key)}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ── Featured Deals ── */}
        <section className="py-14 px-4 bg-slate-50">
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

            {listings.length === 0 ? (
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
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-4"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {[
              { value: '1,200+', label: t('stats_meals_saved'), Icon: UtensilsCrossed },
              { value: '50+',    label: t('stats_suppliers'),   Icon: Store },
              { value: '30%',    label: t('stats_avg_discount'), Icon: TrendingDown },
            ].map(({ value, label, Icon }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-1">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight">{value}</p>
                <p className="text-emerald-200 text-sm font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Footer />
      </div>
    </PageTransition>
  );
}
