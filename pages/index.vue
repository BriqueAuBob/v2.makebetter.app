<script setup lang="ts">
import type { CollapseGroupItems } from '~/types/collapse';
import type { Testimonials as TestimonialsType, Statistics as StatisticsType } from '~/types/api_response';
import { Slide } from 'vue3-carousel';
import { useI18n } from '#i18n';
const localePath = useLocalePath();
const { locale, t } = useI18n();
const language = reactive({
    locale: locale.value,
});
const previews = [
    `images/demos/embedcreator-${language.locale}.png`,
    `images/demos/emojimaker-${language.locale}.png`,
    `images/demos/badgecreator-${language.locale}.png`,
    `images/demos/markdowneditor-${language.locale}.png`,
];
const collapsibleElements: CollapseGroupItems = [
    {
        title: t('tools.discord.embed.name'),
        content: t('tools.discord.embed.description'),
        defaultOpen: true,
    },
    {
        title: t('tools.discord.badges.name'),
        content: t('tools.discord.badges.description'),
    },
    {
        title: t('tools.discord.emojis.name'),
        content: t('tools.discord.emojis.description'),
    },
];

const { data: testimonialsData } = await useFetchApi<TestimonialsType>('testimonials?max=3');
const { data: statisticsData } = await useFetchApi<StatisticsType>('statistics');
const { data: articlesPagination } = await useFetchApi<{
    meta: any;
    articles: any[];
}>('articles?type=makebetter&search=');

const hasScrolled = ref(false);
onMounted(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            hasScrolled.value = true;
        } else {
            hasScrolled.value = false;
        }
    });
});
</script>

<template>
    <header class="relative text-white">
        <div class="rounded-b-[200px] bg-primary-500 bg-header-home bg-cover bg-center bg-no-repeat px-4 pb-72 pt-44">
            <span class="text-md mb-3 block text-center font-semibold text-gray-300 lg:text-xl">
                {{ $t('homepage.header.presentation') }}
            </span>
            <h1 class="text-center text-5xl font-black lg:text-7xl xl:text-8xl">
                {{ $t('homepage.header.title') }}
            </h1>
            <h2
                class="mx-auto mt-4 text-center font-sans text-xl font-bold leading-relaxed lg:max-w-xl lg:text-2xl lg:leading-relaxed xl:max-w-3xl xl:text-4xl xl:leading-relaxed"
            >
                {{ $t('homepage.header.description') }}
            </h2>
            <div class="mt-12 flex items-center justify-center gap-6">
                <UIButton
                    size="lg"
                    color="light"
                    class="text-sm lg:text-lg"
                    >{{ $t('homepage.header.buttons.use_tool') }}</UIButton
                >
                <NuxtLink
                    to="https://discord.com/invite/GWpGBK8gmA"
                    target="_blank"
                >
                    <UIButton
                        size="lg"
                        :outlined="true"
                        color="light"
                        class="text-sm lg:text-lg"
                    >
                        {{ $t('homepage.header.buttons.join_discord') }}
                    </UIButton>
                </NuxtLink>
            </div>
        </div>
        <img
            src="/images/arc_demo.png"
            class="absolute left-1/2 top-full -z-1 w-full max-w-7xl -translate-x-1/2 -translate-y-32 xl:w-4/5"
        />
        <div
            class="absolute left-1/2 top-full w-full max-w-3xl -translate-x-1/2 rounded-3xl border-8 border-primary-500 bg-white text-black shadow-2xl shadow-primary-100 duration-500 ease-out dark:shadow-primary-800 lg:w-2/3 xl:w-1/2"
            :class="hasScrolled ? '-translate-y-52 scale-110' : 'perspective'"
        >
            <header class="relative border-b border-gray-100 px-4">
                <ul class="flex gap-6 font-semibold">
                    <li class="cursor-pointer py-4">Créateur d'embeds</li>
                    <!-- <li class="cursor-pointer py-4">Créateur d'icônes de rôles</li>
                    <li class="cursor-pointer py-4">Créateur d'emojis</li> -->
                </ul>
                <div class="absolute bottom-0 left-14 h-1 w-16 rounded-t-xl bg-gray-200"></div>
            </header>
            <main class="relative p-4">
                <img
                    src="/images/temp_embeds.png"
                    class="w-full"
                />
                <UIButton
                    :href="localePath('tools-discord-embed-maker')"
                    class="absolute left-1/2 -mt-2 -translate-x-1/2"
                >
                    Utiliser cet outil
                    <NuxtIcon
                        name="arrow/circle/right"
                        class="text-xl"
                    />
                </UIButton>
            </main>
        </div>
    </header>
    <section class="container mt-32 gap-16 pb-16 pt-80 xl:mt-32 xl:pt-96">
        <h1 class="mx-auto text-center text-xl font-bold">
            {{ $t('homepage.our_tools') }}
        </h1>
        <div class="mt-6 grid gap-4 lg:grid-cols-3">
            <ToolsCard
                title="Créateur d'embeds"
                description="Envoie des messages customisés sur ton serveur Discord. Impressionne tes membres avec tes messages !"
                image="embed-maker.png"
                platform="discord"
                url="tools-discord-embed-maker"
            />
            <ToolsCard
                title="Créateur d'icônes de rôles"
                description="Créée des icônes pour tes rôles sur ton serveur Discord !"
                image="roles-icons-maker.png"
                platform="discord"
                url="#"
                :coming-soon="true"
            />
        </div>
    </section>
    <section class="container relative pb-48 pt-16">
        <h1 class="mx-auto text-center text-xl font-bold">
            {{ $t('homepage.features.title') }}
        </h1>
        <div class="mt-6 grid gap-4 lg:grid-cols-4 xl:grid-cols-6">
            <PagesHomepageFeaturesCollaborationCard class="col-span-2" />
            <PagesHomepageFeaturesTemplatesCard class="col-span-2" />
            <PagesHomepageFeaturesAiCard class="col-span-2" />
            <PagesHomepageFeaturesPermissionsCard class="col-span-2 xl:col-span-3" />
            <PagesHomepageFeaturesAvailableOnCard class="col-span-4 xl:col-span-3" />
        </div>
    </section>
    <BannerHiring />
    <section class="container relative gap-16 py-32">
        <h1 class="mx-auto text-center text-xl font-bold">
            {{ $t('homepage.need_help') }}
        </h1>
        <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardArticle
                v-for="(article, i) in articlesPagination?.articles"
                :key="i"
                :data-aos-offset="100 + i * 100"
                :article="article"
                :views="article.views_count"
            ></CardArticle>
        </div>
        <div class="flex justify-center">
            <UIButton
                class="mt-12"
                color="color-mode"
            >
                {{ $t('homepage.view_tutorials') }}
            </UIButton>
        </div>
    </section>
    <section class="container relative gap-16 pb-64 pt-24">
        <p class="mb-4 whitespace-pre text-center text-lg font-semibold leading-relaxed">
            {{
                $t('homepage.stat_usage_rates', {
                    usersCount: statisticsData?.members,
                    ratesCount: statisticsData?.testimonials,
                })
            }}
        </p>
        <h1 class="text-center text-3xl font-black">Pourquoi pas toi&nbsp;?</h1>
        <div class="mt-8 grid gap-6 lg:grid-cols-3">
            <CardReview
                v-for="(testimonial, id) in testimonialsData?.testimonials"
                :key="id"
                :author="testimonial.author"
                :content="testimonial.message"
                :data-aos-offset="100 + id * 100"
            ></CardReview>
        </div>
        <div class="flex items-center justify-center gap-6">
            <UIButton
                class="mt-12"
                color="color-mode"
            >
                {{ $t('testimonials.publish') }}
            </UIButton>
            <UIButton
                :href="localePath('testimonials')"
                class="mt-12"
                color="transparent"
            >
                {{ $t('testimonials.view') }}
            </UIButton>
        </div>
    </section>
</template>
