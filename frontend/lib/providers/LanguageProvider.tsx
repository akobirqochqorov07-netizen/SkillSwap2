"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Locale = 'en' | 'uz' | 'ru';

export const dictionaries = {
    en: {
        dashboard: 'Dashboard',
        matches: 'Matches',
        messages: 'Messages',
        my_profile: 'My Profile',
        settings: 'Settings',
        logout: 'Log Out',
        welcome: 'Welcome back',
        recent_matches: 'Recent Matches',
        theme_light: 'Light Mode',
        theme_dark: 'Dark Mode',
        theme_system: 'System Mode',
        language: 'Language',
        save: 'Save Changes',
        search: 'Search...',
        no_matches: 'No matches found',
        type_message: 'Type a message...',
        contacts: 'Contacts',
    },
    uz: {
        dashboard: 'Boshqaruv Paneli',
        matches: 'Mosliklar',
        messages: 'Xabarlar',
        my_profile: 'Mening Profilim',
        settings: 'Sozlamalar',
        logout: 'Chiqish',
        welcome: 'Xush kelibsiz',
        recent_matches: 'So\'nggi Mosliklar',
        theme_light: 'Yorug\' rejim',
        theme_dark: 'Qorong\'u rejim',
        theme_system: 'Tizim rejimi',
        language: 'Til',
        save: 'O\'zgarishlarni Saqlash',
        search: 'Qidirish...',
        no_matches: 'Mosliklar topilmadi',
        type_message: 'Xabar yozing...',
        contacts: 'Kontaktlar',
    },
    ru: {
        dashboard: 'Панель управления',
        matches: 'Совпадения',
        messages: 'Сообщения',
        my_profile: 'Мой профиль',
        settings: 'Настройки',
        logout: 'Выйти',
        welcome: 'С возвращением',
        recent_matches: 'Недавние совпадения',
        theme_light: 'Светлая тема',
        theme_dark: 'Темная тема',
        theme_system: 'Системная тема',
        language: 'Язык',
        save: 'Сохранить изменения',
        search: 'Поиск...',
        no_matches: 'Совпадения не найдены',
        type_message: 'Введите сообщение...',
        contacts: 'Контакты',
    }
};

interface LanguageProviderState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: keyof typeof dictionaries['en']) => string;
}

const LanguageContext = createContext<LanguageProviderState | undefined>(undefined);

export function LanguageProvider({
    children,
    defaultLocale = 'en',
    storageKey = 'skillswap-locale',
}: {
    children: React.ReactNode;
    defaultLocale?: Locale;
    storageKey?: string;
}) {
    const [locale, setLocaleState] = useState<Locale>(defaultLocale);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLocale = localStorage.getItem(storageKey) as Locale | null;
        if (savedLocale && Object.keys(dictionaries).includes(savedLocale)) {
            setLocaleState(savedLocale);
        } else {
            const browserLang = navigator.language.slice(0, 2);
            if (['uz', 'ru', 'en'].includes(browserLang)) {
                setLocaleState(browserLang as Locale);
            }
        }
        setMounted(true);
    }, [storageKey]);

    const setLocale = (newLocale: Locale) => {
        localStorage.setItem(storageKey, newLocale);
        setLocaleState(newLocale);
    };

    const t = (key: keyof typeof dictionaries['en']): string => {
        return dictionaries[locale][key] || dictionaries['en'][key] || key;
    };

    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ locale: defaultLocale, setLocale: () => { }, t }}>
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
