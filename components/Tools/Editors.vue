<script setup lang="ts">
type User = {
	name: string;
	avatar: string;
};

defineProps({
	editors: {
		type: Array<User>,
		required: true,
	},
});
</script>

<template>
	<div
		class="-gap-4 flex rounded-2xl bg-white py-2 pl-7 pr-4 shadow-md shadow-primary-100 dark:bg-primary-700 dark:shadow-primary-800"
	>
		<nuxt-img
			v-for="editor in editors"
			:key="editor.name"
			:src="editor.avatar"
			class="-ml-3 h-10 w-10 rounded-full border border-white"
			:alt="editor.name"
			preset="avatar"
		/>
	</div>
</template>
