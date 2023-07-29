<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useI18n } from '#i18n';
import type { NavigationItems, NavigationItem } from '~/types/navigation';

const localePath = useLocalePath();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const toggleDark = () => {
    colorMode.value = isDark.value ? 'light' : 'dark';
    localStorage.setItem('nuxt-color-mode', colorMode.value);
};

const authUrl = computed(() => {
    return `https://auth.umaestro.fr/?redirect_uri=${encodeURIComponent(window ? window.location.href : '')}`;
});

const authStore = useAuthStore();

const { t } = useI18n();

const items: NavigationItems = [
    {
        label: t('navigation.tools'),
        href: 'tools',
        megaMenu: true,
        component: resolveComponent('NavigationMegaMenuTools'),
    },
    {
        label: t('navigation.hiring'),
        href: 'https://umaestro.fr/recrutements',
        target: '_blank',
    },
];
const currentItem = ref<NavigationItem | null>(null);

const x = ref(0);
const megaMenu = ref<HTMLElement | null>(null);
onMounted(() => {
    megaMenu.value = document.getElementById('megamenu');
});

const onHover = (e: MouseEvent, item: NavigationItem) => {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    const link = target.parentElement!.getBoundingClientRect();
    const navbar = target.parentElement!.parentElement!.parentElement!.parentElement!.getBoundingClientRect();
    x.value = link.left - navbar.left + link.width / 2;
    currentItem.value = item;
};
</script>

<template>
    <nav
        class="ease container absolute left-1/2 top-2 z-10 mx-auto flex -translate-x-1/2 items-center justify-between rounded-xl py-6 duration-300"
        @mouseleave="currentItem = null"
    >
        <div class="flex items-center gap-8">
            <NuxtLink
                class="flex items-center gap-2 font-display text-lg font-bold text-white"
                id="branding"
                :to="localePath('/')"
            >
                <nuxt-img class="h-7 w-7" src="/images/makebetter.svg" />
                makebetter.app
            </NuxtLink>
            <ul class="flex items-center gap-6 text-sm text-gray-300">
                <li v-for="(item, id) of items" :key="id">
                    <NuxtLink
                        :to="localePath(item?.href)"
                        :target="item?.target"
                        @mouseover="(e: MouseEvent) => onHover(e, item)"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </li>
            </ul>
            <transition name="fade">
                <NavigationMegaMenu v-if="currentItem && currentItem.megaMenu" :item="currentItem" :x="x" :y="66" />
            </transition>
        </div>
        <div class="flex items-center gap-8">
            <button class="text-gray-100" @click="toggleDark">
                <NuxtIcon name="moon" v-if="!isDark" class="icon big" />
                <NuxtIcon name="sun" v-else class="icon big" />
            </button>
            <ClientOnly>
                <UIButton v-if="!authStore.isLoggedIn" :href="authUrl" color="light">{{
                    $t('navigation.login')
                }}</UIButton>
                <UIButton v-else href="/account" color="light" class="flex items-center gap-2">
                    <UIAvatar size="sm" :user="authStore.user" />
                    {{ authStore.user.username }}
                </UIButton>
            </ClientOnly>
        </div>
    </nav>
</template>
