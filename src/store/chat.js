import { defineStore } from "pinia";
import { MESSAGE_OPTIONS, CHAT_ACTION_URL } from "@/constant/chat";
import { apis } from "@/apis";
import { useAuthStore } from "@/store/auth";

export const useChatStore = defineStore("chat", {
  state: () => ({
    activeTab: MESSAGE_OPTIONS.One2One.value,
    showDetail: false,
    showChatWindow: false,
    messages: [],
    messagesImages: [],
    conversations: [],
    targetConversation: null,
    users: [],
    notificationMessage: [],
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
          return {
            ...conversaion,
            ...this.getChattingWithUser(message),
          };
        });
      }
      this.conversations = conversations;
    },
    async sendMessage({ content, imageUrls = [] }) {
      const url = this.generateUrl("sendMessage", {
        conversationId: this.targetConversation.conversationId,
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
        conversationId: conversation.conversationId,
      });
      const {
        data: { metadata },
      } = await apis.chatApi.get(url);
      this.messages = metadata?.messages || [];
      this.messagesImages = metadata.messagesImages || [];
      this.targetConversation = {
        ...conversation,
        conversationId: conversation.id,
      };
    },
    resetStoreWhenChangeTab() {
      this.showDetail = false;
      this.showChatWindow = false;
      this.messages = [];
      this.users = [];
      this.targetConversation = null;
      this.messagesImages = [];
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
    async getListUsersInDb(obj = {}) {
      const searchParams = new URLSearchParams();
      if (obj.name !== undefined && obj.name !== null) {
        searchParams.append("name", obj.name);
      }
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/users?${searchParams.toString()}`);
      this.users = metadata.users || [];
    },
    async createConversationGroup(payload) {
      await apis.chatApi.post("/conversations/group", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await this.getConversations();
    },
    getChattingWithUser(message = {}) {
      const receivedByUser = message.receivedBy;
      const sendByUser = message.sentBy;
      const authStore = useAuthStore();
      const currentUserId = authStore.currentUser?.id;
      if (receivedByUser?.id !== currentUserId) {
        return {
          name: receivedByUser?.name || null,
          targetUserId: receivedByUser?.id || null,
          avatarUrl: receivedByUser?.avatarUrl || null,
          statusCode: receivedByUser?.statusCode || null,
        };
      }
      return {
        name: sendByUser.name || null,
        targetUserId: sendByUser?.id || null,
        avatarUrl: sendByUser?.avatarUrl || null,
        statusCode: sendByUser?.statusCode || null,
      };
    },
    async getAvailableMembersToAdd() {
      const searchParams = new URLSearchParams();
      searchParams.append(
        "excludeUserIds",
        String(this.targetConversation?.groupMembers.map((el) => el.userId))
      );
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/users?${searchParams.toString()}`);
      return metadata.users || [];
    },
    async addMembersIntoConversationGroup({ memberIds }) {
      await apis.chatApi.post(
        `/conversations/${this.targetConversation.conversationId}/group-members`,
        {
          memberIds,
        }
      );
    },
    onUserSendMessagePrivate({
      conversationId,
      messages,
      messagesImages,
      conversations,
    }) {
      // check if current waiting for the sender
      if (this.targetConversation?.conversationId === +conversationId) {
        this.messages = messages;
        this.messagesImages = messagesImages;
      }
      if (this.isOne2OneTab) {
        this.conversations = conversations.map((conversation) => {
          const message = conversation.messages[0];
          return {
            ...conversation,
            ...this.getChattingWithUser(message),
          };
        });
      }
    },
  },
});
