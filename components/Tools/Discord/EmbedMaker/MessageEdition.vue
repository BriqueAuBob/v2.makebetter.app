<script setup lang="ts">
import type { PropType } from 'vue';
import type { DiscordWebhookMessage, Embed, Component } from '../../../../types/discord';
import { _primary } from '#tailwind-config/theme/colors';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    message: {
        type: Object as PropType<DiscordWebhookMessage>,
        required: true,
    },
    setMessage: {
        type: Function as PropType<(message: DiscordWebhookMessage) => void>,
        required: true,
    },
    webhookCreatedByBot: {
        type: Boolean,
        default: false,
    },
});

const updateField = (field: string, value: any) => {
    props.setMessage({
        ...props.message,
        [field]: value,
    });
};

const defaultEmbed = {
    title: '',
    description: '',
    url: '',
    color: _primary['500'],
    author: {
        name: '',
        url: '',
        icon_url: '',
    },
    footer: {
        text: '',
        icon_url: '',
    },
    fields: [],
};
const addEmbed = () => {
    if (props.message.embeds.length >= 10) return;
    updateField('embeds', [...props.message.embeds, structuredClone(defaultEmbed)]);
};

const updateEmbed = (id: number, embed: any) => {
    const embeds = props.message.embeds;
    embeds[id] = embed;
    updateField('embeds', embeds);
};

const recursiveUpdate = (object: any, fields: string[], value: any) => {
    if (fields.length === 1) {
        object[fields[0]] = value;
        return;
    }
    const field = fields.shift()!;
    recursiveUpdate(object[field], fields, value);
};

const updateEmbedField = (id: number, field: string, value: any) => {
    const embeds = props.message.embeds;
    const embed = embeds[id];
    const fields = field.split('.');
    recursiveUpdate(embed, fields, value);
    updateEmbed(id, embed);
};

const addField = (id: number) => {
    const embeds = props.message.embeds;
    const embed = embeds[id];
    updateEmbed(id, {
        ...embed,
        fields: [
            ...embed.fields,
            {
                name: '',
                value: '',
                inline: false,
            },
        ],
    });
};

const updateEmbedRealField = (embedId: number, field: any, subField: string, value: any) => {
    field[subField] = value;
    updateEmbedField(embedId, 'fields', props.message.embeds[embedId].fields);
};

const addButton = () => {
    const components = props.message.components;
    if (!components[0].components) components[0].components = [];
    components[0].components.push({
        type: 2,
        style: 5,
        label: '',
        url: '',
    });
    updateField('components', components);
};

const updateComponent = (id: number, field: 'url' | 'label', value: any) => {
    const components = props.message.components;
    const component = components[0].components![id];
    component[field] = value;
    updateField('components', components);
};
</script>

<template>
    <div class="mt-2 flex flex-col gap-8">
        <ToolsCardCollapsible collapse title="Auteur du message" noHover>
            <UIInput
                class="mb-4"
                :name="`username_message_${id}`"
                :label="$t('tools.discord.embed.fields.username.label')"
                :placeholder="$t('tools.discord.embed.fields.username.placeholder')"
                @change="(value: string) => updateField('username', value)"
            />
            <UIInput
                class="mb-4"
                :name="`avatar_url_message_${id}`"
                :label="$t('tools.discord.embed.fields.avatar_url.label')"
                :placeholder="$t('tools.discord.embed.fields.avatar_url.placeholder')"
                @change="(value: string) => updateField('avatar_url', value)"
            />
        </ToolsCardCollapsible>
        <UIInput
            :name="`content_message_${id}`"
            :label="$t('tools.discord.embed.fields.content.label')"
            :placeholder="$t('tools.discord.embed.fields.content.placeholder')"
            longText
            @change="(value: string) => updateField('content', value)"
        />
        <UIFileUploader placeholder="Upload a file" v-model="message.files" />
        <ToolsCardCollapsible collapse title="Embeds" noHover>
            <TransitionGroup name="fadescale" tag="div" class="flex flex-col gap-4">
                <ToolsCardCollapsible
                    collapse
                    :title="`Embed n°${embedId + 1}`"
                    class="embed_edit relative border-dashed after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:content-['']"
                    :style="`--embed-color: ${embed.color};`"
                    noHover
                    v-for="(embed, embedId) in message.embeds"
                    :key="embedId"
                    delete
                    @delete="
                        () =>
                            updateField(
                                'embeds',
                                message.embeds.filter((_, i) => i !== embedId)
                            )
                    "
                >
                    <UICollapse :title="$t('tools.discord.embed.steps.embed.author')" smallTitle>
                        <UIInput
                            class="mb-4"
                            :name="`author_username_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.author.label')"
                            :placeholder="$t('tools.discord.embed.fields.author.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'author.name', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`author_icon_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.author_icon.label')"
                            :placeholder="$t('tools.discord.embed.fields.author_icon.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'author.icon_url', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`author_url_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.author_url.label')"
                            :placeholder="$t('tools.discord.embed.fields.author_url.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'author.url', value)"
                        />
                    </UICollapse>
                    <UICollapse :title="$t('tools.discord.embed.steps.embed.images')" smallTitle>
                        <UIInput
                            class="mb-4"
                            :name="`thumbnail_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.thumbnail.label')"
                            placeholder="https://imageplaceholder.com/image.jpg"
                            @change="(value: string) => updateEmbedField(embedId, 'thumbnail.url', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`image_url_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.image.label')"
                            placeholder="https://imageplaceholder.com/image.jpg"
                            @change="(value: string) => updateEmbedField(embedId, 'image.url', value)"
                        />
                    </UICollapse>
                    <UICollapse :title="$t('tools.discord.embed.steps.embed.body')" smallTitle>
                        <UIInput
                            class="mb-4"
                            :name="`title_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.title.label')"
                            :placeholder="$t('tools.discord.embed.fields.title.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'title', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`description_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.description.label')"
                            :placeholder="$t('tools.discord.embed.fields.description.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'description', value)"
                            longText
                        />
                        <UIInput
                            class="mb-4"
                            :name="`url_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.url.label')"
                            :placeholder="$t('tools.discord.embed.fields.url.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'url', value)"
                        />
                        <div>
                            <div class="pointer-events-none ml-4 text-sm font-medium italic text-gray-400">
                                {{ $t('tools.discord.embed.fields.color.label') }}
                            </div>
                            <UIColorGroup
                                class="mt-1"
                                @change="(value: string) => updateEmbedField(embedId, 'color', value)"
                            />
                        </div>
                    </UICollapse>
                    <UICollapse :title="$t('tools.discord.embed.steps.embed.fields')" smallTitle>
                        <TransitionGroup name="fadescale" tag="div" class="flex flex-col gap-4">
                            <ToolsCardCollapsible
                                collapse
                                v-for="(field, fieldId) in embed.fields"
                                :key="fieldId"
                                :title="`Champ n°${fieldId + 1}`"
                                noHover
                                delete
                                @delete="
                                    () =>
                                        updateEmbedField(
                                            embedId,
                                            'fields',
                                            embed.fields.filter((_, i) => i !== fieldId)
                                        )
                                "
                            >
                                <UIInput
                                    class="mb-4"
                                    :name="`message_${id}_embed_${embedId}_fields_${fieldId}_field_name`"
                                    :label="$t('tools.discord.embed.fields.field_name.label')"
                                    :placeholder="$t('tools.discord.embed.fields.field_name.placeholder')"
                                    v-model="field.name"
                                    @change="(value: string) => updateEmbedRealField(embedId, field, 'name', value)"
                                />
                                <UIInput
                                    class="mb-4"
                                    :name="`message_${id}_embed_${embedId}_fields_${fieldId}_field_value`"
                                    :label="$t('tools.discord.embed.fields.field_value.label')"
                                    :placeholder="$t('tools.discord.embed.fields.field_value.placeholder')"
                                    v-model="field.value"
                                    @change="(value: string) => updateEmbedRealField(embedId, field, 'value', value)"
                                />
                                <UIInput
                                    class="mb-4"
                                    :name="`message_${id}_embed_${embedId}_fields_${fieldId}_field_inline`"
                                    :label="$t('tools.discord.embed.fields.field_inline.label')"
                                    :placeholder="$t('tools.discord.embed.fields.field_inline.placeholder')"
                                    @change="(value: string) => updateEmbedRealField(embedId, field, 'inline', value)"
                                />
                            </ToolsCardCollapsible>
                        </TransitionGroup>
                        <UIButton class="mb-2 mt-4 w-full" @click="addField(id)">
                            {{ $t('tools.discord.embed.steps.embed.add_field') }}
                        </UIButton>
                    </UICollapse>
                    <UICollapse :title="$t('tools.discord.embed.steps.embed.footer')" smallTitle>
                        <UIInput
                            class="mb-4"
                            :name="`footer_text_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.footer_text.label')"
                            :placeholder="$t('tools.discord.embed.fields.footer_text.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'footer.text', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`footer_icon_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.footer_icon.label')"
                            :placeholder="$t('tools.discord.embed.fields.footer_icon.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'footer.icon_url', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`timestamp_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed.fields.timestamp.label')"
                            :placeholder="$t('tools.discord.embed.fields.timestamp.placeholder')"
                            @change="(value: string) => updateEmbedField(embedId, 'timestamp', value)"
                            type="datetime-local"
                        />
                    </UICollapse>
                </ToolsCardCollapsible>
            </TransitionGroup>
            <UIButton class="w-full" :class="message.embeds.length > 0 ? 'mt-8' : 'mt-4'" @click="addEmbed">
                {{
                    $t('tools.discord.embed.steps.embed.add', {
                        amount: message.embeds.length,
                        max: 10,
                    })
                }}
            </UIButton>
        </ToolsCardCollapsible>
        <div class="relative" :class="!webhookCreatedByBot && 'p-12'">
            <ToolsCardCollapsible collapse :title="$t('tools.discord.embed.steps.buttons.title')" smallTitle>
                <TransitionGroup name="fadescale" tag="div" class="flex flex-col gap-4">
                    <ToolsCardCollapsible
                        collapse
                        v-for="(component, componentId) in message.components[0].components"
                        :key="componentId"
                        class="border-dashed"
                        :title="`Button n°${componentId + 1}`"
                        noHover
                        delete
                        @delete="() => updateField('components', [{
                            type: 1,
                            components: message.components[0].components!.filter((_, i) => i !== componentId)
                        }])"
                    >
                        <UIInput
                            class="mb-4"
                            :name="`message_${id}_components_${componentId}_label`"
                            :label="$t('tools.discord.embed.fields.button_label.label')"
                            :placeholder="$t('tools.discord.embed.fields.button_label.placeholder')"
                            v-model="component.label"
                            @change="(value: string) => updateComponent(componentId, 'label', value)"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`message_${id}_components_${componentId}_url`"
                            :label="$t('tools.discord.embed.fields.button_url.label')"
                            :placeholder="$t('tools.discord.embed.fields.button_url.placeholder')"
                            v-model="component.url"
                            @change="(value: string) => updateComponent(componentId, 'url', value)"
                        />
                    </ToolsCardCollapsible>
                </TransitionGroup>
                <UIButton class="mt-8 w-full" @click="addButton">
                    {{ $t('tools.discord.embed.steps.buttons.add') }}
                </UIButton>
            </ToolsCardCollapsible>
            <div
                class="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-gray-100 bg-white bg-opacity-90 text-center text-lg font-semibold backdrop-blur-md dark:border-primary-700 dark:bg-primary-800 lg:px-24"
                v-if="!webhookCreatedByBot"
            >
                {{ $t('tools.discord.embed.steps.buttons.bot') }}
                <UIButton size="md" color="light">{{ $t('how_to') }}</UIButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.embed_edit::after {
    background: var(--embed-color);
}
</style>
