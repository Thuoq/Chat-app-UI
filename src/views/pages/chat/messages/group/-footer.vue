<template>
  <footer
    class="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700"
  >
    <div
      class="flex-none sm:flex hidden md:space-x-3 space-x-1 rtl:space-x-reverse"
    >
      <input
        type="file"
        ref="inputFile"
        multiple
        accept="image/*"
        style="display: none"
        @change="handleFiles"
      />
      <button
        type="button"
        @click="openFilePicker"
        class="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full"
      >
        <Icon icon="heroicons-outline:camera" />
      </button>
    </div>
    <div class="flex-1 relative flex space-x-3 rtl:space-x-reverse">
      <div class="flex-1">
        <textarea
          type="text"
          placeholder="Type your message..."
          class="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
          v-model.trim="newMessage"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift.exact.prevent="newMessage += '\n'"
        ></textarea>
        <div v-if="imageUrls.length > 0" class="flex flex-wrap py-2">
          <div v-for="(url, index) in imageUrls" :key="index" class="relative">
            <button
              type="button"
              @click="deleteImage(index)"
              class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Icon icon="heroicons-outline:x" class="h-3 w-3 text-white" />
            </button>
            <img
              :src="url"
              alt="uploaded image"
              class="h-16 w-16 object-cover rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>
      <div class="flex-none md:pr-0 pr-3" @click="sendMessage">
        <button
          type="button"
          class="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full"
        >
          <Icon
            icon="heroicons-outline:paper-airplane"
            class="transform rotate-[60deg]"
          />
        </button>
      </div>
    </div>
  </footer>
</template>
<script>
import { Icon } from "@iconify/vue";
import { useChatStore } from "@/store/chat";
export default {
  components: { Icon },
  data() {
    return {
      newMessage: "",
      imageUrls: [],
      chatGroupStore: useChatStore(),
    };
  },
  methods: {
    async sendMessage() {
      // send message with this.newMessage and this.imageUrls to backend

      this.$emit("send-message", {
        content: this.newMessage,
        imageUrls: this.imageUrls,
      });

      this.newMessage = "";
      this.imageUrls = [];
    },
    openFilePicker() {
      this.$refs.inputFile.click();
    },
    handleFiles(event) {
      const files = Array.from(event.target.files);
      const fileUrls = [];

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          fileUrls.push(event.target.result);
          if (fileUrls.length === files.length) {
            this.imageUrls = [...this.imageUrls, ...fileUrls];
          }
        };

        reader.readAsDataURL(file);
      });
    },
    deleteImage(index) {
      this.imageUrls.splice(index, 1);
    },
  },
};
</script>
