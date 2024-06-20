<template>
  <PInput v-model="query" @input="input" />
  <div id="result">
    <ul>
      <li v-for="result in results" :key="result.value" @click="select(result)">{{ result.label }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ISearchObject from '@/services/interfaces/ISearchObject';

const emits = defineEmits(['select', 'input']);
const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
  searchFunc: {
    type: Function,
    default: () => {},
  },
  suggestions: {
    type: Array<ISearchObject>,
    default: [],
  },
});
const query = ref(props.modelValue);

defineOptions({ inheritAttrs: false });

const results: Ref<ISearchObject[]> = ref([]);
async function input() {
  emits('input', query.value);
  await fillResults();
}

async function fillResults() {
  if (!props.searchFunc) {
    return;
  }
  results.value = await props.searchFunc(query.value);
}

async function select(item: ISearchObject) {
  emits('select', item);
}
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}

.field {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  background: $input-background;
  border-radius: $p-input-border-radius;
  border: $p-input-border;
  padding: $p-input-padding;
  margin: $p-input-margin;
  overflow: hidden;
}

.right-field {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
}

.left-field {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
}

.text-field {
  width: $input-width;
}

.text-field__label {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  font-family: $input-font;
  color: $input-label-color;
  font-size: $base-font-size;
  margin: $input-label-margin;
}

.text-field__input {
  width: 100%;
  font-family: $input-font;
  font-size: $input-font-size;
  background: $input-background;
  color: $input-font-color;
  border: $input-border;
  margin: $input-margin;
  padding: $input-padding;
}

.text-field__input::placeholder {
  font-family: $input-font;
  font-size: $input-font-size;
  color: $input-font-color;
}

.text-field__input:focus {
  color: $input-font-color;
  outline: 0;
}

.text-field__input:disabled,
.text-field__input[readonly] {
  background-color: $input-readonly-background;
  opacity: 1;
}
</style>
