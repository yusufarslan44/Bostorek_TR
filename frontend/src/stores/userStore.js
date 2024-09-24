import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {

    actions: {
        async updateUserDetails(updatedUserData) {
            try {
                const response = await axios.put('http://localhost:3000/api/v1/user/updateUser', updatedUserData)
                return response.data
            } catch (error) {
                console.error("Updating User Details  Erorr : ", error)
                throw error.response.data
            }

        }
    }
})