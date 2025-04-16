// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend"; // Optional, for loading translations from a server

// Initialize i18next with your configuration
i18n
  .use(initReactI18next) // Connects i18n with React
  .use(HttpBackend) // Optional: Load translation files from the server
  .init({
    fallbackLng: "en", // Default language when translations are not available
    lng: "en", // Start with 'en' language
    supportedLngs: ["en"], // List of supported languages
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files (adjust according to your structure)
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Set to false if you're not using Suspense for loading translations
    },
  });

export default i18n;
