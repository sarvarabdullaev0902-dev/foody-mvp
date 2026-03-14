'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Pencil, Pause, Play, Trash2, Plus, Package } from 'lucide-react';

type Status = 'active' | 'paused' | 'expired' | 'sold_out';

const DEMO_LISTINGS = [
  { id: '1', title: 'Assorted Pastry Box', category: 'bakery', price: 22_500, originalPrice: 45_000, discount: 50, qty: 8, status: 'active' as Status, created: '2026-03-10' },
  { id: '2', title: 'Yogurt Variety Pack', category: 'supermarket', price: 14_000, originalPrice: 28_000, discount: 50, qty: 3, status: 'active' as Status, created: '2026-03-11' },
  { id: '3', title: 'Bread Bundle', category: 'bakery', price: 9_000, originalPrice: 18_000, discount: 50, qty: 0, status: 'sold_out' as Status, created: '2026-03-09' },
  { id: '4', title: 'Fresh Salad Mix', category: 'restaurant', price: 11_000, originalPrice: 22_000, discount: 50, qty: 5, status: 'paused' as Status, created: '2026-03-08' },
  { id: '5', title: 'Vitamin C Bundle', category: 'pharmacy', price: 33_000, originalPrice: 55_000, discount: 40, qty: 2, status: 'active' as Status, created: '2026-03-12' },
  { id: '6', title: 'Sushi Platter', category: 'restaurant', price: 45_000, originalPrice: 90_000, discount: 50, qty: 0, status: 'expired' as Status, created: '2026-03-07' },
];

const STATUS_CLS: Record<Status, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-slate-100 text-slate-600',
  expired: 'bg-red-100 text-red-600',
  sold_out: 'bg-orange-100 text-orange-600',
};

type Tab = 'all' | 'active' | 'paused' | 'expired';
const TABS: Tab[] = ['all', 'active', 'paused', 'expired'];

export default function ListingsPage() {
  const t = useTranslations('supplier_dashboard.listings');
  const tStatus = useTranslations('supplier_dashboard.status');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [listings, setListings] = useState(DEMO_LISTINGS);

  const filtered = activeTab === 'all'
    ? listings
    : listings.filter(l => l.status === activeTab || (activeTab === 'expired' && l.status === 'sold_out'));

  const togglePause = (id: string) =>
    setListings(prev => prev.map(l =>
      l.id === id
        ? { ...l, status: (l.status === 'active' ? 'paused' : 'active') as Status }
        : l
    ));

  const remove = (id: string) =>
    setListings(prev => prev.filter(l => l.id !== id));

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
        <Link
          href="/supplier/dashboard/add-listing"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {t('add_first')}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-1.5 w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {t(tab as 'all')}
          </button>
        ))}
      </div>

      {/* Listings grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 py-20 text-center">
          <Package className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">{t('empty')}</p>
          <Link
            href="/supplier/dashboard/add-listing"
            className="inline-block mt-4 text-sm text-emerald-600 font-semibold hover:underline"
          >
            + {t('add_first')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(listing => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center gap-4"
            >
              {/* Discount badge */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <span className="text-xs font-extrabold text-emerald-600">-{listing.discount}%</span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-slate-800 truncate">{listing.title}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CLS[listing.status]}`}>
                    {tStatus(listing.status as 'active')}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-600">
                    {listing.price.toLocaleString()} {tCommon('currency')}
                  </span>
                  <span className="line-through text-slate-300">
                    {listing.originalPrice.toLocaleString()}
                  </span>
                  <span>· {t('quantity')}: {listing.qty}</span>
                  <span className="hidden sm:inline">· {t('created')}: {listing.created}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="shrink-0 flex items-center gap-1">
                <button
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  title={t('edit')}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => togglePause(listing.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    listing.status === 'active'
                      ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                      : 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                  title={listing.status === 'active' ? t('pause') : t('resume')}
                >
                  {listing.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => remove(listing.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title={t('delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
