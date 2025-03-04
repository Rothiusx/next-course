import type { NextConfig } from 'next'
import '@/env'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['.'],
  },
  /* config options here */
}

export default nextConfig
