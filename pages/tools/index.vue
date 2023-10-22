<script setup lang="ts">
const tools = [
    { image: 'embed-maker.png', platform: 'discord', slug: 'embed-maker' },
    {
        description: 'Crée des icônes pour tes rôles sur ton serveur Discord !',
        image: 'roles-icons-maker.png',
        platform: 'discord',
        slug: 'roles-icons-maker',
        comingSoon: true,
    },
];

defineI18nRoute({
    paths: {
        fr: '/outils',
    },
});
</script>

<template>
    <header
        class="rounded-b-[150px] bg-primary-500 bg-cover bg-center bg-no-repeat pb-52 pt-64 text-center text-xl font-semibold"
        style="background-image: url('/images/backgrounds/tools.png')"
    >
        <div class="container text-white">
            <h1 class="text-5xl font-bold">Outils disponibles sur MakeBetter</h1>
            <h2 class="mx-auto mb-8 mt-6 max-w-3xl text-3xl font-medium">
                Découvre l'entièreté des outils que nous proposons sur notre site! Utilise les pour améliorer ton
                projet!
            </h2>
            <!-- <UIButton
                class="mx-auto mt-12 w-fit"
                href="#"
                color="light"
                size="lg"
            >
                Voir les outils disponibles
            </UIButton> -->
        </div>
    </header>
    <section class="container py-24">
        <h1 class="mb-8 text-2xl font-semibold">Les outils pour Discord</h1>
        <div class="grid gap-4 lg:grid-cols-3">
            <ToolsCard
                v-for="tool in tools"
                :key="tool.slug"
                v-bind="tool"
            />
        </div>
    </section>
    <!-- <section class="container">Des idées?</section> -->
</template>
