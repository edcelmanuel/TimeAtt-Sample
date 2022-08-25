/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    secret: "Ampogi Mo Edcel",
  },
  publicRuntimeConfig: {
    apiUrl: "/api",
    webSocket:
      process.env.NEXT_PUBLIC_ENV_TYPE === "dev"
        ? "ws://192.168.227.62:2020"
        : process.env.NEXT_PUBLIC_ENV_TYPE === "qa"
        ? "ws://192.168.227.62:2020"
        : "ws://responde.ebizolution.com:2020",
  },
}

module.exports = nextConfig
