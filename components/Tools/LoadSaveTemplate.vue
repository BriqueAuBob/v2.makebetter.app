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
                class="cursor-pointer rounded-3xl border border-gray-300 bg-gradient-to-bl from-white to-green-200 p-6 shadow-md duration-300 ease-out hover:-translate-y-1 hover:brightness-105 dark:border-green-400 dark:from-green-500 dark:to-green-950 dark:shadow-green-900 dark:hover:brightness-125"
                @click="() => {
					personal = false;
					(modal as UIModalType).setIsOpen(true)
				}"
            >
                <NuxtIcon
                    name="globe"
                    class="text-3xl"
                />
                <div class="mt-2 text-lg font-semibold">{{ $t('tools.global.load.template.title') }}</div>
                <p class="mt-1 text-sm">
                    {{ $t('tools.global.load.template.description') }}
                </p>
            </div>
            <div
                class="cursor-pointer rounded-3xl border border-gray-300 bg-gradient-to-bl from-white to-indigo-200 p-6 shadow-md duration-300 ease-out hover:-translate-y-1 hover:brightness-105 dark:border-indigo-400 dark:from-indigo-500 dark:to-indigo-950 dark:shadow-indigo-900 dark:hover:brightness-125"
                @click="
				() => {
					personal = true;
					(modal as UIModalType).setIsOpen(true)
				}
			"
            >
                <NuxtIcon
                    name="pencil_rectangle"
                    class="text-3xl"
                />
                <div class="mt-2 text-lg font-semibold">{{ $t('tools.global.load.save.title') }}</div>
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
