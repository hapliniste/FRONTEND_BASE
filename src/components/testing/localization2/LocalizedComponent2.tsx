import useComponentTranslation from '@/hooks/useComponentTranslation';
import en from './LocalizedComponent2.en.json';
import fr from './LocalizedComponent2.fr.json';

function LocalizedComponent() {
  const { t } = useComponentTranslation({ en, fr });

  return (
    <div>
      <h1>2 - {t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export default LocalizedComponent;