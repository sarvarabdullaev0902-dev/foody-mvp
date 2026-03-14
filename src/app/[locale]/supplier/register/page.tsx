'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Leaf, Eye, EyeOff, Store } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';

const CATEGORIES = [
  { value: 'restaurant', label: 'Restoran' },
  { value: 'bakery', label: 'Nonvoyxona' },
  { value: 'supermarket', label: 'Supermarket' },
  { value: 'pharmacy', label: 'Dorixona' },
  { value: 'cafe', label: 'Kafe' },
  { value: 'store', label: "Do'kon" },
  { value: 'other', label: 'Boshqa' },
];

export default function SupplierRegisterPage() {
  const t = useTranslations('supplier_auth');
  const tCat = useTranslations('supplier.categories');
  const { registerSupplier } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    businessName: '',
    category: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    hoursFrom: '09:00',
    hoursTo: '21:00',
    password: '',
    confirm: '',
  });

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>Foody</span>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <Store className="w-5 h-5 text-emerald-400" />
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-white">{t('register_title')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('register_subtitle')}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8">
          <form onSubmit={(e) => { e.preventDefault(); registerSupplier(form.businessName); router.push('/supplier/dashboard'); }} className="flex flex-col gap-4">
            {/* Business info section */}
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Biznes ma&apos;lumotlari
            </div>

            <input
              type="text"
              placeholder={t('business_name')}
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className={inputCls}
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition appearance-none"
            >
              <option value="" disabled className="bg-slate-800 text-slate-400">
                {t('select_category')}
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-slate-800 text-white">
                  {tCat(cat.value as 'restaurant')}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder={t('address')}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={inputCls}
            />

            {/* Business hours */}
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2 block">{t('business_hours')}</label>
              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={form.hoursFrom}
                  onChange={(e) => setForm({ ...form, hoursFrom: e.target.value })}
                  className="flex-1 px-3 py-3 rounded-xl border border-white/10 bg-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition [color-scheme:dark]"
                />
                <span className="text-slate-400 text-sm">—</span>
                <input
                  type="time"
                  value={form.hoursTo}
                  onChange={(e) => setForm({ ...form, hoursTo: e.target.value })}
                  className="flex-1 px-3 py-3 rounded-xl border border-white/10 bg-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Contact info section */}
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-2 mb-1">
              Aloqa ma&apos;lumotlari
            </div>

            <input
              type="text"
              placeholder={t('owner_name')}
              value={form.ownerName}
              onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
              className={inputCls}
            />
            <input
              type="tel"
              placeholder={t('phone')}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputCls}
            />
            <input
              type="email"
              placeholder={t('email')}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls}
            />

            {/* Password section */}
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-2 mb-1">
              Xavfsizlik
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputCls} pr-11`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder={t('confirm_password')}
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className={`${inputCls} pr-11`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-900/30 mt-2"
            >
              {t('register_btn')}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            {t('have_account')}{' '}
            <Link href="/supplier/login" className="text-emerald-400 font-semibold hover:underline">
              {t('login_link')}
            </Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            ← Asosiy saytga qaytish
          </Link>
        </p>
      </div>
    </div>
  );
}
