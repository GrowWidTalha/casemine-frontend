// utils/socket.ts (for TypeScript) or utils/socket.js (for JS)
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Your backend URL
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user?.id || user?._id || "";

    socket = io(URL, {
      query: { userId }, // ⬅ Pass userId here
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
    // Custom heartbeat (every 10 seconds)
    setInterval(() => {
      if (socket?.connected) {
        console.log("[Heartbeat] 🔘 Sending ping...");
        socket.emit("ping_from_client");
      }
    }, 10000); // 10 seconds

    socket.on("pong_from_server", () => {
      console.log("[Heartbeat] 🟢 Pong received from server");
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket.IO] ❌ Connection Error:", err.message);
    });
  }

  return socket;
};
