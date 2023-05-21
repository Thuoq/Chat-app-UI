<template>
  <div class="border-b border-slate-100 dark:border-slate-700 mb-1">
    <div
      class="search px-3 mt-1 mx-6 rounded flex items-center space-x-3 rtl:space-x-reverse"
    >
      <div class="flex-none text-base text-slate-900 dark:text-slate-400">
        <Icon icon="bytesize:search" />
      </div>
      <input
        v-model="searchContact"
        placeholder="Finding Someone"
        class="w-full flex-1 block bg-transparent placeholder:font-normal placeholder:text-slate-400 py-2 focus:ring-0 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-400"
      />
    </div>
  </div>
  <div class="contact-height overflow-y-auto">
    <div class="divide-y divide-slate-100 dark:divide-slate-700">
      <div
        v-for="(item, i) in contacts"
        :key="i"
        class="py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
        @click="openChat(item)"
      >
        <div class="flex space-x-3 px-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10 rounded-full relative">
              <span
                :class="
                  item.status === 'active'
                    ? 'bg-success-500'
                    : 'bg-secondary-500'
                "
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
            <div class="flex-1">
              <span
                class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "@/components/Icon";
import { getAvatarSrc } from "@/helpers";
import { useChatOne2OneStore } from "@/store/chat-one-two-one";
import { mapState } from "pinia";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      one2OneStore: useChatOne2OneStore(),
      searchContact: "",
    };
  },
  computed: {
    ...mapState(useChatOne2OneStore, ["contacts"]),
  },
  methods: {
    getAvatarSrc,
    openChat(contact) {
      this.one2OneStore.openChat(contact);
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-height {
  height: 500px;
}
</style>
