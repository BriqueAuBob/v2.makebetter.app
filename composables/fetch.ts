import { useAuthStore } from '~/stores/auth';

export const useFetchApi = (url: string, options: any = null) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (authStore.token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${authStore.token}`,
        };
    }

    return useFetch(url, {
        baseURL: config.public.baseUrl,
        ...options,
    });
};

export const $fetchApi = (url: string, options: any = null) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (authStore.token) {
        options = options || {};
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${authStore.token}`,
        };
    }

    return $fetch(url, {
        baseURL: config.public.baseUrl,
        ...options,
    });
};
