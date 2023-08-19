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
const personal = ref<boolean>(false);

const emits = defineEmits(['load']);
</script>

<template>
    <div>
        <div class="mb-2 font-display text-lg font-semibold">{{ title }}</div>
        <div class="mt-4 flex gap-4">
            <UIButton
                color="light"
                @click="() => {
					personal = false;
					(modal as UIModalType).setIsOpen(true)
				}"
            >
                {{ $t('tools.global.load.template') }}
            </UIButton>
            <UIButton
                color="light"
                @click="
				() => {
					personal = true;
					(modal as UIModalType).setIsOpen(true)
				}
			"
            >
                {{ $t('tools.global.load.save') }}
            </UIButton>
        </div>
        <div class="mt-3 text-sm font-medium italic">
            Le chargement effacera toutes les modifications non sauvegardées.
        </div>
        <LazyToolsTemplatesModal
            :personal="personal"
            @load="emits('load', $event, personal)"
            ref="modal"
        />
    </div>
</template>
