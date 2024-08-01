<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'Templates populaires',
    },
    saves: {
        type: Array as PropType<any>,
        default: [],
        required: false,
    },
});

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
</script>

<template>
    <section>
        <div class="flex items-end justify-between">
            <h1 class="text-lg font-semibold">{{ title }}</h1>
            <UIButton
                size="sm"
                color="light"
                type="secondary"
            >
                Voir tout les templates
            </UIButton>
        </div>
        <div class="no-scrollbar flex gap-2 overflow-x-auto py-3">
            <UICard
                v-for="save of saves"
                :key="save.id"
                class="relative max-h-72 max-w-[375px] shrink-0 overflow-hidden"
            >
                <template #header>
                    <div class="flex items-center justify-between px-4 pt-4">
                        <h3 class="font-semibold">{{ save.name }}</h3>
                        <span class="flex gap-1 rounded-lg bg-gray-100 px-2 py-2 text-gray-400 dark:bg-neutral-800">
                            <UIAvatar
                                :user="save.author"
                                size="xs"
                            />
                            {{ save.author.username }}
                        </span>
                    </div>
                </template>
                <ToolsDiscordEmbedMakerPreview
                    :message="save.data[0]"
                    :editable="false"
                    :isDark="isDark"
                />
            </UICard>
        </div>
    </section>
</template>
