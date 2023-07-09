import { defineStore } from "pinia";
import { apis } from "@/apis";
import { useLayOutChat } from "@/store/layout-chat";

export const usePrivateChat = defineStore("privateChat", {
  state: () => ({
    selectedUser: null,
    messages: [],
    messageImages: [],
    searchableUsers: [],
    recentChats: [],
  }),
  actions: {
    async getUsersBySearch(searchObj = {}) {
      const { name } = searchObj;

      const searchParams = new URLSearchParams();
      if (name !== undefined && name !== null) {
        searchParams.append("name", name);
      }
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/users?${searchParams.toString()}`);
      this.searchableUsers = metadata.users || [];
    },
    async onSelectedUser(selectedUser) {
      this.selectedUser = selectedUser;
      const layoutChat = useLayOutChat();
      layoutChat.setShowChatWidow(true);
      const url = `/users/${selectedUser.id}/messages`;
      const {
        data: { metadata },
      } = await apis.chatApi(url);
      const { messages = [], messagesImages = [] } = metadata;
      this.messages = messages;
      this.messagesImages = messagesImages;
    },
    async getRecentChats() {
      const url = "/users/users-recent-chats";
      const {
        data: { metadata },
      } = await apis.chatApi(url);
      this.recentChats = metadata.users || [];
    },
    async onUserSendMessagePrivate({
      messages,
      messagesImages,
      recentChats,
      targetUserId,
    }) {
      const isChattedWithSelectedUser = this.selectedUser?.id === +targetUserId;

      if (isChattedWithSelectedUser) {
        this.messages = messages;
        this.messagesImages = messagesImages;
      }

      this.recentChats = recentChats;
    },
    clearStatePrivateChat() {
      this.selectedUser = null;
      this.messages = null;
      this.messageImages = [];
      this.searchableUsers = [];
      this.recentChats = [];
    },
  },
});
