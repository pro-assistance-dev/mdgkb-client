<template>
  <div v-if="mount">
    <CenterCard v-for="center in centers" :key="center.id" :center="center" />
  </div>
  <div class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import CenterCard from '@/components/Divisions/CenterCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICenter from '@/interfaces/ICenter';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'CentersList',
  components: { CenterCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const mount = ref(false);
    const centers: Ref<ICenter[]> = computed<ICenter[]>(() => store.getters['centers/items']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = centers.value[centers.value.length - 1].name;
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.center.name, schema.value.center.tableName);
      await store.dispatch('centers/getAll', filterQuery.value);
    };

    onBeforeMount(async () => {
      await store.dispatch('centers/getAll', filterQuery.value);
      mount.value = true;
    });

    return {
      centers,
      loadMore,
      mount,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';
</style>
