<script setup lang="ts">
import { toolCategories } from "~/main.config";
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
				<img
					class="h-7 w-7"
					src="~/assets/images/makebetter.svg"
					alt="Logo MakeBetter"
				/>
				makebetter.app
			</NuxtLink>
			<ul class="flex items-center gap-6 text-lg text-sm text-gray-300">
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
		<UIButton color="light">Accéder à mon compte</UIButton>
	</nav>
</template>
