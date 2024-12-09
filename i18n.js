const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'fr'], // Add the locales you want to support
    defaultLocale: 'fr',
    localePath: path.resolve('./public/locales'), // Path to the locales directory
  },
};