<template>
  <div>
    <header>
      <div class="flex px-6 pt-6">
        <div class="flex-1">
          <div class="flex space-x-3 rtl:space-x-reverse">
            <div class="flex-none">
              <div class="h-10 w-10 rounded-full">
                <img
                  :src="getAvatarSrc(currentUser?.avatarUrl)"
                  alt=""
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div class="flex-1 text-start">
              <span
                class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"
                >{{ currentUser?.name }}
                <span
                  class="status bg-success-500 inline-block h-[10px] w-[10px] rounded-full ml-3"
                ></span>
              </span>
              <span
                class="block text-slate-500 dark:text-slate-300 text-xs font-normal"
                >Available</span
              >
            </div>
          </div>
        </div>
        <div class="flex-none">
          <Tooltip placement="top" arrow>
            <template #button>
              <div
                @click="layoutChat.toggleUserProfile()"
                class="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
              >
                <Icon icon="heroicons-outline:dots-horizontal" />
              </div>
            </template>
            <span>Settings</span>
          </Tooltip>
        </div>
      </div>
      <!-- !! chat settigns -->

      <Transition name="chat-user-setting">
        <div
          class="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 absolute bg-white dark:bg-slate-800 rounded-md h-full left-0 top-0 bottom-0 p-6 w-full z-[9]"
          v-if="layoutChat.openUserProfile"
          data-simplebar
        >
          <div class="text-right">
            <Tooltip placement="top" arrow theme="danger-500">
              <template #button>
                <div
                  @click="layoutChat.setOpenUserProfile(false)"
                  class="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 inline-flex ml-auto flex-col justify-center items-center text-xl rounded-full cursor-pointer"
                >
                  <Icon icon="heroicons-outline:x" />
                </div>
              </template>
              <span>Close Setting</span>
            </Tooltip>
          </div>
          <header class="mx-auto max-w-[200px] text-center">
            <div class="relative">
              <div
                class="h-16 w-16 rounded-full border border-slate-400 p-[2px] shadow-md mx-auto mb-3 relative"
              >
                <img
                  :src="getAvatarSrc(currentUser?.avatarUrl)"
                  alt=""
                  class="block w-full h-full rounded-full object-contain"
                />
                <span
                  class="status inline-block h-3 w-3 rounded-full absolute -right-1 top-3 border border-white"
                  :class="{
                    'bg-success-500': status === 'online',
                    'bg-warning-500': status === 'away',
                    'bg-danger-500': status === 'busy',
                    'bg-secondary-500': status === 'offline',
                  }"
                ></span>
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100"
                >
                  <div class="bg-white bg-opacity-75 rounded-full p-1">
                    <label for="avatar-upload">
                      <Icon icon="heroicons-outline:camera" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      name="avatar"
                      class="hidden"
                      accept="image/*"
                      @change="uploadAvatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <span class="block text-slate-600 dark:text-slate-300 text-sm">{{
              currentUser?.name
            }}</span>
          </header>
          <hr class="border-gray-400 my-2" />
          <form @submit.prevent="onSubmit" class="space-y-4">
            <h3 class="mt-0 text-xs font-semibold mb-4">
              Change User Information
            </h3>
            <Textinput
              label="Display name"
              type="text"
              placeholder="Type your display name"
              name="userName"
              v-model="userInformation.name"
            />
            <div class="mb-8">
              <span class="form-label">Status</span>
              <Radio
                v-for="(item, i) in allStatus"
                :key="i"
                :label="item.label"
                :activeClass="item.activeClass"
                class="mb-5"
                v-model="userInformation.statusCode"
                :value="item.value"
              />
            </div>

            <div class="text-center">
              <Button
                :is-disabled="isUpdateDisabled"
                text="Update Info"
                btnClass="btn-dark w-full"
              ></Button>
            </div>
          </form>

          <hr class="border-gray-400 my-2" />
          <Button
            text="Logout"
            btnClass="btn-dark w-full"
            @click="handleLogout"
          />
        </div>
      </Transition>
    </header>
  </div>
</template>
<script>
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Radio from "@/components/Radio";
import { useAuthStore } from "@/store/auth";
import Textinput from "@/components/Textinput";
import Tooltip from "@/components/Tooltip";
import { getAvatarSrc } from "@/helpers";
import { USER_STATUS } from "@/constant/user-status";
import { useLayOutChat } from "@/store/layout-chat";
import { useRouter } from "vue-router";
export default {
  components: {
    Button,
    Icon,
    Radio,
    Textinput,
    Tooltip,
  },
  data() {
    const authStore = useAuthStore();
    return {
      authStore,
      allStatus: USER_STATUS,
      layoutChat: useLayOutChat(),
      router: useRouter(),
      userInformation: {
        name: authStore.currentUser?.name,
        statusCode: authStore.currentUser.statusCode,
      },
    };
  },
  computed: {
    currentUser() {
      return this.authStore.currentUser;
    },
    isUpdateDisabled() {
      // check with original
      if (
        this.currentUser.name === this.userInformation.name &&
        this.currentUser.status === this.userInformation.statusCode
      ) {
        return true;
      }
      // check ms have name
      if (
        this.userInformation.name !== this.currentUser.name &&
        this.userInformation.name
      ) {
        return false;
      }
      // check status code
      return this.userInformation.statusCode === this.currentUser.statusCode;
    },
  },
  methods: {
    getAvatarSrc,
    async handleLogout() {
      await this.authStore.handleLogOut();
      if (!this.currentUser) {
        await this.router.push("/login");
      }
    },
    async uploadAvatar(event) {
      const file = event.target.files[0];
      await this.authStore.updateAvatar(file);
    },
    async onSubmit() {
      await this.authStore.updateInfoUser(this.userInformation);
      this.layoutChat.toggleUserProfile();
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-user-setting-enter-active {
  animation: fade-in-left 0.24s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.chat-user-setting-leave-active {
  animation: fade-in-left 0.24s cubic-bezier(0.39, 0.575, 0.565, 1) both reverse;
}
@keyframes fade-in-left {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
