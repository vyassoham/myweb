"use client";

import { Search, Menu } from "lucide-react";

const NAV_LINKS = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
];

export default function Navigation(): React.JSX.Element {
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__inner">
                    {/* Logo */}
                    <a href="/" className="nav__logo">
                        Soham Vyas
                    </a>

                    {/* Desktop Links */}
                    <ul className="nav__links hidden md:flex">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="nav__link">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className="nav__actions">
                        <button className="btn btn--icon btn--ghost" aria-label="Search">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="btn btn--icon btn--ghost md:hidden" aria-label="Menu">
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
