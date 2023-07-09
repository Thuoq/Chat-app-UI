<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters"
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <div class="flex">
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?
      </router-link>
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Sign in
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/store/auth";

export default {
  components: {
    Textinput,
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required("Email is required").email(),
      password: yup.string().required("Password is required").min(8),
    });

    const formValues = {
      email: null,
      password: null,
    };

    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
      initialValues: formValues,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    return {
      email,
      handleSubmit,
      emailError,
      password,
      passwordError,
      resetForm,
    };
  },
  created() {
    if (this.currentUser) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(useAuthStore, ["currentUser"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["handleSignIn"]),
    async onSubmit() {
      const run = await this.handleSubmit(async (values) => {
        await this.handleSignIn(values);
        if (this.currentUser) {
          await this.$router.push("/");
        }
        this.resetForm();
      });
      return await run();
    },
  },
};
</script>
<style lang="scss"></style>
