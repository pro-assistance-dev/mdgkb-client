<template>
  <div class="container">
    <PInput v-model="query" placeholder="Найти" @input="input">
      <template #right>
        <IconSearch />
      </template>
    </PInput>
    <div v-if="query" class="result">
      <ul class="list">
        <li v-for="result in results" :key="result.value" @click="select(result)">{{ result.label }}</li>
      </ul>
    </div>
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

.container {
  position: relative;
  widows: 300px;
  padding: 10px;
  margin: auto;
}

.result {
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 10000;
  width: calc(100% - 20px);
  max-height: 200px;
  border: $normal-border;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  overflow-y: auto;
}

.list {
  list-style-type: none;
  cursor: pointer;
}

.list li {
  margin: 10px 0;
}

.list li:hover {
  color: $main_blue;
  margin: 10px 0;
}
</style>
