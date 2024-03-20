/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.us1.twilio.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
