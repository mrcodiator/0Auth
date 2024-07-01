/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.html$/,
            use: 'ignore-loader'
        });
        return config;
    },

};

export default nextConfig;
