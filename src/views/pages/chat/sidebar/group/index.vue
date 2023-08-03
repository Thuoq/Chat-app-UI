<template>
  <div>
    <button
      @click="openAddGroup"
      class="py-3 px-3 bg-green-500 hover:bg-green-600 text-left text-white w-full"
    >
      Create Group
    </button>
  </div>
  <div class="contact-height overflow-y-auto">
    <div class="divide-y divide-slate-100 dark:divide-slate-700">
      <div
        v-for="(item, i) in conversations"
        :key="i"
        @click="openChat(item)"
        class="py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      >
        <div class="flex space-x-3 px-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10 rounded-full relative">
              <img
                :src="getAvatarSrc(item?.avatarUrl)"
                alt=""
                class="block w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div class="flex-1 text-start flex">
            <div class="flex-1 flex items-center">
              <span
                class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"
                >{{ item?.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddGroup
    :open-modal="isAddGroupOpen"
    @create-conversation-group="onCreateConversationGroup"
    @close-modal="closeAddGroup"
  />
</template>
<script>
import AddGroup from "./-add-group.vue";
import { getAvatarSrc, getUserClassStatus } from "@/helpers";
import { mapState } from "pinia";

import { useGroupChatStore } from "@/store/group-chat";
export default {
  components: {
    AddGroup,
  },
  data() {
    return {
      isAddGroupOpen: false,
      searchGroup: "",
      groupChatStore: useGroupChatStore(),
    };
  },
  computed: {
    ...mapState(useGroupChatStore, ["conversations"]),
  },
  methods: {
    getUserClassStatus,
    getAvatarSrc,
    async openAddGroup() {
      this.isAddGroupOpen = true;
      await this.groupChatStore.getListUserInDb();
    },
    closeAddGroup() {
      this.isAddGroupOpen = false;
    },
    async openChat(conversation) {
      await this.groupChatStore.onSelectedConversation(conversation);
    },
    async onCreateConversationGroup(payload) {
      await this.groupChatStore.createConversation(payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-height {
  height: 500px;
}
</style>
