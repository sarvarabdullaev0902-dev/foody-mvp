'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ImagePlus, Clock, Tag, ChevronLeft, MapPin } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useListings, AREA_COORDS, type AddListingForm } from '@/lib/listings-context';
import Toast from '@/components/ui/Toast';
import { useToast } from '@/components/ui/useToast';

const CATEGORIES = ['restaurant', 'bakery', 'supermarket', 'pharmacy', 'cafe', 'store', 'other'] as const;
const AREAS = Object.keys(AREA_COORDS);

export default function AddListingPage() {
  const t = useTranslations('supplier_dashboard.add_listing');
  const tCat = useTranslations('supplier.categories');
  const tCommon = useTranslations('common');

  const router = useRouter();
  const { addListing } = useListings();
  const { visible: toastVisible, show: showToast } = useToast();

  const [form, setForm] = useState<AddListingForm>({
    title: '',
    description: '',
    category: '',
    originalPrice: '',
    discountedPrice: '',
    quantity: '',
    expiryDate: '',
    pickupStart: '',
    pickupEnd: '',
    area: 'Yunusobod',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AddListingForm, string>>>({});

  const set =
    (key: keyof AddListingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const orig = Number(form.originalPrice) || 0;
  const disc = Number(form.discountedPrice) || 0;
  const discountPct =
    orig > 0 && disc > 0 && disc < orig ? Math.round((1 - disc / orig) * 100) : 0;

  function validate(): boolean {
    const newErrors: Partial<Record<keyof AddListingForm, string>> = {};
    if (!form.title.trim()) newErrors.title = t('error_required');
    if (!form.category) newErrors.category = t('error_required');
    if (!form.originalPrice || orig <= 0) newErrors.originalPrice = t('error_enter_price');
    if (!form.discountedPrice || disc <= 0) newErrors.discountedPrice = t('error_enter_price');
    if (disc >= orig) newErrors.discountedPrice = t('error_discount_price');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    addListing(form, t('supplier_name_default'));
    showToast();
    setTimeout(() => router.push('/supplier/dashboard/listings'), 1400);
  }

  const inputCls = (field?: keyof AddListingForm) =>
    `w-full px-3.5 py-2.5 rounded-xl border ${
      field && errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
    } text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition`;
  const labelCls = 'block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide';

  return (
    <div className="max-w-5xl space-y-6">
      <Toast message={t('toast_success')} visible={toastVisible} />

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

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Basic info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
              <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-[#E8594F]">
                {t('section_basic')}
              </h2>

              <div>
                <label className={labelCls}>{t('product_title')}</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={set('title')}
                  placeholder={t('title_placeholder')}
                  className={inputCls('title')}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className={labelCls}>{t('description')}</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder={t('desc_placeholder')}
                  rows={3}
                  className={`${inputCls()} resize-none`}
                />
              </div>

              <div>
                <label className={labelCls}>{t('category')}</label>
                <select value={form.category} onChange={set('category')} className={inputCls('category')}>
                  <option value="">{t('category')}</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{tCat(c)}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>

              {/* Area picker */}
              <div>
                <label className={labelCls}>
                  <MapPin className="w-3.5 h-3.5 inline mr-1" />
                  {t('area_label')}
                </label>
                <select value={form.area} onChange={set('area')} className={inputCls()}>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Photo upload */}
              <div>
                <label className={labelCls}>{t('photo')}</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-[#E8594F] hover:bg-[#FAD6CC]/20 transition-colors cursor-pointer">
                  <ImagePlus className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">{t('photo_hint')}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
              <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-[#E8594F]">
                {t('section_pricing')}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{t('original_price')} ({tCommon('currency')})</label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={set('originalPrice')}
                    placeholder="45 000"
                    className={inputCls('originalPrice')}
                  />
                  {errors.originalPrice && (
                    <p className="text-xs text-red-500 mt-1">{errors.originalPrice}</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>{t('discounted_price')} ({tCommon('currency')})</label>
                  <input
                    type="number"
                    value={form.discountedPrice}
                    onChange={set('discountedPrice')}
                    placeholder="22 500"
                    className={inputCls('discountedPrice')}
                  />
                  {errors.discountedPrice && (
                    <p className="text-xs text-red-500 mt-1">{errors.discountedPrice}</p>
                  )}
                </div>
              </div>

              {discountPct > 0 && (
                <div className="flex items-center gap-2 bg-[#FAD6CC] border border-[#F9C0B8] rounded-xl px-4 py-2.5">
                  <Tag className="w-4 h-4 text-[#E8594F]" />
                  <span className="text-sm font-semibold text-[#E8594F]">
                    {t('discount_pct')}: <span className="text-lg">-{discountPct}%</span>
                  </span>
                </div>
              )}

              <div>
                <label className={labelCls}>{t('quantity')}</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={set('quantity')}
                  placeholder="10"
                  min="1"
                  className={inputCls()}
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
              <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-[#E8594F]">
                {t('section_schedule')}
              </h2>

              <div>
                <label className={labelCls}>{t('expiry_date')}</label>
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={set('expiryDate')}
                  className={inputCls()}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {t('pickup_start')}
                  </label>
                  <input
                    type="time"
                    value={form.pickupStart}
                    onChange={set('pickupStart')}
                    className={inputCls()}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {t('pickup_end')}
                  </label>
                  <input
                    type="time"
                    value={form.pickupEnd}
                    onChange={set('pickupEnd')}
                    className={inputCls()}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#E8594F] hover:bg-[#D14840] disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-colors shadow-sm text-sm"
            >
              {submitting ? t('submitting') : t('publish')}
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
                    <span className="absolute top-3 left-3 bg-[#E8594F] text-white text-xs font-extrabold px-2 py-1 rounded-full">
                      -{discountPct}%
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="font-bold text-slate-800 text-sm leading-snug">
                    {form.title || '—'}
                  </p>
                  {form.area && (
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {form.area}
                    </p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-[#E8594F]">
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
      </form>
    </div>
  );
}
