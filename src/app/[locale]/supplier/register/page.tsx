'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Eye, EyeOff, Store } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import AuthCard from '@/components/ui/auth-card';

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
    'w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition-colors';

  return (
    <AuthCard maxWidth="max-w-lg">
      {/* Biznes badge */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FAD6CC]/80 border border-[#F9C0B8]">
            <Store className="w-5 h-5 text-[#E8594F]" />
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E8594F] text-white text-xs font-extrabold tracking-widest uppercase shadow-sm">
            BIZNES
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E1E1E]">{t('register_title')}</h1>
          <p className="mt-1 text-sm text-[#4B5563]">{t('register_subtitle')}</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerSupplier(form.businessName);
          router.push('/supplier/dashboard');
        }}
        className="flex flex-col gap-4"
      >
        {/* Business info */}
        <div className="text-xs font-semibold text-[#E8594F] uppercase tracking-wider mb-1">
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
          className="w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition appearance-none"
        >
          <option value="" disabled>
            {t('select_category')}
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
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
          <label className="text-xs font-medium text-slate-500 mb-2 block">{t('business_hours')}</label>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={form.hoursFrom}
              onChange={(e) => setForm({ ...form, hoursFrom: e.target.value })}
              className="flex-1 px-3 py-3 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] transition"
            />
            <span className="text-slate-400 text-sm">—</span>
            <input
              type="time"
              value={form.hoursTo}
              onChange={(e) => setForm({ ...form, hoursTo: e.target.value })}
              className="flex-1 px-3 py-3 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] transition"
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="text-xs font-semibold text-[#E8594F] uppercase tracking-wider mt-2 mb-1">
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

        {/* Security */}
        <div className="text-xs font-semibold text-[#E8594F] uppercase tracking-wider mt-2 mb-1">
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#E8594F] hover:bg-[#D14840] active:bg-[#C03C35] text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-[#E8594F]/25 hover:shadow-lg hover:shadow-[#E8594F]/30 hover:-translate-y-0.5 mt-2"
        >
          {t('register_btn')}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        {t('have_account')}{' '}
        <Link href="/supplier/login" className="text-[#E8594F] font-semibold hover:underline">
          {t('login_link')}
        </Link>
      </p>

      <p className="text-center mt-4">
        <Link href="/" className="text-sm text-slate-400 hover:text-[#E8594F] transition-colors">
          ← Asosiy saytga qaytish
        </Link>
      </p>
    </AuthCard>
  );
}
