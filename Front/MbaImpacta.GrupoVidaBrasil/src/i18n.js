import axios from "axios";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ptBR from "app/i18n/ptBR";
import enUs from "app/i18n/enUs";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "pt-BR",
    debug: false,
    // keySeparator: false, // we do not use keys in form messages.welcome
    whitelist: ["pt-BR", "en-US"],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .then(() => {
    i18n.on("languageChanged", (lng) => {
      axios.defaults.headers.common["accept-language"] = lng;
    });

    // True para deep permite que seja possível estender as traduções dos clientes
    i18n.addResourceBundle("en-US", "core", enUs);
    i18n.addResourceBundle("pt-BR", "core", ptBR);

    // Seta um namespace padrão, desta forma não necessita usar o useTranslation passando o parametro de nome
    i18n.setDefaultNamespace("core");

    // Qualquer addResourceBundle no cliente deve seguir o modelo:
    // importante definir o NS com o mesmo nome
    // i18n.addResourceBundle('en-US', 'core', enUs);
  });

export default i18n;
