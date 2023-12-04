
import i18n from "i18next";
import {en} from "./en"
import {ar} from "./ar"
import {  initReactI18next } from "react-i18next";

 i18n.use(initReactI18next).init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: en
      },
      ar:{
        translation:ar
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    default:"en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n

 // document.getElementById('output').innerHTML = i18next.t('key');

