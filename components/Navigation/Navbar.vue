<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useI18n } from '#i18n';
import type { NavigationItems, NavigationItem } from '~/types/navigation';

const localePath = useLocalePath();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const toggleDark = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark';
    localStorage.setItem('nuxt-color-mode', colorMode.value);
};

const config = useRuntimeConfig();
const authUrl = computed(() => {
    return config.public.authUrl + `/?redirect_uri=${encodeURIComponent(window ? window.location.href : '')}`;
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

const menuOpen = ref(false);
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
    if (menuOpen.value) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'auto';
    }
};
</script>

<template>
    <nav
        class="ease container absolute left-1/2 top-2 z-10 mx-auto flex -translate-x-1/2 flex-wrap items-center justify-between rounded-xl py-6 duration-300"
        @mouseleave="currentItem = null"
    >
        <div class="flex items-center gap-8">
            <NuxtLink
                class="flex items-center gap-2 font-display text-lg font-bold text-white"
                id="branding"
                :to="localePath('/')"
            >
                <nuxt-img
                    class="h-7 w-7"
                    src="/images/makebetter.svg"
                />
                makebetter.app
            </NuxtLink>
            <ul class="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
                <li
                    v-for="(item, id) of items"
                    :key="id"
                >
                    <NuxtLink
                        :to="localePath(item?.href) || item?.href"
                        :target="item?.target"
                        @mouseover="(e: MouseEvent) => onHover(e, item)"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </li>
            </ul>
            <transition name="fade">
                <NavigationMegaMenu
                    v-if="currentItem && currentItem.megaMenu"
                    :item="currentItem"
                    :x="x"
                    :y="66"
                />
            </transition>
        </div>
        <div class="flex items-center gap-8">
            <button
                class="relative text-zinc-100"
                @click="toggleDark"
            >
                <TransitionGroup
                    enter-active-class="transition duration-300 ease-in-out"
                    leave-active-class="transition duration-300 ease-in-out"
                    enter-from-class="opacity-0 rotate-45 scale-50"
                    enter-to-class="opacity-100 rotate-0 scale-100"
                    leave-from-class="opacity-100 rotate-0 scale-100"
                    leave-to-class="opacity-0 rotate-45 scale-50"
                >
                    <NuxtIcon
                        name="moon"
                        v-if="!isDark"
                        class="icon big absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    <NuxtIcon
                        name="sun"
                        v-else
                        class="icon big absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </TransitionGroup>
            </button>
            <ClientOnly>
                <UIButton
                    v-if="!authStore.isLoggedIn"
                    class="hidden lg:flex"
                    :href="authUrl"
                    color="light"
                    >{{ $t('navigation.login') }}</UIButton
                >
                <UIButton
                    v-else
                    href="/account"
                    color="light"
                    class="hidden items-center gap-2 lg:flex"
                >
                    <UIAvatar
                        size="sm"
                        :user="authStore.user"
                    />
                    {{ authStore.user.username }}
                </UIButton>
                <button
                    class="relative z-50 text-white lg:hidden"
                    @click="toggleMenu"
                >
                    <NuxtIcon
                        name="menu"
                        class="icon big"
                    />
                </button>
            </ClientOnly>
        </div>
    </nav>
    <Transition name="fade">
        <div
            class="fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm"
            @click="toggleMenu"
            v-if="menuOpen"
        ></div>
    </Transition>
    <Transition
        enter-active-class="transition duration-300 ease-in-out"
        enter-from-class="opacity-0 scale-50 -translate-y-12"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-300 ease-in-out"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-50 -translate-y-12"
    >
        <div
            v-if="menuOpen"
            class="fixed left-0 top-0 z-30 flex w-full items-center rounded-full p-4"
        >
            <div class="w-full rounded-xl bg-white p-6 shadow-lg">
                <div class="mb-4 flex justify-between">
                    <NuxtLink
                        class="flex items-center gap-2 font-display text-lg font-bold text-black"
                        id="branding"
                        :to="localePath('/')"
                        @click="toggleMenu"
                    >
                        <nuxt-img
                            class="h-7 w-7"
                            src="/images/makebetter_black.svg"
                        />
                        makebetter.app
                    </NuxtLink>
                    <button>
                        <NuxtIcon
                            name="close"
                            class="icon big"
                            @click="toggleMenu"
                        />
                    </button>
                </div>
                <ul class="flex flex-col gap-1">
                    <li
                        v-for="(item, id) of items"
                        :key="id"
                    >
                        <NuxtLink
                            :to="localePath(item?.href) || item?.href"
                            :target="item?.target"
                            @mouseover="(e: MouseEvent) => onHover(e, item)"
                            class="block py-2 text-xl"
                            @click="toggleMenu"
                        >
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
                <div class="mt-8">
                    <UIButton
                        v-if="!authStore.isLoggedIn"
                        :href="authUrl"
                        color="light"
                        @click="toggleMenu"
                        >{{ $t('navigation.login') }}</UIButton
                    >
                    <UIButton
                        v-else
                        href="/account"
                        color="light"
                        class="flex items-center gap-2"
                        @click="toggleMenu"
                    >
                        <UIAvatar
                            size="sm"
                            :user="authStore.user"
                        />
                        {{ authStore.user.username }}
                    </UIButton>
                </div>
            </div>
        </div>
    </Transition>
</template>
