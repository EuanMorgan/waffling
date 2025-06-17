"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const handleSignUp = async () => {
		await authClient.signUp.email(
			{ email, password, name },
			{
				onError: () => {
					window.alert("Something went wrong");
				},
				onSuccess: () => {
					window.alert("success");
				},
			},
		);
	};

	const { data: session } = authClient.useSession();

	return (
		<div className="p-4 flex flex-col gap-y-4">
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<Input
				placeholder="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button onClick={handleSignUp}>Sign Up</Button>
		</div>
	);
}
