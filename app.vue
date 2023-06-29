<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const cookie = useCookie("token", {
	path: "/",
	maxAge: 60 * 60 * 24 * 7,
});
onMounted(async () => {
	const token = cookie.value;
	if (token) {
		const { user } = await fetch(`https://api.umaestro.fr/auth/user`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
		authStore.login(token, user);
	} else {
		if (!route.query.code) return;

		const { token, user } = await fetch(
			`https://api.umaestro.fr/auth/user/code?code=${route.query.code}`
		).then((res) => res.json());

		if (!token) return;

		authStore.login(token.token, user);
		cookie.value = token.token;
		router.push("/");
	}
});
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
