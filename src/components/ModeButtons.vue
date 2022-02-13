<template>
  <div class="filter">
    <button :class="{ active: firstModeActive }" class="filter-button left-round" @click="changeMode(true)">
      <div class="filter-button-container">
        <span class="filter-button-container-left"><BookOutlined /></span>
        <span class="filter-button-container-right">{{ firstMode }}</span>
      </div>
    </button>
    <button :class="{ active: !firstModeActive }" class="filter-button right-round" @click="changeMode(false)">
      <div class="filter-button-container">
        <span class="filter-button-container-left"><FlagOutlined /></span>
        <span class="filter-button-container-right">{{ secondMode }}</span>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { BookOutlined, FlagOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'ModeButtons',
  components: { FlagOutlined, BookOutlined },
  props: {
    secondModeActive: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    firstMode: {
      type: String as PropType<string>,
      default: '',
    },
    secondMode: {
      type: String as PropType<string>,
      default: '',
    },
    storeMode: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['changeMode'],
  setup(props, { emit }) {
    const firstModeActive = ref(props.secondModeActive);
    const store = useStore();

    const changeMode = async (firstModeCondition: boolean) => {
      if (firstModeActive.value === firstModeCondition) {
        return;
      }
      firstModeActive.value = firstModeCondition;
      if (props.storeMode) {
        store.commit(`${props.storeModule}/setFirstModeCondition`, firstModeCondition);
        await store.dispatch(`${props.storeModule}/getAll`);
        return;
      }
      emit('changeMode', firstModeCondition);
    };
    return { firstModeActive, changeMode };
  },
});
</script>

<style scoped lang="scss">
.filter {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin: 10px 0;

  height: 40px;

  &-button {
    color: #363636;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
    border: 1px #dbdbdb;

    &:hover {
      cursor: pointer;
      border: 4px #4f4d4d;
      background-color: white;
    }

    &-container {
      display: flex;
      justify-content: center;

      &-left {
        margin-right: 5px;
      }
    }
  }
}

.active {
  background: #2754eb;
  color: white;
  &:hover {
    background-color: darken(#2754eb, 10%);
    border-color: #b5b5b5;
  }
}

.right-round {
  border-radius: 0 10px 10px 0;
}
.left-round {
  border-radius: 10px 0 0 10px;
}
</style>
