<script setup lang="ts">
const hasClicked = ref(false);
const handleClick = () => {
    hasClicked.value = !hasClicked.value;
};

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
</script>

<template>
    <article
        class="relative overflow-hidden rounded-3xl border-2 text-center shadow-md"
        :style="`border-color: ${isDark ? '#ff00a6' : '#ffe6f8'};`"
    >
        <img
            src="/images/features/ai/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <img
            src="/images/features/ai/brains_illustration.png"
            class="pointer-events-none absolute bottom-0 left-0 -z-1 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">Intelligence artificielle</h1>
            <p class="text-md text-gray-400">
                Utilise l’intelligence artificielle pour améliorer la qualité rédactionnelle de ce que tu réalises avec
                nos outils.
            </p>
            <div
                class="relative z-10 mt-8 duration-300 ease-out"
                :class="hasClicked && 'pb-32 xl:pb-0'"
            >
                <div
                    class="rounded-2xl bg-white p-4 text-left shadow-2xl shadow-pink-300 duration-300 ease-out dark:bg-primary-950"
                    :class="!hasClicked && 'pb-28 xl:pb-24'"
                >
                    Utilise les meilleurs outils sur notre site Internet! Ils te permettront d’améliorer tes services !
                </div>
                <UIButton
                    class="mt-4 w-full"
                    color="black"
                    @click="handleClick"
                    :disabled="hasClicked"
                >
                    Améliorer mon texte
                </UIButton>
                <div
                    class="absolute mt-4 cursor-pointer rounded-2xl bg-white p-4 text-left shadow-2xl shadow-pink-500 duration-300 ease-out hover:-translate-y-12 dark:bg-primary-950 xl:top-full"
                    :class="!hasClicked && 'translate-y-96 opacity-0'"
                    @click="handleClick"
                >
                    Optimise tes performances en exploitant les outils de pointe disponibles sur notre site web. Leur
                    utilisation t'ouvrira de nouvelles opportunités pour améliorer la qualité de tes services !
                </div>
            </div>
        </div>
    </article>
</template>
