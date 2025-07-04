import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url(),
	},
	client: {
		// NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_BASE_URL: z.string(),
	},

	experimental__runtimeEnv: {
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	},
	emptyStringAsUndefined: true,
});
