<script setup>
import { $fetchApi } from '~/composables/fetch';

defineI18nRoute({
    paths: {
        fr: '/tutoriels',
    },
});

const { data } = useAsyncData(() => $fetchApi('articles'));
</script>

<template>
    <header class="bg-gradient-to-b from-primary-400 to-transparent pb-24 pt-48 text-center dark:from-zinc-800">
        <h1 class="mb-4 text-3xl font-black">{{ $t('tutorials.title') }}</h1>
        <p class="text-lg font-semibold leading-relaxed">
            {{ $t('tutorials.description') }}
        </p>
    </header>
    <section class="container relative gap-16 pb-64 pt-8">
        <div class="mt-8 grid grid-cols-3 gap-6">
            <CardArticle
                v-for="(article, i) in data?.articles"
                :key="i"
                :data-aos-offset="100 + i * 100"
                :article="article"
                :views="article.views_count"
            />
        </div>
    </section>
</template>
