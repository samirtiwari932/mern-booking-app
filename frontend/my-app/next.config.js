// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
