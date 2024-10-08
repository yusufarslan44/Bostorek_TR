<template>
  <section class="full-section-height">
    <div class="container">
      <form @submit.prevent="submitForm">


        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" v-model="formData.email" required :class="{
              'is-valid': isEmailValid,
              'is-invalid': (!isEmailValid && showEmailWarningMessage) || (notFoundEmail === formData.email)
            }" @focus="showEmailWarningMessage = true" @blur="showEmailWarningMessage = false" />
            <span v-if="showEmailWarningMessage && !isEmailValid" class="text-danger small">Please provide a valid email
              !</span>
            <span v-if="notFoundEmail === formData.email" class="text-danger small">{{ `${notFoundEmail} is not found!`
              }}</span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" v-model="formData.password"
              required :class="{
                'is-valid': isPasswordValid,
                'is-invalid': (!isPasswordValid && showPasswordWarningMessage) || !isPasswordMatch
              }" @focus="showPasswordWarningMessage = true" @blur="showPasswordWarningMessage = false"
              @input="isPasswordMatch = true">
            <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small">Password must be
              between 4 and 26 characters !</span>
            <span v-if="!isPasswordMatch" class="text-danger small">Your password is not true !</span>
          </div>
        </div>


        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Login</button>
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
  name: "LoginView",
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      notFoundEmail: null,
      isPasswordMatch: true
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),
    async submitForm() {
      try {
        await this.login(this.formData)
        const toast = useToast()
        toast.success('You will be redirected to the dashboard page', {
          position: "top-right",
          timeout: 3000,
          closeButton: "button",
          icon: true,
          rtl: false
        });
        this.$router.push('/dashboard')

      } catch (data) {
        const { error } = data;
        if (error === 'The User not found') {
          this.notFoundEmail = this.formData.email;
        } else if (error === 'The Password incorret') {
          this.isPasswordMatch = false
        }
      }
    }
  },
  computed: {
    isFormValid() {
      return this.isEmailValid && this.isPasswordValid
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
