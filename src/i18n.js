import en from '../src/locals/en.json';
import es from '../src/locals/es.json';

import {createI18n} from 'vue-i18n';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLng: 'en',
    globalInjection: true,
    messages: {en,es}
});

export default i18n;