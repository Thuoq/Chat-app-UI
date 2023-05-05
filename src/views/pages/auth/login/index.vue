<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <div class="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
          <router-link to="/">
            <img
              :src="logo"
              alt=""
              class="mb-10"
              v-if="!this.$store.themeSettingsStore.isDark"
            />
            <img :src="logoWhite" alt="" class="mb-10" v-else />
          </router-link>

          <h4>
            Unlock your Project
            <span class="text-slate-800 dark:text-slate-400 font-bold"
              >performance</span
            >
          </h4>
        </div>
        <div
          class="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]"
        >
          <img :src="sideImg" alt="" class="h-full w-full object-contain" />
        </div>
      </div>
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/">
                <img
                  :src="logo"
                  alt=""
                  class="mx-auto"
                  v-if="!this.$store.themeSettingsStore.isDark"
                />
                <img :src="logoWhite" alt="" class="mx-auto" v-else />
              </router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-medium">Sign in</h4>
              <div class="text-slate-500 text-base">
                Sign in to your account to start using Dashcode
              </div>
            </div>
            <Signin />
            <div
              class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm"
            >
              Don’t have an account?
              <router-link
                to="/sign-up"
                class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Sign up
              </router-link>
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright {{ currentYear }}, Dashcode All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signin from "../common/Signin";
// Image Import
import logoWhite from "@/assets/images/logo/logo-white.svg";
import logo from "@/assets/images/logo/logo.svg";
import sideImg from "@/assets/images/auth/ils1.svg";

export default {
  data() {
    return {
      logoWhite,
      logo,
      sideImg,
      currentYear: new Date().getFullYear(),
    };
  },
  components: {
    Signin,
  },
};
</script>
<style lang="scss"></style>
