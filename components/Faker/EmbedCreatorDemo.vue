<script setup lang="ts">
/// <reference path="../../types/avatar_demo.d.ts" />
import AvatarImage from "~/assets/images/avatar_demo.png";

const editors = [
	{
		name: "John Doe",
		avatar: AvatarImage,
	},
	{
		name: "John Doe",
		avatar: AvatarImage,
	},
	{
		name: "John Doe",
		avatar: AvatarImage,
	},
];
const form = reactive({
	webhook_url: "",
	title: "",
	description: "",
});
</script>

<template>
	<div
		class="rounded-3xl border-8 border-white bg-gray-100 bg-grid-square bg-center bg-repeat p-12 shadow-2xl shadow-primary-50"
	>
		<div class="flex items-center justify-between">
			<div
				class="rounded-2xl bg-white p-4 font-display font-bold shadow-md shadow-gray-100"
			>
				Créateur d'embeds
			</div>
			<ToolsEditors :editors="editors" />
		</div>
		<div class="mt-8 rounded-2xl bg-white p-8 shadow-md shadow-gray-100">
			<div class="font-display text-xl font-bold">
				Création de mon embed
			</div>
			<div class="mt-2 flex flex-col gap-2">
				<UIInput
					name="webhook_url"
					label="Lien du webhook"
					placeholder="https://discord.com/api/webhooks/..."
					v-model="form.webhook_url"
					@focus="
						form.webhook_url =
							'https://discord.com/api/webhooks/4585048575867689262/ew8Qqr0xNw9A2pibYsK60JxqU4xMvXUXN8N6WouKUvAa4uThqTgFe4wMWfgLi0QPXQ'
					"
				/>
				<UIInput
					name="title"
					label="Titre de l'embed"
					placeholder="Mon titre"
					v-model="form.title"
					:disabled="form.webhook_url === ''"
					:class="form.webhook_url === '' && 'blur-xs'"
					@focus="form.title = 'Règlement de MakeBetter'"
				/>
				<UIInput
					name="description"
					label="Description de l'embed"
					placeholder="Ma description"
					:long-text="true"
					v-model="form.description"
					:disabled="form.title === ''"
					:class="form.title === '' && 'blur-xs'"
					@focus="
						form.description =
							'Voici le règlement de MakeBetter, merci de le lire attentivement.'
					"
				/>
				<UIButton
					:class="form.description === '' && 'blur-xs'"
					:disabled="form.description === ''"
					>Envoyer</UIButton
				>
			</div>
		</div>
	</div>
</template>
