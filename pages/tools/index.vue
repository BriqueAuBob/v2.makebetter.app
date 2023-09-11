<script setup lang="ts">
const tools = [
    {
        title: "Créateur d'embeds",
        description:
            'Envoie des messages customisés sur ton serveur Discord. Impressionne tes membres avec tes messages !',
        image: 'embed-maker.png',
        platform: 'discord',
        url: 'tools-discord-embed-maker',
    },
    {
        title: "Créateur d'icônes de rôles",
        description: 'Crée des icônes pour tes rôles sur ton serveur Discord !',
        image: 'roles-icons-maker.png',
        platform: 'discord',
        url: '#',
        comingSoon: true,
    },
];
</script>

<template>
    <header class="bg-primary-500 pb-52 pt-52 text-center text-white">
        <div class="container">
            <h1 class="text-4xl font-bold">Outils disponibles sur MakeBetter</h1>
            <h2 class="mb-8 mt-6 text-2xl font-medium">Découvre tous nos outils</h2>
            <UIButton
                class="mx-auto w-fit"
                href="#"
            >
                Voir les outils disponibles
            </UIButton>
        </div>
    </header>
    <section class="container py-24">
        <h1 class="mb-8 text-2xl font-semibold">Les outils pour Discord</h1>
        <div class="grid grid-cols-3 gap-4">
            <ToolsCard
                v-for="tool in tools"
                :key="tool.url"
                v-bind="tool"
            />
        </div>
    </section>
    <section class="container">Des idées?</section>
</template>
