<template>
  <div class="h-full">
    <Header />
    <div class="chat-content parent-height">
      <div
        class="msgs overflow-y-autooverflow msg-height pt-6 space-y-6"
        ref="chatheight"
      >
        <!--        <div class="block md:px-6"></div>-->
        <!--        <div-->
        <!--          class="block md:px-6 px-4"-->
        <!--          v-for="(item, i) in conversation"-->
        <!--          :key="i"-->
        <!--        >-->
        <!--          <div-->
        <!--            class="flex space-x-2 items-start group rtl:space-x-reverse"-->
        <!--            v-if="isThemSender(item)"-->
        <!--          >-->
        <!--            <div class="flex-none">-->
        <!--              <div class="h-8 w-8 rounded-full">-->
        <!--                <img-->
        <!--                  :src="getAvatarSrc(item?.receivedBy?.avatarUrl)"-->
        <!--                  alt=""-->
        <!--                  class="block w-full h-full object-cover rounded-full"-->
        <!--                />-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="flex-1 flex space-x-4 rtl:space-x-reverse">-->
        <!--              <div>-->
        <!--                <div-->
        <!--                  class="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all"-->
        <!--                >-->
        <!--                  {{ item.content }}-->
        <!--                </div>-->
        <!--                <span-->
        <!--                  class="font-normal text-xs text-slate-400 dark:text-slate-400"-->
        <!--                  >{{ formatDateTimeChat(item.createdDatetime) }}</span-->
        <!--                >-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          &lt;!&ndash; sender &ndash;&gt;-->
        <!--          <div-->
        <!--            class="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse"-->
        <!--            v-if="!isThemSender(item)"-->
        <!--          >-->
        <!--            <div class="no flex space-x-4 rtl:space-x-reverse">-->
        <!--              <div class="whitespace-pre-wrap break-all">-->
        <!--                <div-->
        <!--                  class="text-contrent p-3 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 text-slate-800 text-sm font-normal rounded-md flex-1 mb-1"-->
        <!--                >-->
        <!--                  {{ item.content }}-->
        <!--                </div>-->
        <!--                <span class="font-normal text-xs text-slate-400">{{-->
        <!--                  formatDateTimeChat(item.createdDatetime)-->
        <!--                }}</span>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="flex-none">-->
        <!--              <div class="h-8 w-8 rounded-full">-->
        <!--                <img-->
        <!--                  :src="getAvatarSrc(item?.sentBy?.avatarUrl)"-->
        <!--                  alt=""-->
        <!--                  class="block w-full h-full object-cover rounded-full"-->
        <!--                />-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          &lt;!&ndash; me  &ndash;&gt;-->
        <!--        </div>-->
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import Header from "./-header.vue";
import Footer from "./-footer.vue";
export default {
  components: { Icon, Header, Footer },

  methods: {},
};
</script>

<style lang="scss" scoped>
.msg-height {
  height: calc(100% - 0px);
}
.parent-height {
  height: calc(100% - 250px);
}
.msg-action-btn {
  @apply md:h-8 md:w-8 h-6 w-6 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 text-slate-900 flex flex-col justify-center items-center md:text-xl text-sm rounded-full;
}
</style>
