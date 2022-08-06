/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['immer']);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/wall-window-facade',
}

module.exports = withTM(nextConfig);
