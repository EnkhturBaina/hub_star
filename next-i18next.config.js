module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'mn',
    locales: ['mn', 'en', 'zh'],
    localeDetection: false,
  },
};
