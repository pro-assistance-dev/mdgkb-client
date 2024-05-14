<template>
  <button class="tools-button">
    <svg class="icon-copy" @click="toggleCopyWindow">
      <use xlink:href="#copy"></use>
    </svg>
    <div v-if="isOpenCopy" class="hidden-copy">
      <ClickWindow :width="'120px'">
        <template #title> Копировать: </template>
        <template #info>
          <div class="line">
            <input id="scales" v-model="copyAll" type="checkbox" name="Все" @click="setCopyAll" />
            <label for="scales">Выделить всё</label>
          </div>
          <div v-for="dailyMenu in dailyMenus" :key="dailyMenu" class="line">
            <input id="scales" v-model="dailyMenu.selectedForCopy" type="checkbox" :name="dailyMenu.name"
              @click="setCopy(dailyMenu)" />
            <label for="scales">{{ dailyMenu.name }} </label>
          </div>
          <Button text="Копировать" :margin-top="'5px'" @click="copy" />
        </template>
      </ClickWindow>
    </div>
  </button>
  <Copy />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import Copy from '@/assets/svg/Buffet/Copy.svg';
import DailyMenu from '@/classes/DailyMenu';
import ClickWindow from '@/components/admin/AdminDishes/ClickWindow.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'CopyWindow',
  components: { ClickWindow, Copy },
  emits: ['copy'],
  setup(_, { emit }) {
    const dailyMenus: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const copyAll: Ref<boolean> = ref(true);
    const isOpenCopy: Ref<boolean> = ref(false);
    const copy = () => {
      const copies: DailyMenu[] = [];
      dailyMenus.value.forEach((d: DailyMenu) => {
        if (copyAll.value || d.selectedForCopy) {
          copies.push(d.getCopy());
        }
      });
      Provider.store.commit('dailyMenus/setMenusCopies', copies);
      ElMessage.success('Меню скопированы в буфер');
      isOpenCopy.value = false;
    };

    const setCopyAll = () => {
      dailyMenus.value.forEach((d: DailyMenu) => {
        d.selectedForCopy = !copyAll.value;
      });
    };

    const toggleCopyWindow = () => {
      // isOpenPaste.value = false;
      isOpenCopy.value = !isOpenCopy.value;
    };

    const setCopy = (menu: DailyMenu) => {
      menu.selectedForCopy = !menu.selectedForCopy;
      copyAll.value = dailyMenus.value.every((d: DailyMenu) => d.selectedForCopy);
    };

    return {
      setCopy,
      toggleCopyWindow,
      isOpenCopy,
      setCopyAll,
      copy,
      copyAll,
      dailyMenus,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.tools-button {
  position: relative;
  background: #ffffff;
  border-radius: none;
  border: none;
  height: 24px;
}

.info {
  display: block;
  width: 100%;
  margin-top: 5px;
}

.line {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

p,
label {
  font: 1rem 'Fira Sans', sans-serif;
}

input {
  margin: 0.4rem;
}

.icon-copy {
  width: 24px;
  height: 24px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-copy:hover {
  fill: #379fff;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0;
  height: 30px;
}

.hidden-copy {
  position: absolute;
  top: 0;
  left: -150px;
  z-index: 1;
  display: block;
  background: #ffffff;
  border: $normal-border;
  border-radius: $border-radius;
  box-shadow: $normal-shadow;
}
</style>
