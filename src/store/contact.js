import { defineStore } from "pinia";
import { apis } from "@/apis";

export const useContactStore = defineStore("contact", {
  state: () => {
    return {
      activechat: false,
      mobileChatSidebar: false,
      user: null,
      messageFeed: [],
      targetUser: null,
    };
  },
  actions: {
    async openChat(item) {
      this.activechat = true;
      this.mobileChatSidebar = false;
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/messages/one-2-one?targetUserId=${item.id}`);
      this.messageFeed = metadata?.messages || [];
      this.user = item; // TODO: DELETE THEM
      this.targetUser = item;
    },
    async sendMessageOne2One({ content }) {
      await apis.chatApi.post("/messages/one-2-one/send-message", {
        content,
        targetUserId: this.targetUser?.id,
      });
    },
  },
});
