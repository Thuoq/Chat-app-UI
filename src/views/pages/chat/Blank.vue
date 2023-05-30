<template>
  <div
    class="h-full flex flex-col items-center justify-center xl:space-y-2 space-y-6"
  >
    <img src="@/assets/images/svg/blank.svg" alt="" />
    <h4 class="text-2xl text-slate-600 dark:text-slate-300 font-medium">
      No message yet...
    </h4>

    <p class="text-sm text-slate-500 lg:pt-0 pt-4">
      don't worry, just take a deep breath & say "Hello"
    </p>
  </div>
</template>
<script>
export default {
  mixins: [window],
};
</script>
