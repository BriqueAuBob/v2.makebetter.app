<script setup lang="ts">
import { $fetchApi } from '~/composables/fetch';
import { useAuthStore } from '~/stores/auth';
import { useDebounce } from '~/composables/debounce';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const cookie = useCookie('token', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
});
onMounted(async () => {
    if (!route.query.code) return;

    const { token, user } = (await $fetchApi(`/auth/user/code?code=${route.query.code}`)) as {
        token: any;
        user: any;
    };

    if (!token) return;

    authStore.login(token.token, user);
    cookie.value = token.token;
    router.push('/');
});

const i18nHead = useLocaleHead({
    addSeoAttributes: true,
});
useHead({
    htmlAttrs: {
        lang: i18nHead.value.htmlAttrs!.lang,
    },
});

const mouseX = ref(0);
const mouseY = ref(0);
const ghostStyle = computed(() => {
    if (!process.client) return;
    const x = Math.floor((Math.random() - 0.5) * 250);
    const y = Math.floor((Math.random() - 0.5) * 250);

    return {
        left: `${mouseX.value + x}px`,
        top: `${mouseY.value + y}px`,
    };
});

const setMousePosition = useDebounce(50, (e: any) => {
    mouseX.value = e.clientX + window.scrollX;
    mouseY.value = e.clientY + window.scrollY;
});
</script>

<template>
    <div
        class="antialiased"
        @mousemove="
            (e) => {
                setMousePosition(e);
            }
        "
    >
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <ClientOnly>
            <img
                src="/images/events/halloween/2023/ghost.png"
                alt="ghost"
                class="ghost pointer-events-none hidden lg:inline"
                :style="ghostStyle"
            />
        </ClientOnly>
    </div>
</template>
