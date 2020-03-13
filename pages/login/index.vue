<template>
  <div 
    class="md-layout md-alignment-center-center" 
    style="height: 100vh;">
    <md-card class="md-layout-item md-size-30">
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <!-- Login Form -->
      <form @submit.prevent="validateForm">
        <md-card-content>
          <md-field 
            :class="getValidationClass('email')" 
            md-clearable>
            <label for="email">Email</label>
            <md-input 
              id="email"
              :disabled="loading" 
              v-model="form.email" 
              type="email" 
              name="email" 
              autocomplete="email"/>
            <span 
              v-if="!$v.form.email.required" 
              class="md-error">The email is required</span>
            <span 
              v-else-if="!$v.form.email.email" 
              class="md-error">Invalid email</span>
          </md-field>

          <md-field 
            :class="getValidationClass('password')" 
            md-clearable >
            <label for="password">Password</label>
            <md-input 
              id="password"
              :disabled="loading" 
              v-model="form.password" 
              type="password" 
              name="password" 
              autocomplete="password"/>
            <span 
              v-if="!$v.form.password.required" 
              class="md-error">The password is required</span>
            <span 
              v-else-if="!$v.form.password.minLength" 
              class="md-error">Password too short</span>
            <span 
              v-else-if="!$v.form.password.maxLength" 
              class="md-error">Password too long</span>
          </md-field>

          <md-card-actions>
            <md-button to="/">Go to Home</md-button>
            <md-button 
              :disabled="loading" 
              class="md-primary md-raised" 
              type="submit">Login</md-button>
          </md-card-actions>
        </md-card-content>
      </form>

      <md-snackbar :md-active.sync="isAuthenticated">
        {{ form.email }} was successfully logged in!
      </md-snackbar>
    </md-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  watch: {
    isAuthenticated(value) {
      if (value) {
        this.$router.push('/admin/dashboard')
      }
    }
  },
  methods: {
    validateForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loginUser()
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    async loginUser() {
      await this.$store.dispatch('authenticateUser', {
        action: 'login',
        email: this.form.email,
        password: this.form.password,
        returnSecureToken: true
      })
    }
  }
}
</script>
<style scoped>
.md-title {
  text-align: center;
  letter-spacing: 0.2em;
}
</style>
