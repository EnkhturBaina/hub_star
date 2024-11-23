import React, { useCallback, useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Lang = {
  lang: string;
  alt: string;
  src: string;
};

const FabButton: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState(router.locale || 'mn'); // Default to the current locale

  const langs: Lang[] = [
    { lang: 'mn', alt: 'Монгол хэл', src: '/lang/mn.png' },
    { lang: 'zh', alt: '中國人', src: '/lang/zh.png' },
    { lang: 'en', alt: 'English', src: '/lang/en.png' },
  ];

  const currentLang: Lang = langs.find(item => item.lang === lang) || langs[0];

  const changeLanguage = useCallback(
    async (selectedLang: string) => {
      if (selectedLang !== lang) {
        setLang(selectedLang);
        setOpen(false);
        await i18n.changeLanguage(selectedLang); // Change language
        await router.push(router.pathname, router.asPath, { locale: selectedLang }); // Redirect
      }
    },
    [i18n, lang, router]
  );

  return (
    <FloatButton.Group
      open={open}
      trigger="click"
      style={{ insetInlineEnd: 24 }}
      onClick={() => setOpen(!open)}
      icon={
        <Image src={currentLang.src} sizes="100vw" alt={currentLang.alt} width={50} height={50} />
      }
    >
      {langs
        .filter(item => item.lang !== currentLang.lang)
        .map(item => (
          <FloatButton
            key={item.lang}
            onClick={() => changeLanguage(item.lang)}
            icon={<Image src={item.src} sizes="100vw" alt={item.alt} width={50} height={50} />}
          />
        ))}
    </FloatButton.Group>
  );
};

export default FabButton;
