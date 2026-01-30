"use client";

import { useEffect } from "react";

export default function SecurityLayer(): null {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable copy
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable cut
        const handleCut = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable paste
        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable text selection via keyboard
        const handleKeyDown = (e: KeyboardEvent) => {
            // Disable Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A
            if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'v', 'a', 'u', 's'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                return false;
            }

            // Disable F12 (DevTools)
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }

            // Disable Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }
        };

        // Disable drag and drop
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCut);
        document.addEventListener('paste', handlePaste);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCut);
            document.removeEventListener('paste', handlePaste);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    return null;
}
