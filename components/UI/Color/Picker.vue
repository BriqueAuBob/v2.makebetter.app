<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue', 'change']);
function updateValue(value: string) {
    emit('update:modelValue', value);
    emit('change', value);
}
</script>

<template>
    <input
        type="color"
        class="h-full w-full rounded-xl border-2 border-zinc-950 border-opacity-25 outline-none"
        :style="`background: ${modelValue};`"
        :value="modelValue"
        @input="updateValue(($event.target as HTMLInputElement)?.value)"
    />
</template>

<style scoped>
input[type='color'] {
    overflow: hidden;
}

input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type='color']::-webkit-color-swatch {
    border: none;
}
</style>
