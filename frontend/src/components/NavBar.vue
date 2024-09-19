<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">Bostorek</RouterLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'books' }">Books</RouterLink>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <RouterLink class="nav-link" :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'contact' }">Contact Us</RouterLink>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <RouterLink class="nav-link" :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <RouterLink class="nav-link" :to="{ name: 'register' }">Register</RouterLink>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <button class="nav-link" @click="logoutUser">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

import { useAuthStore } from "@/stores/authStore";
import { mapActions, mapState } from "pinia"; // Pinia'nın map fonksiyonları

export default {
  name: "NavBar",
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),

  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    logoutUser() {
      this.logout()
    }
  }
};
</script>

<style scoped>
.custom-nav {
  background-color: var(--primary-color);
  padding: 15px 0;
}

.navbar-brand {
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.nav-link {
  padding: 10px 15px !important;
  color: #fff;
  text-align: center;
}

.nav-link:hover {
  color: var(--secondary-color);
}

.active-link {
  color: var(--secondary-color);
}
</style>
