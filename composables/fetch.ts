import { useAuthStore } from '~/stores/auth';

export const useFetchApi = <T>(url: string, options: any = null) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (authStore.token) {
        options = options || {};
        options.headers = {
            ...options?.headers,
            Authorization: `Bearer ${authStore.token}`,
        };
    }

    return useFetch<T>(url, {
        baseURL: config.public.baseUrl,
        ...options,
    });
};

export const $fetchApi = <T>(url: string, options: any = null) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (authStore.token) {
        options = options || {};
        options.headers = {
            ...options?.headers,
            Authorization: `Bearer ${authStore.token}`,
        };
    }

    return $fetch<T>(url, {
        baseURL: config.public.baseUrl,
        ...options,
    });
};
