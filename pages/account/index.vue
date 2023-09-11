<script setup>
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));

definePageMeta({
    middleware: 'auth',
});

const deleteAccountModal = ref(false);

const router = useRouter();
</script>

<template>
    <header
        class="rounded-b-[150px] bg-primary-500 bg-cover bg-center bg-no-repeat pb-52 pt-64 text-center text-xl font-semibold text-gray-300"
        style="background-image: url('/images/backgrounds/account.png')"
    >
        <UIAvatar
            :user="user"
            size="2xl"
            class="mx-auto mb-4"
        />
        <div>
            Bonjour, <span class="text-3xl text-white">{{ user.username }}</span>
        </div>
    </header>
    <section class="container py-24">
        <div class="mb-2 text-lg font-semibold">Mes informations</div>
        <p class="mb-4 text-gray-500">
            Ici, vous pouvez voir toutes les informations que nous sauvegardons à propos de votre profil.
        </p>
        <div class="grid gap-4 italic md:grid-cols-2">
            <UIInput
                label="ID"
                :placeholder="user?.id.toString()"
                :disabled="true"
            />
            <UIInput
                label="ID Discord"
                :placeholder="user?.discord_id.toString()"
                :disabled="true"
            />
            <UIInput
                label="Email"
                :placeholder="user?.email"
                :disabled="true"
            />
            <UIInput
                label="Nom d'utilisateur"
                :placeholder="user?.username"
                :disabled="true"
            />
            <UIInput
                label="Tag Discord"
                :placeholder="'#' + user?.discriminator"
                :disabled="true"
            />
        </div>

        <div class="mb-2 mt-12 text-lg font-semibold">Ton utilisations des outils</div>
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
                v-if="length < logs.length"
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
                        router.push('/tools');
                    }
                "
            />
        </div>

        <div class="mb-4 mt-12 text-lg font-semibold">Déconnexion</div>
        <UIButton
            @click="logout"
            :small="true"
            color="black"
        >
            Se déconnecter
        </UIButton>

        <div class="mb-2 mt-12 text-lg font-semibold">
            Suppression du compte<span class="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold"
                >ZONE DE DANGER</span
            >
        </div>
        <p class="mb-4 text-gray-500">
            Attention! Cette action est irreversible, elle entrainera la destruction permanente de vos données dans
            notre base de données.
        </p>
        <UIButton
            @click="deleteAccountModal = true"
            :small="true"
            color="danger"
        >
            Supprimer mon compte
        </UIButton>
        <HeadlessTransitionRoot
            appear
            :show="deleteAccountModal"
            as="template"
        >
            <HeadlessDialog
                as="div"
                @close="deleteAccountModal = false"
                class="relative z-10"
            >
                <HeadlessTransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </HeadlessTransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <HeadlessTransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <HeadlessDialogPanel
                                class="dark:bg-dark-900 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                            >
                                <HeadlessDialogTitle
                                    as="h3"
                                    class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    Êtes-vous sur de vouloir supprimer votre compte?
                                </HeadlessDialogTitle>
                                <div class="mt-2">
                                    <p class="mt-2 text-sm text-gray-500">
                                        Cette action est irreversible, il sera impossible de retrouver vos données après
                                        avoir supprimer votre compte.
                                    </p>
                                    <p class="mt-4 text-sm text-gray-500">
                                        Si vous êtes certain de votre choix, veuillez recopier
                                        <span class="italic text-white"
                                            >{{ user?.username }}#{{ user?.discriminator }}</span
                                        >
                                        et cliquer sur le bouton pour supprimer votre compte.
                                    </p>
                                    <UIInput
                                        v-model="confirmText"
                                        class="mb-8 mt-4"
                                        classes="focus:border-red-500"
                                        placeholder="Recopier le texte indiqué..."
                                    />
                                </div>
                                <div class="mt-4 flex items-center justify-end gap-2">
                                    <UIButton
                                        color="transparent"
                                        @click="deleteAccountModal = false"
                                    >
                                        Annuler
                                    </UIButton>
                                    <UIButton
                                        :color="
                                            confirmText !== user?.username + '#' + user?.discriminator
                                                ? 'disabled'
                                                : 'red'
                                        "
                                        @click="deleteAccount"
                                    >
                                        Supprimer mon compte
                                    </UIButton>
                                </div>
                            </HeadlessDialogPanel>
                        </HeadlessTransitionChild>
                    </div>
                </div>
            </HeadlessDialog>
        </HeadlessTransitionRoot>
    </section>
</template>
