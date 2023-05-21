<template>
  <header class="border-b border-slate-100 dark:border-slate-700">
    <div class="flex py-6 md:px-6 px-3 items-center">
      <div class="flex-1">
        <div class="flex space-x-3 rtl:space-x-reverse">
          <div class="flex-none relative">
            <div class="h-10 w-10 rounded-full relative">
              <img
                :src="getAvatarSrc(conversation?.avatarUrl)"
                alt=""
                class="w-full h-full object-cover rounded-full"
              />
              <div
                class="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-200"
              >
                <div class="bg-white rounded-full p-2 cursor-pointer">
                  <Icon icon="heroicons-outline:camera" class="w-6 h-6" />
                  <input
                    type="file"
                    accept="image/*"
                    ref="avatarInput"
                    class="hidden"
                    @change="uploadAvatar"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 text-start">
            <span
              class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate min-w-[50px] p-1 rounded w-24"
              contenteditable="true"
              @blur="updateName"
              >{{ conversation?.name }}</span
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
import { mapState } from "pinia";
import { useChatGroupStore } from "@/store/chat-group";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState(useChatGroupStore, ["conversation"]),
  },
  methods: {
    getAvatarSrc,
    updateName(name) {},
    uploadAvatar() {
      const files = this.$refs.avatarInput.files;
      // You can use FormData to send the image to the backend
      const formData = new FormData();
      formData.append("avatar", files[0]);
      // Call your backend API to update the user's avatar with the new image
      // ...
    },
    openinfo() {},
  },
};
</script>
