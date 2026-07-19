import type { NextConfig } from "next";
const nextConfig: NextConfig = { output:"standalone", images:{remotePatterns:[{protocol:"https",hostname:"imglinkv-3.vercel.app"}]}, typescript:{ignoreBuildErrors:true}, reactStrictMode:false };
export default nextConfig;
