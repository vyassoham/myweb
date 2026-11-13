import { expect, test, describe, beforeAll, afterAll, mock } from 'bun:test';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

// Import modules to test
import Footer from '../app/components/Footer';
import Navigation from '../app/components/Navigation';
import Hero from '../app/components/Hero';
import Projects from '../app/components/Projects';
import OpenSource from '../app/components/OpenSource';
import Skills from '../app/components/Skills';
import Contact from '../app/components/Contact';
import SecurityLayer from '../app/components/SecurityLayer';
import InteractivePlayground from '../app/components/InteractivePlayground';
import CommandPalette from '../app/components/CommandPalette';
import InteractiveBackground from '../app/components/InteractiveBackground';
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
        test('renders contact channels and email', () => {
            render(<Contact />);
            
            expect(screen.getByText(/Let's Build Something Significant/i)).not.toBeNull();
            expect(screen.getAllByText('hello@soham.lol').length).toBeGreaterThan(0);
            expect(screen.getByText('@vyassoham')).not.toBeNull();
            expect(screen.getByText('/in/vyassoham')).not.toBeNull();
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
});
