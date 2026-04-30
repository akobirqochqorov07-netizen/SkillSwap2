"use client";

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Shield, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/lib/providers/LanguageProvider';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useLanguage();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.users.getAll();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((u) =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.university?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full flex-1 pt-6 flex flex-col gap-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient mb-2">Users Catalog</h1>
                    <p className="text-muted text-sm md:text-base">Browse and manage all registered peers on SkillSwap.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-muted" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary shadow-inner-glow transition-all"
                    />
                </div>
            </header>

            <div className="relative min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-24 w-full rounded-2xl animate-pulse bg-surface-hover border border-border" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="flex flex-col gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                        }}
                    >
                        {filteredUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="liquid-panel p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-soft transition-all"
                            >
                                <div className="flex items-center gap-5 w-full md:w-auto">
                                    <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-tr from-accent to-primary flex flex-shrink-0 items-center justify-center shadow-lg border border-white/20">
                                        <span className="text-white font-bold text-2xl">{user.name?.charAt(0) || 'U'}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg text-text-main truncate">{user.name}</h3>
                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                                                User
                                            </span>
                                        </div>
                                        <p className="text-muted text-sm truncate">{user.email}</p>
                                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                            <div className="flex items-center gap-1 text-muted text-xs capitalize">
                                                <Briefcase size={12} /> {user.university || 'N/A'}
                                            </div>
                                            <div className="flex items-center gap-1 text-secondary font-semibold text-xs">
                                                ★ Rate: {Math.round(user.skillScore || 60)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap max-w-full md:max-w-xs justify-end w-full md:w-auto">
                                    <div className="flex flex-col gap-1 w-full text-right md:w-auto">
                                        <span className="text-[10px] uppercase font-bold text-muted">Skills Count</span>
                                        <span className="text-sm font-semibold text-text-main">{user.skills?.length || 0} Registered</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!loading && filteredUsers.length === 0 && (
                    <div className="w-full flex justify-center py-16">
                        <div className="text-center text-muted">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No users found matching your search.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
