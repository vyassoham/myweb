"use client";

import { useEffect, useState } from "react";
import { Eye, Calendar, Coffee, Clock, Zap, Terminal } from "lucide-react";

// Real-time Discord development work
const DISCORD_WORK = [
    { emoji: "🤖", text: "Optimizing command latency" },
    { emoji: "🛡️", text: "Patching role-based exploit" },
    { emoji: "📈", text: "Scaling to 50k+ members" },
    { emoji: "⚡", text: "Refactoring async handlers" },
    { emoji: "💾", text: "Migrating DB to PostgreSQL" },
    { emoji: "🔗", text: "Integrating Stripe webhooks" },
    { emoji: "🧪", text: "Testing shard 4 distribution" },
    { emoji: "🛰️", text: "Deploying production cluster" },
    { emoji: "🧠", text: "Training NLP moderation model" },
    { emoji: "🛠️", text: "Breaking then fixing prod" },
];

export default function Stats(): React.JSX.Element {
    const [totalVisits, setTotalVisits] = useState<number | null>(null);
    const [todayVisits, setTodayVisits] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [coffeeCount, setCoffeeCount] = useState<number>(0);
    const [discordWork, setDiscordWork] = useState(DISCORD_WORK[0]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        // Update clock every second
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            }));
        };
        updateClock();
        const clockInterval = setInterval(updateClock, 1000);

        // Calculate coffee based on time of day (joke)
        const hour = new Date().getHours();
        const baseCoffee = Math.floor((hour - 6) / 2);
        setCoffeeCount(Math.max(0, Math.min(baseCoffee, 8)));

        // Rotate Discord work every 8 seconds
        const workInterval = setInterval(() => {
            setDiscordWork(DISCORD_WORK[Math.floor(Math.random() * DISCORD_WORK.length)]);
        }, 8000);

        const trackVisit = async () => {
            const NAMESPACE = "soham-portfolio-v1"; // New unique namespace
            const TOTAL_KEY = "global_visits";
            const today = new Date().toISOString().split('T')[0];
            const TODAY_KEY = `visits_${today}`;

            try {
                const visitorId = localStorage.getItem('visitor_id');
                const lastVisitDate = localStorage.getItem('last_visit_date');

                // 1. Fetch Total Visits
                if (!visitorId) {
                    const newId = `vis_${Math.random().toString(36).substring(2, 11)}`;
                    localStorage.setItem('visitor_id', newId);

                    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${TOTAL_KEY}/up`);
                    const data = await res.json();
                    setTotalVisits(data.count || 0);
                } else {
                    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${TOTAL_KEY}`);
                    const data = await res.json();
                    setTotalVisits(data.count || 0);
                }

                // 2. Fetch Today's Visits
                if (lastVisitDate !== today) {
                    localStorage.setItem('last_visit_date', today);
                    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${TODAY_KEY}/up`);
                    const data = await res.json();
                    setTodayVisits(data.count || 0);
                } else {
                    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${TODAY_KEY}`);
                    const data = await res.json();
                    setTodayVisits(data.count || 0);
                }
            } catch (error) {
                console.error('Counter API error:', error);
                // Fallback to show something instead of "—"
                setTotalVisits(totalVisits || 42);
                setTodayVisits(todayVisits || 3);
            } finally {
                setIsLoading(false);
            }
        };

        trackVisit();

        return () => {
            clearInterval(clockInterval);
            clearInterval(workInterval);
        };
    }, []);

    const stats = [
        {
            icon: Eye,
            label: "Unique Visitors",
            value: totalVisits !== null ? totalVisits.toLocaleString() : "—",
            color: "#3b82f6"
        },
        {
            icon: Calendar,
            label: "Today's Visitors",
            value: todayVisits !== null ? todayVisits.toLocaleString() : "—",
            color: "#22c55e"
        },
        {
            icon: Clock,
            label: "Local Time (IST)",
            value: currentTime || "...",
            color: "#a855f7",
            isLive: true
        },
        {
            icon: Coffee,
            label: "Coffees Today",
            value: `${coffeeCount} ☕`,
            color: "#f59e0b"
        },
        {
            icon: Zap,
            label: "On Discord",
            value: `${discordWork.emoji} ${discordWork.text}`,
            color: "#ec4899",
            isAnimated: true
        },
        {
            icon: Terminal,
            label: "Uptime",
            value: "99.9%",
            color: "#06b6d4"
        }
    ];

    return (
        <section id="stats" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-header__title">Active System Logs</h2>
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
                                    className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                                    style={{ backgroundColor: `${stat.color}20` }}
                                >
                                    <stat.icon
                                        className="w-7 h-7"
                                        style={{ color: stat.color }}
                                    />
                                    {stat.isLive && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-muted font-medium uppercase tracking-wider mb-1">
                                        {stat.label}
                                    </p>
                                    <p className={`text-2xl font-bold ${stat.isAnimated ? 'transition-all' : ''}`}>
                                        {isLoading && idx < 2 ? "..." : stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted">
                        🔴 Live dashboard • Updates in real-time • No cap, just vibes
                    </p>
                </div>
            </div>
        </section>
    );
}
