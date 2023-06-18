import { defineStore } from "pinia";
import { apis } from "@/apis";
import { useLayOutChat } from "@/store/layout-chat";

export const useGroupChatStore = defineStore("groupChat", {
  state: () => ({
    conversations: [],
    messages: [],
    messagesImages: [],
    selectedConversation: null,
    users: [],
  }),
  actions: {
    async getConversationsFromUser() {
      const {
        data: { metadata },
      } = await apis.chatApi.get("/conversations");
      this.conversations = metadata.conversations || [];
    },
    async onSelectedConversation(conversation) {
      const layoutChatStore = useLayOutChat();
      layoutChatStore.setShowChatWidow(true);
      this.selectedConversation = conversation;
      const { data: metadata } = await apis.chatApi(
        `/conversations/${conversation.id}/messages`
      );
      const { messages = [], messagesImages = [] } = metadata;
      this.messages = messages;
      this.messagesImages = messagesImages;
    },
    async getListUserInDb() {
      const {
        data: { metadata },
      } = await apis.chatApi(`users`);
      this.users = metadata.users || [];
    },
    async createConversation(payload) {
      await apis.chatApi.post("/conversations", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await this.getConversationsFromUser();
    },
  },
});
