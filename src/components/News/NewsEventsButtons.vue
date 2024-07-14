<template>
  <div class="filter">
    <button :class="{ active: !eventModeActive }" class="filter-button left-round" @click="changeNewsEvents(false)">
      <div class="filter-button-container">
        <span class="filter-button-container-left"><BookOutlined /></span>
        <span class="filter-button-container-right">Новости</span>
      </div>
    </button>
    <button :class="{ active: eventModeActive }" class="filter-button right-round" @click="changeNewsEvents(true)">
      <div class="filter-button-container">
        <span class="filter-button-container-left"><FlagOutlined /></span>
        <span class="filter-button-container-right">Мероприятия</span>
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { BookOutlined, FlagOutlined } from '@ant-design/icons-vue';
const emit = defineEmits(['load']);
const eventModeActive = ref(false);

const changeNewsEvents = async (eventMode: boolean) => {
  if (eventModeActive.value === eventMode) {
    return;
  }
  eventModeActive.value = eventMode;
  // await NewsStore.SetEventMode(eventModeActive.value);
  emit('load');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
    background-color: #1b4bea;
    border-color: #b5b5b5;
  }
}

.right-round {
  border-radius: 0 100em 100em 0;
}
.left-round {
  border-radius: 100em 0 0 100em;
}
</style>
