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
        <div class="mt-4 grid grid-cols-2 gap-2">
            <div
                class="cursor-pointer rounded-3xl border border-gray-300 bg-gradient-to-br from-purple-50 to-purple-200 p-6 shadow-md duration-300 ease-out hover:-translate-y-1 hover:brightness-105 dark:border-purple-400 dark:from-purple-500 dark:to-purple-900 dark:shadow-purple-950 dark:hover:brightness-125"
                @click="() => {
					personal = false;
					(modal as UIModalType).setIsOpen(true)
				}"
            >
                <div class="text-lg font-semibold">{{ $t('tools.global.load.template.title') }}</div>
                <p class="mt-1 text-sm">
                    {{ $t('tools.global.load.template.description') }}
                </p>
            </div>
            <div
                class="cursor-pointer rounded-3xl border border-gray-300 bg-gradient-to-br from-indigo-50 to-indigo-200 p-6 shadow-md duration-300 ease-out hover:-translate-y-1 hover:brightness-105 dark:border-indigo-400 dark:from-indigo-500 dark:to-indigo-900 dark:shadow-indigo-900 dark:hover:brightness-125"
                @click="
				() => {
					personal = true;
					(modal as UIModalType).setIsOpen(true)
				}
			"
            >
                <div class="text-lg font-semibold">{{ $t('tools.global.load.save.title') }}</div>
                <p class="mt-1 text-sm">
                    {{ $t('tools.global.load.save.description') }}
                </p>
            </div>
        </div>
        <div class="mt-3 flex items-center gap-1 text-xs font-medium text-gray-400">
            <NuxtIcon
                name="alert_circle"
                class="text-lg"
            />
            {{ $t('tools.global.load.warning') }}
        </div>
        <LazyToolsTemplatesModal
            :personal="personal"
            @load="emits('load', $event, personal)"
            ref="modal"
        />
    </div>
</template>
