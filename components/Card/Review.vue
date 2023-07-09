<script setup lang="ts">
import { User } from "~/types/user";

defineProps({
	author: {
		type: Object as PropType<User>,
		default: {
			username: "Username",
			discriminator: "0000",
			avatar: "/images/avatar_demo.png",
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
		<div class="flex items-center gap-2">
			<UIAvatar :user="author" />
			<div class="ml-1 flex flex-col">
				<span class="text-lg font-bold">{{ author.username }}</span>
				<span class="text-gray-500">{{
					author.discriminator
				}}</span>
			</div>
		</div>
		<p class="mt-4 text-sm text-gray-500 dark:text-gray-300">
			{{ content }}
		</p>
	</UICard>
</template>
