<template>
  <header class="border-b border-slate-100 dark:border-slate-700">
    <div class="flex py-6 md:px-6 px-3 items-center">
      <div class="flex-1">
        <div class="flex space-x-3 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10 rounded-full relative">
              <img
                :src="getAvatarSrc()"
                alt=""
                class="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div class="flex-1 text-start">
            <span
              class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate min-w-[50px] p-1 rounded w-24"
              contenteditable="true"
              @blur="updateName"
              >{{ name }}</span
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

        <div @click="openinfo" class="msg-action-btn">
          <Icon icon="heroicons-outline:dots-horizontal" />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { getAvatarSrc } from "@/helpers";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      name: "thuong",
    };
  },
  methods: {
    getAvatarSrc,
    updateName(name) {},
  },
};
</script>
