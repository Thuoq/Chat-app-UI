<template>
  <div
    class="search my-4 flex items-center space-x-3 rtl:space-x-reverse relative"
  >
    <div class="flex-none text-base text-slate-900 dark:text-slate-400">
      <Icon icon="bytesize:search" />
    </div>
    <input
      v-model="searchUserName"
      placeholder="Find by name"
      class="w-full flex-1 block bg-transparent placeholder:font-normal placeholder:text-slate-400 py-2 focus:ring-0 focus:outline-none pr-10 dark:text-slate-200 dark:placeholder:text-slate-400"
    />
  </div>
  <div
    class="divide-y divide-slate-100 dark:divide-slate-700 overflow-auto max-h-[350px]"
  >
    <template v-if="searchableUsers.length">
      <div
        v-for="(item, i) in searchableUsers"
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
            <div class="flex-1 flex items-center">
              <span
                class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="py-5 text-slate-800 font-medium text-sm">
        No matching contacts found
      </div>
    </template>
  </div>
</template>
<script>
import { getAvatarSrc, getUserClassStatus } from "@/helpers";
import Icon from "@/components/Icon/index.vue";
import { mapState } from "pinia";
import { usePrivateChat } from "@/store/private-chat";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      searchUserName: "",
      privateChat: usePrivateChat(),
    };
  },
  watch: {
    async searchUserName(val) {
      await this.privateChat.getUsersBySearch({
        name: val,
      });
    },
  },
  computed: {
    ...mapState(usePrivateChat, ["searchableUsers"]),
  },
  methods: {
    async openChat(user) {
      await this.privateChat.onSelectedUser(user);
    },
    getAvatarSrc,
    getUserClassStatus,
  },
};
</script>
