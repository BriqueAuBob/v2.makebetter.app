import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async () => {
	const authStore = useAuthStore();
	const cookie = useCookie("token", {
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
	});
	if (!authStore.isLoggedIn) {
		const token = cookie.value;
		if (token) {
			const { user } = await fetch(`https://api.umaestro.fr/auth/user`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => res.json());
			authStore.login(token, user);
		}
	}
});
