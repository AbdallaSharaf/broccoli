/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["res.cloudinary.com"], // Allow images from Cloudinary
      },
};

export default nextConfig;
