<script setup lang="ts">
defineProps({
    platform: {
        type: String,
        default: 'discord'
    },
    title: {
        type: String,
        default: 'Discord Embed Builder'
    },
    description: {
        type: String,
        default: 'Créez facilement des embeds pour votre serveur Discord'
    },
    image: {
        type: String,
        default: '/images/backgrounds/tools/discord.jpg'
    },
    buttonText: {
        type: String,
    }
})
</script>

<template>
    <header class="text-center pt-64 pb-48 bg-cover bg-center bg-no-repeat text-white" :style="`background-image: url(${image})`">
        <div class="flex justify-center items-center font-black text-5xl gap-4 mb-6">
            <div class="h-16 w-16 flex justify-center items-center bg-white rounded-xl border-2 border-gray-200 shadow-lg">
                <NuxtIcon name="socials/makebetter" class="icon big text-black" />
            </div>
            +
            <div class="h-16 w-16 flex justify-center items-center bg-white rounded-xl border-2 border-gray-200 shadow-lg">
                <NuxtIcon :name="`socials/${platform}`" class="icon big text-black" />
            </div>
        </div>
        <h1 class="text-5xl font-black mb-6">{{ title }}</h1>
        <h2 class="max-w-xl mx-auto text-lg">{{ description }}</h2>
        <div class="flex gap-4 items-center justify-center mt-8">
            <UIButton color="light">
                {{ buttonText }}
            </UIButton>
            <UIButton color="transparent">
                Voir d'autres outils
            </UIButton>
        </div>
    </header>
</template>