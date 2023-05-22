<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-6">
      <h3 class="text-xl font-medium mb-4 min-w-[28rem]">Video Call</h3>
      <div class="flex items-center justify-center">
        <span class="text-gray-600 text-lg">{{ videoCallDuration }}</span>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="closeVideoCallPopup"
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
      videoCallStartTime: null,
      videoCallDuration: "00:00",
      videoCallInterval: null,
    };
  },
  watch: {
    showModal(val) {
      if (val) {
        this.videoCallStartTime = new Date();
        this.videoCallInterval = setInterval(
          this.updateVideoCallDuration,
          1000
        );
      } else {
        this.videoCallStartTime = null;
      }
    },
  },
  methods: {
    closeVideoCallPopup() {
      this.$emit("close-video-call");
      this.callDuration = "00:00";
      clearInterval(this.videoCallInterval);
    },
    updateVideoCallDuration() {
      const currentTime = new Date();
      const duration = Math.floor(
        (currentTime - this.videoCallStartTime) / 1000
      ); // in seconds
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      this.videoCallDuration = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
  beforeUnmount() {
    clearInterval(this.videoCallInterval);
  },
};
</script>
