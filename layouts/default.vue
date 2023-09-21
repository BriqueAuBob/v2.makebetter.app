<script setup>
defineProps({
    color: {
        type: String,
        default: 'blue',
    },
});
</script>

<template>
    <div>
        <NavigationNavbar />
        <slot />
        <NavigationFooter :class="color === 'red' && 'hue-rotate-90 saturate-50'" />
    </div>
</template>
