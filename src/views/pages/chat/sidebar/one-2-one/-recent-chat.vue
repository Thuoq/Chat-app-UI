<template>
  <div v-if="conversations.length">
    <h3 class="text-lg font-semibold text-slate-900 mb-3">Recent chats</h3>
    <div
      class="divide-y divide-slate-100 dark:divide-slate-700 overflow-auto max-h-[400px]"
    >
      <div
        v-for="(item, i) in conversations"
        :key="i"
        class="py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
        @click="openChat(item)"
      >
        <div class="flex space-x-3 px-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10 rounded-full relative">
              <span
                :class="getUserClassStatus(item.statusCode)"
                class="status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0"
              ></span>
              <img
                :src="getAvatarSrc(item.avatarUrl)"
                alt=""
                class="block w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div class="flex-1 text-start flex">
            <div class="flex-1">
              <span
                class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h3 class="text-lg font-semibold text-slate-900 mb-3">No recent chats</h3>
  </div>
</template>
<script>
import { useChatStore } from "@/store/chat";
import { mapState } from "pinia";
import { getAvatarSrc, getUserClassStatus } from "@/helpers";

export default {
  data() {
    return {
      chatStore: useChatStore(),
      searchContact: "",
      matchingContacts: [],
    };
  },
  computed: {
    ...mapState(useChatStore, ["conversations"]),
  },
  methods: {
    async openChat(conversation) {
      await this.chatStore.openChat({
        ...conversation,
        conversationId: conversation.id,
      });
    },
    getAvatarSrc,
    getUserClassStatus,
  },
};
</script>
