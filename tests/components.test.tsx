import { expect, test, describe, beforeAll, afterAll, mock } from 'bun:test';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

// Import modules to test
import Footer from '../app/components/Footer';
import Navigation from '../app/components/Navigation';
import Hero from '../app/components/Hero';
import Projects from '../app/components/Projects';
import OpenSource from '../app/components/OpenSource';
import FeaturedResearch from '../app/components/FeaturedResearch';
import Skills from '../app/components/Skills';
import Contact from '../app/components/Contact';
import QuickNoteBox from '../app/components/QuickNoteBox';
import SecurityLayer from '../app/components/SecurityLayer';
import InteractivePlayground from '../app/components/InteractivePlayground';
import CommandPalette from '../app/components/CommandPalette';
import InteractiveBackground from '../app/components/InteractiveBackground';
import InteractiveCoffee from '../app/components/InteractiveCoffee';
import NeuralAudioPreview from '../app/components/NeuralAudioPreview';
import ArticleShareAndCite from '../app/components/ArticleShareAndCite';
import ThemeToggle, { applyTheme, getInitialTheme } from '../app/components/ThemeToggle';
import TiltCard from '../app/components/TiltCard';
import ScrollProgress from '../app/components/ScrollProgress';
import ScrollReveal from '../app/components/ScrollReveal';
import Parallax3DBackground from '../app/components/Parallax3DBackground';
import NotFound from '../app/not-found';
import { cn } from '../lib/utils';

describe('myweb Top 1% Portfolio Test Suite', () => {

    // =====================================================================
    // 🛠️ Test cn Utility
    // =====================================================================
    describe('cn helper', () => {
        test('combines simple class names', () => {
            const result = cn('class-a', 'class-b');
            expect(result).toBe('class-a class-b');
        });

        test('ignores falsy values', () => {
            const result = cn('class-a', null, undefined, false, 'class-c');
            expect(result).toBe('class-a class-c');
        });

        test('resolves Tailwind conflicts correctly', () => {
            const result = cn('px-2 py-1', 'p-4');
            expect(result).toBe('p-4');
        });
    });

    // =====================================================================
    // 🧭 Test Navigation Component
    // =====================================================================
    describe('Navigation component', () => {
        let originalClipboard: any;
        let originalSetTimeout: typeof setTimeout;
        let mockWriteText: any;
        let capturedTimeoutCb: Function | null = null;

        beforeAll(() => {
            originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
            originalSetTimeout = setTimeout;

            mockWriteText = mock(() => Promise.resolve());
            
            Object.defineProperty(navigator, 'clipboard', {
                value: {
                    writeText: mockWriteText
                },
                configurable: true,
                writable: true
            });

            globalThis.setTimeout = ((cb: Function, delay: number) => {
                capturedTimeoutCb = cb;
                return 123 as any;
            }) as any;
        });

        afterAll(() => {
            if (originalClipboard) {
                Object.defineProperty(navigator, 'clipboard', originalClipboard);
            } else {
                Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true, writable: true });
            }
            globalThis.setTimeout = originalSetTimeout;
        });

        test('renders logo and navigation links', () => {
            render(<Navigation />);
            
            expect(screen.getAllByText('Soham Vyas').length).toBeGreaterThan(0);
            expect(screen.getAllByText('About').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Labs').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Open Source').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Research').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
        });

        test('copies email to clipboard and updates UI state', () => {
            render(<Navigation />);
            const emailButtons = screen.getAllByTitle('Copy Email');
            const emailButton = emailButtons[0];
            
            expect(emailButton.textContent).toContain('Email');
            
            act(() => {
                fireEvent.click(emailButton);
            });
            
            expect(mockWriteText).toHaveBeenCalledWith('hello@soham.lol');
            expect(emailButton.textContent).toContain('Copied!');
            
            if (capturedTimeoutCb) {
                act(() => {
                    capturedTimeoutCb();
                });
            }
            expect(emailButton.textContent).toContain('Email');
        });
    });

    // =====================================================================
    // 🚀 Test Hero Component
    // =====================================================================
    describe('Hero component', () => {
        test('renders profile name, education, focus areas and summary card', () => {
            render(<Hero />);
            
            const names = screen.getAllByText('Soham Vyas');
            expect(names.length).toBeGreaterThan(0);
            
            expect(screen.getByText('Professional Summary')).not.toBeNull();
            expect(screen.getAllByText(/technology-driven student/i).length).toBeGreaterThan(0);

            expect(screen.getByText(/Bachelor of Science – Data Science/i)).not.toBeNull();
            expect(screen.getAllByText(/Indian Institute of Technology \(IIT\) Jodhpur/i).length).toBeGreaterThan(0);
            
            expect(screen.getByText(/Programming & Computational Thinking/)).not.toBeNull();
            expect(screen.getByText(/Statistics & Mathematics/)).not.toBeNull();
        });
    });

    // =====================================================================
    // 💻 Test Projects Component
    // =====================================================================
    describe('Projects component', () => {
        test('renders real featured projects and filter controls', () => {
            render(<Projects />);
            
            expect(screen.getByText('Featured Engineering Projects')).not.toBeNull();
            expect(screen.getByText('Cybersecurity Risk Analyzer')).not.toBeNull();
            expect(screen.getByText('AI Rate Limiter Shield')).not.toBeNull();
            expect(screen.getByText('SchemaGuard')).not.toBeNull();
            expect(screen.getByText('Neural TTS')).not.toBeNull();
            expect(screen.getByText('MediPro')).not.toBeNull();
            expect(screen.getByText('Soham Crypto Tracker')).not.toBeNull();
            expect(screen.getByText('SocialLogger')).not.toBeNull();
            expect(screen.getByText('Interactive Neural Speech Demo')).not.toBeNull();
        });

        test('NeuralAudioPreview renders and toggles playback state', () => {
            render(<NeuralAudioPreview />);
            expect(screen.getByText('Interactive Neural Speech Demo')).not.toBeNull();
            expect(screen.getByText('24kHz HiFi-GAN')).not.toBeNull();
            const playBtn = screen.getByLabelText(/Play voice sample/i);
            expect(playBtn).not.toBeNull();
            fireEvent.click(playBtn);
            // Toggle stop
            fireEvent.click(playBtn);
        });
    });

    // =====================================================================
    // 🧪 Test InteractivePlayground Component (Live Simulators)
    // =====================================================================
    describe('InteractivePlayground component', () => {
        test('renders simulators and performs real-time calculations', () => {
            render(<InteractivePlayground />);
            
            expect(screen.getByText('Live In-Browser System Simulators')).not.toBeNull();
            expect(screen.getByText(/Cybersecurity Entropy Lab/)).not.toBeNull();
            expect(screen.getByText(/Atomic Rate Limiter/)).not.toBeNull();

            // Switch to rate limiter lab
            const rateLimitTab = screen.getByText(/Atomic Rate Limiter/);
            act(() => {
                fireEvent.click(rateLimitTab);
            });

            // Find send request button and click
            const fireButton = screen.getByText(/Send API Request/);
            expect(fireButton).not.toBeNull();
            act(() => {
                fireEvent.click(fireButton);
            });

            expect(screen.getByText(/Authorized \(200\)/)).not.toBeNull();
        });
    });

    // =====================================================================
    // 🔍 Test CommandPalette Component (Ctrl+K)
    // =====================================================================
    describe('CommandPalette component', () => {
        test('renders trigger button and opens modal on click', () => {
            render(<CommandPalette />);
            
            const trigger = screen.getByTitle('Open Command Palette (Ctrl+K)');
            expect(trigger).not.toBeNull();

            act(() => {
                fireEvent.click(trigger);
            });

            expect(screen.getByPlaceholderText(/Type a command/i)).not.toBeNull();
        });
    });

    // =====================================================================
    // 🌐 Test OpenSource Component
    // =====================================================================
    describe('OpenSource component', () => {
        test('renders SymPy contributions and GSoC 2027 information', () => {
            render(<OpenSource />);
            
            expect(screen.getByText('SymPy & Mathematical Systems')).not.toBeNull();
            expect(screen.getAllByText(/KroneckerProduct\.trace\(\)/).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/MatrixUnit\.trace\(\)/).length).toBeGreaterThan(0);
            expect(screen.getByText('GSoC 2027 Candidate')).not.toBeNull();
        });
    });

    // =====================================================================
    // 📚 Test FeaturedResearch Component
    // =====================================================================
    describe('FeaturedResearch component', () => {
        test('renders SymPy Kronecker trace spotlight and research articles', () => {
            render(<FeaturedResearch />);
            
            expect(screen.getByText('Latest Engineering Research')).not.toBeNull();
            expect(screen.getByText(/How I Eliminated O\(n³\) Matrix Expansion/i)).not.toBeNull();
            expect(screen.getByText(/Atomic Redis Lua/i)).not.toBeNull();
            expect(screen.getByText(/Shannon Entropy/i)).not.toBeNull();
            expect(screen.getByText(/Complexity: O\(n³\) → O\(1\)/i)).not.toBeNull();
        });
    });

    // =====================================================================
    // ⚡ Test Skills Component
    // =====================================================================
    describe('Skills component', () => {
        test('renders skill categories and concrete tools', () => {
            render(<Skills />);
            
            expect(screen.getByText('Tools, Languages & Frameworks')).not.toBeNull();
            expect(screen.getByText('Programming Languages')).not.toBeNull();
            expect(screen.getByText('AI & Machine Learning')).not.toBeNull();
            expect(screen.getByText('Backend & Systems')).not.toBeNull();
            expect(screen.getByText('Data Engineering')).not.toBeNull();
            expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
            expect(screen.getAllByText('FastAPI').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Redis').length).toBeGreaterThan(0);
        });
    });

    // =====================================================================
    // 📬 Test Contact Component
    // =====================================================================
    describe('Contact component', () => {
        test('renders contact channels, email and quick note console', () => {
            render(<Contact />);
            
            expect(screen.getByText(/Let's Build Something Significant/i)).not.toBeNull();
            expect(screen.getAllByText('hello@soham.lol').length).toBeGreaterThan(0);
            expect(screen.getByText('@vyassoham')).not.toBeNull();
            expect(screen.getByText('/in/vyassoham')).not.toBeNull();
            expect(screen.getByText('Send a Direct Quick Note')).not.toBeNull();
        });

        test('QuickNoteBox validates input and handles dispatch workflow', () => {
            const { container } = render(<QuickNoteBox />);
            
            expect(screen.getByText('Send a Direct Quick Note')).not.toBeNull();
            expect(screen.getByText('GSoC 2027 Mentorship')).not.toBeNull();

            const form = container.querySelector('form')!;
            fireEvent.submit(form);

            // Validation error when empty
            expect(screen.getByText(/Please enter your name/i)).not.toBeNull();

            // Fill inputs
            fireEvent.change(screen.getByPlaceholderText(/Dr\. Leslie Lamport/i), {
                target: { value: 'Ada Lovelace' },
            });
            fireEvent.change(screen.getByPlaceholderText(/recruiter@company\.com/i), {
                target: { value: 'ada@computing.org' },
            });
            fireEvent.change(screen.getByPlaceholderText(/Tell me about your research proposal/i), {
                target: { value: 'Excited about your SymPy Kronecker optimizations.' },
            });

            fireEvent.submit(form);
        });
    });

    // =====================================================================
    // 📄 Test Footer Component
    // =====================================================================
    describe('Footer component', () => {
        test('renders copyright notice with current year', () => {
            render(<Footer />);
            const currentYear = new Date().getFullYear().toString();
            
            const copyrightText = screen.getByText((content) => {
                return content.includes('Soham Vyas') && content.includes(currentYear);
            });
            expect(copyrightText).not.toBeNull();
        });
    });

    // =====================================================================
    // 🎨 Test InteractiveBackground & SecurityLayer
    // =====================================================================
    describe('Supporting Components', () => {
        test('InteractiveBackground renders without crashing', () => {
            const { unmount } = render(<InteractiveBackground />);
            expect(true).toBe(true);
            unmount();
        });

        test('SecurityLayer renders without crashing', () => {
            const { unmount } = render(<SecurityLayer />);
            expect(true).toBe(true);
            unmount();
        });
    });

    // =====================================================================
    // ☕ Test InteractiveCoffee Component
    // =====================================================================
    describe('InteractiveCoffee component', () => {
        test('renders coffee mug and handles sipping interaction', () => {
            render(<InteractiveCoffee />);
            const sipButton = screen.getByText(/Click to Sip/i);
            expect(sipButton).not.toBeNull();
            expect(screen.getByText(/0 sips · 0mg/i)).not.toBeNull();

            // Click to take a sip
            fireEvent.click(sipButton);
            expect(screen.getByText(/1 sips · 65mg/i)).not.toBeNull();
            expect(screen.getByText(/\+65mg Caffeine Ingested!/i)).not.toBeNull();
        });
    });

    // =====================================================================
    // 🚫 Test 404 NotFound Page
    // =====================================================================
    describe('NotFound 404 page', () => {
        test('renders 404 heading, authentic famous quotes, and interactive terminal', () => {
            render(<NotFound />);
            expect(screen.getByText(/ROUTE_UNDEFINED/i)).not.toBeNull();
            expect(screen.getByText(/Linus Torvalds/i)).not.toBeNull();
            expect(screen.getByText(/Talk is cheap. Show me the code./i)).not.toBeNull();
            expect(screen.getByText(/Return to Portfolio/i)).not.toBeNull();
            expect(screen.getByPlaceholderText(/type 'home'/i)).not.toBeNull();
        });
    });

    // =====================================================================
    // 🌓 Test ThemeToggle Component & Theme Engine
    // =====================================================================
    describe('ThemeToggle component & Theme Engine', () => {
        test('renders theme toggle button and toggles between light and dark mode', () => {
            // Reset to dark mode
            applyTheme('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);

            render(<ThemeToggle />);
            const button = screen.getByRole('button', { name: /switch to light mode/i });
            expect(button).not.toBeNull();

            // Toggle to Light Mode
            fireEvent.click(button);
            expect(document.documentElement.classList.contains('light')).toBe(true);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(localStorage.getItem('theme')).toBe('light');

            // Toggle back to Dark Mode
            fireEvent.click(button);
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(document.documentElement.classList.contains('light')).toBe(false);
            expect(localStorage.getItem('theme')).toBe('dark');
        });

        test('applyTheme directly configures classes, attributes and events', () => {
            applyTheme('light');
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
            expect(document.documentElement.classList.contains('light')).toBe(true);

            applyTheme('dark');
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
    });

    // =====================================================================
    // 🎭 Test 3D Hover & Scroll Dynamics
    // =====================================================================
    describe('3D Hover & Scroll Dynamics', () => {
        test('TiltCard renders content and handles mouse hovering 3D physics', () => {
            const { container } = render(
                <TiltCard maxTilt={10}>
                    <span>3D Content</span>
                </TiltCard>
            );

            expect(screen.getByText('3D Content')).not.toBeNull();
            const card = container.firstChild as HTMLElement;

            // Trigger mouse move to calculate tilt
            fireEvent.mouseMove(card, { clientX: 100, clientY: 50 });
            // Trigger mouse leave to reset
            fireEvent.mouseLeave(card);
            expect(card.style.transform).toContain('rotateX(0deg)');
        });

        test('ScrollProgress renders without crashing', () => {
            const { unmount } = render(<ScrollProgress />);
            expect(true).toBe(true);
            unmount();
        });

        test('ScrollReveal renders wrapped children', () => {
            render(
                <ScrollReveal>
                    <div>Spatial Reveal Item</div>
                </ScrollReveal>
            );
            expect(screen.getByText('Spatial Reveal Item')).not.toBeNull();
        });

        test('Parallax3DBackground renders without crashing', () => {
            const { unmount } = render(<Parallax3DBackground />);
            expect(true).toBe(true);
            unmount();
        });
    });

    // =====================================================================
    // 📖 Test ArticleShareAndCite Component
    // =====================================================================
    describe('ArticleShareAndCite component', () => {
        test('renders share buttons, academic citation and handles copying', () => {
            render(
                <ArticleShareAndCite
                    title="How I Eliminated O(n³) Matrix Expansion in SymPy Kronecker Traces"
                    slug="sympy-kronecker-trace"
                />
            );

            expect(screen.getByText('Share & Discuss This Paper')).not.toBeNull();
            expect(screen.getByText('Share on X')).not.toBeNull();
            expect(screen.getByText('LinkedIn')).not.toBeNull();
            expect(screen.getByText('Academic Citation & Reference')).not.toBeNull();

            // Toggle BibTeX code view
            const showBtn = screen.getByText('Show BibTeX');
            fireEvent.click(showBtn);
            expect(screen.getByText(/@article\{vyas2026/)).not.toBeNull();

            // Copy link button click
            const copyLinkBtn = screen.getByText('Copy Link');
            fireEvent.click(copyLinkBtn);

            // Copy BibTeX click
            const copyBibtexBtn = screen.getByText('Copy BibTeX');
            fireEvent.click(copyBibtexBtn);
        });
    });
});
