import { defineStore } from "pinia";
import { apis } from "@/apis";
import { useToast } from "vue-toastification";
import { getUserClassStatus } from "@/helpers";
import { useChatStore } from "@/store/chat";
import { useLayOutChat } from "@/store/layout-chat";

const toast = useToast();
export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    userStatusClass: (state) =>
      getUserClassStatus(state?.currentUser?.statusCode),
  },
  actions: {
    async handleUserSignUp({ email, password, name }) {
      try {
        const {
          data: { metadata, message },
        } = await apis.chatApi.post("/auth/sign-up", {
          email,
          password,
          name,
        });
        if (message) {
          toast.success(message);
        }
        this.currentUser = metadata?.user || null;
      } catch (error) {
        if (error?.response?.data) {
          toast.error(error?.response?.data?.message);
        }
      }
    },
    async handleSignIn({ email, password }) {
      try {
        const {
          data: { metadata, message },
        } = await apis.chatApi.post("/auth/sign-in", {
          email,
          password,
        });

        this.currentUser = metadata?.user || null;
        if (message) {
          toast.success(message);
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data) {
          toast.error(error?.response?.data?.message);
        }
      }
    },
    setCurrentUserWhenLogout() {
      this.currentUser = null;
      window.localStorage.removeItem("auth");
      const layoutStore = useLayOutChat();
      layoutStore.resetWhenToggleTab();
    },
    async handleLogOut() {
      try {
        const {
          data: { message },
        } = await apis.chatApi.post("/auth/logout");
        if (message) {
          toast.success(message);
        }
        this.setCurrentUserWhenLogout();
      } catch (error) {
        if (error?.response?.data) {
          toast.error(error?.response?.data?.message);
        }
      }
    },
    async updateAvatar(file) {
      const formData = new FormData();
      formData.append("avatar", file);
      const {
        data: { metadata, message },
      } = await apis.chatApi.post("/users/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.currentUser = metadata?.user || null;
      if (message) {
        toast.success(message);
      }
    },
    async updateInfoUser(payload) {
      const {
        data: { metadata, message },
      } = await apis.chatApi.patch("/users", payload);

      this.currentUser = metadata?.user || null;
      if (message) {
        toast.success(message);
      }
    },
  },
  persist: true,
});
