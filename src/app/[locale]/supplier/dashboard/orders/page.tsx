'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, Package, ShoppingBag } from 'lucide-react';

type OrderStatus = 'pending' | 'confirmed' | 'picked_up' | 'cancelled';

const DEMO_ORDERS = [
  { id: 'ORD-001', customer: 'Alisher Toshmatov', product: 'Assorted Pastry Box', qty: 2, total: 45_000, time: '16:00–18:00', status: 'pending' as OrderStatus, code: '4821' },
  { id: 'ORD-002', customer: 'Nodira Mirzayeva', product: 'Yogurt Variety Pack', qty: 1, total: 14_000, time: '17:00–19:00', status: 'confirmed' as OrderStatus, code: '3567' },
  { id: 'ORD-003', customer: 'Sardor Karimov', product: 'Bread Bundle', qty: 3, total: 27_000, time: '15:00–17:00', status: 'picked_up' as OrderStatus, code: '7234' },
  { id: 'ORD-004', customer: 'Malika Botirov', product: 'Vitamin C Bundle', qty: 1, total: 33_000, time: '18:00–20:00', status: 'pending' as OrderStatus, code: '9102' },
  { id: 'ORD-005', customer: 'Jasur Normatov', product: 'Fresh Salad Mix', qty: 2, total: 22_000, time: '16:00–18:00', status: 'confirmed' as OrderStatus, code: '5678' },
  { id: 'ORD-006', customer: 'Dilnoza Yusupova', product: 'Assorted Pastry Box', qty: 1, total: 22_500, time: '15:00–17:00', status: 'cancelled' as OrderStatus, code: '1234' },
  { id: 'ORD-007', customer: 'Bobur Xasanov', product: 'Vitamin C Bundle', qty: 2, total: 66_000, time: '17:00–19:00', status: 'picked_up' as OrderStatus, code: '8890' },
];

const STATUS_CLS: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  picked_up: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-600 border-red-200',
};

type Tab = 'all' | OrderStatus;
const TABS: Tab[] = ['all', 'pending', 'confirmed', 'picked_up', 'cancelled'];

export default function OrdersPage() {
  const t = useTranslations('supplier_dashboard.orders');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [orders, setOrders] = useState(DEMO_ORDERS);

  const filtered = activeTab === 'all'
    ? orders
    : orders.filter(o => o.status === activeTab);

  const updateStatus = (id: string, status: OrderStatus) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
        <span className="text-sm text-slate-400 font-medium">{orders.length} orders</span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-1.5 w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {t(tab as 'all')}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 py-20 text-center">
          <ShoppingBag className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">{t('empty')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Order info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400">{order.id}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_CLS[order.status]}`}>
                      {t(order.status as 'pending')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <div>
                      <span className="text-slate-400 text-xs">{t('customer')}</span>
                      <p className="font-semibold text-slate-800">{order.customer}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">{t('product')}</span>
                      <p className="font-semibold text-slate-800">{order.product}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">{t('pickup_time')}</span>
                      <p className="font-semibold text-slate-800">{order.time}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">{t('total')}</span>
                      <p className="font-extrabold text-emerald-600">
                        {order.total.toLocaleString()} {tCommon('currency')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code + actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                  {/* Pickup code */}
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-medium mb-0.5">{t('pickup_code')}</p>
                    <div className="bg-slate-900 text-white font-extrabold text-xl tracking-[0.3em] px-4 py-2 rounded-xl">
                      {order.code}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 w-full">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateStatus(order.id, 'confirmed')}
                        className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        {t('confirm')}
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => updateStatus(order.id, 'picked_up')}
                        className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
                      >
                        <Package className="w-3.5 h-3.5" />
                        {t('mark_picked_up')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
