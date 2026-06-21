import { Window } from 'happy-dom';
import { mock } from 'bun:test';
import React from 'react';

const window = new Window();

// Wrap addEventListener to guarantee React 19 / Happy DOM compatibility
const originalAddEventListener = window.document.addEventListener;
window.document.addEventListener = function(type: string, listener: any, options?: any) {
  const wrappedListener = function(this: any, event: any) {
    try {
      return listener.call(this, event);
    } catch (err) {
      console.error(`Error in "${type}" listener:`, err);
    }
  };
  (wrappedListener as any)._original = listener;
  return originalAddEventListener.call(this, type, wrappedListener, options);
};

const originalRemoveEventListener = window.document.removeEventListener;
window.document.removeEventListener = function(type: string, listener: any, options?: any) {
  return originalRemoveEventListener.call(this, type, listener, options);
};

// Register DOM globals
globalThis.window = window as any;
globalThis.document = window.document as any;
globalThis.navigator = window.navigator as any;
globalThis.Event = window.Event as any;
globalThis.MouseEvent = window.MouseEvent as any;
globalThis.KeyboardEvent = window.KeyboardEvent as any;

// Mock next/image so we don't need a Next.js server context to test components rendering images
mock.module('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    const srcStr = typeof src === 'object' ? src.src || '' : src;
    const cleanProps = { ...rest };
    delete cleanProps.priority;
    return React.createElement('img', { src: srcStr, alt, ...cleanProps });
  }
}));

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver as any;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver as any;
