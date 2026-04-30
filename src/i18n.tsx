import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Lang } from './translations';

const STORAGE_KEY = 'lez_lang';

function getStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en' || stored === 'it') return stored;
  } catch {}
  return null;
}

function langFromCountry(countryCode: string): Lang {
  const code = countryCode.toUpperCase();
  if (code === 'BR') return 'pt';
  if (code === 'IT') return 'it';
  return 'en';
}

function langFromBrowser(): Lang {
  try {
    const nav = navigator.language ?? '';
    if (nav.startsWith('pt')) return 'pt';
    if (nav.startsWith('it')) return 'it';
  } catch {}
  return 'en';
}

async function detectLang(): Promise<Lang> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.country_code === 'string') {
        return langFromCountry(data.country_code);
      }
    }
  } catch {}
  return langFromBrowser();
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.pt;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getStoredLang() ?? 'pt');

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  useEffect(() => {
    if (getStoredLang() !== null) return;
    detectLang().then(detected => setLangState(detected));
  }, []);

  const t = translations[lang] as typeof translations.pt;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
