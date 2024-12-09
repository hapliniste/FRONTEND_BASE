import useComponentTranslation from '@/hooks/useComponentTranslation';
import en from './LocalizedComponent.en.json';
import fr from './LocalizedComponent.fr.json';

function LocalizedComponent() {
  const { t } = useComponentTranslation({ en, fr });

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export default LocalizedComponent;