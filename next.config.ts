import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    const backendOrigin = apiBase.replace(/\/api\/?$/, "");
    if (!backendOrigin) return [];
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendOrigin}/uploads/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: (() => {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
      const backendOrigin = apiBase.replace(/\/api\/?$/, "");
      const extraPatterns: Array<{
        protocol: "http" | "https";
        hostname: string;
        port?: string;
      }> = [];
      try {
        if (backendOrigin) {
          const u = new URL(backendOrigin);
          const protocol = u.protocol.replace(":", "") as "http" | "https";
          if (u.hostname && (protocol === "http" || protocol === "https")) {
            extraPatterns.push({
              protocol,
              hostname: u.hostname,
              port: u.port || undefined,
            });
          }
        }
      } catch {
        // ignore parse errors
      }
      return [
        { protocol: "http", hostname: "localhost", port: "3000" },
        { protocol: "http", hostname: "localhost", port: "3001" },
        { protocol: "http", hostname: "localhost", port: "5000" },
        { protocol: "http", hostname: "127.0.0.1", port: "5000" },
        { protocol: "https", hostname: "**" },
        ...extraPatterns,
      ];
    })(),
  },
};

export default nextConfig;
