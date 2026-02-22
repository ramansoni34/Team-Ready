import { writable } from 'svelte/store';

// Svelte 4 style stores (as current dependencies use Svelte 4)
// If migrating to Svelte 5 runes later, these would become $state
export const todoList = writable([
    { id: 1, text: "Design Login Screen", status: "complete" },
    { id: 2, text: "Implement API Client", status: "complete" },
    { id: 3, text: "Write Unit Tests", status: "pending" }
]);

export const chatMessages = writable([
    { sender: 'System', text: 'System online. Waiting for input.', type: 'system' },
    { sender: 'Boss', text: 'Start the initial audit.', type: 'user' }
]);

export const agentLogs = writable([
    "E1 edited file main.py",
    "E2 discussed API integration",
    "E3 reviewed PR #45"
]);
