<template>
    <div class="row">
        <div class="col-lg-6">
            <h2 class="mb-4">User Information</h2>
            <form @submit.prevent>
                <div class="mb-3">
                    <label for="username">Username</label>
                    <input v-model="userInfo.username" type="text" id="username" class="form-control"
                        :disabled="!editMode">
                </div>
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input v-model="userInfo.email" type="email" id="email" class="form-control" :disabled="!editMode">
                </div>
                <div class="mb-3">
                    <label for="password">Password</label>
                    <input v-model="userInfo.password" type="password" id="password" class="form-control"
                        :disabled="!editMode">
                </div>
                <button @click="!editMode ? toggleEditMode() : saveUserInfo()" class="btn btn-primary">{{
                    editMode ?
                        'Save' : 'Edit' }}</button>
                <button v-if="editMode" style="background-color: #ecc73c !important;border-color: #ecc73c !important;;"
                    @click="cancelEditMode()" class="btn btn-primary ms-3">
                    Cancel</button>
            </form>
        </div>
        <div class="col-lg-6">

        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore"
import { mapState, mapActions } from "pinia";
import { useToast } from "vue-toastification";
export default {
    name: "DashboardGeneral",
    data() {
        return {
            userInfo: {
                username: '',
                email: '',
                password: ''
            },
            editMode: false,
        }
    },
    created() {
        if (this.user) {
            this.userInfo.username = this.user.username;
            this.userInfo.email = this.user.email;
        }
    },
    watch: {
        user(newUser) {
            if (newUser) {
                this.userInfo.username = newUser.username;
                this.userInfo.email = newUser.email;
            }
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
    },
    methods: {
        ...mapActions(useUserStore, ['updateUserDetails']),
        ...mapActions(useAuthStore, ['logout']),
        toggleEditMode() {
            this.editMode = !this.editMode
        },
        async saveUserInfo() {
            try {
                await this.updateUserDetails(this.userInfo)
                const toast = useToast()
                toast.success('Please login with new details', {
                    position: "top-right",
                    timeout: 3000,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                })
                setTimeout(() => {
                    this.logout();
                }, 3500)
            } catch (error) {
                console.log("saveUserInfo error", error);
            }


        },
        cancelEditMode() {
            this.editMode = false;
            this.userInfo.username = this.user.username;
            this.userInfo.email = this.user.email;
            this.userInfo.password = '';

        }
    }

}
</script>

<style scoped></style>