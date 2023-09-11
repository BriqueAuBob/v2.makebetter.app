<script setup>
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));

definePageMeta({
    middleware: 'auth',
});

const localePath = useLocalePath();
</script>

<template>
    <NavigationNavbar />
    <header
        class="rounded-b-[150px] bg-primary-500 bg-cover bg-center bg-no-repeat pb-52 pt-64 text-center text-xl font-semibold text-gray-300"
        style="background-image: url('/images/backgrounds/account.png')"
    >
        <UIAvatar
            :user="user"
            size="2xl"
            class="mx-auto mb-4"
        />
        <div>
            Bonjour, <span class="text-3xl text-white">{{ user.username }}</span>
        </div>
    </header>
    <main class="container grid grid-cols-4 py-24">
        <aside
            class="flex flex-col justify-between rounded-l-2xl border border-gray-100 bg-white p-6 dark:border-primary-700 dark:bg-primary-900"
        >
            <ul class="mb-8 flex flex-col gap-3">
                <li>
                    <NuxtLink
                        :to="localePath('account')"
                        class="group flex w-full items-center gap-2 rounded-md px-4 py-3 text-left font-semibold duration-300 ease-out hover:bg-primary-100 hover:text-primary-500"
                    >
                        <NuxtIcon
                            name="user"
                            class="text-lg duration-300 ease-out group-hover:ml-2"
                        />
                        Mon compte
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        :to="localePath('account-history')"
                        class="group flex w-full items-center gap-2 rounded-md px-4 py-3 text-left font-semibold duration-300 ease-out hover:bg-primary-100 hover:text-primary-500"
                    >
                        <NuxtIcon
                            name="clock"
                            class="text-lg duration-300 ease-out group-hover:ml-2"
                        />
                        Historique d'utilisations
                    </NuxtLink>
                </li>
            </ul>
            <button
                class="group flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-left text-red-500 duration-300 ease-out hover:bg-red-100"
            >
                <NuxtIcon
                    name="sign-out"
                    class="duration-300 ease-out group-hover:ml-2"
                />
                Déconnexion
            </button>
        </aside>
        <div
            class="col-span-3 rounded-r-2xl border border-gray-100 bg-white p-8 dark:border-primary-700 dark:bg-primary-900"
        >
            <NuxtPage />
        </div>
    </main>
    <NavigationFooter />
</template>

<style scoped>
.router-link-active {
    @apply bg-primary-100 text-primary-500;
}
.router-link-active span {
    @apply ml-2;
}
</style>
