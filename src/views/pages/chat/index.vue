<template>
  <div
    class="flex space-x-5 chat-height overflow-hidden relative rtl:space-x-reverse"
  >
    <div class="flex-none min-w-[260px]">
      <Card bodyClass=" relative p-0 h-full overflow-hidden ">
        <div class="border-b border-slate-100 dark:border-slate-700 pb-4">
          <Myprofile />
        </div>

        <div>
          <div class="flex">
            <button
              class="w-1/2 bg-white text-gray-500 py-4 px-6 border-b-2 font-medium border-transparent hover:border-blue-500 focus:outline-none active:text-blue-500 active:border-blue-500"
              :class="{
                'border-blue-500': activeTab === MESSAGE_OPTIONS.One2One.value,
              }"
              @click="activeTab = MESSAGE_OPTIONS.One2One.value"
            >
              Contacts
            </button>
            <button
              class="w-1/2 bg-white text-gray-500 py-4 px-6 border-b-2 font-medium border-transparent hover:border-blue-500 focus:outline-none active:text-blue-500 active:border-blue-500"
              :class="{
                'border-blue-500': activeTab === MESSAGE_OPTIONS.Group.value,
              }"
              @click="activeTab = MESSAGE_OPTIONS.Group.value"
            >
              Group
            </button>
          </div>
          <div v-show="activeTab === MESSAGE_OPTIONS.One2One.value">
            <Contact />
          </div>
          <div v-show="activeTab === MESSAGE_OPTIONS.Group.value">
            <Group />
          </div>
        </div>
      </Card>
    </div>
    <div class="flex-1">
      <div class="parent flex space-x-5 h-full rtl:space-x-reverse">
        <div class="flex-1">
          <Card bodyClass="p-0 h-full" className="h-full">
            <template v-if="isOne2OneChat">
              <One2OneChatBox v-if="isOne2OneActiveChat" />
              <Blank v-else />
            </template>
            <template v-else>
              <GroupChatBox v-if="isGroupChatActiveChat" />
              <GroupChatBox v-else />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Blank from "./Blank.vue";
import Contact from "./-contract.vue";
import One2OneChatBox from "./messages/one-2-one/index.vue";
import GroupChatBox from "./messages/group/index.vue";
import Myprofile from "./Myprofile.vue";
import Group from "./-group.vue";
import window from "@/mixins/window";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useContactStore } from "@/store/contact";
import { useChatOne2OneStore } from "@/store/chat-one-two-one";
import { useChatGroupStore } from "@/store/chat-group";
const MESSAGE_OPTIONS = {
  One2One: {
    value: 1,
  },
  Group: {
    value: 2,
  },
};
export default {
  mixins: [window],
  components: {
    Card,
    Blank,
    Group,
    Contact,
    GroupChatBox,
    Myprofile,
    One2OneChatBox,
  },
  data() {
    return {
      MESSAGE_OPTIONS,
      activeTab: MESSAGE_OPTIONS.One2One.value,
      one2OneStore: useChatOne2OneStore(),
      groupChatStore: useChatGroupStore(),
    };
  },
  // beforeRouteLeave activechat make false
  beforeRouteLeave(to, from, next) {
    this.activechat = false;
    next();
  },
  async created() {
    if (!this.currentUser) {
      await this.$router.push("/login");
    } else {
      await this.getContactsByUser();
    }
  },
  methods: {
    ...mapActions(useContactStore, ["getContactsByUser"]),
  },
  computed: {
    ...mapState(useAuthStore, ["currentUser"]),
    isOne2OneChat() {
      return this.activeTab === MESSAGE_OPTIONS.One2One.value;
    },
    isOne2OneActiveChat() {
      return this.one2OneStore.isActiveChat;
    },
    isGroupChatActiveChat() {
      return this.groupChatStore.isActiveChat;
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-height {
  height: 100%;
}

.contact-height {
  height: calc(100% - 138px);
}
</style>
