/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    'http://192.168.0.125:3002', // Replace with your actual IP if different
    'http://localhost:3002'
  ]
}

module.exports = nextConfig
