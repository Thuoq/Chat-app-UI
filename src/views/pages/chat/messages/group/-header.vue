<template>
  <header class="border-b border-slate-100 dark:border-slate-700">
    <div class="flex py-6 md:px-6 px-3 items-center">
      <div class="flex-1">
        <div class="flex space-x-3 rtl:space-x-reverse">
          <div class="flex-none relative">
            <div class="h-10 w-10 rounded-full relative">
              <img
                :src="getAvatarSrc(targetConversation?.avatarUrl)"
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
              >{{ targetConversation?.name }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse"
      >
        <div class="msg-action-btn cursor-pointer">
          <Icon icon="heroicons-outline:user-group" @click="openMembersPopup" />
        </div>
        <div class="msg-action-btn cursor-pointer" @click="openCallPopup">
          <Icon icon="heroicons-outline:phone" />
        </div>
        <div class="msg-action-btn cursor-pointer" @click="openVideoCall">
          <Icon icon="heroicons-outline:video-camera" />
        </div>

        <div @click="chatStore.openDetailInfo" class="msg-action-btn">
          <Icon icon="heroicons-outline:dots-horizontal" />
        </div>
      </div>
    </div>
    <PhoneCall
      :show-modal="showCallPopup"
      @close-phone-call="showCallPopup = false"
    />
    <VideoCall
      :show-modal="showVideoCallPopup"
      @close-video-call="showVideoCallPopup = false"
    />
    <Members
      @close-members-popup="showMembersPopup = false"
      :show-modal="showMembersPopup"
    />
  </header>
</template>

<script>
import { getAvatarSrc } from "@/helpers";
import Icon from "@/components/Icon";
import { mapState } from "pinia";
import PhoneCall from "./-phone-call.vue";
import VideoCall from "./-video-call.vue";
import Members from "./-members.vue";
import { useChatStore } from "@/store/chat";
export default {
  components: {
    Icon,
    PhoneCall,
    VideoCall,
    Members,
  },
  data() {
    return {
      showVideoCallPopup: false,
      showCallPopup: false,
      chatStore: useChatStore(),
      showMembersPopup: false,
    };
  },
  computed: {
    ...mapState(useChatStore, ["targetConversation"]),
  },
  methods: {
    getAvatarSrc,
    updateName(name) {},
    uploadAvatar() {
      const files = this.$refs.avatarInput.files;
      const formData = new FormData();
      formData.append("avatar", files[0]);
    },
    openCallPopup() {
      this.showCallPopup = true;
      this.showVideoCallPopup = false;
    },
    openVideoCall() {
      this.showVideoCallPopup = true;

      this.showCallPopup = false;
    },
    openMembersPopup() {
      this.showMembersPopup = true;
    },
  },
};
</script>
