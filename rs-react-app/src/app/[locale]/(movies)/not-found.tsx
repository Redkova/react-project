import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound');
  return (
    <div className="w-full max-w-lg bg-(--card-bg) py-10 px-6 rounded-xl shadow-lg mx-auto text-center ">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <Link
        href="/"
        className="
          inline-block 
          px-6 py-3 
          bg-(--button-bg) 
          text-white 
          rounded-lg 
          shadow-md 
          hover:bg-(--btn-hover-bg) 
          hover:shadow-lg 
          transition-all
        "
      >
        {t('back')}
      </Link>
    </div>
  );
}
