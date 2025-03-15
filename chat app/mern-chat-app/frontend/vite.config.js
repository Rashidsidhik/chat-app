import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000, // Load from .env
		proxy: {
			"/api": {
				target: "https://chat-app-f6cv.onrender.com",
			
				

			},
		},
	},
});
