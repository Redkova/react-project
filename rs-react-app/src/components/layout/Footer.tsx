import { useTranslations } from 'next-intl';

function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="w-full py-4 text-center text-sm text-(--footer-text)">
      {t('copyright')}
    </footer>
  );
}

export default Footer;
