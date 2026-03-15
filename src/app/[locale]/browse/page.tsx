'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ListingCard from '@/components/listings/ListingCard';
import PageTransition from '@/components/ui/PageTransition';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { useListings } from '@/lib/listings-context';

const CATEGORIES = [
  { key: 'restaurant', icon: '🍽️' },
  { key: 'bakery', icon: '🥐' },
  { key: 'supermarket', icon: '🛒' },
  { key: 'pharmacy', icon: '💊' },
  { key: 'cafe', icon: '☕' },
  { key: 'store', icon: '🏪' },
] as const;

type SortKey = 'newest' | 'cheapest' | 'expiring' | 'discount';
type ViewMode = 'grid' | 'list';

const PAGE_SIZE = 6;
const MAX_PRICE = 150000;

export default function BrowsePage() {
  const t = useTranslations('browse');
  const tCat = useTranslations('supplier.categories');
  const tCommon = useTranslations('common');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState<SortKey>('newest');
  const [view, setView] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { listings: allListings } = useListings();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    // Only show active listings; new listings come first (they're prepended in context)
    let result = allListings.filter((l) => l.status !== 'paused');

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) => l.title.toLowerCase().includes(q) || l.supplier.toLowerCase().includes(q)
      );
    }
    if (category) result = result.filter((l) => l.category === category);
    result = result.filter(
      (l) => l.discountedPrice >= minPrice && l.discountedPrice <= maxPrice
    );

    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => b.id - a.id);
        break;
      case 'cheapest':
        result = result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'expiring':
        result = result.sort((a, b) => a.expiresInHours - b.expiresInHours);
        break;
      case 'discount':
        result = result.sort((a, b) => b.discount - a.discount);
        break;
    }

    return result;
  }, [search, category, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage() {
    setPage(1);
  }

  function clearFilters() {
    setSearch('');
    setCategory('');
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    setSortBy('newest');
    setPage(1);
  }

  const hasActiveFilters = search || category || minPrice > 0 || maxPrice < MAX_PRICE;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5ECDE]">
        <Navbar />

        {/* Page header */}
        <div className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-slate-900"
            >
              {t('title')}
            </motion.h1>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="relative mt-4"
            >
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                placeholder={t('search_placeholder')}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              />
              {search && (
                <button
                  onClick={() => { setSearch(''); resetPage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Filters row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-col gap-3 mb-6"
          >
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-3">
              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {t('category')}
                </label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); resetPage(); }}
                  className="w-full sm:min-w-[160px] sm:w-auto px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">{t('all_categories')}</option>
                  {CATEGORIES.map(({ key, icon }) => (
                    <option key={key} value={key}>
                      {icon} {tCat(key)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {t('price_range')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice || ''}
                    onChange={(e) => { setMinPrice(Number(e.target.value) || 0); resetPage(); }}
                    placeholder={t('min_price')}
                    min={0}
                    max={maxPrice}
                    className="w-24 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <span className="text-slate-400 text-sm">—</span>
                  <input
                    type="number"
                    value={maxPrice === MAX_PRICE ? '' : maxPrice}
                    onChange={(e) => { setMaxPrice(Number(e.target.value) || MAX_PRICE); resetPage(); }}
                    placeholder={t('max_price')}
                    min={minPrice}
                    className="w-24 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <span className="text-xs text-slate-400 font-medium">{tCommon('currency')}</span>
                </div>
              </div>

              {/* Sort by */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" />
                  {t('sort_by')}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value as SortKey); resetPage(); }}
                  className="w-full sm:min-w-[160px] sm:w-auto px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="newest">{t('sort_newest')}</option>
                  <option value="cheapest">{t('sort_cheapest')}</option>
                  <option value="expiring">{t('sort_expiring')}</option>
                  <option value="discount">{t('sort_discount')}</option>
                </select>
              </div>
            </div>

            {/* Actions row */}
            <div className="flex items-center justify-end gap-3">
              {/* Clear filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 rounded-xl transition-colors bg-white flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  {t('clear_filters')}
                </motion.button>
              )}

              {/* Grid / List toggle */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  title={t('grid_view')}
                  className={`px-3 py-2 transition-colors ${view === 'grid'
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  title={t('list_view')}
                  className={`px-3 py-2 transition-colors ${view === 'list'
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-slate-500 mb-4">
            {t('showing', { count: filtered.length })}
          </p>

          {/* Listings */}
          {loading ? (
            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
              {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-semibold text-slate-500 mb-2">{t('no_results')}</p>
              <button
                onClick={clearFilters}
                className="mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
              >
                {t('clear_filters')}
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((item, i) => (
                <div key={item.id} className="relative">
                  {item.isNew && (
                    <span className="absolute top-3 left-3 z-20 bg-[#E8594F] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow pointer-events-none">
                      ✨ Yangi!
                    </span>
                  )}
                  <ListingCard listing={item} view="grid" index={i} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {paginated.map((item, i) => (
                <div key={item.id} className="relative">
                  {item.isNew && (
                    <span className="absolute top-3 left-3 z-20 bg-[#E8594F] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow pointer-events-none">
                      ✨ Yangi!
                    </span>
                  )}
                  <ListingCard listing={item} view="list" index={i} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← {t('prev')}
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${n === page
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600'
                      }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t('next')} →
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
