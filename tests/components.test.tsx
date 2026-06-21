import { expect, test, describe, beforeAll, afterAll, mock } from 'bun:test';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

// Import modules to test
import Footer from '../app/components/Footer';
import SecurityLayer from '../app/components/SecurityLayer';
import Navigation from '../app/components/Navigation';
import Hero from '../app/components/Hero';
import { cn } from '../lib/utils';

describe('myweb Project Test Suite', () => {

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
    // 🔒 Test SecurityLayer Component
    // =====================================================================
    describe('SecurityLayer component', () => {
        let container: { unmount: () => void };

        beforeAll(() => {
            container = render(<SecurityLayer />);
        });

        afterAll(() => {
            container.unmount();
        });

        test('prevents right-click (contextmenu)', () => {
            const event = new window.MouseEvent('contextmenu', { cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents copy command', () => {
            const event = new window.Event('copy', { cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents cut command', () => {
            const event = new window.Event('cut', { cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents paste command', () => {
            const event = new window.Event('paste', { cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents drag start', () => {
            const event = new window.Event('dragstart', { cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents DevTools keys (F12)', () => {
            const event = new window.KeyboardEvent('keydown', { key: 'F12', cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents copy shortcut (Ctrl+C)', () => {
            const event = new window.KeyboardEvent('keydown', { ctrlKey: true, key: 'c', cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('prevents select all shortcut (Meta+A)', () => {
            const event = new window.KeyboardEvent('keydown', { metaKey: true, key: 'a', cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test('allows regular keystrokes (e.g. typing)', () => {
            const event = new window.KeyboardEvent('keydown', { key: 't', cancelable: true });
            document.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(false);
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

            // Mock setTimeout to immediately capture and call callback
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
            
            expect(screen.getByText('Soham Vyas')).not.toBeNull();
            expect(screen.getByText('Experience')).not.toBeNull();
            expect(screen.getByText('Projects')).not.toBeNull();
            expect(screen.getByText('Stats')).not.toBeNull();
        });

        test('copies email to clipboard and updates UI state', () => {
            render(<Navigation />);
            const emailButton = screen.getByTitle('Copy Email');
            
            expect(emailButton.textContent).toContain('Email');
            
            // Trigger copy click
            act(() => {
                fireEvent.click(emailButton);
            });
            
            // Verify clipboard write call
            expect(mockWriteText).toHaveBeenCalledWith('hello@soham.lol');
            
            // Verify button text changed to Copied!
            expect(emailButton.textContent).toContain('Copied!');
            
            // Verify that after timeout runs, label is restored to Email
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
            expect(screen.getByText(/technology-driven student/i)).not.toBeNull();

            expect(screen.getByText('Education')).not.toBeNull();
            expect(screen.getByText('Indian Institute of Technology (IIT) Jodhpur')).not.toBeNull();
            
            expect(screen.getByText(/Programming & Computational Thinking/)).not.toBeNull();
            expect(screen.getByText(/Statistics & Mathematics/)).not.toBeNull();
        });
    });

});
