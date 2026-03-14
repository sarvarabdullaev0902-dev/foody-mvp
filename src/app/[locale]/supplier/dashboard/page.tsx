'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Plus, Package, TrendingUp, ShoppingBag, Leaf } from 'lucide-react';

const CHART_VALUES = [12, 18, 8, 25, 22, 30, 15];
const CHART_DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const MAX_CHART = 30;

const DEMO_ORDERS = [
  { id: 'ORD-001', customer: 'Alisher T.', product: 'Assorted Pastry Box', qty: 2, total: 45_000, time: '16:00–18:00', status: 'pending', code: '4821' },
  { id: 'ORD-002', customer: 'Nodira M.', product: 'Yogurt Variety Pack', qty: 1, total: 14_000, time: '17:00–19:00', status: 'confirmed', code: '3567' },
  { id: 'ORD-003', customer: 'Sardor K.', product: 'Bread Bundle', qty: 3, total: 27_000, time: '15:00–17:00', status: 'picked_up', code: '7234' },
  { id: 'ORD-004', customer: 'Malika B.', product: 'Vitamin C Bundle', qty: 1, total: 33_000, time: '18:00–20:00', status: 'pending', code: '9102' },
  { id: 'ORD-005', customer: 'Jasur N.', product: 'Fresh Salad Mix', qty: 2, total: 22_000, time: '16:00–18:00', status: 'confirmed', code: '5678' },
];

const STATUS_CLS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  picked_up: 'bg-[#E8F5EE] text-[#1B7A4A]',
  cancelled: 'bg-red-100 text-red-700',
};

export default function DashboardHome() {
  const t = useTranslations('supplier_dashboard');
  const tCommon = useTranslations('common');

  const stats = [
    { key: 'active_listings', value: '8', icon: Package, light: 'bg-emerald-50 text-emerald-600' },
    { key: 'orders_today', value: '23', icon: ShoppingBag, light: 'bg-blue-50 text-blue-600' },
    { key: 'revenue_today', value: `487 000 ${tCommon('currency')}`, icon: TrendingUp, light: 'bg-violet-50 text-violet-600' },
    { key: 'food_saved', value: `34 ${t('home.kg')}`, icon: Leaf, light: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {t('home.welcome')}, Salom Bakery 👋
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">14-Mart, 2026</p>
        </div>
        <Link
          href="/supplier/dashboard/add-listing"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {t('home.add_new_listing')}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ key, value, icon: Icon, light }) => (
          <div key={key} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${light}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-extrabold text-slate-900 leading-tight">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{t(`home.${key}` as 'home.active_listings')}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">{t('home.recent_orders')}</h2>
            <Link
              href="/supplier/dashboard/orders"
              className="text-xs text-emerald-600 font-medium hover:underline"
            >
              {t('home.view_all')} →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {DEMO_ORDERS.map((order) => (
              <div key={order.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-400">{order.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CLS[order.status]}`}>
                      {t(`status.${order.status}` as 'status.pending')}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 truncate">{order.product}</p>
                  <p className="text-xs text-slate-400">{order.customer} · {order.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-extrabold text-emerald-600">
                    {order.total.toLocaleString()} {tCommon('currency')}
                  </p>
                  <p className="text-[11px] font-bold text-slate-300 tracking-[0.2em]">{order.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Bar chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="font-bold text-slate-800 mb-4">{t('home.weekly_chart_title')}</h2>
            <div className="flex items-end gap-1.5 h-28">
              {CHART_DAY_KEYS.map((key, i) => (
                <div key={key} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end" style={{ height: 80 }}>
                    <div
                      className="w-full bg-emerald-500 rounded-t-sm hover:bg-emerald-400 transition-colors"
                      style={{ height: `${(CHART_VALUES[i] / MAX_CHART) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {t(`home.days.${key}` as 'home.days.mon')}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-400">
              <span>0</span>
              <span>{MAX_CHART}</span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="font-bold text-slate-800 mb-3">{t('home.quick_actions')}</h2>
            <div className="space-y-2">
              <Link
                href="/supplier/dashboard/add-listing"
                className="flex items-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('home.add_new_listing')}
              </Link>
              <Link
                href="/supplier/dashboard/listings"
                className="flex items-center gap-2.5 w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
              >
                <Package className="w-4 h-4" />
                {t('home.manage_listings')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
