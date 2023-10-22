<script setup>
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));

const router = useRouter();
const localePath = useLocalePath();
const token = useCookie('token');

const logout = () => {
    auth.logout();
    token.value = null;
    router.push(localePath('/'));
};
</script>

<template>
    <NavigationNavbar />
    <header
        class="rounded-b-[150px] bg-primary-500 bg-cover bg-center bg-no-repeat pb-52 pt-64 text-center text-xl font-semibold text-zinc-300"
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
    <main
        class="container grid py-24 lg:grid-cols-4"
        id="account"
    >
        <aside
            class="col-span-3 flex flex-col justify-between rounded-t-2xl border border-zinc-100 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900 lg:col-span-1 lg:rounded-l-2xl"
        >
            <ul class="mb-8 flex flex-col gap-3">
                <li>
                    <NuxtLink
                        :to="localePath('account') + '#account'"
                        class="group flex w-full items-center gap-2 rounded-md px-4 py-3 text-left font-semibold duration-300 ease-out hover:bg-neutral-100 hover:text-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
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
                        :to="localePath('account-history') + '#account'"
                        class="group flex w-full items-center gap-2 rounded-md px-4 py-3 text-left font-semibold duration-300 ease-out hover:bg-neutral-100 hover:text-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
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
                class="group flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-left text-red-500 duration-300 ease-out hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900 dark:hover:text-white"
                @click="logout"
            >
                <NuxtIcon
                    name="sign-out"
                    class="duration-300 ease-out group-hover:ml-2"
                />
                Déconnexion
            </button>
        </aside>
        <div
            class="col-span-3 rounded-b-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-900 lg:rounded-r-2xl"
        >
            <NuxtPage />
        </div>
    </main>
    <NavigationFooter />
</template>

<style scoped>
.router-link-active {
    @apply bg-primary-100 text-primary-500 dark:bg-zinc-800 dark:text-white;
}
.router-link-active span {
    @apply ml-2;
}
</style>
