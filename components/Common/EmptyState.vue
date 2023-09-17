<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'Aucun résultat',
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
    buttonText: {
        type: String,
        required: false,
    },
    buttonAction: {
        type: Function as PropType<() => void>,
        required: false,
        default: () => {},
    },
});
</script>

<template>
    <div
        class="flex max-w-md flex-col rounded-xl border-2 border-dashed border-primary-400 bg-gradient-to-b from-white to-primary-200 p-6 text-center dark:from-transparent dark:to-zinc-800"
    >
        <h1 class="text-lg font-semibold">{{ title }}</h1>
        <p
            class="text-md mt-1 text-zinc-400"
            v-if="description"
        >
            {{ description }}
        </p>
        <UIButton
            class="mt-4"
            color="light"
            v-if="buttonText"
            @click="buttonAction"
        >
            {{ buttonText }}
        </UIButton>
    </div>
</template>
