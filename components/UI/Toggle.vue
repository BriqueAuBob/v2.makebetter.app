<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue', 'change']);

const toggle = (value: boolean) => {
    emit('update:modelValue', value);
    emit('change', value);
};
</script>

<template>
    <HeadlessSwitchGroup>
        <div class="my-4 flex items-center justify-between">
            <HeadlessSwitchLabel class="mr-4">{{ label }}</HeadlessSwitchLabel>
            <HeadlessSwitch
                :model-value="modelValue"
                @update:modelValue="toggle"
                :class="modelValue ? 'bg-primary-500' : 'bg-zinc-300'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <span
                    :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
            </HeadlessSwitch>
        </div>
    </HeadlessSwitchGroup>
</template>
