<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
</script>

<template>
    <article
        class="relative overflow-hidden rounded-3xl border-2 text-center shadow-md"
        :style="`border-color: ${isDark ? '#0047aa' : '#CBEAFC'};`"
    >
        <img
            src="/images/features/platforms/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">Outils disponible pour +1 plateformes</h1>
            <p class="text-md text-gray-400">
                Nous te proposons des outils pour de multiples plateformes! Essaye les tous!
            </p>
            <img
                src="/images/features/platforms/illustration.png"
                class="mx-auto mt-6 w-full max-w-lg"
            />
        </div>
    </article>
</template>
