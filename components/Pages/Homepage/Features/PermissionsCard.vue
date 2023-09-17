<script setup lang="ts">
const users = ref([
    {
        name: 'Jack',
        avatar: '/images/features/permissions/jack.png',
        permission: 'edit',
    },
    {
        name: 'Henri',
        avatar: '/images/features/permissions/henri.png',
        permission: 'view',
    },
    {
        name: 'Lucie',
        avatar: '/images/features/permissions/lucie.png',
        permission: 'edit',
    },
]);
</script>

<template>
    <article class="relative rounded-3xl border-2 shadow-md">
        <img
            src="/images/features/permissions/blurry_circle.png"
            class="pointer-events-none absolute bottom-0 left-0 w-full select-none"
        />
        <div class="p-8">
            <h1 class="mb-2 text-center text-2xl font-bold">{{ $t('homepage.features.permissions.title') }}</h1>
            <p class="text-md text-center text-zinc-400">
                {{ $t('homepage.features.permissions.description') }}
            </p>
            <div class="mx-auto mt-6 flex max-w-sm flex-col gap-2">
                <div
                    v-for="(user, index) of users"
                    :key="index"
                    class="flex items-center justify-between"
                >
                    <div class="flex items-center gap-2 text-lg font-semibold">
                        <img
                            :src="user.avatar"
                            class="h-12 w-12 rounded-full border-2 border-zinc-100 dark:border-zinc-800"
                        />
                        {{ user.name }}
                    </div>
                    <UISelect
                        :options="[
                            { label: $t('tools.global.collaboration.permissions.view'), value: 'view' },
                            { label: $t('tools.global.collaboration.permissions.edit'), value: 'edit' },
                            { label: $t('tools.global.collaboration.permissions.none'), value: 'none' },
                        ]"
                        v-model="user.permission"
                        color="white"
                        class="w-32"
                    />
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
article {
    border-color: #faebcd;
}

html.dark article {
    border-color: #733c1e;
}
</style>
