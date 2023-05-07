/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

const nextConfig = {
  basePath: '/' + repo,
  assetPrefix: '/' + repo + '/',
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withVanillaExtract(nextConfig);
