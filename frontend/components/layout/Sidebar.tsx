"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/providers/LanguageProvider';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Award,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Zap
} from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const navItems = [
        { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('matches'), href: '/matches', icon: Users },
        { name: t('messages'), href: '/messages', icon: MessageSquare },
        { name: 'Users Catalog', href: '/admin', icon: Award },
        { name: t('my_profile'), href: '/profile', icon: Award },
    ];

    return (
        <motion.div
            initial={false}
            animate={{ width: collapsed ? 88 : 280 }}
            className="h-screen bg-surface/80 backdrop-blur-3xl border-r border-border flex flex-col justify-between py-6 relative z-50 flex-shrink-0 shadow-glass"
        >
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3.5 top-16 bg-surface border border-border shadow-soft rounded-full p-1.5 hover:bg-surface-hover hover:text-primary transition-all z-50 text-muted"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className="flex flex-col flex-1 h-full">
                {/* Brand Logo Area */}
                <div className={`flex items-center gap-3 px-6 pb-8 ${collapsed ? 'justify-center px-0' : ''}`}>
                    <img src="/logo.png" alt="SkillSwap Logo" className="w-11 h-11 object-contain flex-shrink-0 drop-shadow-[0_8px_16px_rgba(0,112,243,0.3)]" />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="font-bold text-2xl tracking-tight text-gradient"
                            >
                                SkillSwap
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 px-4 flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link key={item.name} href={item.href} passHref legacyBehavior>
                                <a className="relative group px-3 py-3 rounded-xl w-full flex items-center transition-all duration-300">
                                    {/* Active Liquid Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20 shadow-[inset_0_1px_0_0_rgba(0,112,243,0.1)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <div className={`relative z-10 flex items-center ${collapsed ? 'mx-auto' : ''}`}>
                                        <item.icon
                                            size={22}
                                            className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}
                                            strokeWidth={isActive ? 2.5 : 2}
                                        />
                                    </div>

                                    {/* Label text */}
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className={`relative z-10 ml-3 font-semibold text-sm transition-colors duration-300 ${isActive ? 'text-primary' : 'text-text-main group-hover:text-primary'
                                                    }`}
                                                style={{ whiteSpace: 'nowrap' }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </a>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Settings and Logout Area */}
            <div className="px-4 flex flex-col gap-2 border-t border-border/50 pt-4 pb-2 mt-auto">
                <Link href="/settings" passHref legacyBehavior>
                    <a className={`relative group px-3 py-3 rounded-xl w-full flex items-center hover:bg-surface-hover hover:shadow-soft transition-all duration-300 ${pathname.startsWith('/settings') ? 'bg-primary/5 text-primary' : ''}`}>
                        <div className={`flex items-center ${collapsed ? 'mx-auto' : ''}`}>
                            <Settings size={22} className={`transition-colors duration-300 ${pathname.startsWith('/settings') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`} />
                        </div>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className={`ml-3 font-semibold text-sm transition-colors duration-300 ${pathname.startsWith('/settings') ? 'text-primary' : 'text-text-main group-hover:text-primary'}`}
                                >
                                    {t('settings')}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </a>
                </Link>

                <button
                    onClick={handleLogout}
                    className="relative group px-3 py-3 rounded-xl w-full flex items-center hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-300"
                >
                    <div className={`flex items-center ${collapsed ? 'mx-auto' : ''}`}>
                        <LogOut size={22} className="text-muted group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="ml-3 font-semibold text-sm text-text-main group-hover:text-red-500 transition-colors duration-300"
                            >
                                {t('logout')}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.div>
    );
}
