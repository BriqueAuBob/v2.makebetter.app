<script setup lang="ts">
type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

defineProps({
    title: {
        type: String,
        required: true,
    },
});

const modal = ref<UIModalType>();
</script>

<template>
    <div>
        <div class="mb-2 font-display text-lg font-semibold">{{ title }}</div>
        <div class="mt-4 flex gap-4">
            <UIButton
                color="light"
                @click="(modal as UIModalType).setIsOpen(true)"
            >
                {{ $t('tools.global.load.template') }}
            </UIButton>
            <UIButton color="light">
                {{ $t('tools.global.load.save') }}
            </UIButton>
        </div>
        <div class="mt-3 text-sm font-medium italic">
            Le chargement effacera toutes les modifications non sauvegardées.
        </div>
        <ToolsTemplatesModal ref="modal" />
    </div>
</template>
