<template>
  <header class="border-b border-slate-100 dark:border-slate-700">
    <div class="flex py-6 md:px-6 px-3 items-center">
      <div class="flex-1">
        <div class="flex space-x-3 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10 rounded-full relative">
              <span
                :class="
                  targetUser?.status === 'active'
                    ? 'bg-success-500'
                    : 'bg-secondary-500'
                "
                class="status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0"
              ></span>
              <img
                :src="getAvatarSrc(targetUser?.avatarUrl)"
                alt=""
                class="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div class="flex-1 text-start">
            <span
              class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate"
              >{{ targetUser?.name }}
            </span>
            <span
              class="block text-slate-500 dark:text-slate-300 text-xs font-normal"
              >Active now</span
            >
          </div>
        </div>
      </div>
      <div
        class="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse"
      >
        <div class="msg-action-btn">
          <Icon icon="heroicons-outline:phone" />
        </div>
        <div class="msg-action-btn">
          <Icon icon="heroicons-outline:video-camera" />
        </div>

        <div @click="one2OneStore.openTabInfoUser" class="msg-action-btn">
          <Icon icon="heroicons-outline:dots-horizontal" />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { useChatOne2OneStore } from "@/store/chat-one-two-one";
import { mapState } from "pinia";
import { getAvatarSrc } from "@/helpers";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      one2OneStore: useChatOne2OneStore(),
    };
  },
  computed: {
    ...mapState(useChatOne2OneStore, ["targetUser"]),
  },
  methods: {
    getAvatarSrc,
  },
};
</script>
