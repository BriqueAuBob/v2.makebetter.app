<script setup>
const props = defineProps({
    src: {
        type: String,
        default: '/images/avatar_demo.png',
    },
    size: {
        type: String,
        default: 'md',
    },
    user: {
        type: Object,
        default: {
            username: 'Username',
            discriminator: '0000',
            avatar: '/images/avatar_demo.png',
        },
        required: true,
    },
    class: {
        type: String,
        default: '',
    },
    style: {
        type: String,
        default: '',
    },
});

const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
};
const size = computed(() => sizes[props.size]);

const avatar = computed(() => {
    if (props.user.avatar) return props.user?.avatar;
    if (props.src) return props.src;
    return '/images/avatar_demo.png';
});

const hasError = ref(false);
</script>

<template>
    <ClientOnly>
        <nuxt-img
            v-if="!hasError"
            :src="avatar"
            :alt="`${props.user?.username}#${props.user?.discriminator} Avatar`"
            :class="size + ' rounded-full' + ' ' + props.class"
            :style="props.style"
            @error="() => (hasError = true)"
            preset="avatar"
        />
        <div
            v-else
            :class="
                size +
                ' flex items-center justify-center rounded-full bg-primary-500 text-xl font-bold text-white ' +
                props.class
            "
            :style="props.style"
        >
            {{ props.user?.username?.[0] }}
        </div>
    </ClientOnly>
</template>
