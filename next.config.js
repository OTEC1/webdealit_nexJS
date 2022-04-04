/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  
}

module.exports = {
  images:{
    loader: 'imgix',
    path: '/',
  },
  generateEtags: false,
}

module.exports = nextConfig
