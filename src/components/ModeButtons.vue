<template>
  <div class="filter">
    <button :class="{ active: firstModeActive, 'not-active': !firstModeActive }" class="filter-button left-round" @click="changeMode(true)">
      <div class="filter-button-container">
        <!-- <span class="filter-button-container-left"><BookOutlined /></span> -->
        {{ firstMode }}
      </div>
    </button>
    <button
      :class="{ active: !firstModeActive, 'not-active': firstModeActive }"
      class="filter-button right-round"
      @click="changeMode(false)"
    >
      <div class="filter-button-container">
        <!-- <span class="filter-button-container-left"><FlagOutlined /></span> -->
        {{ secondMode }}
      </div>
    </button>
  </div>
</template>

<script lang="ts">
// import { BookOutlined, FlagOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'ModeButtons',
  // components: { FlagOutlined, BookOutlined },
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
    const firstModeActive = ref(!props.secondModeActive);
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

    return {
      firstModeActive,
      changeMode,
    };
  },
});
</script>

<style scoped lang="scss">
.filter {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  height: 40px;
  width: 100%;

  &-button {
    letter-spacing: 1.2px;
    color: #2754eb;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
    background-color: #ffffff;
    border: 1px solid #2754eb;

    &-container {
      display: flex;
      justify-content: center;

      &-left {
        margin-right: 5px;
      }
    }
  }
}

.not-active:hover {
  cursor: pointer;
  background-color: #31af5e;
  color: #ffffff;
  border-color: #31af5e;
}

.active {
  background-color: #2754eb;
  color: #ffffff;
  cursor: unset;
}

.right-round {
  padding-right: 20px;
  border-radius: 0 20px 20px 0;
}
.left-round {
  padding-left: 20px;
  border-radius: 20px 0 0 20px;
}
</style>
