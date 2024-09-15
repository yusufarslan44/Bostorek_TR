<template>
    <div>
        <h2>{{ user.username }}</h2>
        <h3>{{ user.email }}</h3>
    </div>
</template>

<script>

import SectionHeader from "@/components/SectionHeader.vue";
import { useAuthStore } from "@/stores/authStore";
import { mapState } from "pinia";
export default {
    name: 'DashboardView',

    computed: {
        ...mapState(useAuthStore, ['user']),


    },




}
</script>

<style scoped></style>