<script setup lang="ts">
defineProps({
    article: {
        type: Object,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    liked: {
        type: Boolean,
        default: false,
    },
});

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();
const language = reactive({
    locale: locale.value,
});
</script>

<template>
    <NuxtLink
        :to="
            localeRoute({
                name: 'tutorials-slug',
                params: {
                    slug: locale === 'fr' ? article.slug_fr : article.slug_en,
                },
            })
        "
    >
        <UICard
            class="overflow-hidden"
            :title="locale === 'fr' ? article.title_fr : article.title_en"
            :description="locale === 'fr' ? article.description_fr : article.description_en"
        >
            <template #header>
                <nuxt-img
                    src="/images/tuto_embeds.png"
                    class="w-full"
                />
            </template>
            <template #footer>
                <div class="-mt-4 flex items-center justify-between px-8 pb-8">
                    <div class="rounded-md bg-primary-500 px-2 py-1 text-sm font-medium text-white">
                        {{ locale === 'fr' ? 'Nouveau' : 'New' }}
                    </div>
                    <div class="flex items-center gap-4">
                        <!-- <div class="flex items-center gap-2">
                            <NuxtIcon
                                name="eye"
                                class="icon"
                            />
                            <span class="text-stone-500">{{ views }}</span>
                        </div> -->
                        <!-- <div class="flex items-center gap-2">
                            <NuxtIcon
                                name="heart"
                                class="icon"
                                :filled="!liked"
                            />
                            <span class="text-stone-500">{{ likes }}</span>
                        </div> -->
                    </div>
                </div>
            </template>
        </UICard>
    </NuxtLink>
</template>
