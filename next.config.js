/** @type {import('next').NextConfig} */
const withExportImages = require('next-export-optimize-images')

const nextConfig = withExportImages({
    output: 'export',
    reactStrictMode: true,
})

module.exports = nextConfig
