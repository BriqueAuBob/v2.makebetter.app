export default defineEventHandler(async (event) => {
    if (!event?.node?.req?.url?.startsWith('/api')) return;

    const token = event.headers.get('authorization');
    if (!token) return { error: 'No token provided' };

    const config = useRuntimeConfig();

    const { user } = await $fetch<{ user: any }>('/auth/user', {
        baseURL: config.public.baseUrl,
        headers: {
            Authorization: token,
        },
    });
    event.context.user = {
        ...user,
        token,
    };
});
