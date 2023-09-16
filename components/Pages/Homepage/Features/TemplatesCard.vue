<template>
    <article class="group relative cursor-pointer overflow-hidden rounded-3xl border-2 text-center shadow-md">
        <img
            src="/images/features/templates/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 z-50 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">{{ $t('homepage.features.templates.title') }}</h1>
            <p class="text-md text-gray-400">
                {{ $t('homepage.features.templates.description') }}
            </p>
        </div>
        <div class="flex flex-col items-center gap-4">
            <UIInput
                :placeholder="$t('homepage.features.templates.search')"
                name="search-templates"
                disabled
            />
            <div class="grid grid-cols-3 items-center justify-center gap-2">
                <NuxtImg
                    v-for="i in 6"
                    :key="i"
                    :src="`/images/features/templates/pack_${i}.png`"
                    class="w-24 rounded-3xl border border-gray-200 bg-green-50 px-5 py-6 shadow-md shadow-primary-100 duration-300 ease-out group-hover:bg-white"
                    :class="{
                        'group-hover:-translate-x-2 group-hover:-translate-y-3 group-hover:-rotate-20 group-hover:scale-110':
                            i === 1,
                        'group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-7 group-hover:scale-95':
                            i === 2,
                        'group-hover:-translate-x-1 group-hover:translate-y-2 group-hover:-rotate-8': i === 3,
                        'group-hover:-translate-y-3 group-hover:translate-x-2': i === 4,
                        'group-hover:-translate-y-3 group-hover:translate-x-1 group-hover:-rotate-10': i === 5,
                        'group-hover:-translate-y-2 group-hover:translate-x-8 group-hover:rotate-2 group-hover:scale-110':
                            i === 6,
                    }"
                />
            </div>
        </div>
        <div
            class="absolute bottom-0 z-50 h-48 w-full bg-gradient-to-t from-green-200 to-transparent duration-300 ease-out group-hover:opacity-50 dark:from-green-800"
        ></div>
    </article>
</template>

<style scoped>
article {
    border-color: #e6ffe7;
}

html.dark article {
    border-color: #00ffb3;
}
</style>
