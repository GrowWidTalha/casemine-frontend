// utils/socket.ts (for TypeScript) or utils/socket.js (for JS)
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000"; // Your backend URL

    socket = io(URL, {
      transports: ["websocket"], // prefer websocket
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection events
    socket.on("connect", () => {
      console.log("[Socket.IO] ✅ Connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("[Socket.IO] ❌ Disconnected:", reason);
    });

    // Heartbeat monitoring
    socket.io.on("ping", () => {
      console.log("[Socket.IO] 🏓 Ping sent to server");
    });

    socket.on("pong", (latency) => {
      console.log(
        "[Socket.IO] 🏓 Pong received from server. Latency:",
        latency,
        "ms"
      );
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket.IO] ❌ Connection Error:", err.message);
    });
  }

  return socket;
};
