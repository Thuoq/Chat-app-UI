<template>
  <div v-if="recentChats.length">
    <h3 class="text-lg font-semibold text-slate-900 mb-3">Recent chats</h3>
    <div
      class="divide-y divide-slate-100 dark:divide-slate-700 overflow-auto max-h-[400px]"
    >
      <div
        v-for="(user, i) in recentChats"
        :key="i"
        class="py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
        @click="onSelectedUser(user)"
      >
        <div class="flex space-x-3 px-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10 rounded-full relative">
              <span
                :class="getUserClassStatus(user.statusCode)"
                class="status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0"
              ></span>
              <img
                :src="getAvatarSrc(user.avatarUrl)"
                alt=""
                class="block w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div class="flex-1 text-start flex">
            <div class="flex-1">
              <span
                class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"
                >{{ user.name }}</span
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
import { mapState } from "pinia";
import { getAvatarSrc, getUserClassStatus } from "@/helpers";
import { usePrivateChat } from "@/store/private-chat";

export default {
  data() {
    return {
      privateChat: usePrivateChat(),
      searchContact: "",
      matchingContacts: [],
    };
  },
  computed: {
    ...mapState(usePrivateChat, ["recentChats"]),
  },
  methods: {
    async onSelectedUser(user) {
      await this.privateChat.onSelectedUser(user);
    },
    getAvatarSrc,
    getUserClassStatus,
  },
};
</script>
