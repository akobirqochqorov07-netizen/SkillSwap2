"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
    resolvedTheme: 'dark', // default to dark given the premium design
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'skillswap-ui-theme',
    ...props
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey) as Theme | null;
        if (savedTheme) {
            setThemeState(savedTheme);
        }
        setMounted(true);
    }, [storageKey]);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        let resolved: 'light' | 'dark';
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            resolved = systemTheme;
            root.classList.add(systemTheme);
        } else {
            resolved = theme;
            root.classList.add(theme);
        }

        setResolvedTheme(resolved);
    }, [theme, mounted]);

    const value = {
        theme,
        resolvedTheme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setThemeState(newTheme);
        },
    };

    if (!mounted) {
        return (
            <ThemeProviderContext.Provider value={{ theme: 'system', resolvedTheme: 'dark', setTheme: () => { } }}>
                {children}
            </ThemeProviderContext.Provider>
        );
    }

    return (
        <ThemeProviderContext.Provider value={value} {...props}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
