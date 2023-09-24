import { defineStore } from 'pinia';
import { DiscordWebhookMessage } from '~/types/discord';

const defaultMessage: DiscordWebhookMessage = {
    username: '',
    avatar_url: '',
    content: '',
    embeds: [],
    components: [
        {
            type: 1,
            components: [],
        },
    ],
    files: null,
};

type EmbedMakerSettings = {
    useWebhook: boolean;
    webhookUrl: string;
    useCustomBot: boolean;
    customBotToken: string;
    guildSelected: any;
    channelSelected: any;
};

type EmbedMakerState = {
    webhook: any;
    messages: DiscordWebhookMessage[];
    settings: EmbedMakerSettings;
};

export const useEmbedMakerStore = defineStore({
    id: 'embed-maker',
    state: () =>
        <EmbedMakerState>{
            webhook: null,
            messages: [defaultMessage],
            settings: {
                useWebhook: true,
                webhookUrl: '',
                useCustomBot: false,
                customBotToken: '',
                guildSelected: '',
                channelSelected: '',
            },
        },
    actions: {
        addMessage() {
            this.messages.push(structuredClone(defaultMessage));
        },
        removeMessage(index: number) {
            this.messages.splice(index, 1);
        },
    },
});
