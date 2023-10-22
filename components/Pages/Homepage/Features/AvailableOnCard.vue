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
    name: 'soon',
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
const localePath = useLocalePath();
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
        <div class="py-8">
            <h1 class="mb-2 px-8 text-2xl font-bold">
                {{ $t('homepage.features.tools_available.title', { count: platformCount }) }}
            </h1>
            <p class="text-md px-8 text-zinc-400">
                {{ $t('homepage.features.tools_available.description') }}
            </p>
            <!--<img
                src="/images/features/platforms/illustration.png"
                class="mx-auto mt-6 w-full max-w-lg"
            />-->
            <ClientOnly>
                <Vue3Marquee
                    class="mt-2 text-white"
                    v-for="i in 2"
                    :key="i"
                    clone
                    :direction="i === 2 ? 'reverse' : 'normal'"
                >
                    <NuxtLink
                        v-for="platform in platformsRandomOrder"
                        :key="platform.name"
                        class="m-3 flex h-20 w-20 items-center justify-center rounded-xl border-2 p-4 transition duration-300"
                        :class="platform.classNames"
                        :to="platform.name === 'soon' ? '#' : localePath(`/tools/${platform.name.toLowerCase()}`)"
                    >
                        <NuxtIcon
                            :name="platform.icon"
                            class="text-4xl"
                        />
                    </NuxtLink>
                </Vue3Marquee>
            </ClientOnly>
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
