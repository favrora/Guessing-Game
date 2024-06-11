// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill for setImmediate and clearImmediate functions for environments where they are not defined.
(global as any).setImmediate = (callback: (...args: any[]) => void, ...args: any[]) => setTimeout(callback, 0, ...args);
(global as any).clearImmediate = (id: NodeJS.Immediate) => clearTimeout(id as unknown as NodeJS.Timeout);
