/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["i.imgur.com", "www.notion.so", "images.unsplash.com", "s3.us-west-2.amazonaws.com", "avatars.githubusercontent.com"],
        format: ["image/png", "image/webp", "image/jpeg"],
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        INFLUX_URL: process.env.INFLUX_URL,
        INFLUX_TOKEN: process.env.INFLUX_TOKEN,
        INFLUX_ORG: process.env.INFLUX_ORG,
        INFLUX_BUCKET: process.env.INFLUX_BUCKET,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        // Pass through env variables
        INFLUX_URL: process.env.INFLUX_URL,
        INFLUX_TOKEN: process.env.INFLUX_TOKEN,
        INFLUX_ORG: process.env.INFLUX_ORG,
        INFLUX_BUCKET: process.env.INFLUX_BUCKET,
    },
};

module.exports = nextConfig;
