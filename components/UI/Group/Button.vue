<template>
    <div class="btn-group">
        <slot></slot>
    </div>
</template>

<style>
.btn-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
}

.btn-group > * {
    @apply hover:translate-y-0 !important;
    @apply border-gray-200 border-opacity-50 dark:border-primary-600;
}
.btn-group > *:first-child {
    @apply rounded-r-none border-r !important;
}
.btn-group > *:last-child {
    @apply rounded-l-none border-l !important;
}
.btn-group > *:not(:first-child):not(:last-child) {
    @apply rounded-none border-l border-r !important;
}
.btn-group > *:first-child:last-child {
    @apply rounded-2xl border-2 !important;
}
</style>
