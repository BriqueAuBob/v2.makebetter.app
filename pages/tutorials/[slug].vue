<script setup lang="ts">
import { marked } from 'marked';
const renderer = {
    heading(text: string, level: number) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        const size = {
            1: 'text-4xl',
            2: 'text-3xl',
            3: 'text-2xl',
            4: 'text-xl',
            5: 'text-lg',
            6: 'text-base',
        }[level];
        return `
            <h${level} class="${size} font-semibold mb-2">
              ${text}
            </h${level}>`;
    },
    paragraph(text: string) {
        return `<p class="text-sm">${text}</p>`;
    },
};

marked.use({ renderer });

const route = useRoute();
const { data } = await useFetchApi<{
    article: any;
}>(`/articles/${route.params.slug}`);
const article = data?.value?.article;

const markdown = computed(() => {
    return marked.parse(article?.content_fr);
});
</script>

<template>
    <header class="relative">
        <div
            class="pb-52 pt-32 text-center"
            style="background: linear-gradient(#1404f4, #081d7d)"
        >
            <div class="container mx-auto px-4">
                <h1 class="text-4xl font-extrabold">{{ article?.title_fr }}</h1>
                <h2 class="mx-auto mt-4 max-w-4xl text-2xl leading-relaxed">
                    {{ article?.description_fr }}
                </h2>
                <span class="mt-8 block text-xs">publié par</span>
                <div class="stretch-content mt-4 inline-flex items-center gap-2 rounded-3xl bg-white p-4 shadow-2xl">
                    <UIAvatar :user="article?.author" />
                    <div class="flex flex-col justify-center gap-1 text-left">
                        <span class="text-lg font-bold text-primary-900">@{{ article?.author?.username }}</span>
                        <span class="text-sm text-gray-600">Rédacteur</span>
                    </div>
                </div>
                <span class="mt-4 block text-xs">le {{ new Date(article.created_at).toLocaleDateString() }}</span>
            </div>
        </div>
        <svg
            style="fill: #081d7d"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 1440 87"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="m0 23 120 16c120 16 360 48 600 48s480-32 600-48l120-16V0H0v23Z"
            />
        </svg>
        <img
            class="absolute -bottom-24 left-1/2 w-full -translate-x-1/2 rounded-3xl shadow-xl sm:w-1/2 lg:w-1/3"
            src="/images/tuto_embeds.png"
        />
    </header>
    <section
        class="container mx-auto py-48"
        v-html="markdown"
    ></section>
</template>
