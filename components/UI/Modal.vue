<script setup lang="ts">
const isOpen = ref(false);

defineProps({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    onApply: {
        type: Function,
    },
    okText: {
        type: String,
    },
    size: {
        type: String as PropType<'small' | 'medium' | 'large'>,
        default: 'medium',
    },
    buttonDisabled: {
        type: Boolean,
        default: false,
    },
    noButtons: {
        type: Boolean,
        default: false,
    },
    noPadding: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['close']);
function setIsOpen(value: boolean) {
    isOpen.value = value;
    if (!value) {
        emits('close');
    }
}

defineExpose({
    setIsOpen,
    isOpen,
});
</script>

<template>
    <HeadlessTransitionRoot
        class="absolute"
        appear
        :show="isOpen"
    >
        <ClientOnly>
            <HeadlessDialog
                as="div"
                @close="setIsOpen"
                class="relative z-[150]"
            >
                <HeadlessTransitionChild
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                    class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md dark:bg-opacity-75"
                >
                </HeadlessTransitionChild>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center text-center">
                        <HeadlessTransitionChild
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <HeadlessDialogPanel
                                class="w-full transform rounded-3xl border-2 border-zinc-200 bg-white text-left align-middle transition-all dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-800"
                                :class="{
                                    'max-w-xl': size === 'small',
                                    'max-w-2xl': size === 'medium',
                                    'max-w-4xl': size === 'large',
                                    'p-8': !noPadding,
                                }"
                            >
                                <HeadlessDialogTitle
                                    v-if="title"
                                    as="h3"
                                    class="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-50"
                                >
                                    {{ title }}
                                </HeadlessDialogTitle>
                                <HeadlessDialogDescription
                                    v-if="description"
                                    class="mt-2 text-sm text-zinc-500"
                                    as="p"
                                >
                                    {{ description }}
                                </HeadlessDialogDescription>
                                <slot></slot>
                                <div
                                    class="mt-4 flex justify-end gap-2"
                                    :class="noPadding && 'px-4 pb-4'"
                                    v-if="!noButtons"
                                >
                                    <UIButton
                                        color="transparent"
                                        @click="setIsOpen(false)"
                                    >
                                        {{ $t('buttons.cancel') }}
                                    </UIButton>
                                    <UIButton
                                        color="primary"
                                        @click="
                                            () => {
                                                if (onApply && onApply()) return;
                                                setIsOpen(false);
                                            }
                                        "
                                        :disabled="buttonDisabled"
                                    >
                                        {{ okText || $t('buttons.apply') }}
                                    </UIButton>
                                </div>
                            </HeadlessDialogPanel>
                        </HeadlessTransitionChild>
                    </div>
                </div>
            </HeadlessDialog>
        </ClientOnly>
    </HeadlessTransitionRoot>
</template>
