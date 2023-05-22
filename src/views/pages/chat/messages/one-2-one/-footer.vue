<template>
  <footer
    class="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700"
  >
    <div
      class="flex-none sm:flex hidden md:space-x-3 space-x-1 rtl:space-x-reverse"
    ></div>
    <div class="flex-1 relative flex space-x-3 rtl:space-x-reverse">
      <div class="flex-1">
        <textarea
          type="text"
          placeholder="Type your message..."
          class="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
          v-model.trim="newMessage"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift.exact.prevent="newMessage += '\n'"
        />
      </div>
      <div class="flex-none md:pr-0 pr-3">
        <button
          type="button"
          @click="sendMessage"
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
import { useChatOne2OneStore } from "@/store/chat-one-two-one";

export default {
  data() {
    return {
      newMessage: "",
      one2OneStore: useChatOne2OneStore(),
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage) {
        await this.one2OneStore.sendMessageOne2One({
          content: this.newMessage,
        });
      }
      this.newMessage = "";
    },
  },
};
</script>
