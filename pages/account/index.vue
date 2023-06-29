<script setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const user = computed(() => (auth.isLoggedIn ? auth.user : {}));
</script>

<template>
	<img :src="user.avatar" />
	<div>Bonjour {{ user.username }}</div>
</template>
