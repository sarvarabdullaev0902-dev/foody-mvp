'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const t = useTranslations('auth');
  const { loginCustomer } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: '+998901234567', password: 'demo123' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginCustomer(form.identifier, form.password);
    if (ok) {
      router.push(redirectTo as '/');
    } else {
      setError(t('error_invalid'));
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAD6CC] via-white to-[#F5ECDE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#E8594F] font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>Foody Moody</span>
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-slate-800">{t('login_title')}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Social login */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('google')}
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full bg-[#229ED9] hover:bg-[#1a8bbf] rounded-xl py-3 text-sm font-semibold text-white active:bg-[#1577a3] transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              {t('telegram')}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-xs text-slate-400 uppercase font-medium tracking-wider">{t('or')}</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Demo hint */}
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center font-medium">
            {t('demo_hint')}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t('phone_or_email')}
              value={form.identifier}
              onChange={(e) => { setForm({ ...form, identifier: e.target.value }); setError(''); }}
              className={inputCls}
              autoComplete="username"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('password')}
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
                className={`${inputCls} pr-11`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center -mt-1">{error}</p>
            )}

            <div className="text-right -mt-1">
              <Link href="/auth/forgot" className="text-sm text-[#E8594F] hover:underline font-medium">
                {t('forgot_password')}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E8594F] hover:bg-[#D14840] active:bg-[#C03C35] text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
            >
              {t('login_btn')}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            {t('no_account')}{' '}
            <Link href="/auth/register" className="text-[#E8594F] font-semibold hover:underline">
              {t('register_link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
