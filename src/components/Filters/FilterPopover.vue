<template>
  <span class="filter-popover">
    <el-popover v-model:visible="visible" placement="bottom-end" width="auto" :trigger="trigger">
      <template #reference>
        <FilterFilled :class="{ set: filterModel.isSet }" />
      </template>
      <slot></slot>
      <el-button-group>
        <el-button size="mini" type="success" @click="setFilter">Применить</el-button>
        <el-button size="mini" @click="dropFilter">Сбросить</el-button>
      </el-button-group>
    </el-popover>
  </span>
</template>

<script lang="ts">
import { FilterFilled } from '@ant-design/icons-vue';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IFilterModel from '@/services/interfaces/IFilterModel';
export default defineComponent({
  name: 'FilterPopover',
  components: {
    FilterFilled,
  },
  props: {
    filterModel: {
      type: Object as PropType<IFilterModel>,
      required: true,
    },
  },
  emits: ['addFilterModel', 'dropFilterModel'],
  setup(props, { emit }) {
    const visible: Ref<boolean> = ref(false);
    const store = useStore();
    const trigger: Ref<string> = computed(() => store.getters['filter/trigger']);
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];

    const setFilter = async () => {
      emit('addFilterModel');
      await sendQueryAndClose();
    };

    const setTrigger = (trigger: string) => {
      store.commit('filter/setTrigger', trigger);
    };

    const dropFilter = async () => {
      emit('dropFilterModel');
      await sendQueryAndClose();
    };

    const sendQueryAndClose = async () => {
      store.commit('filter/setOffset', 0);
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
      store.commit(`pagination/setCurPage`, 1);
      visible.value = !visible.value;
      store.commit('filter/setTrigger', 'click');
    };

    return {
      setTrigger,
      dropFilter,
      setFilter,
      trigger,
      visible,
    };
  },
});
</script>

<style lang="scss" scoped>
.anticon {
  margin: 4px 4px 2px 4px;
  font-size: 13px;
  &:hover {
    color: #5cb6ff;
  }
}
.set {
  color: #5cb6ff;
}
</style>
