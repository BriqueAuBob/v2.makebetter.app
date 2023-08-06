<script setup lang="ts">
type User = {
    username: string;
    avatar: string;
};

defineProps({
    editors: {
        type: Array as PropType<
            Array<
                User & {
                    color?: string;
                }
            >
        >,
        required: true,
    },
    displayShare: {
        type: Boolean,
        default: false,
    },
    onShare: {
        type: Function as PropType<() => void>,
        default: () => {},
    },
});
</script>

<template>
    <div
        class="flex items-center rounded-2xl bg-white px-6 py-4 shadow-md shadow-primary-50 dark:bg-primary-700 dark:shadow-primary-800"
    >
        <UIAvatar
            v-for="editor in editors"
            :key="editor.username"
            :user="editor"
            class="-ml-2 -mr-2 border-2"
            :style="editor?.color ? `border-color: ${editor.color};` : 'border-color: #FFF;'"
        />
        <UIButton
            v-if="displayShare"
            class="ml-4"
            size="sm"
            color="light"
            @click="onShare"
        >
            Partager
        </UIButton>
    </div>
</template>
