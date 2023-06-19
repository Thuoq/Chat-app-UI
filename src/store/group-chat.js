import { defineStore } from "pinia";
import { apis } from "@/apis";
import { useLayOutChat } from "@/store/layout-chat";
import { MESSAGE_OPTIONS } from "@/constant/chat";
import { useToast } from "vue-toastification";

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
    getConversationById(id) {
      return this.conversations?.find((el) => el.id === id);
    },
    async onSelectedConversation(conversation) {
      const layoutChatStore = useLayOutChat();
      layoutChatStore.setShowChatWidow(true);
      this.selectedConversation = conversation;
      const {
        data: { metadata },
      } = await apis.chatApi(`/conversations/${conversation.id}/messages`);
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
    async onReceivedMessageFromSocket(payload, currentUserId) {
      const { conversationId, messages, messagesImages, senderId } = payload;
      // check currently is group tab
      const layoutChatStore = useLayOutChat();
      if (layoutChatStore.currentTab === MESSAGE_OPTIONS.Group.value) {
        // check if selected conversation matching
        if (this.selectedConversation?.id === +conversationId) {
          this.messages = messages;
          this.messagesImages = messagesImages;
        } else {
          // finding conversation
          const conversation = this.getConversationById(+conversationId);
          const toast = useToast();

          if (conversation && senderId !== currentUserId) {
            toast.success(
              `You received new message from group ${conversation.name}`
            );
          }
        }
      }
      //
    },
    async getAvailableMembersToAdd() {
      const searchParams = new URLSearchParams();
      searchParams.append(
        "excludeUserIds",
        String(this.selectedConversation?.groupMembers.map((el) => el.userId))
      );
      const {
        data: { metadata },
      } = await apis.chatApi.get(`/users?${searchParams.toString()}`);
      return metadata.users || [];
    },
    onJoinRoomSuccess(conversations) {
      const layoutChatStore = useLayOutChat();
      if (layoutChatStore.currentTab === MESSAGE_OPTIONS.Group.value) {
        this.conversations = conversations;
      }
    },
  },
});
