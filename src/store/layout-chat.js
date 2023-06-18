import { defineStore } from "pinia";
import { MESSAGE_OPTIONS } from "@/constant/chat";

export const useLayOutChat = defineStore("layout-chat", {
  state: () => ({
    openUserProfile: false,
    showDetail: false,
    showChatWindow: false,
    currentTab: MESSAGE_OPTIONS.One2One.value,
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
      this.showChatWindow = val;
    },
    toggleTab(value) {
      this.currentTab = value;
      this.resetWhenToggleTab();
    },
    resetWhenToggleTab() {
      this.openUserProfile = false;
      this.showDetail = false;
      this.showChatWindow = false;
    },
  },
});
