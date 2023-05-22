<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-6 min-w-[28rem]">
      <h3 class="text-xl font-medium mb-4">Call</h3>
      <div class="flex items-center justify-center">
        <span class="text-gray-600 text-lg">{{ callDuration }}</span>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="closePhoneCall"
          class="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          End Call
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showModal: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {
      callStartTime: null,
      callInterval: null,
      callDuration: "00:00",
    };
  },
  watch: {
    showModal(val) {
      if (val) {
        this.callStartTime = new Date();
        this.callInterval = setInterval(this.updatePhoneCallDuration, 1000);
      } else {
        this.callStartTime = null;
      }
    },
  },
  methods: {
    closePhoneCall() {
      this.$emit("close-phone-call");
      this.callStartTime = null;
      clearInterval(this.callInterval);
      this.callDuration = "00:00";
    },
    updatePhoneCallDuration() {
      const currentTime = new Date();
      const duration = Math.floor((currentTime - this.callStartTime) / 1000); // in seconds
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      this.callDuration = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
  beforeUnmount() {
    clearInterval(this.callInterval);
  },
};
</script>
