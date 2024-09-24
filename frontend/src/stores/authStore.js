import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        token: null
    }),
    getters: {
        isAuthenticated: (state) => {
            return !!state.token;
        }
    },

    actions: {
        async register(newUserData) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/register', newUserData)
                return response.data
            } catch (error) {
                throw error.response.data
            }
        },
        async login(userData) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData)
                this.user = response.data.user
                this.token = response.data.token
                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            } catch (error) {
                throw error.response.data
            }
        },
        async logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            location.reload()

        },
        async fetchProtectedData() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/protected')
                console.log("fetchprotected data", response);
                return response.data

            } catch (error) {
                console.error("fetchProtectedData Error: ", error)
                if (error.response && error.response.status === 401) {
                    router.push('/login');
                }
            }
        },
        loadToken() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.fetchUser();
            }
        },
        async fetchUser() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/users');
                this.user = response.data;
            } catch (error) {
                console.error("fetchUser Error: ", error);
            }
        },
    }
})