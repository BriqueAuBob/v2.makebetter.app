<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div>
        <div class="mb-2 font-display text-lg font-semibold">{{ title }}</div>
        <div class="mt-4 flex gap-4">
            <UIButton color="light">
                {{ $t('tools.global.load.template') }}
            </UIButton>
            <UIButton color="light">
                {{ $t('tools.global.load.save') }}
            </UIButton>
        </div>
        <div class="mt-3 text-sm font-medium italic">
            Le chargement effacera toutes les modifications non sauvegardées.
        </div>
    </div>
</template>
