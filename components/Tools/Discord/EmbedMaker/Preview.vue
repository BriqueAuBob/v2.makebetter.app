<script setup lang="ts">
import draggable from 'vuedraggable';
import { fileSize } from '@/composables/Blob';
import type { DiscordWebhookMessage } from '~/types/discord';
import { parse } from 'discord-markdown-parser';
import SimpleMarkdown from 'simple-markdown';

const props = defineProps({
    message: {
        type: Object as PropType<DiscordWebhookMessage>,
        required: true,
    },
    isDark: {
        type: Boolean,
        default: false,
    },
});

const createObjectURL = (file: File): string => {
    return URL.createObjectURL(file);
};

const emits = defineEmits(['change']);
const onChange = (message: any) => {
    emits('change', message);
};
</script>

<template>
    <div
        class="flex gap-3"
        :class="isDark ? 'text-zinc-200' : 'text-zinc-900'"
    >
        <img
            class="h-10 w-10 rounded-full"
            :src="message.avatar_url"
        />
        <div class="font-whitney w-full">
            <div class="flex items-center gap-1 text-base">
                <span class="font-medium">{{ message.username }}</span>
                <span class="rounded-sm bg-tools-discord-blurple px-1 text-[10px] font-medium leading-4 text-white">
                    BOT
                </span>
                <span class="ml-1 self-end rounded-md text-xs text-zinc-600 dark:text-zinc-200"> 12/08/2022 </span>
            </div>
            <div class="mt-1 flex w-full flex-col gap-1">
                <ToolsDiscordMarkdown
                    class="whitespace-pre-line break-words text-base font-normal leading-snug text-zinc-400"
                    :content="message.content"
                ></ToolsDiscordMarkdown>
                <TransitionGroup
                    v-if="message.files"
                    name="fadescale"
                    tag="div"
                    class="flex flex-col gap-1"
                >
                    <div
                        v-for="(file, id) of message.files"
                        :key="id"
                    >
                        <div v-if="file.type?.startsWith('image') && file?.type !== 'image/svg+xml'">
                            <img
                                class="max-h-[300px] cursor-pointer rounded-md"
                                :src="createObjectURL(file)"
                            />
                        </div>
                        <div
                            v-else
                            class="flex w-[432px] items-center gap-2 rounded-lg border-2 p-3"
                            :style="'background: ' + (isDark ? '#2B2D31;' : '#F2F3F5;')"
                            :class="isDark ? 'border-neutral-800' : 'border-zinc-200'"
                        >
                            <NuxtIcon
                                class="icon big"
                                name="platforms/discord/file"
                                filled
                            />
                            <div class="flex flex-col">
                                <span class="cursor-pointer text-sm text-blue-500 hover:underline">{{
                                    file.name
                                }}</span>
                                <span class="text-xs text-zinc-400">{{ fileSize(file) }}</span>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
                <draggable
                    v-model="message.embeds"
                    :drag-options="{
                        animation: 200,
                    }"
                    tag="div"
                    class="flex flex-col gap-1"
                    @change="() => onChange(message)"
                    :itemKey="'id'"
                    ghost-class="dragging"
                    id="embeds_draggable"
                >
                    <template #item="{ element }">
                        <ToolsDiscordEmbedMakerEmbed
                            :embed="element"
                            :isDark="isDark"
                            @delete="
                                () => {
                                    message.embeds.splice(message.embeds.indexOf(element), 1);
                                    onChange(message);
                                }
                            "
                        />
                    </template>
                </draggable>
                <TransitionGroup
                    v-if="message?.components?.[0]?.components"
                    name="fadescale"
                    tag="div"
                    class="mt-1 flex gap-2"
                >
                    <component
                        :is="component.style === 5 ? 'a' : 'button'"
                        :href="component.url"
                        target="_blank"
                        v-for="(component, id) of message?.components?.[0]?.components"
                        :key="id"
                    >
                        <ToolsDiscordEmbedMakerButton :buttonStyle="component.style">
                            {{ component.label }}
                        </ToolsDiscordEmbedMakerButton>
                    </component>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dragging {
    @apply animate-wiggle after:opacity-25;
}
</style>
