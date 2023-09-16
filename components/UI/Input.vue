<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
        required: true,
    },
    longText: {
        type: Boolean,
        required: false,
        default: false,
    },
    modelValue: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    fake: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    secure: {
        type: Boolean,
        default: false,
    },
    autoComplete: {
        type: Array as PropType<any[]>,
        required: false,
    },
});

const input = ref<HTMLInputElement>();
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'enter']);
function updateValue(value: string) {
    emit('update:modelValue', value);
    emit('change', value);
}

const focus = () => {
    input.value?.focus();
};
defineExpose({
    focus,
});

const hasFocus = ref(false);
</script>

<template>
    <div :class="disabled && 'cursor-not-allowed opacity-50 dark:text-white dark:opacity-75'">
        <label
            :for="name"
            class="pointer-events-none ml-4 text-sm font-medium italic text-gray-400"
            v-if="label"
        >
            {{ label }}
        </label>
        <component
            :is="longText ? 'textarea' : 'input'"
            :id="name"
            :name="name"
            :placeholder="placeholder"
            class="w-full rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-xs placeholder:italic placeholder:text-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed dark:border-primary-500 dark:bg-primary-700 dark:text-white dark:placeholder:text-neutral-300"
            :class="label && 'mt-1'"
            :value="modelValue"
            @input="updateValue($event.target.value)"
            @focus="emit('focus')"
            @keyup.enter="emit('enter')"
            :disabled="fake || disabled"
            :type="secure ? 'password' : type || 'text'"
            ref="input"
            @focusout="hasFocus = false"
            @focusin="hasFocus = true"
        />
        <Transition name="fade">
            <div
                v-if="autoComplete && hasFocus"
                class="absolute left-0 top-full z-10 w-full translate-y-1 rounded-xl border border-dashed bg-white shadow-lg dark:divide-primary-500 dark:border-primary-500 dark:bg-primary-700 dark:text-white dark:shadow-primary-800"
            >
                <TransitionGroup name="fadescale">
                    <div
                        v-for="item in autoComplete"
                        :key="item.id"
                        class="m-1 flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-primary-500"
                        @click="
                            () => {
                                updateValue(item.username);
                                emit('enter', item);
                            }
                        "
                    >
                        <div class="flex items-center">
                            <UIAvatar
                                :user="item!"
                                size="xs"
                            />
                            <span class="ml-2 text-sm">{{ item?.username }}</span>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </Transition>
    </div>
</template>
