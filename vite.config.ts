import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "pwa-icon.png"],
            manifest: {
                name: "Aplicacion de Meditaciones",
                short_name: "Nada",
                description: "Aplicacion de meditaciones en PWA",
                theme_color: "#C0C0C0",
                background_color: "#C0C0C0",
                display: "fullscreen",
                start_url: "/",
                scope: "/",
                orientation: "portrait",
                icons: [
                    {
                        src: "nadaImagen.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "nadaImagen.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
                maximumFileSizeToCacheInBytes: 7340032
            }
        })
    ],
});