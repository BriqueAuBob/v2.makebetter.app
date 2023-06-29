import { defineStore } from "pinia";

type AuthState = {
	token: string | null;
	user: any;
};

export const useAuthStore = defineStore({
	id: "auth",
	state: () =>
		<AuthState>{
			token: null,
			user: null,
		},
	getters: {
		isLoggedIn: (state) => !!state.token,
	},
	actions: {
		login(token: string, user: object) {
			this.token = token;
			this.user = user;
		},
		logout() {
			this.token = null;
			this.user = null;
		},
	},
});
