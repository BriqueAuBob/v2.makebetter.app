<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleDark = () => {
	colorMode.value = isDark.value ? "light" : "dark";
};

const authUrl = computed(() => {
	return `https://auth.umaestro.fr/?redirect_uri=${encodeURIComponent(
		window ? window.location.href : ""
	)}`;
});

const authStore = useAuthStore();
</script>

<template>
	<nav
		class="container absolute left-1/2 top-0 z-10 mx-auto flex -translate-x-1/2 items-center justify-between py-6"
	>
		<div class="flex items-center gap-8">
			<NuxtLink
				class="flex items-center gap-2 font-display text-lg font-bold text-white"
				id="branding"
				to="/"
			>
				<nuxt-img class="h-7 w-7" src="/images/makebetter.svg" />
				makebetter.app
			</NuxtLink>
			<ul class="flex items-center gap-6 text-sm text-gray-300">
				<li>
					<NuxtLink to="#">{{ $t("navigation.tools") }}</NuxtLink>
				</li>
				<li>
					<NuxtLink
						to="https://umaestro.fr/recrutements"
						target="_blank"
					>
						{{ $t("navigation.hiring") }}
					</NuxtLink>
				</li>
			</ul>
		</div>
		<div class="flex items-center gap-8">
			<button class="text-gray-100" @click="toggleDark">
				<NuxtIcon name="moon" v-if="!isDark" class="icon big" />
				<NuxtIcon name="sun" v-else class="icon big" />
			</button>
			<ClientOnly>
				<UIButton
					v-if="!authStore.isLoggedIn"
					:href="authUrl"
					color="light"
					>{{ $t("navigation.login") }}</UIButton
				>
				<UIButton
					v-else
					href="/account"
					color="light"
					class="flex items-center gap-2"
				>
					<img
						:src="authStore.user.avatar"
						class="h-7 w-7 rounded-full"
					/>
					{{ authStore.user.username }}
				</UIButton>
			</ClientOnly>
		</div>
	</nav>
</template>
