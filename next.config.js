/* eslint-disable @typescript-eslint/no-var-requires */
const withTwin = require('./withTwin')

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
