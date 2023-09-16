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
                <p class="mb-1 mt-4">{{ $t('footer.description') }}</p>
                <i class="text-sm font-semibold text-gray-400">
                    {{ $t('footer.not_affiliated') }}
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
                <h1 class="text-xl font-bold">{{ $t('footer.useful_links.title') }}</h1>
                <ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
                    <li>
                        <NuxtLink :to="localePath('/')">{{ $t('footer.useful_links.home') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="localePath('/tools/discord/embed-maker')">{{
                            $t('tools.discord.embed-maker.name')
                        }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">{{ $t('footer.useful_links.tutorials') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="localePath('testimonials')">{{
                            $t('footer.useful_links.testimonials')
                        }}</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="text-xl font-bold">{{ $t('footer.group.title') }}</h1>
                <ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
                    <li>
                        <NuxtLink to="https://diose.io">{{ $t('footer.group.website') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">{{ $t('footer.group.about') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="https://umaestro.fr/recrutements">{{ $t('footer.group.hiring') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">{{ $t('footer.group.partners') }}</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="text-xl font-bold">{{ $t('footer.security.title') }}</h1>
                <ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
                    <li>
                        <NuxtLink to="#">{{ $t('footer.security.terms_of_service') }}</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="#">{{ $t('footer.security.privacy_policy') }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <p class="mt-16 text-center text-base text-gray-300">
             Fait avec <span class="inline-block animate-bounce">❤️</span> par
            <a
                class="font-semibold text-white underline"
                href="https://diose.io"
                target="_blank"
            >
                Diose
            </a>
        </p> -->
        <i18n-t
            keypath="footer.made_with"
            tag="p"
            class="mt-16 text-center text-base text-gray-300"
        >
            <template #emoji>
                <span class="inline-block animate-bounce">❤️</span>
            </template>
            <template #link>
                <a
                    class="font-semibold text-white underline"
                    href="https://diose.io"
                    target="_blank"
                >
                    Diose
                </a>
            </template>
        </i18n-t>
    </footer>
</template>
