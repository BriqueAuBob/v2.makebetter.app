<template>
    <article class="relative overflow-hidden rounded-3xl border-2 text-center shadow-md">
        <img
            src="/images/features/platforms/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">{{ $t('homepage.features.tools_available.title', { count: 1 }) }}</h1>
            <p class="text-md text-gray-400">
                {{ $t('homepage.features.tools_available.description') }}
            </p>
            <img
                src="/images/features/platforms/illustration.png"
                class="mx-auto mt-6 w-full max-w-lg"
            />
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
