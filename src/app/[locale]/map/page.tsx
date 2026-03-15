'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  cafe: { bg: 'bg-purple-500', border: 'border-purple-600', text: 'text-purple-700', icon: '☕' },
  bakery: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-700', icon: '🥐' },
  restaurant: { bg: 'bg-red-500', border: 'border-red-600', text: 'text-red-700', icon: '🍽️' },
  supermarket: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-blue-700', icon: '🛒' },
  pharmacy: { bg: 'bg-green-500', border: 'border-green-600', text: 'text-green-700', icon: '💊' },
};

const MAP_SUPPLIERS = [
  { id: 1, name: 'Coffee House',   category: 'cafe',        deals: 6,  distance: '0.3', area: 'Yunusobod',     x: 50, y: 44 },
  { id: 2, name: 'Salom Bakery',   category: 'bakery',      deals: 5,  distance: '0.5', area: 'Yashnobod',     x: 33, y: 37 },
  { id: 3, name: 'La Piazza',      category: 'restaurant',  deals: 3,  distance: '0.8', area: 'Mirzo Ulugbek', x: 63, y: 55 },
  { id: 4, name: 'Smart Market',   category: 'supermarket', deals: 9,  distance: '0.9', area: 'Shayxontohur',  x: 26, y: 62 },
  { id: 5, name: 'Green Market',   category: 'supermarket', deals: 8,  distance: '1.2', area: 'Yakkasaroy',    x: 72, y: 32 },
  { id: 6, name: 'Magnit UZ',      category: 'supermarket', deals: 12, distance: '1.5', area: 'Uchtepa',       x: 57, y: 72 },
  { id: 7, name: 'Tandoor House',  category: 'restaurant',  deals: 2,  distance: '1.8', area: 'Olmazor',       x: 18, y: 48 },
  { id: 8, name: 'Shifo Dorixona', category: 'pharmacy',    deals: 4,  distance: '2.1', area: 'Bektemir',      x: 80, y: 64 },
];

type Supplier = typeof MAP_SUPPLIERS[0];

export default function MapPage() {
  const t = useTranslations('map');
  const tCat = useTranslations('supplier.categories');

  const [selectedPin, setSelectedPin] = useState<Supplier | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MAP_SUPPLIERS.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q);
  });

  const handlePinClick = (s: Supplier) => {
    setSelectedPin((prev) => (prev?.id === s.id ? null : s));
  };

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
          {/* OpenStreetMap iframe — pointer-events none so pins stay clickable */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=69.15%2C41.25%2C69.35%2C41.35&layer=mapnik"
            className="absolute inset-0 w-full h-full border-0"
            style={{ pointerEvents: 'none' }}
            title="Tashkent map"
          />

          {/* Hint when nothing selected */}
          {!selectedPin && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-gray-500 shadow border border-gray-200">
              {t('click_pin_hint')}
            </div>
          )}

          {/* Pins */}
          {MAP_SUPPLIERS.map((s) => {
            const colors = CATEGORY_COLORS[s.category] ?? CATEGORY_COLORS.cafe;
            const isSelected = selectedPin?.id === s.id;
            const isFiltered = filtered.some((f) => f.id === s.id);
            return (
              <button
                key={s.id}
                onClick={() => handlePinClick(s)}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-full transition-all duration-200 group ${
                  isFiltered ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {/* Pin body */}
                <div
                  className={`relative flex flex-col items-center ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  } transition-transform duration-150`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-base shadow-lg border-2 border-white ${colors.bg} ${
                      isSelected ? 'ring-2 ring-offset-1 ring-white shadow-xl' : ''
                    }`}
                  >
                    {colors.icon}
                  </div>
                  {/* Deal count badge */}
                  <div className="absolute -top-1 -right-1 bg-[#E8594F] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {s.deals}
                  </div>
                  {/* Pin tail */}
                  <div className={`w-2 h-2 ${colors.bg} rotate-45 -mt-1 shadow`} />
                </div>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg px-2 py-1 text-xs font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-100">
                  {s.name}
                </div>
              </button>
            );
          })}

          {/* Popup card */}
          {selectedPin && (() => {
            const colors = CATEGORY_COLORS[selectedPin.category] ?? CATEGORY_COLORS.cafe;
            const popupX = selectedPin.x > 70 ? 'right-4' : selectedPin.x < 30 ? 'left-4' : 'left-1/2 -translate-x-1/2';
            const popupY = selectedPin.y > 60 ? 'bottom-16' : 'top-16';
            return (
              <div
                className={`absolute ${popupX} ${popupY} z-20 bg-white rounded-2xl shadow-2xl border border-gray-100 w-64 overflow-hidden`}
              >
                <div className={`${colors.bg} px-4 py-3 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{colors.icon}</span>
                      <span className="font-bold text-sm">{selectedPin.name}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPin(null)}
                      className="text-white/80 hover:text-white text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">{selectedPin.area}</p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{tCat(selectedPin.category as Parameters<typeof tCat>[0])}</span>
                    <span className={`font-semibold ${colors.text}`}>
                      {t('active_deals', { count: selectedPin.deals })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>📍</span>
                    <span>{t('km_away', { km: selectedPin.distance })}</span>
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
              const isSelected = selectedPin?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handlePinClick(s)}
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
            const isSelected = selectedPin?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handlePinClick(s)}
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
