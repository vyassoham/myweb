"use client";

import { useEffect, useState } from "react";
import { Eye, TrendingUp, Calendar } from "lucide-react";

export default function Stats(): React.JSX.Element {
    const [totalVisits, setTotalVisits] = useState<number>(0);
    const [todayVisits, setTodayVisits] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get today's date key
        const today = new Date().toISOString().split('T')[0];
        const todayKey = `visits_${today}`;

        // Increment total visits
        const storedTotal = localStorage.getItem('total_visits');
        const newTotal = storedTotal ? parseInt(storedTotal, 10) + 1 : 1;
        localStorage.setItem('total_visits', newTotal.toString());
        setTotalVisits(newTotal);

        // Increment today's visits
        const storedToday = localStorage.getItem(todayKey);
        const newToday = storedToday ? parseInt(storedToday, 10) + 1 : 1;
        localStorage.setItem(todayKey, newToday.toString());
        setTodayVisits(newToday);

        // Clean up old daily keys (keep only last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('visits_')) {
                const dateStr = key.replace('visits_', '');
                if (new Date(dateStr) < sevenDaysAgo) {
                    localStorage.removeItem(key);
                }
            }
        }

        setIsLoading(false);
    }, []);

    const stats = [
        {
            icon: Eye,
            label: "Total Visits",
            value: totalVisits.toLocaleString(),
            color: "var(--accent)"
        },
        {
            icon: Calendar,
            label: "Visits Today",
            value: todayVisits.toLocaleString(),
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
                        Statistics are stored locally in your browser. Each unique browser session counts as one visit.
                    </p>
                </div>
            </div>
        </section>
    );
}
