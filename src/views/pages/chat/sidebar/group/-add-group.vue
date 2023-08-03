<template>
  <div>
    <Modal
      :activeModal="openModal"
      @close="$emit('close-modal')"
      title="Create Group"
      centered
    >
      <form @submit.prevent="onSubmit" class="space-y-4">
        <Textinput
          label="Name Group"
          type="text"
          placeholder="Name Group"
          name="name"
          v-model.trim="name"
        />
        <div class="assagin space-y-4">
          <VueSelect label="Members" name="members">
            <vSelect
              :options="users"
              label="name"
              :reduce="(contact) => contact.id"
              v-model="members"
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
        <div class="space-y-2">
          <label
            class="ltr:inline-block rtl:block input-label mb-0"
            for="avatar"
          >
            Avatar Group</label
          >
          <Fileinput
            accept="image/*"
            placeholder="Default"
            name="default"
            @input="onAvatarChange"
          />
        </div>

        <div class="ltr:text-right rtl:text-left space-y-1">
          <Button
            type="submit"
            text="Create Group"
            btnClass="btn-dark w-full"
            :is-disabled="isDisabledCreate"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script>
import Button from "@/components/Button/index.vue";
import Modal from "@/components/Modal/index.vue";
import VueSelect from "@/components/Select/VueSelect.vue";
import Textinput from "@/components/Textinput/index.vue";
import Fileinput from "@/components/Fileinput/index.vue";
import vSelect from "vue-select";
import { mapState } from "pinia";
import { getAvatarSrc } from "@/helpers";
import { useGroupChatStore } from "@/store/group-chat";

export default {
  components: {
    Button,
    Modal,
    VueSelect,
    Textinput,
    vSelect,
    Fileinput,
  },
  props: {
    openModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      members: [],
      name: "",
      avatarFile: null,
    };
  },
  computed: {
    ...mapState(useGroupChatStore, ["users"]),
    isDisabledCreate() {
      return this.members.length <= 0 || !this.name || !this.avatarFile;
    },
  },
  methods: {
    getAvatarSrc,
    onAvatarChange(e) {
      this.avatarFile = e;
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("memberIds", this.members);
      formData.append("name", this.name);
      formData.append("avatar", this.avatarFile);
      this.$emit("create-conversation-group", formData);
      this.$emit("close-modal");
    },
  },
};
</script>
<style lang="scss" scoped></style>
