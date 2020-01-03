<template>
  <v-form v-model="formValid">
    <v-text-field
      v-model="userInfo.name"
      label="Name"
      :rules="[requriedInput('Name')]"
      v-if="hasName"
    />
    <v-text-field
      v-model="userInfo.email"
      label="Email"
      :rules="[requriedInput('Email'), emailFormat()]"
    />
    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[requriedInput('Password')]"
      @click:append="showPassword = !showPassword"
    />
    <div class="btn-box">
      <v-btn @click.prevent="cancel" color="primary" outlined>cancel</v-btn>
      <v-btn
        @click.prevent="submitForm(userInfo)"
        :disabled="!formValid"
        color="primary"
        depressed
        >{{ buttonText }}</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import validations from "@/utils/validations.js";

export default {
  data() {
    return {
      ...validations,
      formValid: false,
      showPassword: false,
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "home" });
    }
  },
  props: {
    submitForm: {
      type: Function
    },
    buttonText: {
      type: String,
      default: null
    },
    hasName: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
}
</style>
