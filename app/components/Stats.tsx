"use client";

import { useEffect, useState } from "react";
import { Eye, TrendingUp, Calendar } from "lucide-react";

// Namespace for CountAPI
const NAMESPACE = "soham-lol-portfolio";
const TOTAL_KEY = "total-visits";

export default function Stats(): React.JSX.Element {
    const [totalVisits, setTotalVisits] = useState<number | null>(null);
    const [todayVisits, setTodayVisits] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const trackVisit = async () => {
            try {
                // Check if this visitor has been counted
                const visitorId = localStorage.getItem('visitor_id');
                const today = new Date().toISOString().split('T')[0];
                const lastVisitDate = localStorage.getItem('last_visit_date');

                // Generate unique visitor ID if not exists
                if (!visitorId) {
                    const newId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
                    localStorage.setItem('visitor_id', newId);

                    // First time visitor - increment total
                    try {
                        const totalRes = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${TOTAL_KEY}`);
                        const totalData = await totalRes.json();
                        setTotalVisits(totalData.value);
                    } catch {
                        // Fallback if API fails
                        setTotalVisits(null);
                    }
                } else {
                    // Returning visitor - just get the count without incrementing
                    try {
                        const totalRes = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${TOTAL_KEY}`);
                        const totalData = await totalRes.json();
                        setTotalVisits(totalData.value);
                    } catch {
                        setTotalVisits(null);
                    }
                }

                // Track daily unique visits
                const todayKey = `today-visits-${today}`;
                if (lastVisitDate !== today) {
                    // New day for this visitor - increment today's count
                    localStorage.setItem('last_visit_date', today);
                    try {
                        const todayRes = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${todayKey}`);
                        const todayData = await todayRes.json();
                        setTodayVisits(todayData.value);
                    } catch {
                        setTodayVisits(null);
                    }
                } else {
                    // Already visited today - just get count
                    try {
                        const todayRes = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${todayKey}`);
                        const todayData = await todayRes.json();
                        setTodayVisits(todayData.value || 0);
                    } catch {
                        setTodayVisits(null);
                    }
                }

            } catch (error) {
                console.error('Failed to track visit:', error);
            } finally {
                setIsLoading(false);
            }
        };

        trackVisit();
    }, []);

    const stats = [
        {
            icon: Eye,
            label: "Unique Visitors",
            value: totalVisits !== null ? totalVisits.toLocaleString() : "—",
            color: "var(--accent)"
        },
        {
            icon: Calendar,
            label: "Today's Visitors",
            value: todayVisits !== null ? todayVisits.toLocaleString() : "—",
            color: "var(--success)"
        },
        {
            icon: TrendingUp,
            label: "Status",
            value: "Online",
            color: "var(--success)"
        }
    ];

    return (
        <section id="stats" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-header__title">Site Statistics</h2>
                </div>

                <div className="grid grid--3 gap-6">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="card animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${stat.color}20` }}
                                >
                                    <stat.icon
                                        className="w-7 h-7"
                                        style={{ color: stat.color }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-muted font-medium uppercase tracking-wider mb-1">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {isLoading ? "..." : stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted">
                        Each unique visitor is counted once. Refreshing the page does not add to the count.
                    </p>
                </div>
            </div>
        </section>
    );
}
