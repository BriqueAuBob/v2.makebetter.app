import { defineStore } from 'pinia';
import { DiscordWebhookMessage } from '~/types/discord';
import { _primary } from '#tailwind-config/theme/colors';
import { useAuthStore } from './auth';

const defaultMessage: DiscordWebhookMessage = {
    username: 'MakeBetter',
    avatar_url: 'https://cdn.discordapp.com/avatars/983094528791683182/4fac596acfc894b6201b09f34cd60e7b.webp?size=96',
    content: '',
    embeds: [
        {
            title: 'Découvre MakeBetter !',
            description:
                "MakeBetter est le site utilitaire qui te permet de créer des messages Discord personnalisés et tout un tas d'autres choses !",
            author: {
                name: 'MakeBetter',
                url: 'https://makebetter.xyz',
                icon_url:
                    'https://cdn.discordapp.com/avatars/983094528791683182/4fac596acfc894b6201b09f34cd60e7b.webp?size=96',
            },
            color: _primary['500'],
            thumbnail: {
                url: '',
            },
            fields: [
                {
                    name: 'Templates de messages',
                    value: 'Utilise les templates créés par la communauté pour créer des messages personnalisés !',
                    inline: true,
                },
                {
                    name: 'Collaboration en temps réel',
                    value: 'Collabore sur la création de messages avec tes amis en temps réel !',
                    inline: true,
                },
            ],
            image: {
                url: '',
            },
            url: 'https://makebetter.app',
            footer: {
                text: 'MakeBetter',
                icon_url: '',
            },
            timestamp: new Date().toISOString(),
        },
    ],
    components: [
        {
            type: 1,
            components: [],
        },
    ],
    files: null,
};
const defaultEmptyMessage: DiscordWebhookMessage = {
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
    editingSave:
        | false
        | {
              authorId: number;
              permissions: string[];
              name: string;
              description: string;
              tags: string[];
              isPublic: boolean;
          };
};

const recursiveClean = (obj: any) => {
    for (const key in obj) {
        if (key === 'files') continue;
        if (obj?.[key] === '') {
            delete obj?.[key];
        } else if (typeof obj?.[key] === 'object') {
            recursiveClean(obj?.[key]);
            if (Object.keys(obj?.[key]).length === 0) {
                delete obj?.[key];
            }
        } else if (key === 'color' && typeof obj[key] === 'string') {
            obj[key] = parseInt(
                obj[key] ? (obj[key] === 'transparent' ? '2b2d31' : obj[key].replace('#', '')) : '0',
                16
            );
        }
    }
};

export const useEmbedMakerStore = defineStore({
    id: 'embed-maker',
    state: () =>
        <EmbedMakerState>{
            webhook: null,
            messages: [defaultMessage],
            editingSave: false,
            settings: {
                useWebhook: true,
                webhookUrl: '',
                useCustomBot: false,
                customBotToken: '',
                guildSelected: '',
                channelSelected: '',
            },
        },
    getters: {
        cleanedMessages(state) {
            return state.messages.map((message: any) => {
                const cleanedMessage = structuredClone(toRaw(message));
                if (cleanedMessage?.embeds?.length === 0) {
                    delete cleanedMessage.embeds;
                }
                if (cleanedMessage?.components?.[0]?.components?.length === 0) {
                    delete cleanedMessage.components;
                } else {
                    if (state.settings.useWebhook || !state.settings.useCustomBot) {
                        for (const component of cleanedMessage?.components?.[0]?.components) {
                            if (component?.type !== 5) {
                                throw new Error(
                                    'Les boutons ne sont pas modifiables avec un webhook ou avec le bot par défaut'
                                );
                            }
                        }
                    }
                }
                cleanedMessage.files = message.files;
                recursiveClean(cleanedMessage);
                return cleanedMessage;
            });
        },
    },
    actions: {
        addMessage() {
            this.messages.push(structuredClone(defaultEmptyMessage));
        },
        removeMessage(index: number) {
            this.messages.splice(index, 1);
        },
        async sendMessages() {
            const { $toast } = useNuxtApp();
            const auth = useAuthStore();

            for (const message of this.cleanedMessages) {
                const formData = new FormData();
                formData.append('payload_json', JSON.stringify(message));

                if (message.files) {
                    let i = 0;
                    for (const file of message.files) {
                        formData.append(`file${i}`, await transformFileIntoBlob(file as File), (file as File).name);
                        i++;
                    }
                }

                if (this.settings.useCustomBot && this.settings.customBotToken) {
                    formData.append('token', this.settings.customBotToken);
                }

                try {
                    await $fetch(
                        !this.settings.useWebhook
                            ? `/api/tools/discord/embed-maker/guilds/${this.settings.guildSelected?.id}/channels/${this.settings.channelSelected?.id}`
                            : this.settings.webhookUrl + '?wait=true',
                        {
                            method: 'POST',
                            body: formData,
                            headers: !this.settings.useWebhook
                                ? {
                                      Authorization: 'Bearer ' + auth.token,
                                  }
                                : {},
                        }
                    );
                    $toast.show({
                        title: 'Message envoyé',
                        message: 'Le message a bien été envoyé',
                        type: 'success',
                    });
                } catch (e) {
                    $toast.show({
                        title: 'Erreur',
                        message: "Une erreur est survenue lors de l'envoi du message",
                        type: 'danger',
                    });
                }
            }
        },
    },
});
