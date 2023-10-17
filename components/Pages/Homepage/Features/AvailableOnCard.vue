<script setup lang="ts">
import { useColorMode } from '#imports';

const platforms = [
    {
        name: 'Discord',
        icon: 'socials/discord',
        classNames: ' border-indigo-300 bg-indigo-500',
    },
];
const platformCount = platforms.length;
const defaultPlatform = {
    name: 'Bientôt',
    icon: 'lock',
    classNames: ' border-zinc-300 bg-zinc-500',
};

for (let i = 0; i < Math.min(4, Math.floor(Math.random() * 8)); i++) {
    platforms.splice(Math.floor(Math.random() * platforms.length), 0, defaultPlatform);
}

const platformsRandomOrder = platforms.sort(() => Math.random() - 0.5);

const colorMode = useColorMode();
const isDark = computed(() => {
    return colorMode.value === 'dark';
});
</script>

<template>
    <article class="relative overflow-hidden rounded-3xl border-2 text-center shadow-md">
        <ClientOnly>
            <img
                src="/images/features/platforms/blurry_circle.png"
                class="pointer-events-none absolute bottom-0 select-none"
                :class="isDark ? 'left-0 w-full' : 'left-1/2 w-1/2 -translate-x-1/2'"
                alt="blurry circle"
            />
        </ClientOnly>
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">
                {{ $t('homepage.features.tools_available.title', { count: platformCount }) }}
            </h1>
            <p class="text-md text-zinc-400">
                {{ $t('homepage.features.tools_available.description') }}
            </p>
            <!--<img
                src="/images/features/platforms/illustration.png"
                class="mx-auto mt-6 w-full max-w-lg"
            />-->
            <Vue3Marquee
                class="mt-2 text-white"
                v-for="i in 2"
                :key="i"
                clone
                :direction="i === 2 ? 'reverse' : 'normal'"
                gradient
                :gradientColor="isDark ? [9, 9, 11] : [250, 250, 250]"
            >
                <div
                    v-for="platform in platformsRandomOrder"
                    :key="platform.name"
                    class="m-3 flex items-center justify-center rounded-xl border-2 p-4"
                    :class="platform.classNames"
                >
                    <NuxtIcon
                        :name="platform.icon"
                        class="text-4xl"
                    />
                </div>
            </Vue3Marquee>
        </div>
    </article>
</template>

<style scoped>
article {
    border-color: #cbeafc;
}

html.dark article {
    border-color: #0047aa;
}
</style>
