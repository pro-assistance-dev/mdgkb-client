<template>
  <el-form :style="{ maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item>
      <el-select v-model="selectedMode" class="m-2" placeholder="Выберите раздел" @change="selectMode">
        <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


export default defineComponent({
  name: 'ModeChoice',
  props: {
    modes: {
      type: Array as PropType<IOption[]>,
      required: false,
      default: () => [],
    },
    path: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    maxWidth: {
      type: [Number, String],
      default: 200,
    },
  },
  emits: ['selectMode'],
  setup(props, { emit }) {
    const selectedMode: Ref<string> = ref('');
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(() => {
      let routeMode = route.query.mode;
      if (typeof routeMode === 'string') {
        const mode = props.modes?.find((opt: unknown) => opt.value === routeMode);
        if (mode) {
          selectedMode.value = mode.label;
          // emit('selectMode', mode.value);
        }
      } else {
        selectedMode.value = props.modes[0].label;
        routeMode = props.modes[0].value;
        // selectMode(routeMode);
      }
    });

    const selectMode = (value: string): void => {
      emit('selectMode', value);
      router.replace(`/${props.path}?mode=${value}`);
    };

    return { selectedMode, selectMode };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 5px;
  border: none;
  padding-left: 25px;
  height: 34px;
  width: 100%;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  background: #2754eb;
  color: #ffffff;
  letter-spacing: 0.1em;
}

:deep(.el-input__inner::placeholder) {
  color: #ffffff;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-select-dropdown__item) {
  letter-spacing: 0.1em;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #ffffff;
}

:deep(.el-input__suffix) {
  top: -2px;
}

.el-form {
  width: 100%;
}
</style>
