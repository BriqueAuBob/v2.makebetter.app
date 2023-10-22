import { useAuthStore } from '~/stores/auth';
import { useNuxtApp } from '#app';
import { $fetchApi } from '~/composables/fetch';

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();
    const cookie = useCookie('token', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });
    if (!authStore.isLoggedIn) {
        const token = cookie.value;
        if (token) {
            try {
                const { user } = await $fetchApi<{ user: any }>(`/auth/user`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                authStore.login(token, user);
            } catch (e) {
                cookie.value = null;
            }
        }
    }

    if (to.path === '/beta') return;
    if (!authStore.isLoggedIn) {
        return navigateTo('/beta?error=not_logged_in');
    }
    if (!authStore.user?.permissions?.includes('view_beta')) {
        return navigateTo('/beta?error=access_denied');
    }

    const { $toast } = useNuxtApp();
    const cookieBeta = useCookie('has_seen_beta_notices', {
        path: '/',
        maxAge: 60 * 60,
    });

    setTimeout(() => {
        if (process.server) return;
        if (cookieBeta.value) return;

        $toast.show({
            title: 'Bienvenue sur MakeBetter 2 !',
            message:
                'Cette version est encore en développement, merci de nous faire remonter les bugs que tu rencontres sur notre serveur Discord.',
            type: 'info',
            timeout: 20,
        });
        cookieBeta.value = 'true';
    }, 500);

    return;
});
