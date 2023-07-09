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

const hasScrolled = ref(false)

onMounted(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            hasScrolled.value = true
        } else {
            hasScrolled.value = false
        }
    })
})
</script>

<template>
    <header 
        class="text-center pt-64 bg-cover bg-center bg-no-repeat text-white ease-in-out duration-500 px-8" 
        :style="`background-image: url(${image})`"
        :class="hasScrolled ? 'rounded-b-full lg:rounded-b-[100%] -translate-y-24 shadow-xl mx-4 lg:mx-12 xl:mx-24 pb-52 -mb-24' : 'pb-48'"
    >
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