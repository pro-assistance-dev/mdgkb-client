<template>
  <el-tooltip class="box-item" effect="dark" :content="title" placement="top-start">
    <button type="button" class="menu-item" :class="{ 'is-active': isActive ? isActive() : null }" @click="() => action()">
      <!-- <el-popover v-if="type === 'emoji'" :visible="visible" placement="bottom" width="auto" trigger="click"> -->
      <!--   <template #reference> -->
      <!--     <component :is="req()" @click="emojiesToggleHandler" /> -->
      <!--   </template> -->
      <!--   <EmojiPicker :native="true" @select="emojiSelectHandler" /> -->
      <!-- </el-popover> -->
      <!-- {{ req() }} -->
      <component :is="comp" />
    </button>
  </el-tooltip>
</template>

<script lang="ts" type="module">
// import 'vue3-emoji-picker/dist/style.css';

import { defineAsyncComponent, defineComponent, ref } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';

export default defineComponent({
  name: 'MenuItem',
  components: {
    EmojiPicker,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: '',
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
    const visible = ref(false);
    const modules = import.meta.glob('@/assets/vue-remix-icons/icons/*.vue');
    // const getImage = () => {
    //   return new URL(`vue-remix-icons/icons/ri-${props.icon}.js`);
    // };
    const c = `ri-${props.icon}.vue`;
    const path = '/src/assets/vue-remix-icons/icons/' + c;
    const comp = defineAsyncComponent(() => (modules[path] ? modules[path]() : undefined));
    interface Emoji {
      i: string;
    }

    const emojiSelectHandler = (emoji: Emoji) => {
      props.action(emoji.i);
      // visible.value = false;
    };

    const emojiesToggleHandler = () => {
      visible.value = !visible.value;
    };

    return { comp, emojiSelectHandler, visible, emojiesToggleHandler };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
