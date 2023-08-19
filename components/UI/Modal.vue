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
                class="relative z-[100]"
            >
                <HeadlessTransitionChild
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                    class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md"
                >
                </HeadlessTransitionChild>
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <HeadlessTransitionChild
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <HeadlessDialogPanel
                                class="w-full transform rounded-3xl border-2 border-dashed border-gray-400 bg-white bg-opacity-75 p-8 text-left align-middle shadow-lg backdrop-blur-lg transition-all dark:border-primary-700 dark:bg-primary-900 dark:bg-opacity-75 dark:shadow-primary-800"
                                :class="{
                                    'max-w-xl': size === 'small',
                                    'max-w-2xl': size === 'medium',
                                    'max-w-fd': size === 'large',
                                }"
                            >
                                <HeadlessDialogTitle
                                    v-if="title"
                                    as="h3"
                                    class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                                >
                                    {{ title }}
                                </HeadlessDialogTitle>
                                <HeadlessDialogDescription
                                    v-if="description"
                                    class="mt-2 text-sm text-gray-500"
                                    as="p"
                                >
                                    {{ description }}
                                </HeadlessDialogDescription>
                                <slot></slot>
                                <div
                                    class="mt-4 flex justify-end gap-2"
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
