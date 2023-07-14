<script setup lang="ts">
import type { DiscordWebhookMessage } from "../../../../types/discord";

defineProps({
	message: {
		type: Object as PropType<DiscordWebhookMessage>,
		required: true,
	},
	isDark: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div class="flex gap-3" :class="isDark ? 'text-gray-200' : 'text-gray-900'">
		<img class="h-10 w-10 rounded-full" :src="message.avatar_url" />
		<div class="whitney w-full">
			<div class="flex items-center gap-1 text-base">
				<span class="font-medium">{{ message.username }}</span>
				<span
					class="rounded-sm bg-tools-discord-blurple px-1 text-[10px] font-medium leading-4 text-white"
				>
					BOT
				</span>
				<span
					class="ml-1 self-end rounded-md text-xs text-gray-600 dark:text-gray-200"
				>
					12/08/2022
				</span>
			</div>
			<div class="mt-1 flex w-full flex-col gap-1">
				<p
					class="whitespace-pre-line break-words text-base font-normal leading-snug text-gray-400"
				>
					{{ message.content }}
				</p>
				<TransitionGroup
					name="fadescale"
					tag="div"
					class="flex flex-col gap-1"
				>
					<ToolsDiscordEmbedMakerEmbed
						v-for="(embed, id) of message.embeds"
						:key="id"
						:embed="embed"
						:isDark="isDark"
					/>
				</TransitionGroup>
				<TransitionGroup
					v-if="message.components[0].components"
					name="fadescale"
					tag="div"
					class="mt-2 flex"
				>
					<a
						:href="component.url"
						target="_blank"
						class="relative ml-0 mr-2 flex items-center gap-2 rounded-sm bg-[#4F545C] px-4 py-1 font-medium text-white duration-200 ease-in hover:bg-[#686D73]"
						v-for="(component, id) of message.components[0]
							.components"
						:key="id"
					>
						{{ component.label }}
						<svg
							aria-hidden="false"
							width="16"
							height="16"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
							></path>
							<path
								fill="currentColor"
								d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
							></path>
						</svg>
					</a>
				</TransitionGroup>
			</div>
		</div>
	</div>
</template>
