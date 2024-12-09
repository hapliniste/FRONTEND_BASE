// src/components/userManagement/loginForm/LoginForm.tsx
import useComponentTranslation from '@/hooks/useComponentTranslation';
import en from './LoginForm.en.json';
import fr from './LoginForm.fr.json';

function LoginForm() {
  const { t } = useComponentTranslation({ en, fr });

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export default LoginForm;