<template>
  <div>
    <Modal
      :activeModal="openModal"
      @close="$emit('close-modal')"
      title="Create Group"
      centered
    >
      <form @submit.prevent="" class="space-y-4">
        <Textinput
          label="Name Group"
          type="text"
          placeholder="Name Group"
          name="title"
          v-model.trim="name"
        />
        <div class="assagin space-y-4">
          <VueSelect label="Members">
            <vSelect
              :options="contacts"
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
          <Fileinput placeholder="Default" id="avatar" name="default" />
        </div>

        <div class="ltr:text-right rtl:text-left space-y-1">
          <Button text="Create Group" btnClass="btn-dark w-full"></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script>
import Button from "@/components/Button/index.vue";
import FromGroup from "@/components/FromGroup/index.vue";
import Modal from "@/components/Modal/index.vue";
import VueSelect from "@/components/Select/VueSelect.vue";
import Textarea from "@/components/Textarea/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Fileinput from "@/components/Fileinput/index.vue";
import { useField, useForm } from "vee-validate";
import vSelect from "vue-select";
import { mapState } from "pinia";
import { getAvatarSrc } from "@/helpers";
import { useContactStore } from "@/store/contact";
import { useChatOne2OneStore } from "@/store/chat-one-two-one";
export default {
  components: {
    Button,
    FromGroup,
    Modal,
    VueSelect,
    Textinput,
    Textarea,
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
      name: "",
      members: [],
    };
  },
  watch: {
    members(val) {
      console.log(val);
    },
  },
  computed: {
    ...mapState(useChatOne2OneStore, ["contacts"]),
  },
  methods: {
    getAvatarSrc,
  },
};
</script>
