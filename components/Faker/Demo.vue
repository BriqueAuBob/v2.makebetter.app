<script setup lang="ts">
const editors = [
	{
		username: "John Doe",
		avatar: "/images/avatar_demo.png",
	},
	{
		username: "John Doe",
		avatar: "/images/avatar_demo.png",
	},
	{
		username: "John Doe",
		avatar: "/images/demos/tool_demo.jpg",
	},
];

defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div
		class="relative overflow-hidden rounded-3xl border-8 border-white bg-gray-100 bg-grid-square bg-center bg-repeat p-12 shadow-2xl shadow-primary-50 dark:border-primary-700 dark:bg-primary-900 dark:shadow-primary-800"
	>
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="circle"></div>
		<div class="relative z-10 flex items-center justify-between">
			<div
				class="rounded-2xl bg-white px-6 py-4 font-display font-bold shadow-md shadow-primary-100 dark:bg-primary-700 dark:shadow-primary-800"
			>
				{{ $t('tools.discord.embed.name') }}
			</div>
			<ToolsEditors :editors="editors" />
		</div>
		<div
			class="relative z-10 mt-8 rounded-3xl bg-white p-10 shadow-md shadow-primary-100 dark:bg-primary-700 dark:shadow-primary-800"
		>
			<div class="font-display text-xl font-bold">
				{{ title }}
			</div>
			<div class="mt-2 flex flex-col gap-2">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
