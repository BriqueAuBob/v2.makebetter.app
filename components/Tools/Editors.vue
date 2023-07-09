<script setup lang="ts">
type User = {
	username: string;
	avatar: string;
};

defineProps({
	editors: {
		type: Array<User>,
		required: true,
	},
	displayShare: {
		type: Boolean,
		default: false,
	}
});
</script>

<template>
	<div
		class="flex rounded-2xl bg-white px-5 py-3 shadow-md shadow-primary-50 dark:bg-primary-700 dark:shadow-primary-800"
	>
		<UIAvatar
			v-for="editor in editors"
			:key="editor.username"
			:user="editor"
			class="-ml-2 -mr-2 border-2 border-white"
		/>
		<UIButton v-if="displayShare" class="ml-4" size="sm" color="light">
			Partager
		</UIButton>
	</div>
</template>
