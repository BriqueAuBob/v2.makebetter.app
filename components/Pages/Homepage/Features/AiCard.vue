<script setup lang="ts">
const hasClicked = ref(false);
const handleClick = () => {
    hasClicked.value = !hasClicked.value;
};
</script>

<template>
    <article class="relative overflow-hidden rounded-3xl border-2 text-center shadow-md">
        <img
            src="/images/features/ai/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <img
            src="/images/features/ai/brains_illustration.png"
            class="pointer-events-none absolute bottom-0 left-0 -z-1 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">{{ $t('homepage.features.ai.title') }}</h1>
            <p class="text-md text-zinc-400">
                {{ $t('homepage.features.ai.description') }}
            </p>
            <div
                class="relative z-10 mt-8 duration-300 ease-out"
                :class="hasClicked && 'pb-32 xl:pb-0'"
            >
                <div
                    class="rounded-2xl bg-white p-4 text-left shadow-2xl shadow-pink-300 duration-300 ease-out dark:bg-zinc-950"
                    :class="!hasClicked && 'pb-28 xl:pb-24'"
                >
                    {{ $t('homepage.features.ai.sentence.default') }}
                </div>
                <UIButton
                    class="mt-4 w-full"
                    color="black"
                    @click="handleClick"
                    :disabled="hasClicked"
                >
                    {{ $t('homepage.features.ai.sentence.improve') }}
                </UIButton>
                <div
                    class="bouncy-bezier absolute mt-4 w-full cursor-pointer rounded-2xl bg-white p-4 text-left shadow-2xl shadow-pink-500 duration-500 hover:-translate-y-12 dark:bg-zinc-950 xl:top-full"
                    :class="!hasClicked && 'translate-y-96 opacity-0'"
                    @click="handleClick"
                >
                    {{ $t('homepage.features.ai.sentence.improved') }}
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
article {
    border-color: #ffe6f8;
}

html.dark article {
    border-color: #ff00a6;
}
</style>
