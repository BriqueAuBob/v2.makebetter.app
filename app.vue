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
	if (!route.query.code) return;

	const { token, user } = await fetch(
		`https://api.umaestro.fr/auth/user/code?code=${route.query.code}`
	).then((res) => res.json());

	if (!token) return;

	authStore.login(token.token, user);
	cookie.value = token.token;
	router.push("/");
});
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
