"use client";

import { useEffect, useState } from "react";
import { Eye, Calendar, Coffee, Clock, Zap, Terminal } from "lucide-react";

// Namespace for CountAPI
const NAMESPACE = "soham-lol-portfolio";
const TOTAL_KEY = "total-visits";

// Fun activities/moods that rotate
const ACTIVITIES = [
    { emoji: "🔥", text: "Shipping code" },
    { emoji: "🧠", text: "Debugging life" },
    { emoji: "☕", text: "Sipping coffee" },
    { emoji: "🚀", text: "Deploying magic" },
    { emoji: "💡", text: "Having ideas" },
    { emoji: "🎮", text: "Procrastinating" },
    { emoji: "🌙", text: "Night coding" },
    { emoji: "⚡", text: "In the zone" },
    { emoji: "🔮", text: "Predicting bugs" },
    { emoji: "🎯", text: "Crushing goals" },
    { emoji: "🤖", text: "Training AI" },
    { emoji: "🛠️", text: "Breaking prod" },
];

export default function Stats(): React.JSX.Element {
    const [totalVisits, setTotalVisits] = useState<number | null>(null);
    const [todayVisits, setTodayVisits] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [coffeeCount, setCoffeeCount] = useState<number>(0);
    const [activity, setActivity] = useState(ACTIVITIES[0]);
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

        // Rotate activity every 5 seconds
        const activityInterval = setInterval(() => {
            setActivity(ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)]);
        }, 5000);

        // Track visits
        const trackVisit = async () => {
            try {
                const visitorId = localStorage.getItem('visitor_id');
                const today = new Date().toISOString().split('T')[0];
                const lastVisitDate = localStorage.getItem('last_visit_date');

                if (!visitorId) {
                    const newId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
                    localStorage.setItem('visitor_id', newId);

                    try {
                        const totalRes = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${TOTAL_KEY}`);
                        const totalData = await totalRes.json();
                        setTotalVisits(totalData.value);
                    } catch {
                        setTotalVisits(null);
                    }
                } else {
                    try {
                        const totalRes = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${TOTAL_KEY}`);
                        const totalData = await totalRes.json();
                        setTotalVisits(totalData.value);
                    } catch {
                        setTotalVisits(null);
                    }
                }

                const todayKey = `today-visits-${today}`;
                if (lastVisitDate !== today) {
                    localStorage.setItem('last_visit_date', today);
                    try {
                        const todayRes = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${todayKey}`);
                        const todayData = await todayRes.json();
                        setTodayVisits(todayData.value);
                    } catch {
                        setTodayVisits(null);
                    }
                } else {
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

        return () => {
            clearInterval(clockInterval);
            clearInterval(activityInterval);
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
            label: "Currently",
            value: `${activity.emoji} ${activity.text}`,
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
                    <h2 className="section-header__title">Live Dashboard</h2>
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
