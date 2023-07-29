<script setup lang="ts">
const colors = [
    '#FA30A9',
    '#14B598',
    '#B0FF07',
    '#07FF97',
    '#FF0707',
    '#CBB648',
    '#9FD8E5',
    '#BA98DE',
    '#EA4C89',
    '#D6B370',
    '#FFA800',
    '#1DB954',
    '#9207FF',
    '#FF3A75',
    '#F1FF9A',
    '#A899FF',
    '#4B4B4B',
    'transparent',
];

const color = reactive({
    value: '#343434',
});

const emit = defineEmits(['change', 'update:modelValue']);
watch(
    () => color.value,
    () => {
        emit('update:modelValue', color.value);
        emit('change', color.value);
    }
);
</script>

<template>
    <div class="grid grid-cols-4 gap-2">
        <UIColorPicker v-model="color.value" />
        <div class="col-span-3 grid grid-cols-9 gap-2">
            <div
                v-for="(col, index) in colors"
                :key="index"
                class="aspect-square rounded-xl border-2 border-gray-950 border-opacity-25"
                :style="`background: ${col};`"
                @click="color.value = col"
            ></div>
        </div>
    </div>
</template>
