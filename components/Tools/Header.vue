<script setup lang="ts">
defineProps({
	platform: {
		type: String,
		default: "discord",
	},
	title: {
		type: String,
		default: "Discord Embed Builder",
	},
	description: {
		type: String,
		default: "Créez facilement des embeds pour votre serveur Discord",
	},
	image: {
		type: String,
		default: "/images/backgrounds/tools/discord.jpg",
	},
	buttonText: {
		type: String,
	},
});

const hasScrolled = ref(false);

onMounted(() => {
	window.addEventListener("scroll", () => {
		if (window.scrollY > 100) {
			hasScrolled.value = true;
		} else {
			hasScrolled.value = false;
		}
	});
});
</script>

<template>
	<header
		class="bg-cover bg-center bg-no-repeat px-8 pt-64 text-center text-white shadow-md shadow-primary-100 duration-500 ease-in-out dark:shadow-primary-800"
		:style="`background-image: url(${image})`"
		:class="
			hasScrolled
				? 'mx-4 -mb-24 -translate-y-24 rounded-b-full pb-52 shadow-xl dark:shadow-xl lg:mx-12 lg:rounded-b-[100%] xl:mx-24'
				: 'pb-48'
		"
	>
		<div
			class="mb-6 flex items-center justify-center gap-4 text-5xl font-black"
		>
			<div
				class="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-200 bg-white shadow-lg"
			>
				<NuxtIcon
					name="socials/makebetter"
					class="icon big text-black"
				/>
			</div>
			+
			<div
				class="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-200 bg-white shadow-lg"
			>
				<NuxtIcon
					:name="`socials/${platform}`"
					class="icon big text-black"
				/>
			</div>
		</div>
		<h1 class="mb-6 text-5xl font-black">{{ title }}</h1>
		<h2 class="mx-auto max-w-xl text-lg">{{ description }}</h2>
		<div class="mt-8 flex items-center justify-center gap-4">
			<UIButton color="light">
				{{ buttonText }}
			</UIButton>
			<UIButton color="transparent"> Voir d'autres outils </UIButton>
		</div>
	</header>
</template>
