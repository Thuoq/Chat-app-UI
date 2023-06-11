import { defineStore } from "pinia";

export const useLayOutChat = defineStore("layout-chat", {
  state: () => ({
    openUserProfile: false,
    showDetail: false,
    showChatWindow: false,
  }),

  actions: {
    toggleUserProfile() {
      this.openUserProfile = !this.openUserProfile;
    },
    setOpenUserProfile(value) {
      this.openUserProfile = value;
    },
    setShowDetail(val) {
      this.showDetail = val;
    },
    setShowChatWidow(val) {
      this.setShowChatWidow = val;
    },
  },
});
