<template>
  <div class="mb-1">
    <div class="px-3 mt-1 mx-6 rounded">
      <RecentChat />
      <SearchUser />
    </div>
  </div>
</template>
<script>
import RecentChat from "./-recent-chat.vue";
import SearchUser from "./-search-user.vue";
export default {
  components: {
    RecentChat,
    SearchUser,
  },
};
</script>
