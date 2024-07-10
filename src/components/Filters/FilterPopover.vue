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

import FilterModel from '@/services/classes/filters/FilterModel';

export default defineComponent({
  name: 'FilterPopover',
  components: {
    FilterFilled,
  },
  props: {
    filterModel: {
      type: Object as PropType<FilterModel>,
      required: true,
    },
  },
  emits: ['addFilterModel', 'dropFilterModel'],
  setup(props, { emit }) {
    const visible: Ref<boolean> = ref(false);
    const store = useStore();

    const setFilter = async () => {
      emit('addFilterModel');
      await sendQueryAndClose();
    };

    const setTrigger = (trigger: string) => {};

    const dropFilter = async () => {
      emit('dropFilterModel');
      await sendQueryAndClose();
    };

    const sendQueryAndClose = async () => {
      store.commit(`pagination/setCurPage`, 1);
      visible.value = !visible.value;
    };

    return {
      setTrigger,
      dropFilter,
      setFilter,
      visible,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
