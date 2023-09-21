<script setup lang="ts">
const props = defineProps({
    error: {
        type: Object,
    },
});

const title = computed(() => {
    switch (props.error?.statusCode) {
        case 404:
            return 'Page non trouvée';
        case 500:
            return 'Erreur du serveur';
        default:
            return 'Error';
    }
});
const message = computed(() => {
    switch (props.error?.statusCode) {
        case 404:
            return "La page que tu recherches n'existe pas.";
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
            <div class="absolute left-0 top-0 w-full">
                <nuxt-img
                    class="w-full -scale-x-100 hue-rotate-90"
                    src="/images/backgrounds/account.png"
                    alt="404"
                />
                <div
                    class="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-b from-transparent to-zinc-950"
                ></div>
            </div>
            <div class="relative z-20 flex min-h-[70vh] flex-col items-center justify-center">
                <h1 class="mb-6 text-6xl font-bold">{{ title }}</h1>
                <p class="text-2xl font-medium">{{ message }}</p>
                <div class="flex items-center gap-2">
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
        </NuxtLayout>
    </div>
</template>
