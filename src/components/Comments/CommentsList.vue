<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <div class="left-side-container">
          <ModeButtons :store-module="'comments'" :first-mode="'Положительные'" :second-mode="'Отрицательные'" />
          <!--          <NewsCalendar />-->
          <!--          <NewsFilters />-->
        </div>
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <RemoteSearch />
        <div v-for="comment in comments" :key="comment.id">
          {{ comment.text }}
          <br />
          <br />
          <br />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RemoteSearch from '@/components/admin/RemoteSearch.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import IComment from '@/interfaces/comments/IComment';

export default defineComponent({
  name: 'CommentsList',
  components: {
    ModeButtons,
    RemoteSearch,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const comments: Ref<IComment[]> = computed<IComment[]>(() => store.getters['comments/comments']);
    const mount = ref(false);

    onBeforeMount(async () => {
      store.commit('filter/setStoreModule', 'doctors');
      await store.dispatch('comments/getAll');
      mount.value = true;
    });
    return {
      comments,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  .right-side {
    // max-width: $right-side-max-width;
  }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}
</style>
