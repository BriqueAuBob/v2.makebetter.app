<script setup lang="ts">
definePageMeta({
    layout: 'account',
    middleware: 'auth',
});
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));

const deleteAccountModal = ref(false);
const confirmText = ref('');

const router = useRouter();
const deleteAccount = async () => {
    if (confirmText.value !== user?.value?.username) return;
    router.push('/');
};
</script>

<template>
    <div class="mb-2 text-lg font-semibold">Mes informations</div>
    <p class="mb-4 text-gray-500">
        Ici, vous pouvez voir toutes les informations que nous sauvegardons à propos de votre profil.
    </p>
    <div class="grid gap-4 italic md:grid-cols-2">
        <UIInput
            label="ID"
            :placeholder="user?.id.toString()"
            :disabled="true"
            name="id"
        />
        <UIInput
            label="ID Discord"
            :placeholder="user?.discord_id.toString()"
            :disabled="true"
            name="discord_id"
        />
        <UIInput
            label="Email"
            :placeholder="user?.email"
            :disabled="true"
            name="email"
        />
        <UIInput
            label="Nom d'utilisateur"
            :placeholder="user?.username"
            :disabled="true"
            name="username"
        />
    </div>
    <div class="mb-2 mt-12 text-lg font-semibold">
        Suppression du compte
        <span class="ml-2 rounded-full bg-red-500 px-2 py-2 text-xs font-bold text-white"> ZONE DE DANGER </span>
    </div>
    <p class="mb-4 text-gray-500">
        Attention! Cette action est irreversible, elle entrainera la destruction permanente de vos données dans notre
        base de données.
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
                                    <span class="italic text-red-500">{{ user?.username }}</span>
                                    et cliquer sur le bouton pour supprimer votre compte.
                                </p>
                                <UIInput
                                    v-model="confirmText"
                                    class="mb-8 mt-4"
                                    classes="focus:border-red-500"
                                    placeholder="Recopier le texte indiqué..."
                                    name="confirm-text"
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
                                    color="danger"
                                    @click="deleteAccount"
                                    :disabled="confirmText !== user?.username"
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
</template>
