import { defineStore } from "pinia";
import { apis } from "@/apis";

export const useChatGroupStore = defineStore("chat-group", {
  state: () => ({
    targetGroup: null,
    messagesFeed: [],
    isActiveChat: false,
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
  },
});
