import { io } from "socket.io-client";
import { chatMessages } from "./stores.js";

let socket;

export const initSocket = () => {
    socket = io();

    socket.on("connect", () => {
        console.log("Connected to backend via Socket.IO");
    });

    socket.on("response", (data) => {
        chatMessages.update(messages => [
            ...messages,
            { sender: 'System', text: data.data, type: 'system' }
        ]);
    });

    return socket;
};

export const sendCommand = (text) => {
    if (socket) {
        socket.emit("message", text);
    } else {
        console.warn("Socket not initialized");
    }
};

export const apiLogin = async (username, password) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return await response.json();
};

export const apiSignUp = async (fullName, email, password) => {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
    });
    return await response.json();
};

export const apiForgotPassword = async (email) => {
    const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return await response.json();
};
