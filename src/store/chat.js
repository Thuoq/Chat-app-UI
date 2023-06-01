import { defineStore } from "pinia";
import { MESSAGE_OPTIONS, CHAT_ACTION_URL } from "@/constant/chat";
import { apis } from "@/apis";

export const useChatStore = defineStore("chat", {
  state: () => ({
    activeTab: MESSAGE_OPTIONS.One2One.value,
    showDetail: false,
    showChatWindow: false,
    messages: [],
    conversations: [],
    targetConversation: null,
    users: [],
  }),
  getters: {
    isOne2OneTab(state) {
      return state.activeTab === MESSAGE_OPTIONS.One2One.value;
    },
    isGroupTab(state) {
      return state.activeTab === MESSAGE_OPTIONS.Group.value;
    },
  },
  actions: {
    generateUrl(actionType, paramUrl) {
      const currentTab = this.activeTab;
      const currentLabel = Object.values(MESSAGE_OPTIONS).find(
        (option) => option.value === currentTab
      ).label;
      const action = CHAT_ACTION_URL[actionType][currentLabel];
      return action.getUrl(paramUrl);
    },
    async getConversations() {
      const url = this.generateUrl("getConversations");
      const {
        data: { metadata },
      } = await apis.chatApi.get(url);
      let conversations = metadata?.conversations || [];
      if (this.isOne2OneTab && metadata?.conversations.length) {
        conversations = conversations.map((conversaion) => {
          const message = conversaion.messages[0];
          const nameReceivedUser = message?.receivedBy?.name || "";
          const avatarUrl = message?.receivedBy?.avatarUrl || null;
          const targetUserId = message?.receivedBy.id;
          return {
            ...conversaion,
            name: nameReceivedUser,
            avatarUrl,
            targetUserId,
          };
        });
      }
      this.conversations = conversations;
    },
    async sendMessage({ content, imageUrls = [] }) {
      const url = this.generateUrl("sendMessage", {
        conversationId: this.targetConversation.id,
      });
      await apis.chatApi.post(url, {
        content,
        imageUrls,
        targetUserId: this.targetConversation?.targetUserId || null,
      });
    },
    async openChat(conversation) {
      this.showChatWindow = true;
      const url = this.generateUrl("getMessages", {
        conversationId: conversation.id,
      });
      const {
        data: { metadata },
      } = await apis.chatApi.get(url);
      this.messages = metadata?.messages || [];
      this.targetConversation = conversation;
    },
    resetStoreWhenChangeTab() {
      this.showDetail = false;
      this.showChatWindow = false;
      this.messages = [];
      this.targetConversation = null;
    },
    openDetailInfo() {
      this.showDetail = true;
    },
    closeDetailInfo() {
      this.showDetail = false;
    },
    async toggleOne2OneTab() {
      this.activeTab = MESSAGE_OPTIONS.One2One.value;
      this.resetStoreWhenChangeTab();
      await this.getConversations();
    },
    async toggleGroupTab() {
      this.activeTab = MESSAGE_OPTIONS.Group.value;
      this.resetStoreWhenChangeTab();
      await this.getConversations();
    },
    async getListUsersInDb() {
      const {
        data: { metadata },
      } = await apis.chatApi.get("/users");
      this.users = metadata.users;
    },
    async createConversationGroup(payload) {
      await apis.chatApi.post("/conversations/group", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await this.getConversations();
    },
  },
});
