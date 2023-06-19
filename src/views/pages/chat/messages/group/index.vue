<template>
  <div class="h-full">
    <Header />
    <div class="chat-content parent-height">
      <div
        class="msgs overflow-y-auto msg-height pt-6 space-y-6"
        ref="chatWindow"
      >
        <div class="block md:px-6"></div>
        <div class="block md:px-6 px-4" v-for="(item, i) in messages" :key="i">
          <div
            class="flex space-x-2 items-start group rtl:space-x-reverse"
            v-if="isThemSender(item)"
          >
            <div class="flex-none">
              <div class="h-8 w-8 rounded-full">
                <img
                  :src="getAvatarSrc(item?.sentBy?.avatarUrl)"
                  alt=""
                  class="block w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div class="flex-1 flex space-x-4 rtl:space-x-reverse">
              <div>
                <span class="text-xs font-normal">{{
                  item?.sentBy?.name
                }}</span>
                <div
                  class="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all"
                >
                  <p v-if="item.content">{{ item.content }}</p>
                  <img
                    class="object-contain h-64 w-full"
                    v-if="item?.imageUrl"
                    :src="item?.imageUrl"
                    alt="imageurl"
                  />
                </div>
                <span
                  class="font-normal text-xs text-slate-400 dark:text-slate-400"
                  >{{ formatDateTimeChat(item.createdDatetime) }}</span
                >
              </div>
            </div>
          </div>
          <!-- sender -->
          <div
            class="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse"
            v-else
          >
            <div class="no flex space-x-4 rtl:space-x-reverse">
              <div>
                <span class="text-xs font-normal">{{
                  item?.sentBy?.name
                }}</span>
                <div
                  class="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all"
                >
                  <p v-if="item.content">{{ item.content }}</p>
                  <img
                    class="object-contain h-64 w-full"
                    v-if="item?.imageUrl"
                    :src="item?.imageUrl"
                    alt="imageurl"
                  />
                </div>
                <span
                  class="font-normal text-xs text-slate-400 dark:text-slate-400"
                  >{{ formatDateTimeChat(item.createdDatetime) }}</span
                >
              </div>
            </div>
            <div class="flex-none">
              <div class="h-8 w-8 rounded-full">
                <img
                  :src="getAvatarSrc(item?.sentBy?.avatarUrl)"
                  alt=""
                  class="block w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <!-- me  -->
        </div>
      </div>
    </div>
    <Footer @send-message="onSendMessage" />
  </div>
</template>
<script>
import Header from "./-header.vue";
import Footer from "./-footer.vue";
import { useAuthStore } from "@/store/auth";
import { mapState } from "pinia";
import { getAvatarSrc, formatDateTimeChat } from "@/helpers";
import { useGroupChatStore } from "@/store/group-chat";
import { SOCKET_EVENT } from "@/constant/socket-action";
export default {
  components: { Header, Footer },
  data() {
    return {
      groupChatStore: useGroupChatStore(),
    };
  },
  computed: {
    ...mapState(useGroupChatStore, ["messages", "selectedConversation"]),
    ...mapState(useAuthStore, ["currentUser"]),
  },
  watch: {
    messages() {
      this.scrollToBottom();
    },
  },
  methods: {
    formatDateTimeChat,
    getAvatarSrc,
    isThemSender(message) {
      return message.fromUserId !== this.currentUser?.id;
    },
    onSendMessage(payload) {
      this.$socket.emit(SOCKET_EVENT.SEND_MESSAGE_GROUP_START, {
        roomId: this.selectedConversation.roomId,
        conversationId: this.selectedConversation.id,
        currentUserId: this.currentUser.id,
        ...payload,
      });
      // await this.groupChatStore.sendMessage(payload);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.msg-height {
  height: calc(100% - 0px);
}
.parent-height {
  height: calc(100% - 250px);
}
.msg-action-btn {
  @apply md:h-8 md:w-8 h-6 w-6 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 text-slate-900 flex flex-col justify-center items-center md:text-xl text-sm rounded-full;
}
</style>
