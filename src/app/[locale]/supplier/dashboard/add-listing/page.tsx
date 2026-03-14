'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ImagePlus, Clock, Tag, ChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const CATEGORIES = ['restaurant', 'bakery', 'supermarket', 'pharmacy', 'cafe', 'store', 'other'] as const;

export default function AddListingPage() {
  const t = useTranslations('supplier_dashboard.add_listing');
  const tCat = useTranslations('supplier.categories');
  const tCommon = useTranslations('common');

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    originalPrice: '',
    discountedPrice: '',
    quantity: '',
    expiryDate: '',
    pickupStart: '',
    pickupEnd: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const orig = Number(form.originalPrice) || 0;
  const disc = Number(form.discountedPrice) || 0;
  const discountPct = orig > 0 && disc > 0 && disc < orig
    ? Math.round((1 - disc / orig) * 100)
    : 0;

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition';
  const labelCls = 'block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide';

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/supplier/dashboard"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">

          {/* Basic info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-emerald-600">
              {t('section_basic')}
            </h2>

            <div>
              <label className={labelCls}>{t('product_title')}</label>
              <input
                type="text"
                value={form.title}
                onChange={set('title')}
                placeholder="e.g. Assorted Pastry Box"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>{t('description')}</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the product..."
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <label className={labelCls}>{t('category')}</label>
              <select value={form.category} onChange={set('category')} className={inputCls}>
                <option value="">{t('category')}</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{tCat(c)}</option>
                ))}
              </select>
            </div>

            {/* Photo upload */}
            <div>
              <label className={labelCls}>{t('photo')}</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors cursor-pointer">
                <ImagePlus className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">{t('photo_hint')}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-emerald-600">
              {t('section_pricing')}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>{t('original_price')} ({tCommon('currency')})</label>
                <input type="number" value={form.originalPrice} onChange={set('originalPrice')} placeholder="45 000" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('discounted_price')} ({tCommon('currency')})</label>
                <input type="number" value={form.discountedPrice} onChange={set('discountedPrice')} placeholder="22 500" className={inputCls} />
              </div>
            </div>

            {discountPct > 0 && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  {t('discount_pct')}: <span className="text-lg">-{discountPct}%</span>
                </span>
              </div>
            )}

            <div>
              <label className={labelCls}>{t('quantity')}</label>
              <input type="number" value={form.quantity} onChange={set('quantity')} placeholder="10" min="1" className={inputCls} />
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-emerald-600">
              {t('section_schedule')}
            </h2>

            <div>
              <label className={labelCls}>{t('expiry_date')}</label>
              <input type="date" value={form.expiryDate} onChange={set('expiryDate')} className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  {t('pickup_start')}
                </label>
                <input type="time" value={form.pickupStart} onChange={set('pickupStart')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  {t('pickup_end')}
                </label>
                <input type="time" value={form.pickupEnd} onChange={set('pickupEnd')} className={inputCls} />
              </div>
            </div>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-sm text-sm">
            {t('publish')}
          </button>
        </div>

        {/* Preview card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {t('preview_title')}
            </p>
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
              <div className="relative bg-slate-100 h-40 flex items-center justify-center">
                <ImagePlus className="w-10 h-10 text-slate-300" />
                {discountPct > 0 && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-extrabold px-2 py-1 rounded-full">
                    -{discountPct}%
                  </span>
                )}
              </div>
              <div className="p-4 space-y-1.5">
                <p className="font-bold text-slate-800 text-sm leading-snug">
                  {form.title || '—'}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-emerald-600">
                    {disc > 0 ? disc.toLocaleString() : '—'} {tCommon('currency')}
                  </span>
                  {orig > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      {orig.toLocaleString()}
                    </span>
                  )}
                </div>
                {(form.pickupStart || form.pickupEnd) && (
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {form.pickupStart}–{form.pickupEnd}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
