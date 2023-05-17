import { defineStore } from "pinia";

export const useLayOutChat = defineStore("layout-chat", {
  state: () => ({
    openUserProfile: false,
  }),

  actions: {
    toggleUserProfile() {
      this.openUserProfile = !this.openUserProfile;
    },
    setOpenUserProfile(value) {
      this.openUserProfile = value;
    },
  },
});
