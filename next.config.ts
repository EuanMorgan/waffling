import type { NextConfig } from "next";
// biome-ignore lint/correctness/noUnusedImports: we need to validate the env at build time
import { env as _validateEnvAtBuildTime } from "./src/env";

const nextConfig: NextConfig = {
	// We typecheck and lint in CI so don't want these to stop builds succeeding
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	output: "standalone",
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default nextConfig;
