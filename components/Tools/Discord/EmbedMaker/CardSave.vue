<script setup lang="ts">
import { _primary, _red, _green, _yellow } from '#tailwind-config/theme/colors';

defineProps({
    template: {
        type: Object,
        required: true,
    },
    isSelected: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const tagsColors: { [key: string]: string } = {
    rules: _red[500],
    presentation: _primary[400],
    french: '#082A98',
    english: '#EC2329',
    commands: '#333333',
    tickets: _green[600],
    announcements: _yellow[600],
};
</script>

<template>
    <div
        class="relative h-96 w-full cursor-pointer overflow-hidden rounded-2xl border-2 p-8 duration-300 ease-out lg:w-96"
        :class="
            isSelected
                ? '-translate-y-2 border-primary-500 bg-white shadow-lg shadow-primary-100 dark:bg-primary-800 dark:shadow-zinc-800'
                : 'border-transparent bg-primary-200 hover:-translate-y-2 hover:bg-gray-100 hover:shadow-md hover:shadow-primary-300 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:hover:shadow-zinc-700'
        "
    >
        <ToolsDiscordEmbedMakerPreview
            :message="template.data[0]"
            :isDark="isDark"
            class="absolute left-56 top-12 w-full -translate-x-1/2"
        />
        <div
            class="absolute left-0 top-0 flex h-full w-full flex-col justify-between bg-gradient-to-b from-transparent to-gray-200 p-6 dark:to-zinc-700"
        >
            <div class="flex items-center justify-between">
                <div
                    class="flex w-fit items-center gap-1 rounded-full bg-white p-1 pr-2 text-xs font-semibold text-black"
                >
                    <UIAvatar
                        size="xs"
                        :user="template.author"
                    />
                    {{ template.author.username }}
                </div>
                <nuxt-icon
                    class="icon"
                    name="verified"
                    filled
                    v-if="template.verified"
                />
            </div>
            <div>
                <div
                    class="absolute bottom-0 left-0 h-24 w-full overflow-hidden rounded-3xl bg-white opacity-75 blur-xl dark:bg-zinc-700"
                ></div>
                <div class="relative z-10">
                    <div class="text-lg font-semibold text-black dark:text-white">{{ template.name }}</div>
                    <div class="mt-1 text-sm font-medium text-zinc-400">
                        {{ template.description }}
                    </div>
                    <div class="mt-2 flex items-center justify-between">
                        <span class="text-xs font-medium text-zinc-500"
                            >Créé le {{ new Date(template.createdAt).toLocaleDateString() }}</span
                        >
                        <div class="flex flex-wrap items-center justify-end gap-1">
                            <span
                                v-for="(tag, id) of template.tags"
                                :key="id"
                                class="rounded-lg px-2 py-1 text-xs font-semibold text-white shadow-md"
                                :style="`background: ${tagsColors[tag]};`"
                            >
                                {{ $t('tools.discord.embed-maker.save.tags.' + tag) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
