<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleDark = () => {
	colorMode.value = isDark.value ? "light" : "dark";
};
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
				<li><NuxtLink to="#">Outils</NuxtLink></li>
				<li>
					<NuxtLink
						to="https://umaestro.fr/recrutements"
						target="_blank"
					>
						Recrutements
					</NuxtLink>
				</li>
			</ul>
		</div>
		<div class="flex items-center gap-8">
			<button class="text-gray-100" @click="toggleDark">
				<NuxtIcon name="moon" v-if="!isDark" class="icon big" />
				<NuxtIcon name="sun" v-else class="icon big" />
			</button>
			<UIButton color="light">Accéder à mon compte</UIButton>
		</div>
	</nav>
</template>
