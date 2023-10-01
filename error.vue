<script setup lang="ts">
const props = defineProps({
    error: {
        type: Object,
    },
});

const title = computed(() => {
    switch (props.error?.statusCode) {
        case 404:
            return 'Oh non! La page est introuvable!';
        case 500:
            return 'Erreur du serveur';
        default:
            return 'Error';
    }
});
const message = computed(() => {
    switch (props.error?.statusCode) {
        case 404:
            return 'Il semble que la page que tu cherches soit partie explorer nos outils.';
        case 500:
            return 'Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.';
        default:
            return 'An error occurred.';
    }
});

const router = useRouter();
const goBack = () => {
    if (document.referrer.includes(window.location.hostname) === false) return router.push('/');
    window.history.length > 1 ? router.go(-1) : router.push('/');
};
</script>

<template>
    <div class="antialiased">
        <NuxtLayout color="red">
            <header class="relative py-52 text-white">
                <nuxt-img
                    class="absolute top-0 -z-1 h-full w-full -scale-x-100 object-cover hue-rotate-90"
                    src="/images/backgrounds/account.png"
                    alt="404"
                />
                <div
                    class="absolute left-0 top-0 -z-1 h-full w-full bg-gradient-to-b from-transparent to-zinc-950"
                ></div>
                <div class="flex flex-col items-center justify-center px-8">
                    <h1 class="mb-4 text-center text-6xl font-bold leading-tight">{{ title }}</h1>
                    <p class="max-w-4xl text-center text-2xl font-medium leading-relaxed">{{ message }}</p>
                    <div class="mt-2 flex items-center gap-2">
                        <UIButton
                            href="/"
                            class="mt-8"
                            color="light"
                        >
                            Retourner à l'accueil
                        </UIButton>
                        <UIButton
                            class="mt-8"
                            color="light"
                            outlined
                            @click="goBack"
                        >
                            Revenir en arrière
                        </UIButton>
                    </div>
                </div>
            </header>
        </NuxtLayout>
    </div>
</template>
