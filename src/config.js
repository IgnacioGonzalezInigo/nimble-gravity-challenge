const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};

if (!config.apiBaseUrl) {
    throw new Error("Falta configurar VITE_API_BASE_URL en el archivo .env");
}

export default config;
