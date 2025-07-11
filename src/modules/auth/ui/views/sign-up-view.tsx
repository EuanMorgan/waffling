"use client";

import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";

const schema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(1, "Password is required"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const SignUpView = () => {
	const form = useForm({
		schema,
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);
	const onSubmit = (data: z.infer<typeof schema>) => {
		setError(null);
		setPending(true);

		authClient.signUp.email(
			{
				name: data.name,
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: () => {
					router.push("/");
				},
				onError: ({ error }) => {
					setError(error.message ?? "An error occurred");
				},
				onResponse: () => {
					setPending(false);
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Let&apos;s get started</h1>
									<p className="text-muted-foreground text-balance">
										Create your account
									</p>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="text"
														placeholder="Waffles the cat"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input {...field} type="email" placeholder="Email" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="password"
														placeholder="********"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="password"
														placeholder="********"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{!!error && (
									<Alert className="bg-destructive/10 border-none">
										<OctagonAlertIcon className="h-4 w-4 !text-destructive" />
										<AlertTitle>{error}</AlertTitle>
									</Alert>
								)}
								<Button disabled={pending} type="submit" className="w-full">
									Sign Up
								</Button>
								<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
									<span className="bg-card text-muted-foreground relative z-10 px-2">
										Or continue with
									</span>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<Button
										disabled={pending}
										variant={"outline"}
										type="button"
										className="w-full"
									>
										Google
									</Button>
									<Button
										disabled={pending}
										variant={"outline"}
										type="button"
										className="w-full"
									>
										GitHub
									</Button>
								</div>
								<div className="text-center text-sm">
									Already have an account?{" "}
									<Link
										href="/sign-in"
										className="underline underline-offset-4"
									>
										Sign in
									</Link>
								</div>
							</div>
						</form>
					</Form>
					<div className="bg-radial from-purple-700 to-purple-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
						{/** biome-ignore lint/performance/noImgElement: nah */}
						<img src="/logo.png" alt="" className="h-[92px] w-[92px]" />
						<p className="text-2xl font-semibold text-white">waffling</p>
					</div>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our{" "}
				{/** biome-ignore lint/a11y/useValidAnchor: nah */}
				<a href="#">Terms of service</a> and{" "}
				{/** biome-ignore lint/a11y/useValidAnchor: nah */}
				<a href="#">Privacy policy</a>
			</div>
		</div>
	);
};
