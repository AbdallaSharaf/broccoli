/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["res.cloudinary.com"], // Allow images from Cloudinary
      },
};

// Apply the next-intl plugin to the Next.js config
export default nextConfig;
