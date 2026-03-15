import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ScrollProgress from '@/components/ui/ScrollProgress';
import FloatingFoodIcons from '@/components/ui/FloatingFoodIcons';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params; // consume params to satisfy Next.js typing
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ScrollProgress />
      <div className="relative">
        <FloatingFoodIcons />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
