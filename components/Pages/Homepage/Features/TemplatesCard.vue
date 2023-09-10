<template>
    <article class="relative overflow-hidden rounded-3xl border-2 text-center shadow-md">
        <img
            src="/images/features/templates/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-2xl font-bold">Templates</h1>
            <p class="text-md text-gray-400">
                Les utilisateurs peuvent rendre leurs sauvegarde publiques! Personnalise leurs créations pour qu’elles
                conviennent à ton projet !
            </p>
        </div>
        <img
            src="/images/features/templates/illustration.png"
            class="pointer-events-none w-full select-none"
        />
        <div
            class="absolute bottom-0 h-48 w-full bg-gradient-to-t from-green-200 to-transparent dark:from-green-800"
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
