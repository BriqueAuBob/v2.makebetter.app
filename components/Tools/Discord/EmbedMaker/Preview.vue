<script setup lang="ts">
import type { DiscordWebhookMessage } from '../../../../types/discord';

defineProps({
    message: {
        type: Object as PropType<DiscordWebhookMessage>,
        required: true,
    }
})
</script>

<template>
    <div>
        <div class="flex gap-3">
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
                        class="whitespace-pre-line break-words text-base font-normal leading-snug text-gray-400 "
                    >
                        {{ message.content }}
                    </p>
                    <TransitionGroup name="fadescale" tag="div" class="flex flex-col gap-1">
                        <ToolsDiscordEmbedMakerEmbed 
                            v-for="(embed, id) of message.embeds"
                            :key="id" 
                            :embed="embed" 
                        />
                    </TransitionGroup>
                </div>
            </div>
        </div>
    </div>
</template>