<script setup lang="ts">
import type { PropType } from 'vue';
import type { DiscordWebhookMessage, Embed }   from '../../../../types/discord';

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
    }
})

const updateField = (field: string, value: any) => {
    props.setMessage({
        ...props.message,
        [field]: value,
    }); 
}

const defaultEmbed = {
    title: '',
    description: '',
    url: '',
    color: 0,
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
    if(props.message.embeds.length >= 10) return;
    updateField('embeds', [
        ...props.message.embeds,
        structuredClone(defaultEmbed),
    ]);
}

const updateEmbed = (id: number, embed: any) => {
    const embeds = props.message.embeds;
    embeds[id] = embed;
    updateField('embeds', embeds);
}

const recursiveUpdate = (object: any, fields: string[], value: any) => {
    if (fields.length === 1) {
        object[fields[0]] = value;
        return;
    }
    const field = fields.shift()!;
    recursiveUpdate(object[field], fields, value);
}

const updateEmbedField = (id: number, field: string, value: any) => {
    const embeds = props.message.embeds;
    const embed = embeds[id];
    const fields = field.split('.');
    recursiveUpdate(embed, fields, value);
    updateEmbed(id, embed)
}

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
}

const updateEmbedRealField = (embedId: number, field: any, subField: string, value: any) => {
    field[subField] = value;
    updateEmbedField(embedId, 'fields', props.message.embeds[embedId].fields);
}
</script>

<template>
    <div class="flex flex-col gap-8 mt-2">
        <ToolsCardCollapsible title="Auteur du message" noHover>
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
        <ToolsCardCollapsible title="Embeds" noHover>
            <TransitionGroup name="fadescale" tag="div" class="flex flex-col gap-4">
                <ToolsCardCollapsible 
                    :title="`Embed n°${embedId + 1}`" 
                    class="embed_edit border-dashed relative after:content-[''] after:absolute after:left-0 after:top-0 after:w-1 after:h-full"
                    :style="`--embed-color: ${embed.color};`"
                    noHover
                    v-for="(embed, embedId) in message.embeds"
                    :key="embedId"
                    delete
                    @delete="() => updateField('embeds', message.embeds.filter((_, i) => i !== embedId))"
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
                            <div
                                class="pointer-events-none text-sm font-medium italic text-gray-400 ml-4"
                            >
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
                                v-for="(field, fieldId) in embed.fields"
                                :key="fieldId"
                                :title="`Champ n°${ fieldId + 1 }`"
                                noHover
                                delete
                                @delete="() => updateEmbedField(embedId, 'fields', embed.fields.filter((_, i) => i !== fieldId))"
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
                        <UIButton class="w-full mt-4 mb-2" @click="addField(id)">
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
                {{ $t('tools.discord.embed.steps.embed.add', {
                    amount: message.embeds.length,
                    max: 10
                }) }}
            </UIButton>
        </ToolsCardCollapsible>
    </div>
</template>

<style scoped>
.embed_edit::after {
    background: var(--embed-color);
}
</style>