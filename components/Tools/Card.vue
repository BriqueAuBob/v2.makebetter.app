<script setup lang="ts">
const props = defineProps({
    image: {
        type: String,
        default: '',
    },
    platform: {
        type: String,
        default: '',
    },
    slug: {
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
    <NuxtLink :to="localePath(`tools-${platform}-${slug}`)">
        <article
            class="relative h-full cursor-pointer overflow-hidden rounded-3xl border-2 border-primary-200 bg-cover bg-center p-8 pb-96 duration-300 ease-out dark:border-zinc-500"
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
            <h3 class="mb-2 text-3xl font-bold text-white">{{ $t(`tools.${platform}.${slug}.name`) }}</h3>
            <p class="mb-4 text-white">
                {{ $t(`tools.${platform}.${slug}.description`) }}
            </p>
            <UIButton
                color="light"
                size="sm"
            >
                {{ $t('access_tool') }}
            </UIButton>
            <div
                class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-primary-500 bg-opacity-80 text-xl font-semibold text-white backdrop-blur-sm"
                v-if="comingSoon"
            >
                {{ $t('coming_soon') }}
            </div>
        </article>
    </NuxtLink>
</template>
