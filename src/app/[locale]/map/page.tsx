'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import type { MapSupplier } from '@/components/map/LeafletMap';

const LeafletMap = dynamic(() => import('@/components/map/LeafletMap'), { ssr: false });

const CATEGORY_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  cafe:        { bg: 'bg-purple-500', text: 'text-purple-700', icon: '☕' },
  bakery:      { bg: 'bg-yellow-500', text: 'text-yellow-700', icon: '🥐' },
  restaurant:  { bg: 'bg-red-500',    text: 'text-red-700',    icon: '🍽️' },
  supermarket: { bg: 'bg-blue-500',   text: 'text-blue-700',   icon: '🛒' },
  pharmacy:    { bg: 'bg-green-500',  text: 'text-green-700',  icon: '💊' },
};

const MAP_SUPPLIERS: MapSupplier[] = [
  { id: 1, name: 'Coffee House',   category: 'cafe',        deals: 6,  distance: '0.3', area: 'Yunusobod',     lat: 41.340, lng: 69.305 },
  { id: 2, name: 'Salom Bakery',   category: 'bakery',      deals: 5,  distance: '0.5', area: 'Yashnobod',     lat: 41.270, lng: 69.268 },
  { id: 3, name: 'La Piazza',      category: 'restaurant',  deals: 3,  distance: '0.8', area: 'Mirzo Ulugbek', lat: 41.320, lng: 69.330 },
  { id: 4, name: 'Smart Market',   category: 'supermarket', deals: 9,  distance: '0.9', area: 'Shayxontohur',  lat: 41.305, lng: 69.215 },
  { id: 5, name: 'Green Market',   category: 'supermarket', deals: 8,  distance: '1.2', area: 'Yakkasaroy',    lat: 41.278, lng: 69.295 },
  { id: 6, name: 'Magnit UZ',      category: 'supermarket', deals: 12, distance: '1.5', area: 'Uchtepa',       lat: 41.265, lng: 69.258 },
  { id: 7, name: 'Tandoor House',  category: 'restaurant',  deals: 2,  distance: '1.8', area: 'Olmazor',       lat: 41.322, lng: 69.218 },
  { id: 8, name: 'Shifo Dorixona', category: 'pharmacy',    deals: 4,  distance: '2.1', area: 'Bektemir',      lat: 41.258, lng: 69.348 },
];

export default function MapPage() {
  const t = useTranslations('map');
  const tCat = useTranslations('supplier.categories');

  const [selected, setSelected] = useState<MapSupplier | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MAP_SUPPLIERS.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q);
  });

  const filteredIds = new Set(filtered.map((s) => s.id));

  function toggleSelect(s: MapSupplier) {
    setSelected((prev) => (prev?.id === s.id ? null : s));
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Search bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent"
            />
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">
            {t('supplier_count', { current: filtered.length, total: MAP_SUPPLIERS.length })}
          </span>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 130px)' }}>

        {/* Map area */}
        <div className="relative flex-1 overflow-hidden">
          <LeafletMap
            suppliers={MAP_SUPPLIERS}
            filteredIds={filteredIds}
            selected={selected}
            onSelect={toggleSelect}
          />

          {/* Hint when nothing selected */}
          {!selected && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-gray-500 shadow border border-gray-200 pointer-events-none">
              {t('click_pin_hint')}
            </div>
          )}

          {/* Popup card */}
          {selected && (() => {
            const colors = CATEGORY_COLORS[selected.category] ?? CATEGORY_COLORS.cafe;
            return (
              <div className="absolute top-4 left-4 z-[1000] bg-white rounded-2xl shadow-2xl border border-gray-100 w-64 overflow-hidden">
                <div className={`${colors.bg} px-4 py-3 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{colors.icon}</span>
                      <span className="font-bold text-sm">{selected.name}</span>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-white/80 hover:text-white text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">{selected.area}</p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{tCat(selected.category as Parameters<typeof tCat>[0])}</span>
                    <span className={`font-semibold ${colors.text}`}>
                      {t('active_deals', { count: selected.deals })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>📍</span>
                    <span>{t('km_away', { km: selected.distance })}</span>
                  </div>
                  <a
                    href="browse"
                    className="block w-full mt-1 bg-[#E8594F] hover:bg-[#D14840] text-white text-sm font-semibold text-center py-2 rounded-xl transition-colors"
                  >
                    {t('view_deals')} →
                  </a>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Sidebar — desktop */}
        <div className="hidden md:flex flex-col w-72 border-l border-gray-200 bg-white overflow-y-auto">
          <div className="px-4 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm">{t('nearby_suppliers')}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{t('suppliers_found', { count: filtered.length })}</p>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((s) => {
              const colors = CATEGORY_COLORS[s.category] ?? CATEGORY_COLORS.cafe;
              const isSelected = selected?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSelect(s)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-gray-50 ${
                    isSelected ? 'bg-[#FAD6CC]' : ''
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0 ${colors.bg}`}>
                    {colors.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.area}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                    <span className="text-xs font-bold text-[#E8594F] bg-[#FAD6CC] px-2 py-0.5 rounded-full">
                      {t('active_deals', { count: s.deals })}
                    </span>
                    <span className="text-[10px] text-gray-400">{t('km_away', { km: s.distance })}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom sheet — mobile */}
      <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-sm">{t('nearby_suppliers')}</h2>
          <span className="text-xs text-gray-400">{t('suppliers_found', { count: filtered.length })}</span>
        </div>
        <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-none">
          {filtered.map((s) => {
            const colors = CATEGORY_COLORS[s.category] ?? CATEGORY_COLORS.cafe;
            const isSelected = selected?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => toggleSelect(s)}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all min-w-[80px] ${
                  isSelected
                    ? 'border-[#E8594F] bg-[#FAD6CC]'
                    : 'border-gray-200 bg-white hover:border-[#F9C0B8]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-base ${colors.bg}`}>
                  {colors.icon}
                </div>
                <p className="text-[10px] font-semibold text-gray-700 text-center leading-tight max-w-[72px] truncate">
                  {s.name}
                </p>
                <span className="text-[9px] font-bold text-[#E8594F] bg-[#FAD6CC] px-1.5 py-0.5 rounded-full">
                  {s.deals}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
