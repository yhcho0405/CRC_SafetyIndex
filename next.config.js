/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "i.imgur.com",
            "www.notion.so",
            "images.unsplash.com",
            "s3.us-west-2.amazonaws.com",
            "avatars.githubusercontent.com",
        ],
        format: ["image/png", "image/webp", "image/jpeg"],
    },
};

module.exports = nextConfig;
