<script setup lang="ts">
const { data } = await useFetchApi<{ saves: any[] }>('/makebetter/tools/saves?page=1');
const saves = data.value?.saves;

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
</script>

<template>
    <header
        class="bg-primary-500 bg-cover bg-center bg-no-repeat pb-32 pt-64 text-center text-xl font-semibold"
        style="background-image: url('/images/backgrounds/tools.png')"
    >
        <div class="container text-white">
            <h1 class="text-5xl font-bold">{{ $t('templates.title') }}</h1>
            <h2 class="mx-auto mb-8 mt-6 max-w-3xl text-3xl font-medium">
                {{ $t('templates.description') }}
            </h2>
        </div>
    </header>
    <main class="container py-16">
        <div class="flex gap-2">
            <button
                v-for="i in 8"
                :key="i"
                class="rounded-lg bg-neutral-800 px-4 py-1"
            >
                {{ i === 1 ? $t('templates.all') : i }}
            </button>
        </div>
        <section class="py-8">
            <h1 class="mb-2 text-lg font-semibold">Templates populaires</h1>
            <div class="no-scrollbar flex gap-2 overflow-x-auto overflow-y-hidden">
                <UICard
                    v-for="save of saves"
                    :key="save._id"
                    class="relative max-h-72 max-w-96 shrink-0 overflow-hidden"
                    noHover
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
    </main>
</template>
