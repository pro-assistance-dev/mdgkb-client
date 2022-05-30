<template>
  <el-tooltip class="box-item" effect="dark" :content="title" placement="top-start">
    <button type="button" class="menu-item" :class="{ 'is-active': isActive ? isActive() : null }" @click="action">
      <component :is="require(`vue-remix-icons/icons/ri-${icon}.js`).default" v-if="icon" />
    </button>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const req = () => {
      const comp = `ri-${props.icon}.js`;
      return () => require(`vue-remix-icons/icons/${comp}`);
    };

    return { req };
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: #fff;
    background-color: #0d0d0d;
  }
}
</style>
