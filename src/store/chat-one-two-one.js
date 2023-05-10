import { defineStore } from "pinia";
import { apis } from "@/apis";
export const useChatOne2OneStore = defineStore("chat-one-2-one", {
  state: () => ({
    targetUser: null,
    conversation: [],
    isActiveChat: false,
  }),
  actions: {
    async openChat(user) {
      this.isActiveChat = true;
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/messages/one-2-one?targetUserId=${user.id}`);
      this.conversation = metadata?.messages || [];
      this.targetUser = user;
    },
    async sendMessageOne2One({ content }) {
      await apis.chatApi.post("/messages/one-2-one/send-message", {
        content,
        targetUserId: this.targetUser?.id,
      });
    },
  },
});
