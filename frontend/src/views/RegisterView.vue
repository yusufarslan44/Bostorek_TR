<template>
  <section class="full-section-height">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="display-3">Register</h1>
      </div>
      <form @submit.prevent="submitForm()">
        <div v-if="showGenericWarningMessage" class="text-center">
          <span class="text-danger small">Something happend please try again later ! </span>
        </div>
        <div class="row justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label">Username
              <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" id="username" name="username" v-model.trim="formData.username"
              required autocomplete="off" :class="{
                'is-valid': isUsernameValid,
                'is-invalid': !isUsernameValid && showUserNameWarningMessage
              }" @focus="showUserNameWarningMessage = true" @blur="showUserNameWarningMessage = false" />
            <span v-if="showUserNameWarningMessage && !isUsernameValid" class="text-danger small">Username must be
              between 5 and 20
              characters !</span>
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email
              <span class="text-danger">*</span>
            </label>
            <input type="email" class="form-control" id="email" name="email" v-model="formData.email" required
              autocomplete="off" :class="{
                'is-valid': isEmailValid,
                'is-invalid': (!isEmailValid && showEmailWarningMessage) || existingEmail === formData.email
              }" @focus="showEmailWarningMessage = true" @blur="showEmailWarningMessage = false" />
            <span v-if="showEmailWarningMessage && !isEmailValid" class="text-danger small">Please provide a valid email
              !</span>
            <span v-if="existingEmail === formData.email" class="text-danger small">The Email is already
              exist! </span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password<span class="text-danger">*</span></label>
            <input type="password" class="form-control" id="password" name="password" v-model="formData.password"
              required :class="{
                'is-valid': isPasswordValid,
                'is-invalid': !isPasswordValid && showPasswordWarningMessage
              }" @focus="showPasswordWarningMessage = true" @blur="showPasswordWarningMessage = false" />
            <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small">Password must be
              between 4 and 26 characters !</span>
          </div>
        </div>


        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button :disabled="!isFormValid" type="submit" class="btn btn-primary w-100">Register</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { mapActions } from "pinia";
import { useToast } from "vue-toastification";

export default {
  name: "RegisterView",
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
      },
      showUserNameWarningMessage: false,
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      existingEmail: null,
      showGenericWarningMessage: false
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    async submitForm() {
      try {
        await this.register(this.formData)

        const toast = useToast()
        toast.success('You will be redirected to the login page', {
          position: "top-right",
          timeout: 3000,
          closeButton: "button",
          icon: true,
          rtl: false
        })

        this.$router.push('/login')
      } catch (data) {
        const { error } = data;
        if (error == "The Email is already exist") {
          this.existingEmail = this.formData.email
        } else {
          this.showGenericWarningMessage = true
          this.formData = {
            username: '',
            email: '',
            password: '',
          };
        }
      }
    }
  },
  computed: {
    isFormValid() {
      return this.isUsernameValid && this.isEmailValid && this.isPasswordValid
    },
    isUsernameValid() {
      return (this.formData.username.length >= 5 && this.formData.username.length <= 20)
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)
    },
    isPasswordValid() {
      return (this.formData.password.length >= 4 && this.formData.password.length <= 26)
    }
  }
};
</script>

<style scoped></style>
