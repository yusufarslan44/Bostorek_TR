import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null
    }),
    getters: {

    },

    actions: {
        async register(newUserData) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/register', newUserData)
                return response.data
            } catch (error) {
                this.error
            }
        },
        async login(userData) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData)
                this.user = response.data.user
            } catch (error) {
                console.error("fetchLogin Erorr : ", error)
            }
        }
    }
})