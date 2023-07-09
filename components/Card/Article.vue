<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: "Card Title",
	},
	description: {
		type: String,
		default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	views: {
		type: Number,
		default: 0,
	},
	likes: {
		type: Number,
		default: 0,
	},
	liked: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<UICard>
		<template #header>
			<nuxt-img src="/images/articles/fake.png" class="w-full" />
		</template>
		<template #footer>
			<div class="flex items-center justify-between px-8 pb-8 -mt-4">
				<div
					class="rounded-md bg-primary-500 px-2 py-1 text-sm font-medium text-white"
				>
					Nouveau
				</div>
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2">
						<NuxtIcon name="eye" class="icon" />
						<span class="text-gray-500">{{ views }}</span>
					</div>
					<div class="flex items-center gap-2">
						<NuxtIcon name="heart" class="icon" :filled="!liked" />
						<span class="text-gray-500">{{ likes }}</span>
					</div>
				</div>
			</div>
		</template>
	</UICard>
</template>
