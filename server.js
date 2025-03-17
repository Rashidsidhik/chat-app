import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import { SpinUp } from "spin-up-ping";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));


app.get("/test", (req, res) => {
	res.send("okkkk");
});


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public', 'index.html'));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
	// Initialize SpinUp-Ping
	const pinger = new SpinUp({
		url: "https://chat-app-f6cv.onrender.com", // Replace with your actual server URL
		intervalMinutes: 5, // Ping every 5 minutes
		onSuccess: (response) => {
			console.log("✅ Ping successful:", response);
		},
		onError: (error) => {
			console.error("❌ Ping failed:", error);
		},
	});

	// Start pinging
	pinger.start();
});
