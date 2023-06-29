<script setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));
</script>

<template>
	<UIAvatar :user="user" size="lg" />
	<div>Bonjour {{ user.username }}</div>
</template>
