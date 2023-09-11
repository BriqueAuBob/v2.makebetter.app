<script setup>
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));

definePageMeta({
    middleware: 'auth',
});
</script>

<template>
    <header class="bg-primary-500 pb-24 pt-48 text-center text-xl font-semibold text-gray-300">
        <UIAvatar
            :user="user"
            size="xl"
            class="mx-auto mb-4"
        />
        <div>
            Bonjour, <span class="text-3xl text-white">{{ user.username }}</span>
        </div>
    </header>
</template>
