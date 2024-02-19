<script setup lang="ts">
const { data } = await useFetchApi<{ saves: any[] }>('/makebetter/tools/saves?page=1');
const saves = data.value?.saves;

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
const localePath = useLocalePath();
</script>

<template>
    <section class="relative py-8">
        <div class="opacity-50">
            <Vue3Marquee
                v-for="i in 2"
                :key="i"
                class="p-4"
                clone
                :direction="i == 2 ? 'reverse' : 'normal'"
            >
                <div
                    v-for="save of saves"
                    :key="save._id"
                    class="relative m-2 max-h-72 w-96 overflow-hidden"
                >
                    <ToolsDiscordEmbedMakerPreview
                        :message="save.data[0]"
                        :editable="false"
                        :isDark="isDark"
                    />
                    <div
                        class="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-zinc-50 dark:from-transparent dark:to-zinc-950"
                    ></div>
                </div>
            </Vue3Marquee>
        </div>
        <div
            class="absolute left-0 top-0 z-10 h-full w-full bg-gradient-radial from-zinc-50/50 to-zinc-50 dark:from-transparent dark:to-zinc-950"
        ></div>
        <div class="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <h1 class="mx-auto text-3xl font-bold">{{ $t('homepage.templates.title') }}</h1>
            <p class="mx-auto mt-3 max-w-xl text-lg font-medium">{{ $t('homepage.templates.description') }}</p>
            <UIButton
                class="mx-auto mt-8 w-fit"
                :href="localePath('templates')"
            >
                {{ $t('homepage.templates.view') }}
            </UIButton>
        </div>
    </section>
</template>
