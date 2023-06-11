<template>
  <div class="h-full p-6" data-simplebar>
    <div class="flex items-center mb-4">
      <button
        @click="chatStore.closeDetailInfo"
        class="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
      >
        <Icon icon="heroicons-outline:x" />
      </button>
      <h4 class="text-xl text-slate-900 font-medium">About</h4>
    </div>
    <div class="h-[100px] w-[100px] rounded-full mx-auto mb-4">
      <img
        :src="getAvatarSrc(targetConversation?.avatarUrl)"
        alt=""
        class="block w-full h-full object-cover rounded-full"
      />
    </div>
    <div class="text-center">
      <h5 class="text-base text-slate-600 dark:text-slate-300 font-medium mb-1">
        {{ targetConversation?.name }}
      </h5>
    </div>
    <h4 class="py-4 text-sm text-secondary-500 dark:text-slate-300 font-normal">
      Shared Images
    </h4>
    <ul class="grid grid-cols-3 gap-2">
      <li
        class="h-[46px]"
        v-for="(messageImage, index) in messagesImages"
        :key="index"
      >
        <img
          :src="messageImage.imageUrl"
          alt=""
          class="w-full h-full object-cover rounded-[3px]"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import { getAvatarSrc } from "@/helpers";
import { mapState } from "pinia";
import { useChatStore } from "@/store/chat";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      chatStore: useChatStore(),
    };
  },
  methods: {
    getAvatarSrc,
  },
  computed: {
    ...mapState(useChatStore, ["targetConversation", "messagesImages"]),
  },
};
</script>
