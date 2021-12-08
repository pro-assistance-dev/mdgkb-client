<template>
  <div class="comments-container">
    <AdminCommentCard v-for="(comment, i) in comments" :key="i" :comment="comment" />
  </div>
  <div v-if="!comments.length">Новых комментариев нет</div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import CommentParams from '@/classes/comments/CommentParams';
import AdminCommentCard from '@/components/admin/AdminComments/AdminCommentCard.vue';
import IComment from '@/interfaces/comments/IComment';
export default defineComponent({
  name: 'AdminCommentList',
  components: { AdminCommentCard },
  setup() {
    const store = useStore();
    const route = useRoute();
    const comments: ComputedRef<IComment[]> = computed<IComment[]>(() => store.getters['comments/comments']);

    const loadComments = async () => {
      const params = new CommentParams();
      store.commit('admin/showLoading');
      switch (route.name) {
        case 'AdminAllCommentList':
          await store.dispatch('comments/getAll');
          store.commit('admin/setHeaderParams', { title: 'Все комментарии' });
          break;
        case 'AdminModCheckedCommentList':
          params.modChecked = true;
          await store.dispatch('comments/getAll', params);
          store.commit('admin/setHeaderParams', { title: 'Отмодерированные комментарии' });
          break;
        case 'AdminNotModCheckedCommentList':
          params.modChecked = false;
          await store.dispatch('comments/getAll', params);
          store.commit('admin/setHeaderParams', { title: 'Неотмодерированные комментарии' });
          break;
        default:
          break;
      }
      store.commit('admin/closeLoading');
    };

    onBeforeMount(async () => {
      await loadComments();
    });

    watch(() => route.name, loadComments);

    return {
      comments,
    };
  },
});
</script>

<style lang="scss" scoped>
.comments-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
