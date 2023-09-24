<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import { useEmbedMakerStore } from '~/stores/embed-maker';

const embedMakerStore = useEmbedMakerStore();
const embedMaker = storeToRefs(embedMakerStore);
const { settings } = embedMaker;

const config = useRuntimeConfig();
const authUrl = computed(() => {
    return config.public.authUrl + `/?redirect_uri=${encodeURIComponent(window ? window.location.href : '')}`;
});
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const { $toast } = useNuxtApp();
const { t } = useI18n();
const guilds = ref<any[]>([]);
const channels = ref<any[]>([]);
const loading = ref<boolean>(false);
const fetchGuilds = async () => {
    loading.value = true;
    try {
        const guildsData = await $fetch('/api/tools/discord/embed-maker/guilds', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({
                bot_token: embedMaker.settings.value.customBotToken,
            }),
            method: 'POST',
        });
        guilds.value = guildsData;
    } catch (e) {
        guilds.value = [];
    } finally {
        loading.value = false;
    }
};
const fetchChannels = async (guildId: any) => {
    loading.value = true;
    try {
        const channelsData = await $fetch(`/api/tools/discord/embed-maker/guilds/${guildId}/channels`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({
                bot_token: embedMaker.settings.value.customBotToken,
            }),
            method: 'POST',
        });
        channels.value = channelsData;
    } catch (e) {
        $toast.show({
            title: t('errors.encountered'),
            message: t('tools.discord.embed-maker.send_with_bot.bot_probably_not_in_guild'),
            type: 'danger',
            timeout: 5,
        });
        channels.value = [];
    } finally {
        loading.value = false;
    }
};

watch(
    () => embedMaker.settings.value.useCustomBot,
    (value: boolean) => {
        if (!value) {
            fetchGuilds();
        }
    }
);

const card_method = ref<HTMLElement | null>(null);
watch(
    () => embedMaker.settings.value.useWebhook,
    (value: boolean) => {
        if (!value) {
            fetchGuilds();
            card_method.value?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }
);
</script>

<template>
    <div>
        <div
            ref="card_method"
            class="relative grid grid-cols-2 rounded-t-3xl border bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
        >
            <div
                class="absolute h-full w-1/2 rounded-t-3xl border-x border-t bg-white duration-300 ease-out dark:border-zinc-700 dark:bg-zinc-800"
                :class="!embedMakerStore.settings.useWebhook ? 'left-1/2' : 'left-0 '"
            ></div>
            <div
                class="relative z-10 flex cursor-pointer flex-col items-center justify-center p-6 text-center"
                @click="embedMakerStore.settings.useWebhook = true"
            >
                <div class="mb-3 text-2xl font-semibold">Utiliser un webhook</div>
                <p class="text-sm">
                    Envoie ton message de la manière la plus simple possible! Utilise simplement un webhook pour
                    l'envoyer !
                </p>
            </div>
            <div
                class="relative z-10 flex cursor-pointer flex-col items-center justify-center p-6 text-center"
                @click="
                    () => {
                        fetchGuilds();
                        embedMakerStore.settings.useWebhook = false;
                    }
                "
            >
                <div class="mb-3 text-2xl font-semibold">Utiliser un bot</div>
                <p class="text-sm">Utilise le bot MakeBetter ou ton propre bot pour envoyer ton message !</p>
            </div>
        </div>
        <div
            class="relative rounded-b-3xl border bg-white p-8 dark:border dark:border-zinc-800 dark:border-t-zinc-700 dark:bg-zinc-900 dark:shadow-sm dark:shadow-zinc-800"
        >
            <Transition
                name="fadescale"
                mode="out-in"
            >
                <div v-if="embedMakerStore.settings.useWebhook">
                    <div class="mb-2 font-display text-lg font-semibold">Entre l'URL de ton Webhook</div>
                    <UIInput
                        v-model="settings.webhookUrl"
                        type="password"
                        name="webhook_url"
                        label="Webhook URL"
                        placeholder="https://discord.com/api/v10/webhooks/..."
                        secure
                    />
                </div>
                <div v-else>
                    <div class="mb-2 font-display text-lg font-semibold">Envoyer le(s) message(s) avec un bot</div>
                    <UIToggle
                        v-model="embedMakerStore.settings.useCustomBot"
                        name="useCustomBot"
                        :label="$t('tools.discord.embed-maker.send_with_bot.custom')"
                    />
                    <UIInput
                        class="duration-300 ease-out"
                        v-model="settings.customBotToken"
                        type="password"
                        name="webhook_url"
                        label="Bot token"
                        placeholder="Token..."
                        secure
                        :disabled="!embedMakerStore.settings.useCustomBot"
                        @enter="fetchGuilds()"
                        @blur="fetchGuilds()"
                    />
                    <div
                        class="mt-2 flex items-center gap-1 duration-300 ease-out"
                        :class="!embedMakerStore.settings.useCustomBot && 'opacity-25'"
                    >
                        <NuxtIcon
                            name="alert_circle"
                            class="text-lg text-yellow-500"
                        />
                        <p class="text-xs font-medium text-zinc-400">
                            {{ $t('tools.discord.embed-maker.send_with_bot.no_token_save') }}
                        </p>
                    </div>
                    <div class="mt-6 flex max-h-96 rounded-2xl bg-zinc-100 dark:bg-zinc-700">
                        <aside
                            class="overflow-auto rounded-l-2xl bg-zinc-200 p-6 duration-300 ease-out dark:bg-zinc-800"
                            :class="settings.guildSelected ? 'w-32' : 'w-full rounded-2xl'"
                        >
                            <ul
                                :class="!settings.guildSelected ? 'grid grid-cols-6 gap-4' : 'flex flex-col gap-2'"
                                v-if="guilds && guilds?.length > 0"
                            >
                                <li
                                    v-for="(guild, i) in guilds"
                                    @click="
                                        () => {
                                            settings.guildSelected =
                                                guild?.id === settings.guildSelected?.id ? false : guild;
                                            fetchChannels(guild?.id);
                                        }
                                    "
                                >
                                    <img
                                        class="mx-auto w-16 cursor-pointer border-2 transition-all duration-300 ease-out hover:rounded-xl hover:opacity-100"
                                        :class="
                                            guild?.id === settings.guildSelected?.id
                                                ? 'rounded-xl border-white  dark:border-primary-500'
                                                : 'rounded-[50px] border-transparent opacity-50 hover:border-white dark:hover:border-primary-500'
                                        "
                                        :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=160`"
                                        v-if="guild?.icon"
                                    />
                                    <div
                                        class="mx-auto flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden border-2 bg-zinc-600 text-center transition-all duration-300 ease-out hover:rounded-xl hover:opacity-100"
                                        :class="
                                            guild?.id === settings.guildSelected?.id
                                                ? 'rounded-xl border-white  dark:border-primary-500'
                                                : 'rounded-[50px] border-transparent opacity-50 hover:border-white dark:hover:border-primary-500'
                                        "
                                        v-else
                                    >
                                        {{ guild?.name }}
                                    </div>
                                </li>
                            </ul>
                            <div
                                v-else
                                class="mx-auto flex h-full max-w-sm flex-col items-center justify-center text-center"
                            >
                                <div class="text-lg font-semibold">
                                    {{ $t('tools.discord.embed-maker.send_with_bot.no_guilds') }}
                                </div>
                                <p class="mb-4 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    {{ $t('tools.discord.embed-maker.send_with_bot.logout_and_login') }}
                                </p>
                                <UIButton
                                    color="light"
                                    @click="
                                        () => {
                                            authStore.logout();
                                        }
                                    "
                                    >{{ $t('logout') }}</UIButton
                                >
                            </div>
                        </aside>
                        <main
                            class="flex w-full flex-col gap-4 overflow-auto p-6 text-zinc-600 duration-500 ease-out dark:text-zinc-300"
                            :class="!settings.guildSelected && 'max-w-0 px-0 opacity-0'"
                            v-if="channels"
                        >
                            <div class="text-sm font-semibold">{{ settings.guildSelected?.name }}</div>
                            <div
                                v-for="category of channels"
                                :key="category?.id"
                                v-if="channels.length > 0"
                            >
                                <div class="font-semibold text-zinc-400 dark:text-zinc-400">{{ category?.name }}</div>
                                <ul class="mt-1">
                                    <li
                                        class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xl duration-300 ease-out hover:bg-zinc-200 dark:hover:bg-zinc-500"
                                        :class="
                                            settings.channelSelected?.id === channel?.id &&
                                            'bg-zinc-200 dark:bg-zinc-500'
                                        "
                                        v-for="channel of category?.channels"
                                        :key="channel?.id"
                                        @click="settings.channelSelected = channel"
                                    >
                                        <NuxtIcon name="platforms/discord/announcements" />
                                        {{ channel?.name }}
                                    </li>
                                </ul>
                            </div>
                            <div
                                v-else
                                class="flex h-full flex-col items-center justify-center text-center"
                            >
                                <div class="mb-2 text-lg font-semibold text-zinc-400 dark:text-white">
                                    {{ $t('tools.discord.embed-maker.send_with_bot.no_channels') }}
                                </div>
                                <div class="text-zinc-400 dark:text-zinc-400">
                                    {{ $t('tools.discord.embed-maker.send_with_bot.bot_probably_not_in_guild') }}
                                </div>
                                <UIButton
                                    color="light"
                                    class="mt-4"
                                    :href="`https://discord.com/oauth2/authorize?client_id=983094528791683182&scope=bot%20applications.commands&permissions=805431344&guild_id=${settings.guildSelected?.id}`"
                                    target="_blank"
                                >
                                    {{ $t('tools.discord.embed-maker.send_with_bot.invite_bot') }}
                                </UIButton>
                            </div>
                        </main>
                    </div>
                    <div
                        class="absolute left-0 top-0 h-full w-full rounded-b-3xl bg-white bg-opacity-75 text-lg font-bold backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-75"
                        v-if="!user"
                    >
                        <div class="noise flex h-full w-full flex-col items-center justify-center gap-4">
                            <span
                                class="rounded-full border border-zinc-500 bg-zinc-100 px-4 py-2 text-xs text-zinc-500"
                                >{{ $t('limited_access') }}</span
                            >
                            <span class="max-w-xs text-center">{{ $t('feature_auth') }}</span>
                            <ClientOnly>
                                <UIButton
                                    color="black"
                                    :href="authUrl"
                                >
                                    {{ $t('navigation.login') }}
                                </UIButton>
                            </ClientOnly>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
