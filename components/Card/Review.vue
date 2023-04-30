<script setup lang="ts">
import { Author } from "~/types/user";

defineProps({
	author: {
		type: Object as PropType<Author>,
		default: {
			username: "Username",
			discriminator: "0000",
		},
	},
	content: {
		type: String,
		default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
});
</script>

<template>
	<UICard :no-heading="true">
		<template #content>
			<div class="flex items-center gap-2">
				<img
					src="/images/avatar_demo.png"
					class="h-12 w-12 rounded-full"
				/>
				<div class="flex flex-col">
					<span class="text-lg font-bold">{{ author.username }}</span>
					<span class="text-gray-500">{{
						author.discriminator
					}}</span>
				</div>
			</div>
			<p class="mt-4 text-sm text-gray-600">{{ content }}</p>
		</template>
	</UICard>
</template>
