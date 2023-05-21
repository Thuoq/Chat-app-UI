import { defineStore } from "pinia";
import { apis } from "@/apis";

export const useChatGroupStore = defineStore("chat-group", {
  state: () => ({
    conversation: null,
    messagesFeed: [],
    isActiveChat: false,
    groups: [],
  }),
  actions: {
    createGroup({ file, name, memberIds }) {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("memberIds", memberIds);
      formData.append("name", name);
      const res = apis.chatApi.post("/conversations/groups", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    },
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
    async openChat(conversation) {
      this.isActiveChat = true;
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/messages/group/${conversation.id}`);
      this.messagesFeed = metadata?.messages || [];
      this.conversation = conversation;
    },
    async sendMessage2Group({ content }) {
      await apis.chatApi.post(
        `/messages/group/${this.conversation.id}/send-message`,
        {
          content,
        }
      );
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
