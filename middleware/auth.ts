import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
        return navigateTo('/');
    }
});
