<script setup lang="ts">
import { useNuxtApp } from '#app';

definePageMeta({
    layout: 'auth',
});

useHead({
    title: 'MakeBetter - Accès anticipé',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Accès anticipé à MakeBetter',
        },
    ],
});

const config = useRuntimeConfig();
const authUrl = computed(() => {
    return config.public.authUrl + `/?redirect_uri=${encodeURIComponent(window ? window.location.href : '')}`;
});

const { $toast } = useNuxtApp();

onMounted(() => {
    setTimeout(() => {
        if (window.location.search.includes('error=not_logged_in')) {
            $toast.show({
                title: 'Accès refusé',
                message: 'Tu dois te connecter pour accéder à la beta de MakeBetter.',
                type: 'denied',
                timeout: 6,
            });
        }
        if (window.location.search.includes('error=access_denied')) {
            $toast.show({
                title: 'Accès refusé',
                message:
                    "Tu n'as pas la permission d'accéder à la beta de MakeBetter.<br/> Si tu penses que c'est une erreur, contacte nous sur Discord",
                type: 'denied',
                timeout: 6,
            });
        }
    }, 500);
});
</script>

<template>
    <div
        class="mx-4 max-w-xl rounded-3xl border-2 border-primary-700 bg-gradient-to-b from-primary-400 to-primary-600 p-12 text-white shadow-md shadow-primary-100 dark:from-zinc-500 dark:to-zinc-800 dark:shadow-zinc-800"
    >
        <h1 class="mb-2 text-3xl">Accès anticipé</h1>
        <h2 class="mb-4 text-lg">Nous proposons un accès anticipé pour accéder au site.</h2>
        <p class="mt-1">
            Si tu souhaites participer à l'accès anticipé, fait ta demande
            <a
                class="underline"
                href="https://makebetter.app/beta"
                >en cliquant ici.</a
            ><br />
        </p>
        <p class="mt-2">
            On aura besoin de t'avoir sur notre serveur Discord si tu t'inscris à la beta, alors si tu n'es pas encore
            présent sur notre serveur Discord,
            <a
                class="underline"
                href="https://diose.io/discord"
                >rejoins nous!</a
            >
        </p>
        <div class="mt-8 flex flex-col justify-end gap-1 lg:flex-row">
            <NuxtLink
                class="block w-full lg:w-fit"
                to="https://makebetter.app"
                target="_blank"
            >
                <UIButton
                    color="transparent"
                    class="w-full"
                >
                    Aller sur la version normale
                </UIButton>
            </NuxtLink>
            <ClientOnly>
                <NuxtLink
                    :to="authUrl"
                    class="block w-full lg:w-fit"
                >
                    <UIButton
                        class="w-full"
                        color="light"
                    >
                        Accéder à la béta
                    </UIButton>
                </NuxtLink>
            </ClientOnly>
        </div>
    </div>
</template>
