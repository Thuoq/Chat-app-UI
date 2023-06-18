<template>
  <div
    class="flex space-x-5 chat-height overflow-hidden relative rtl:space-x-reverse"
  >
    <div class="flex-none min-w-[260px]">
      <Card bodyClass=" relative p-0 h-full overflow-hidden ">
        <div class="border-b border-slate-100 dark:border-slate-700 pb-4">
          <Myprofile />
        </div>

        <div>
          <div class="flex">
            <button
              class="w-1/2 bg-white text-gray-500 py-4 px-6 border-b-2 font-medium border-transparent hover:border-blue-500 focus:outline-none active:text-blue-500 active:border-blue-500"
              :class="{
                'border-blue-500': isOne2OneTab,
              }"
              @click="toggleOne2OneTab"
            >
              Contacts
            </button>
            <button
              class="w-1/2 bg-white text-gray-500 py-4 px-6 border-b-2 font-medium border-transparent hover:border-blue-500 focus:outline-none active:text-blue-500 active:border-blue-500"
              :class="{
                'border-blue-500': isGroupTab,
              }"
              @click="toggleGroupTab"
            >
              Group
            </button>
          </div>
          <div v-if="isOne2OneTab">
            <One2OneSideBar />
          </div>
          <div v-else>
            <GroupSideBar />
          </div>
        </div>
      </Card>
    </div>
    <div class="flex-1">
      <div class="parent flex space-x-5 h-full rtl:space-x-reverse">
        <div class="flex-1">
          <Transition name="fade-slide" mode="out-in">
            <Card bodyClass="p-0 h-full" className="h-full">
              <template v-if="isOne2OneTab">
                <One2OneChatBox v-if="showChatWindow" />
                <Blank v-else />
              </template>
              <template v-else>
                <GroupChatBox v-if="showChatWindow" />
                <Blank v-else />
              </template>
            </Card>
          </Transition>
        </div>
        <Transition name="slide" mode="out-in">
          <div class="flex-none w-[285px]" v-if="!isGroupTab && showDetail">
            <Card bodyClass="p-0 h-full">
              <InformationOne2One />
            </Card>
          </div>
          <div class="flex-none w-[285px]" v-else-if="isGroupTab && showDetail">
            <Card bodyClass="p-0 h-full">
              <InformationGroup />
            </Card>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Blank from "./Blank.vue";
import One2OneSideBar from "./sidebar/one-2-one/index.vue";
import One2OneChatBox from "./messages/one-2-one/index.vue";
import GroupChatBox from "./messages/group/index.vue";
import GroupSideBar from "./sidebar/group/index.vue";
import Myprofile from "./Myprofile.vue";
import window from "@/mixins/window";
import { mapState } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import InformationGroup from "./information/group/index.vue";
import InformationOne2One from "./information/one-2-one/index.vue";
import { MESSAGE_OPTIONS } from "@/constant/chat";

import { SOCKET_EVENT } from "@/constant/socket-action";
import { useToast } from "vue-toastification";
import { usePrivateChat } from "@/store/private-chat";
import { useLayOutChat } from "@/store/layout-chat";
import { useGroupChatStore } from "@/store/group-chat";
export default {
  mixins: [window],
  components: {
    Card,
    Blank,
    GroupSideBar,
    One2OneSideBar,
    GroupChatBox,
    Myprofile,
    One2OneChatBox,
    InformationGroup,
    InformationOne2One,
  },
  data() {
    return {
      activeTab: MESSAGE_OPTIONS.One2One.value,
      router: useRouter(),
      toast: useToast(),
      privateChatStore: usePrivateChat(),
      layoutChat: useLayOutChat(),
      groupChatStore: useGroupChatStore(),
    };
  },
  async created() {
    if (!this.currentUser) {
      await this.router.push("/login");
    } else {
      await this.privateChatStore.getRecentChats();
      this.$socket.emit(SOCKET_EVENT.SET_USER_ID, this.currentUser.id);
      this.$socket.on(
        SOCKET_EVENT.SEND_MESSAGE_PRIVATE,
        this.onSendMessagePrivateFromSocket
      );
      this.$socket.on(
        SOCKET_EVENT.SEND_MESSAGE_GROUP_COMPLETED,
        this.onReceivedMessageFromSocket
      );
    }
  },
  computed: {
    ...mapState(useAuthStore, ["currentUser"]),
    ...mapState(useLayOutChat, ["showChatWindow", "showDetail"]),
    isGroupTab() {
      return this.layoutChat.currentTab === MESSAGE_OPTIONS.Group.value;
    },
    isOne2OneTab() {
      return this.layoutChat.currentTab === MESSAGE_OPTIONS.One2One.value;
    },
  },
  methods: {
    async toggleOne2OneTab() {
      await this.privateChatStore.getRecentChats();
      this.layoutChat.toggleTab(MESSAGE_OPTIONS.One2One.value);
    },
    async toggleGroupTab() {
      await this.groupChatStore.getConversationsFromUser();
      this.layoutChat.toggleTab(MESSAGE_OPTIONS.Group.value);
    },
    onSendMessagePrivateFromSocket(payload) {
      const { messages, messagesImages, recentChats, sendBy, targetUserId } =
        payload;
      this.privateChatStore.onUserSendMessagePrivate({
        messages,
        messagesImages,
        recentChats,
        targetUserId,
      });
      if (sendBy) {
        this.toast.success(`You received message from ${sendBy.name}`);
      }
    },
    onReceivedMessageFromSocket(payload) {
      this.groupChatStore.onReceivedMessageFromSocket(
        payload,
        this.currentUser.id
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-height {
  height: 100%;
}

.contact-height {
  height: calc(100% - 138px);
}
</style>
