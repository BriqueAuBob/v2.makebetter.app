<template>
    <article class="cursor-collab relative overflow-hidden rounded-3xl border-2 text-center shadow-md">
        <img
            src="/images/features/realtime_collaboration/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">{{ $t('homepage.features.collaboration.title') }}</h1>
            <p class="text-md text-gray-400">
                {{ $t('homepage.features.collaboration.description') }}
            </p>
            <div class="pointer-events-none relative select-none">
                <img
                    src="/images/features/realtime_collaboration/radar.svg"
                    class="mx-auto mt-4 w-2/3"
                    id="radar"
                />
                <!-- red -->
                <div class="absolute left-1/3 top-1/2 h-8 w-8 animate-pulse">
                    <img src="/images/features/realtime_collaboration/avatar_james.png" />
                    <span
                        class="-ml-12 rounded-3xl border-2 border-white bg-red-500 px-2 py-1 text-sm font-semibold text-white"
                    >
                        James
                    </span>
                </div>
                <!-- blue -->
                <div class="absolute left-1/2 top-2/3 h-12 w-12 animate-pulse">
                    <img src="/images/features/realtime_collaboration/avatar_lucas.png" />
                    <span
                        class="rounded-3xl border-2 border-white bg-primary-500 px-2 py-1 text-sm font-semibold text-white"
                    >
                        Lucas
                    </span>
                </div>
                <!-- green -->
                <div class="absolute left-1/2 top-1/4 h-10 w-10 animate-pulse">
                    <span
                        class="-ml-4 rounded-3xl border-2 border-white bg-green-500 px-2 py-1 text-sm font-semibold text-white"
                    >
                        Axelle
                    </span>
                    <img src="/images/features/realtime_collaboration/avatar_axelle.png" />
                </div>
                <img
                    src="/images/features/realtime_collaboration/radar_spinner.png"
                    class="radar-spinner absolute left-1/2 top-1/2 w-1/3 -translate-y-1/2"
                />
            </div>
        </div>
    </article>
</template>

<style scoped>
article {
    border-color: #e8e6ff;
}

html.dark article {
    border-color: #1a03bf;
}
</style>
