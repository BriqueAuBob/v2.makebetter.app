<script setup lang="ts">
const props = defineProps({
    sendWithWebhook: {
        type: Boolean,
        required: true,
    },
    form: {
        type: Object,
        required: true,
    },
    useCustomBot: {
        type: Boolean,
        required: true,
    },
});

const emits = defineEmits(['change']);
const sendWithWebhook = computed({
    get: () => props.sendWithWebhook,
    set: (value) =>
        emits('change', {
            sendWithWebhook: value,
        }),
});
const form = computed({
    get: () => props.form,
    set: (value) =>
        emits('change', {
            form: value,
        }),
});
const useCustomBot = computed({
    get: () => props.useCustomBot,
    set: (value) =>
        emits('change', {
            useCustomBot: value,
        }),
});
const guildSelected = ref<number | boolean>(false);

const config = useRuntimeConfig();
const authUrl = computed(() => {
    return config.public.authUrl + `/?redirect_uri=${encodeURIComponent(window ? window.location.href : '')}`;
});
</script>

<template>
    <div class="relative grid grid-cols-2 rounded-t-3xl bg-gray-100 dark:bg-primary-900">
        <div
            class="absolute h-full w-1/2 rounded-t-3xl border bg-white duration-300 ease-out dark:border-primary-700 dark:bg-primary-800"
            :class="!sendWithWebhook ? 'left-1/2' : 'left-0 '"
        ></div>
        <div
            class="relative z-10 flex cursor-pointer flex-col items-center justify-center p-6 text-center"
            @click="sendWithWebhook = true"
        >
            <div class="mb-3 text-2xl font-semibold">Utiliser un webhook</div>
            <p class="text-sm">
                Envoie ton message de la manière la plus simple possible! Utilise simplement un webhook pour l'envoyer !
            </p>
        </div>
        <div
            class="relative z-10 flex cursor-pointer flex-col items-center justify-center p-6 text-center"
            @click="sendWithWebhook = false"
        >
            <div class="mb-3 text-2xl font-semibold">Utiliser un bot</div>
            <p class="text-sm">Utilise le bot MakeBetter ou ton propre bot pour envoyer ton message !</p>
        </div>
    </div>
    <div
        class="relative rounded-b-3xl border bg-white p-8 dark:border-0 dark:border-t dark:border-primary-700 dark:bg-primary-900 dark:shadow-sm dark:shadow-primary-800"
    >
        <Transition
            name="fadescale"
            mode="out-in"
        >
            <div v-if="sendWithWebhook">
                <div class="mb-2 font-display text-lg font-semibold">Entre l'URL de ton Webhook</div>
                <UIInput
                    v-model="form.webhook_url"
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
                    v-model="useCustomBot"
                    name="useCustomBot"
                    :label="$t('tools.discord.embed-maker.use_custom_bot')"
                />
                <UIInput
                    class="duration-300 ease-out"
                    v-model="form.bot_token"
                    type="password"
                    name="webhook_url"
                    label="Bot token"
                    placeholder="Token..."
                    secure
                    :disabled="!useCustomBot"
                />
                <div
                    class="mt-2 flex items-center gap-2 duration-300 ease-out"
                    :class="!useCustomBot && 'opacity-25'"
                >
                    <NuxtIcon
                        name="alert_circle"
                        class="text-lg text-yellow-500"
                    />
                    <p class="text-xs font-medium text-gray-400">
                        Nous n'aurons jamais accès au token de ton bot! Lorsque tu utilises un bot personnalisé, toutes
                        les interactions avec l'API de Discord se font directement dans ton navigateur.
                    </p>
                </div>
                <div class="mt-6 flex rounded-2xl bg-gray-100 dark:bg-primary-700">
                    <aside
                        class="max-h-96 overflow-auto rounded-l-2xl bg-gray-200 p-6 duration-300 ease-out dark:bg-primary-800"
                        :class="guildSelected ? 'w-32' : 'w-full rounded-2xl'"
                    >
                        <ul :class="!guildSelected ? 'grid grid-cols-6 gap-4' : 'flex flex-col gap-2'">
                            <li
                                v-for="i in 4"
                                @click="guildSelected = i === guildSelected ? false : i"
                            >
                                <img
                                    class="mx-auto h-16 w-16 cursor-pointer border-2 transition-all duration-300 ease-out hover:rounded-xl hover:opacity-100"
                                    :class="
                                        i === guildSelected
                                            ? 'rounded-xl border-white dark:border-primary-500'
                                            : 'rounded-[50px] border-transparent opacity-50 hover:border-white dark:hover:border-primary-500'
                                    "
                                    :src="
                                        [
                                            'https://cdn.discordapp.com/icons/1041358976513753098/97dd922476b2b0b5ff029da036fc9121.webp?size=160',
                                            'https://cdn.discordapp.com/icons/1099786599694336091/6ba4820fb69eb38fed18e9aab5e48aa3.webp?size=160',
                                            'https://cdn.discordapp.com/icons/977518691006685244/ee32d496e93bab0bd145d12fad8ac63f.webp?size=160',
                                            'https://cdn.discordapp.com/icons/977507903307145216/5e4479c3ddd6c52aafceb615bd280f7d.webp?size=160',
                                        ][i - 1]
                                    "
                                />
                            </li>
                        </ul>
                    </aside>
                    <main
                        class="flex w-full flex-col gap-4 overflow-hidden p-6 text-gray-600 duration-500 ease-out dark:text-gray-300"
                        :class="!guildSelected && 'max-w-0 px-0 opacity-0'"
                    >
                        <div>
                            <div class="font-semibold text-gray-400 dark:text-gray-400">🟡 Diose</div>
                            <ul class="mt-1">
                                <li
                                    class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xl hover:bg-gray-200 dark:hover:bg-primary-500"
                                >
                                    <NuxtIcon name="platforms/discord/announcements" />
                                    annonces
                                </li>
                                <li
                                    class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xl hover:bg-gray-200 dark:hover:bg-primary-500"
                                >
                                    <NuxtIcon name="platforms/discord/announcements" />
                                    règlement
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-400 dark:text-gray-400">😁 Communauté</div>
                            <ul class="mt-1">
                                <li
                                    class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xl hover:bg-gray-200 dark:hover:bg-primary-500"
                                >
                                    <NuxtIcon name="platforms/discord/announcements" />
                                    annonces
                                </li>
                                <li
                                    class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xl hover:bg-gray-200 dark:hover:bg-primary-500"
                                >
                                    <NuxtIcon name="platforms/discord/announcements" />
                                    règlement
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
                <div
                    class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-b-3xl bg-white bg-opacity-75 text-lg font-bold backdrop-blur-sm dark:bg-primary-800 dark:bg-opacity-75"
                >
                    <span class="rounded-full border border-gray-500 bg-gray-100 px-4 py-2 text-xs text-gray-500">{{
                        $t('limited_access')
                    }}</span>
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
        </Transition>
    </div>
</template>
