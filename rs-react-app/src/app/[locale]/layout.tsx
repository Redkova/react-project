import '@/style.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '../Providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata = {
  title: 'Find Your Movie',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-(--bg-gradient) text-(--text-color) flex flex-col items-center">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />

            <main className="flex flex-col items-center w-full flex-1 pt-5">
              {children}
            </main>

            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
