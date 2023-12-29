<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useEmbedMakerStore } from '~/stores/embed-maker';

const modal = ref<any>(null);
const guilds = ref<any>([]);
const channels = ref<any>([]);
const messages = ref<any>([]);
const loading = ref(false);
const embedMaker = useEmbedMakerStore();
const authStore = useAuthStore();
const { $toast } = useNuxtApp();
const { t } = useI18n();

const selected = reactive<{
    guild: any;
    channel: any;
    message: any;
}>({
    guild: null,
    channel: null,
    message: null,
});

defineExpose({
    setIsOpen: (bool: boolean) => {
        modal.value.setIsOpen(bool);
        fetchGuilds();
    },
});

const fetchGuilds = async () => {
    loading.value = true;
    try {
        console.log(embedMaker.settings.customBotToken);
        const guildsData = await $fetch('/api/tools/discord/embed-maker/guilds', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({
                bot_token: embedMaker.settings.customBotToken,
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
                bot_token: embedMaker.settings.customBotToken,
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
const fetchMessages = async (guildId: any, channelId: any) => {
    loading.value = true;
    try {
        const messagesData = await $fetch(
            `/api/tools/discord/embed-maker/guilds/${guildId}/channels/${channelId}/messages`,
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
                body: JSON.stringify({
                    bot_token: embedMaker.settings.customBotToken,
                }),
                method: 'POST',
            }
        );
        messages.value = messagesData;
    } catch (e) {
        $toast.show({
            title: t('errors.encountered'),
            message: t('tools.discord.embed-maker.send_with_bot.bot_probably_not_in_guild'),
            type: 'danger',
            timeout: 5,
        });
        messages.value = [];
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <UIModal
        ref="modal"
        size="large"
    >
        <div class="flex max-h-[50vh] w-full xl:min-w-[600px]">
            <aside
                class="overflow-y-auto overflow-x-hidden rounded-l-2xl bg-zinc-200 duration-300 ease-out dark:bg-zinc-800"
                :class="selected.guild ? 'w-96 p-2' : 'w-full rounded-2xl p-6'"
            >
                <ul
                    :class="!selected.guild ? 'grid grid-cols-6 gap-4' : 'flex flex-col gap-2'"
                    v-if="guilds && guilds?.length > 0"
                >
                    <li
                        v-for="(guild, i) in guilds"
                        @click="
                            () => {
                                selected.guild = guild;
                                fetchChannels(guild?.id);
                            }
                        "
                    >
                        <img
                            class="mx-auto w-16 cursor-pointer border-2 transition-all duration-300 ease-out hover:rounded-xl hover:opacity-100"
                            :class="
                                guild?.id === selected.guild?.id
                                    ? 'rounded-xl border-white  dark:border-primary-500'
                                    : 'rounded-[50px] border-transparent opacity-50 hover:border-white dark:hover:border-primary-500'
                            "
                            :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=160`"
                            v-if="guild?.icon"
                        />
                        <div
                            class="mx-auto flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden border-2 bg-zinc-600 text-center transition-all duration-300 ease-out hover:rounded-xl hover:opacity-100"
                            :class="
                                guild?.id === selected.guild?.id
                                    ? 'rounded-xl border-white  dark:border-primary-500'
                                    : 'rounded-[50px] border-transparent opacity-50 hover:border-white dark:hover:border-primary-500'
                            "
                            v-else
                        >
                            {{ guild?.name.slice(0, 1) }}
                        </div>
                    </li>
                </ul>
            </aside>
            <div
                class="flex flex-col gap-4 overflow-y-auto"
                :class="!selected.guild ? 'w-full' : 'w-full'"
                v-if="selected.guild?.id"
            >
                <div
                    v-for="category of channels"
                    :key="category?.id"
                    v-if="channels.length > 0"
                >
                    <div class="font-semibold text-zinc-400 dark:text-zinc-400">{{ category?.name }}</div>
                    <ul class="mt-1">
                        <li
                            class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xl duration-300 ease-out hover:bg-zinc-200 dark:hover:bg-zinc-500"
                            :class="selected.channel?.id === channel?.id && 'bg-zinc-200 dark:bg-zinc-500'"
                            v-for="channel of category?.channels"
                            :key="channel?.id"
                            @click="
                                () => {
                                    selected.channel = channel;
                                    fetchMessages(selected.guild?.id, channel?.id);
                                }
                            "
                        >
                            <NuxtIcon name="platforms/discord/announcements" />
                            {{ channel?.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="flex flex-col gap-4 overflow-y-auto"
                v-if="selected.channel?.id"
            >
                <ToolsDiscordEmbedMakerPreview
                    v-for="message in messages"
                    :message="message"
                    :key="message.id"
                    fromDiscord
                    isDark
                />
            </div>
        </div>
    </UIModal>
</template>
