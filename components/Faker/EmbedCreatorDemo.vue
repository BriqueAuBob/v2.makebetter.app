<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
    webhook_url: '',
    title: '',
    description: '',
});
</script>

<template>
    <FakerDemo :title="$t('tools.discord.embed-maker.name')">
        <UIInput
            name="webhook_url"
            :label="$t('tools.discord.embed-maker.fields.webhook_url.label')"
            :placeholder="$t('tools.discord.embed-maker.fields.webhook_url.placeholder')"
            v-model="form.webhook_url"
            @focus="
                form.webhook_url =
                    'https://discord.com/api/webhooks/4585048575867689262/ew8Qqr0xNw9A2pibYsK60JxqU4xMvXUXN8N6WouKUvAa4uThqTgFe4wMWfgLi0QPXQ'
            "
        />
        <UIInput
            name="title"
            :label="$t('tools.discord.embed-maker.fields.title.label')"
            :placeholder="$t('tools.discord.embed-maker.fields.title.label')"
            v-model="form.title"
            :disabled="form.webhook_url === ''"
            :class="form.webhook_url === '' && 'blur-xs'"
            @focus="form.title = $t('tools.discord.embed-maker.faker.title')"
        />
        <UIInput
            name="description"
            :label="$t('tools.discord.embed-maker.fields.description.label')"
            :placeholder="$t('tools.discord.embed-maker.fields.description.placeholder')"
            :long-text="true"
            v-model="form.description"
            :disabled="form.title === ''"
            :class="form.title === '' && 'blur-xs'"
            @focus="form.description = $t('tools.discord.embed-maker.faker.description')"
        />
        <UIButton
            :class="form.description === '' && 'blur-xs'"
            :disabled="form.description === ''"
            :color="form.description === '' ? 'light' : 'primary'"
        >
            {{ $t('buttons.send') }}
        </UIButton>
    </FakerDemo>
</template>
