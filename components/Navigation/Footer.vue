<script setup>
const { locale, locales, setLocale } = useI18n();
const config = useRuntimeConfig();

const localePath = useLocalePath();
const selectLanguage = reactive({
    locale: locale.value,
});
async function changeLocale() {
    await setLocale(selectLanguage.locale);
    await navigateTo(localePath(useRoute().path));
}
</script>

<template>
    <footer class="bg-footer bg-cover bg-center bg-no-repeat pb-16 pt-24 text-white shadow-top2xl shadow-primary-500">
        <div class="container grid gap-16 lg:grid-cols-5">
            <div class="col-span-2">
                <h1 class="text-2xl font-bold">MakeBetter</h1>
                <p class="mb-1 mt-4">Améliore tout tes projets avec nos outils !</p>
                <i class="text-sm font-semibold text-gray-400">
                    Nous ne sommes pas affiliés avec les services pour lesquels nous proposons des outils.
                </i>
                <p class="mt-1 text-xs italic text-gray-600">{{ config.public.gitHash }}</p>
                <UISelect
                    class="mt-4 max-w-xs"
                    v-model="selectLanguage.locale"
                    @change="changeLocale()"
                    :options="
                        locales.map((l) => ({
                            label: l.name,
                            value: l.code,
                            icon: 'flags/' + l.code,
                        }))
                    "
                    color="white"
                />
                <div class="mt-8 flex gap-4">
                    <a
                        href="https://twitter.com/GUMaestro"
                        target="_blank"
                    >
                        <NuxtIcon
                            name="socials/twitter"
                            class="icon big"
                        />
                    </a>
                    <a
                        href="https://discord.com/invite/GWpGBK8gmA"
                        target="_blank"
                    >
                        <NuxtIcon
                            name="socials/discord"
                            class="icon big"
                        />
                    </a>
                    <a
                        href="https://youtube.com/channel/UC9Z6Y5zXx7BUVrZ9YXxZQ8w"
                        target="_blank"
                    >
                        <NuxtIcon
                            name="socials/youtube"
                            class="icon big"
                        />
                    </a>
                </div>
            </div>
            <div>
                <h1 class="text-xl font-bold">Liens utiles</h1>
                <ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
                    <li>
                        <NuxtLink :to="localePath('/')">Accueil</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="localePath('/tools/discord/embed-maker')">Créateur d'embeds</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">Nos tutoriels</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="localePath('testimonials')">Avis des utilisateurs</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="text-xl font-bold">Groupe</h1>
                <ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
                    <li>
                        <NuxtLink to="https://diose.io">Site</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="https://umaestro.fr/recrutements">Recrutements</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">Partenaires</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="text-xl font-bold">Confidentialité & Sécurité</h1>
                <ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
                    <li>
                        <NuxtLink to="#">Conditions générales d'utilisation</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">Politique de confidentialité</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <p class="mt-16 text-center text-base text-gray-300">
            Fait avec <span class="inline-block animate-bounce">❤️</span> par
            <a
                class="font-semibold text-white underline"
                href="https://diose.io"
                target="_blank"
            >
                Diose
            </a>
        </p>
    </footer>
</template>
