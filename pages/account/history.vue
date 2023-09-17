<script setup lang="ts">
definePageMeta({
    layout: 'account',
    middleware: 'auth',
});

const router = useRouter();
const localePath = useLocalePath();

// try {
//   const { data } = await axios.get("auth/user/logs");
//   this.logs = data.usages.sort((a, b) => b.id - a.id);
// } catch (e) {
//   console.log(e);
// }

// if (!this.user?.id) {
//   return (window.location = "https://umaestro.fr");
// }

type LogData = {
    usages: {
        id: number;
        tool: string;
        created_at: string;
    }[];
};
const { data: logs } = await useFetchApi<LogData>('/auth/user/logs');
const length = ref(5);
const logsFilter = computed(() => logs?.value?.usages?.sort((a, b) => b.id - a.id).filter((_, i) => i < length.value));
</script>

<template>
    <div class="mb-2 text-lg font-semibold">Ton utilisations des outils</div>
    <p class="mb-4 text-zinc-500">Vois ce que t'as fait sur notre site!</p>
    <div v-if="logs?.usages?.length && logs?.usages?.length > 0">
        <TransitionGroup name="fade">
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
        </TransitionGroup>
        <UIButton
            v-if="length < logs?.usages?.length"
            @click="length += 5"
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
