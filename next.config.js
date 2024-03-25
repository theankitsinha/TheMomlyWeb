/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'themomly.com',
            },
            {
                protocol: 'https',
                hostname: '*.themomly.com',
            }, {
                hostname: 'jano-html.ibthemespro.com',
            },
            {
                protocol: 'https',
                hostname: 'themomly.s3.ap-south-1.amazonaws.com',
            },
        ],
    },
};

module.exports = nextConfig;
