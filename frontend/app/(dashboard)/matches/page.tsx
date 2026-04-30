"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, X, Users, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/providers/LanguageProvider';

export default function MatchesPage() {
    const [matches, setMatches] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { t } = useLanguage();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user') || '{}'));
        const fetchMatches = async () => {
            try {
                const data = await api.matches.getMyMatches();
                setMatches(data);
            } catch (err: any) {
                if (err.message === 'Unauthorized' || err.message === 'Something went wrong') {
                    router.push('/login');
                } else {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const handleUpdateStatus = async (matchId: string, status: string) => {
        try {
            await api.matches.updateStatus(matchId, status);
            const data = await api.matches.getMyMatches();
            setMatches(data);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const getPartner = (match: any) => {
        if (!user || Object.keys(user).length === 0) return match.userA;
        return match.userAId === user.id ? match.userB : match.userA;
    };

    return (
        <div className="w-full flex-1 pt-6 flex flex-col gap-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient mb-2">{t('matches')}</h1>
                    <p className="text-muted text-sm md:text-base">Manage your active connections and pending skill exchanges.</p>
                </div>
                <div className="flex items-center gap-3 bg-surface p-1.5 rounded-xl border border-border shadow-soft">
                    <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg text-text-main font-bold text-sm shadow-inner">
                        Total Connections: <span className="text-primary">{matches.filter(m => m.status === 'ACCEPTED').length}</span>
                    </div>
                </div>
            </header>

            <div className="relative min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-28 w-full rounded-2xl animate-pulse border border-border bg-surface-hover" />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            className="flex flex-col gap-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            {matches.map((match) => {
                                const partner = getPartner(match);
                                const isPendingMe = match.status === 'PENDING' && user && match.userBId === user.id;

                                return (
                                    <motion.div
                                        key={match.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group liquid-panel p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-[0_8px_16px_rgba(0,112,243,0.3)] border border-white/20 group-hover:scale-105 transition-transform duration-300">
                                                <span className="text-white font-bold text-2xl tracking-tighter">{partner.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-text-main font-bold text-xl">{partner.name}</h3>
                                                <div className="flex items-center gap-3 mt-1 5">
                                                    <span className="text-muted text-sm font-semibold capitalize">{partner.university}</span>
                                                    <div className="w-1 h-1 rounded-full bg-muted/40" />
                                                    <div className="flex items-center gap-1.5">
                                                        {match.status === 'ACCEPTED' ? (
                                                            <span className="px-2.5 py-1 rounded-full outline outline-1 outline-secondary/30 bg-secondary/15 text-secondary text-[11px] uppercase tracking-wider font-bold flex items-center gap-1 shadow-sm">
                                                                <Check size={12} strokeWidth={3} /> Active
                                                            </span>
                                                        ) : (
                                                            <span className="px-2.5 py-1 rounded-full outline outline-1 outline-orange-500/30 bg-orange-500/10 text-orange-400 text-[11px] uppercase tracking-wider font-bold flex items-center gap-1 shadow-sm">
                                                                <Clock size={12} strokeWidth={3} /> Pending
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 border-t border-border md:border-t-0 pt-4 md:pt-0">
                                            {isPendingMe && (
                                                <div className="flex items-center gap-2 w-full md:w-auto">
                                                    <button
                                                        onClick={() => handleUpdateStatus(match.id, 'ACCEPTED')}
                                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-secondary hover:bg-emerald-400 text-white font-bold rounded-xl transition-colors shadow-[0_8px_16px_rgba(16,185,129,0.3)]"
                                                    >
                                                        <Check size={20} strokeWidth={2.5} /> Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(match.id, 'REJECTED')}
                                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-surface-hover hover:bg-red-500/15 text-text-main hover:text-red-500 font-bold rounded-xl border border-border hover:border-red-500/30 transition-colors"
                                                    >
                                                        <X size={20} strokeWidth={2.5} /> Decline
                                                    </button>
                                                </div>
                                            )}
                                            {match.status === 'ACCEPTED' && (
                                                <button
                                                    onClick={() => router.push(`/messages?matchId=${match.id}`)}
                                                    className="btn-liquid w-full md:w-auto py-3 px-6 group/btn"
                                                >
                                                    <MessageCircle size={20} className="z-10 relative" />
                                                    <span className="z-10 relative font-bold">Open Chat</span>
                                                    <ArrowRight size={18} className="z-10 relative opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                                </button>
                                            )}
                                            {match.status === 'PENDING' && !isPendingMe && (
                                                <div className="w-full md:w-auto px-6 py-3 bg-surface border border-border text-muted font-bold rounded-xl text-center text-sm shadow-inner">
                                                    Awaiting Response
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                )}

                {!loading && matches.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex flex-col items-center justify-center p-16 liquid-panel border-dashed"
                    >
                        <div className="w-20 h-20 rounded-full bg-surface-hover flex items-center justify-center mb-6 shadow-inset">
                            <Users size={36} className="text-muted" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-gradient mb-3">No Active Connects</h3>
                        <p className="text-muted text-center max-w-md mb-8">You haven't matched with anyone yet. Head over to the Dashboard to find students to swap skills with.</p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="btn-glass px-8 py-3.5"
                        >
                            Go to Discover <ArrowRight size={18} className="ml-2 inline-block" />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
