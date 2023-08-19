<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
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
    displayLabel: {
        type: Boolean,
        default: true,
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
</script>

<template>
    <div :class="disabled && 'cursor-not-allowed opacity-25'">
        <label
            :for="name"
            class="pointer-events-none ml-4 text-sm font-medium italic text-gray-400"
            :class="!displayLabel && 'hidden'"
        >
            {{ label }}
        </label>
        <component
            :is="longText ? 'textarea' : 'input'"
            :id="name"
            :name="name"
            :placeholder="placeholder"
            class="w-full rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-xs placeholder:italic placeholder:text-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed dark:border-primary-500 dark:bg-primary-700 dark:text-white dark:placeholder:text-neutral-500"
            :class="displayLabel && 'mt-1'"
            :value="modelValue"
            @input="updateValue($event.target.value)"
            @focus="emit('focus')"
            @keyup.enter="emit('enter')"
            :disabled="fake || disabled"
            :type="secure ? 'password' : type || 'text'"
            ref="input"
        />
    </div>
</template>
