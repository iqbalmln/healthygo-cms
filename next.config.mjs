function getApiHostPattern() {
  if (!process.env.NEXT_PUBLIC_API_URL) return [];
  const url = new URL(process.env.NEXT_PUBLIC_API_URL);
  return [{ protocol: url.protocol.replace(":", ""), hostname: url.hostname }];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [{ protocol: "http", hostname: "localhost" }, ...getApiHostPattern()],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/default",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
