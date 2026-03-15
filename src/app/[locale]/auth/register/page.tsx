'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import AuthCard from '@/components/ui/auth-card';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition';

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">{t('register_title')}</h1>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={t('full_name')}
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className={inputCls}
          autoComplete="name"
        />
        <input
          type="tel"
          placeholder={t('phone')}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputCls}
          autoComplete="tel"
        />
        <input
          type="email"
          placeholder={t('email')}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
          autoComplete="email"
        />
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
          className="w-full bg-[#E8594F] hover:bg-[#D14840] active:bg-[#C03C35] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-[#E8594F]/25 hover:shadow-lg hover:shadow-[#E8594F]/30 hover:-translate-y-0.5 mt-1"
        >
          {t('register_btn')}
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        {t('have_account')}{' '}
        <Link href="/auth/login" className="text-[#E8594F] font-semibold hover:underline">
          {t('login_link')}
        </Link>
      </p>
    </AuthCard>
  );
}
