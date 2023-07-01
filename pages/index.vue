<script setup lang="ts">
import type { CollapseGroupItems } from "~/types/collapse";
import { Slide } from "vue3-carousel";

const previews = ["images/demos/tool_demo.jpg", "images/demos/tool_demo.jpg"];
const collapsibleElements: CollapseGroupItems = [
	{
		title: "Créateur d'embeds",
		content:
			"Notre créateur d'embed vous permettra de créer et envoyer vos embeds sur votre serveur de la plus simple des manières !",
		defaultOpen: true,
	},
	{
		title: "Créateur d'embeds",
		content:
			"Notre créateur d'embed vous permettra de créer et envoyer vos embeds sur votre serveur de la plus simple des manières !",
	},
	{
		title: "Créateur d'embeds",
		content:
			"Notre créateur d'embed vous permettra de créer et envoyer vos embeds sur votre serveur de la plus simple des manières !",
	},
];
</script>

<template>
	<header
		class="relative bg-primary-500 bg-header-home bg-cover bg-center bg-no-repeat py-72 pt-48 text-white"
	>
		<h1 class="text-center text-4xl font-black lg:text-4xl xl:text-8xl">
			Build Better Projects
		</h1>
		<h2
			class="mx-auto mt-4 text-center font-sans text-xl font-bold leading-snug lg:max-w-xl lg:text-2xl xl:max-w-5xl xl:text-4xl"
		>
			Nous proposons les outils qui permettront à ton projet de grandir rapidement.
		</h2>
		<div class="mt-12 flex items-center justify-center gap-6">
			<UIButton size="lg" color="light"> Utiliser un outil </UIButton>
			<NuxtLink
				to="https://discord.com/invite/GWpGBK8gmA"
				target="_blank"
			>
				<UIButton size="lg" :outlined="true" color="light">
					Rejoindre le Discord
				</UIButton>
			</NuxtLink>
		</div>
		<div
			id="examples"
			class="absolute left-1/2 flex w-full max-w-full -translate-x-1/2 translate-y-8"
		>
			<div
				class="flex translate-y-24 justify-center gap-4 lg:gap-8 xl:gap-16"
			>
				<UICarousel>
					<Slide v-for="(preview, index) in previews" :key="index">
						<div
							class="w-full overflow-hidden rounded-3xl border-8 border-primary-600"
						>
							<nuxt-img
								:src="preview"
								class="w-full"
								alt="Tool Demo"
								sizes="sm:100vw lg:50vw"
							/>
						</div>
					</Slide>
				</UICarousel>
			</div>
		</div>
	</header>
	<section
		class="container grid items-center gap-16 pb-36 pt-80 lg:grid-cols-2"
	>
		<div>
			<h1 class="text-xl font-bold">
				Utilisez nos outils en équipe&nbsp;!
			</h1>
			<p class="mb-4">
				Tous nos outils disposent d'un
				<strong>mode collaboratif</strong> vous permettant de
				<strong>travailler avec</strong> les autres membres de
				<strong>votre équipe en temps réel.</strong>
			</p>
			<UIGroupCollapse :elements="collapsibleElements" />
			<UIButton class="mt-12">Voir d'autres outils</UIButton>
		</div>
		<div class="relative">
			<div
				class="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary-700 to-primary-300 opacity-25 blur-3xl"
			></div>
			<FakerEmbedCreatorDemo />
		</div>
	</section>
	<section class="container relative gap-16 pb-48 pt-16">
		<h1 class="mx-auto text-center text-xl font-bold">
			Partage tes réalisations
		</h1>
		<div
			class="to-primary-30 absolute left-1/2 top-1/2 -z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary-700 opacity-10 blur-3xl"
		></div>
		<div class="mt-8 grid grid-cols-2 gap-8">
			<UICard
				:header-grid="true"
				title="Partage avec tes collaborateurs"
				description="Nous proposons de générer un lien pour partager ta réalisation avec tes amis ! Ils pourront ainsi te proposer des modifications ou encore réutiliser ce que tu leurs à donner."
			>
				<template #header>
					<div class="mx-auto flex max-w-sm flex-col gap-4">
						<UIInput
							name="fake_embed_creator"
							label="Webhook URL"
							type="text"
							placeholder="https://discord.com/api/webhooks/..."
							class="mx-auto w-full"
							fake
						></UIInput>
						<UIButton color="color-mode" size="md" fake>
							Envoyer
						</UIButton>
					</div>
				</template>
			</UICard>
			<UICard
				:header-grid="true"
				title="Rends tes créations publiques"
				description="Tu peux rendre tes créations publique afin qu''lles soit visible par tout le monde et q'ils puissent les réutiliser !"
			>
				<template #header>
					<div class="mx-auto flex max-w-sm gap-4">
						<div
							class="flex h-32 w-52 items-center justify-center rounded-2xl border bg-white dark:border-primary-700 dark:bg-primary-800"
						>
							<nuxt-img
								class="h-24 w-24"
								src="/images/fake_icon.svg"
							/>
						</div>
						<div class="flex w-full flex-col gap-4">
							<UIButton
								class="h-full w-full"
								color="color-mode"
								size="md"
								fake
							>
								Télécharger
							</UIButton>
							<UIButton
								class="h-full w-full"
								color="color-mode"
								size="md"
								fake
							>
								Rendre publique
							</UIButton>
						</div>
					</div>
				</template>
			</UICard>
		</div>
	</section>
	<BannerHiring />
	<section class="container relative gap-16 py-32">
		<h1 class="mx-auto text-center text-xl font-bold">
			Besoin d'aide pour créer ton projet&nbsp;?
		</h1>
		<div class="mt-8 grid grid-cols-3 gap-6">
			<CardArticle v-for="i in 6"></CardArticle>
		</div>
		<div class="flex justify-center">
			<UIButton class="mt-12" color="color-mode">
				Voir d'autres tutoriels
			</UIButton>
		</div>
	</section>
	<section class="container relative gap-16 pb-64 pt-24">
		<p class="mb-4 text-center text-lg font-semibold leading-relaxed">
			150 personnes utilisent nos outils!<br />
			27 d'entre elles ont publié un avis...
		</p>
		<h1 class="text-center text-3xl font-black">Pourquoi pas toi&nbsp;?</h1>
		<div class="mt-8 grid grid-cols-3 gap-6">
			<CardReview v-for="i in 3"></CardReview>
		</div>
		<div class="flex items-center justify-center gap-6">
			<UIButton class="mt-12" color="color-mode">
				Publier un avis
			</UIButton>
			<UIButton href="/testimonials" class="mt-12" color="transparent">
				Voir d'autres avis
			</UIButton>
		</div>
	</section>
</template>
