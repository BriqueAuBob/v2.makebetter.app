<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

const modal = ref<UIModalType>();
const permissionsRef = ref<any[]>([]);
const usersRef = ref<any[]>([]);

const route = useRoute();
const open = async () => {
    modal.value?.setIsOpen(true);
    usersRef.value = [];
    const { permissions } = await $fetchApi<{ permissions: any[] }>(`/makebetter/saves/${route.query.id}/permissions`);
    permissionsRef.value = permissions;
};

const form = reactive({
    search: '',
});

const searchUsers = async () => {
    const { users } = await $fetchApi<{ users: any[] }>(`/users?search=${form.search}`);
    usersRef.value = users.filter((u) => !permissionsRef.value.find((p) => p.user.id === u.id));
};

defineExpose({
    open,
});

const debouncedSearchUsers = useDebounce(200, searchUsers);

const onEnter = async (user: any) => {
    if (!user) {
        const { users } = await $fetchApi<{ users: any[] }>(`/users?search=${form.search}`);
        if (users?.[0]?.username !== form.search) return;
        usersRef.value = users;
        user = users[0];
    }
    if (permissionsRef.value.find((p) => p.user.id === user.id)) return;
    permissionsRef.value.push({
        user,
        permission: 'view',
    });
};

const emits = defineEmits(['change']);
const savePermissions = async () => {
    const permissions = permissionsRef.value.map((p) => ({
        userId: p.user.id,
        permission: p.permission,
    }));
    await $fetchApi(`/makebetter/saves/${route.query.id}/permissions`, {
        method: 'PUT',
        body: {
            permissions,
        },
    });
    modal.value?.setIsOpen(false);
    emits('change', permissions);
};

const isOwner = computed(() => {
    return permissionsRef.value.find((p) => p.user.id === useAuthStore()?.user?.id)?.permission === 'admin';
});
</script>

<template>
    <UIModal
        title="Permissions"
        ref="modal"
        size="large"
        :onApply="savePermissions"
    >
        <UIInput
            v-model="form.search"
            name="search"
            placeholder="Rechercher un utilisateur"
            class="absolute right-6 top-6 w-48"
            label="Rechercher un utilisateur"
            :displayLabel="false"
            :autoComplete="usersRef"
            @input="debouncedSearchUsers"
            @enter="onEnter"
        />
        <div class="flex max-h-96 w-96 flex-col gap-4 pb-4 pt-12">
            <div
                v-for="permission of permissionsRef"
                class="flex items-center justify-between"
            >
                <div class="flex items-center">
                    <UIAvatar
                        size="sm"
                        :user="permission.user"
                    />
                    <span class="ml-2">{{ permission.user?.username }}</span>
                    <nuxt-icon
                        name="star"
                        class="icon sm ml-2 text-yellow-500"
                        v-if="permission.permission === 'admin'"
                    />
                </div>
                <UISelect
                    :options="[
                        { label: $t('tools.global.collaboration.permissions.view'), value: 'view' },
                        { label: $t('tools.global.collaboration.permissions.edit'), value: 'edit' },
                        { label: $t('tools.global.collaboration.permissions.none'), value: 'none' },
                    ]"
                    v-model="permission.permission"
                    v-if="permission.permission !== 'admin' && isOwner"
                    color="white"
                    class="w-32"
                />
                <div
                    v-else
                    class="rounded-lg bg-white px-2 py-1 text-center text-sm font-semibold text-yellow-500"
                >
                    {{ $t('tools.global.collaboration.permissions.' + permission.permission) }}
                </div>
            </div>
        </div>
    </UIModal>
</template>
