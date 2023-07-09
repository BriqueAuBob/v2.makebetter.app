<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <div>
        <div class="font-semibold font-display text-lg mb-2">{{ title }}</div>
        <div class="flex gap-4 mt-4">
            <UIButton color="light">
                {{ $t('tools.global.load.template') }}
            </UIButton>
            <UIButton color="light">
                {{ $t('tools.global.load.save') }}
            </UIButton>
        </div>
        <div class="font-medium text-sm mt-3 italic">
            Le chargement effacera toutes les modifications non sauvegardées.
        </div>
    </div>
</template>