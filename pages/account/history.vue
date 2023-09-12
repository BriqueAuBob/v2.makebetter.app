<script setup lang="ts">
definePageMeta({
    layout: 'account',
    middleware: 'auth',
});

const router = useRouter();
const localePath = useLocalePath();
</script>

<template>
    <div class="mb-2 text-lg font-semibold">Ton utilisations des outils</div>
    <p class="mb-4 text-gray-500">Vois ce que t'as fait sur notre site!</p>
    <div v-if="logs?.length > 0">
        <div
            v-for="(log, id) in logsFilter"
            :key="id"
            class="dark:bg-dark-900 mt-2 flex items-center gap-1 rounded-lg bg-white p-4 shadow-sm"
        >
            <div>
                Utilisation de
                <span class="font-medium">{{
                    log.tool === 'discord_embed'
                        ? "Créateur d'embeds"
                        : log.tool === 'md_editor'
                        ? 'Editeur Markdown'
                        : log.tool === 'emoji_maker'
                        ? "Créateur d'emojis"
                        : 'Créateur de badges'
                }}</span>
            </div>
            <div class="italic">
                le
                <span class="font-medium">{{ new Date(log.created_at).toLocaleString('fr-FR') }}</span>
            </div>
        </div>
        <UIButton
            v-if="length < logs?.length"
            @click="length += 4"
            class="mr-auto mt-4"
            color="primary"
        >
            Voir plus
        </UIButton>
    </div>
    <div v-else>
        <CommonEmptyState
            description="Tu n'as jamais utilisé nos outils... Il n'est pas trop tard, commence dès maintenant !"
            button-text="Découvrir nos outils"
            :button-action="
                () => {
                    router.push(localePath('tools'));
                }
            "
        />
    </div>
</template>
