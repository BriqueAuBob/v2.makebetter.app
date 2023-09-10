<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    platform: {
        type: String,
        default: '',
    },
    url: {
        type: String,
        default: '',
    },
    comingSoon: {
        type: Boolean,
        default: false,
    },
});

const localePath = useLocalePath();

const platformUpperFirst = computed(() => {
    return props.platform.charAt(0).toUpperCase() + props.platform.slice(1);
});
</script>

<template>
    <NuxtLink :to="localePath(url)">
        <article
            class="relative h-full cursor-pointer overflow-hidden rounded-3xl border-2 border-primary-200 bg-cover bg-center p-8 pb-96 duration-300 ease-out dark:border-primary-500"
            :style="`background-image: url(/images/tools/cards/${image});`"
            :class="comingSoon ? 'pointer-events-none select-none grayscale' : ' hover:-translate-y-2'"
        >
            <div class="mb-4 flex items-center gap-3 text-xl font-bold text-white">
                <NuxtIcon
                    :name="`socials/${platform}`"
                    class="text-2xl"
                />
                {{ platformUpperFirst }}
            </div>
            <h3 class="mb-2 text-3xl font-bold text-white">{{ title }}</h3>
            <p class="mb-4 text-white">
                {{ description }}
            </p>
            <UIButton
                color="light"
                size="sm"
            >
                Accéder à l'outil
            </UIButton>
            <div
                class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-primary-500 bg-opacity-80 text-xl font-semibold text-white backdrop-blur-sm"
                v-if="comingSoon"
            >
                Bientôt disponible!
            </div>
        </article>
    </NuxtLink>
</template>
