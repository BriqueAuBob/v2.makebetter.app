<script setup lang="ts">
const { data } = await useFetchApi<{ saves: any[] }>('/makebetter/saves?page=1');
const saves = data.value?.saves;

const filters = ['Tout', "Créateur d'embed", 'Créateur de badges', "Créateur d'emojis", 'Editeur Markdown'];
const selectedFilter = ref<string>('Tout');
const search = ref<string>('');
</script>

<template>
    <header
        class="bg-primary-500 bg-cover bg-center bg-no-repeat pb-32 pt-52 text-center text-xl font-semibold"
        style="background-image: url('/images/backgrounds/tools.png')"
    >
        <div class="container text-white">
            <h1 class="text-5xl font-bold">{{ $t('templates.title') }}</h1>
            <h2 class="mx-auto mb-8 mt-6 max-w-3xl text-3xl font-medium">
                {{ $t('templates.description') }}
            </h2>
        </div>
    </header>
    <main class="container py-16">
        <UIInput
            v-model="search"
            placeholder="Rechercher un template"
            class="mb-3 w-full"
            icon="search"
            name="search"
        />
        <div class="flex gap-2">
            <button
                v-for="(filter, index) in filters"
                :key="index"
                class="rounded-lg px-5 py-2 duration-300 ease-in"
                :class="selectedFilter === filter ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800'"
                @click="selectedFilter = filter"
            >
                {{ filter }}
            </button>
        </div>
        <PagesTemplatesListHorizontal
            class="mt-4"
            title="Templates populaires"
            :saves="saves"
        />
        <PagesTemplatesListHorizontal
            class="mt-4"
            title="Templates récents"
            :saves="saves"
        />
    </main>
</template>
