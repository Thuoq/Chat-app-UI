<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Full name"
      type="text"
      placeholder="Full Name"
      name="name"
      v-model="name"
      :error="nameError"
      classInput="h-[48px]"
    />
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

    <button type="submit" class="btn btn-dark block w-full text-center">
      Create an account
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput/index.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "@/store/auth";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    Textinput,
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required("Email is required").email(),
      password: yup.string().required("Password is  required").min(8),
      name: yup.string().required("Full name is required"),
    });
    const form = useForm({
      validationSchema: schema,
    });
    const { handleSubmit, resetForm } = form;
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    return {
      email,
      name,
      nameError,
      emailError,
      password,
      passwordError,
      handleSubmit,
      resetForm,
    };
  },
  created() {
    if (this.currentUser) {
      this.$router.push("/chat");
    }
  },
  computed: {
    ...mapState(useAuthStore, ["currentUser"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["handleUserSignUp"]),
    async onSubmit() {
      const handlerSubmit = await this.handleSubmit(async (values) => {
        await this.handleUserSignUp(values);
        if (this.currentUser) {
          await this.$router.push("/chat");
        }
        this.resetForm();
      });

      return await handlerSubmit();
    },
  },
};
</script>
<style lang="scss"></style>
