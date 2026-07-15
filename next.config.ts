import type { NextConfig } from "next";

// No remotePatterns: every image ships from public/ (see docs/design/image-sources.json).
// A new remote image URL should fail loudly here rather than quietly reintroduce a
// runtime dependency on a third-party host.
const nextConfig: NextConfig = {};

export default nextConfig;
