<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
	webhook_url: "",
	title: "",
	description: "",
});
</script>

<template>
	<FakerDemo title="Création de mon embed">
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
			:color="form.description === '' ? 'light' : 'primary'"
			>Envoyer</UIButton
		>
	</FakerDemo>
</template>
