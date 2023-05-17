import { defineStore } from "pinia";
import { apis } from "@/apis";

export const useChatGroupStore = defineStore("chat-group", {
  state: () => ({
    targetGroup: null,
    messagesFeed: [],
    isActiveChat: false,
    groups: [],
  }),
  actions: {
    createConversation4Group({ file, name, memberIds }) {},
    async handleUploadImage(file) {
      const formData = new FormData();
      formData.append("imageContent", file);
      const {
        data: { metadata },
      } = await apis.chatApi.post("/messages/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        imageUrl: metadata.imageUrl,
      };
    },
    setActiveChat(val) {
      this.isActiveChat = Boolean(val);
    },
    async openChat(group) {
      this.isActiveChat = true;
      const {
        data: { metadata },
      } = await apis.chatApi.get(
        `/messages/one-2-one?targetUserId=${group.id}`
      );
      this.conversation = metadata?.messages || [];
      this.targetGroup = group;
    },
    async sendMessageOne2One({ content }) {
      await apis.chatApi.post("/messages/one-2-one/send-message", {
        content,
        targetUserId: this.targetUser?.id,
      });
    },
    async getGroups() {
      const {
        data: {
          metadata: { conversations },
        },
      } = await apis.chatApi.get(`conversations/groups`);
      this.groups = conversations || [];
    },
  },
});
