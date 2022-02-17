<template>
  <div v-if="mount" class="card-flex-container">
    <div v-for="division in divisions" :key="division.id" class="card-container">
      <DivisionCard :division="division" />
    </div>
  </div>
  <div class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DivisionCard from '@/components/Divisions/DivisionCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DivisionsList',
  components: { DivisionCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const mount = ref(false);
    const divisions: Ref<IDivision[]> = computed<IDivision[]>(() => store.getters['divisions/divisions']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = divisions.value[divisions.value.length - 1].name;
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.division.name, schema.value.division.tableName);
      await store.dispatch('divisions/getAll', filterQuery.value);
    };

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      filterQuery.value.pagination.cursorMode = false;
      store.commit('filter/setStoreModule', 'divisions');
      await store.dispatch('divisions/getAll', filterQuery.value);
      mount.value = true;
    });

    return {
      divisions,
      loadMore,
      mount,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
