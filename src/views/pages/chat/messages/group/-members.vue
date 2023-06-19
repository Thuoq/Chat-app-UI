<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Chat Members</h2>
        <button @click="closePopup" class="text-gray-500 hover:text-gray-700">
          <Icon icon="heroicons-solid:x" class="w-5 h-5" />
        </button>
      </div>
      <div class="overflow-y-auto max-h-60">
        <ul class="divide-y divide-gray-300">
          <li v-for="member in members" :key="member.id" class="py-2">
            <div class="flex items-center">
              <img
                :src="getAvatarSrc(member.avatarUrl)"
                alt="Avatar"
                class="w-8 h-8 rounded-full object-cover mr-3"
              />
              <span class="text-gray-800">{{ member.name }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <div class="assagin space-y-4">
          <VueSelect label="Members" name="members">
            <vSelect
              :options="users"
              label="name"
              :reduce="(contact) => contact.id"
              v-model="newMembers"
              multiple
            >
              <template #option="{ name, avatarUrl }">
                <span class="flex items-center space-x-4">
                  <div class="flex-none">
                    <div class="h-7 w-7 rounded-full">
                      <img
                        :src="getAvatarSrc(avatarUrl)"
                        alt="#"
                        class="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                  <span class="flex-1">{{ name }}</span>
                </span>
              </template>
              <template #selected-option="{ name, avatarUrl }">
                <span class="flex items-center space-x-4">
                  <div class="flex-none">
                    <div class="h-7 w-7 rounded-full">
                      <img
                        :src="getAvatarSrc(avatarUrl)"
                        alt="#"
                        class="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                  <span class="flex-1">{{ name }}</span>
                </span>
              </template>
            </vSelect>
          </VueSelect>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <Button
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          @click="closePopup"
        >
          Close
        </Button>
        <Button
          class="bg-blue-500 text-white px-4 py-2 rounded"
          @click="addMembers"
          :is-disabled="!newMembers.length"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { getAvatarSrc } from "@/helpers";
import VueSelect from "@/components/Select/VueSelect.vue";
import Button from "@/components/Button/index.vue";
import vSelect from "vue-select";
import { mapState } from "pinia";
import { useGroupChatStore } from "@/store/group-chat";
export default {
  emits: ["close-members-popup", "add-new-members"],
  props: {
    showModal: {
      type: [Boolean],
      default: false,
    },
  },
  components: {
    Button,
    Icon,
    VueSelect,
    vSelect,
  },
  computed: {
    ...mapState(useGroupChatStore, ["selectedConversation"]),
    members() {
      return (
        this.selectedConversation?.groupMembers?.map((member) => member.user) ||
        []
      );
    },
  },
  data() {
    return {
      newMembers: [],
      users: [],
      groupChatStore: useGroupChatStore(),
    };
  },
  watch: {
    async showModal(val) {
      if (val) {
        this.users = await this.groupChatStore.getAvailableMembersToAdd();
      }
    },
  },
  methods: {
    closePopup() {
      this.$emit("close-members-popup");
      this.users = [];
      this.newMembers = [];
    },
    getAvatarSrc,
    addMembers() {
      this.$emit("add-new-members", {
        memberIds: this.newMembers,
      });

      this.closePopup();
    },
  },
};
</script>
