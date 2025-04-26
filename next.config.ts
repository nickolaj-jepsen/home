import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    reactStrictMode: true,
    images: { unoptimized: true },
};

export default nextConfig;
