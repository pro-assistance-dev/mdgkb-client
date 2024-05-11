<template>
  <button v-if="menusCopies.length" class="tools-button">
    <svg class="icon-paste" @click="togglePasteWindow">
      <use xlink:href="#paste" />
    </svg>
    <div v-if="isOpenPaste" class="hidden-paste">
      <ClickWindow :width="'120px'">
        <template #title> Вставить: </template>
        <template #info>
          <div v-if="sameNamesExists" class="attention">Вкладки с такими названиями уже есть в меню!</div>
          <Button :text="'Вставить'" :color="'#1979CF'" :margin-top="'5px'" :width="'80px'" @click="paste(false)" />
          <Button v-if="sameNamesExists" :text="'Заменить'" :margin-top="'5px'" :width="'80px'" @click="paste(true)" />
          <Button :text="'Отмена'" :color="'#838385'" :margin-top="'5px'" :width="'80px'" @click="togglePasteWindow" />
        </template>
      </ClickWindow>
    </div>
  </button>
  <Paste />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Paste from '@/assets/svg/Buffet/Paste.svg';
import DailyMenu from '@/classes/DailyMenu';
import ClickWindow from '@/components/admin/AdminDishes/ClickWindow.vue';
import Button from '@/components/Base/Button.vue';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'PasteWindow',
  components: { Button, ClickWindow, Paste },
  emits: ['onClick'],
  setup(_, { emit }) {
    const menusCopies: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/menusCopies']);
    const dailyMenus: Ref<DailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const sameNamesExists: ComputedRef<boolean> = computed(() =>
      dailyMenus.value.some((d: DailyMenu) => menusCopies.value.some((c: DailyMenu) => c.name === d.name))
    );
    const isOpenPaste: Ref<boolean> = ref(false);

    const paste = async (replace: boolean) => {
      menusCopies.value.forEach((m: DailyMenu) => {
        m.initGroups();
        const findedSameNameIndex = dailyMenus.value.findIndex((d: DailyMenu) => m.name === d.name);
        if (findedSameNameIndex > -1) {
          if (replace) {
            dailyMenus.value[findedSameNameIndex] = m;
          } else {
            m.name += '-копия';
            dailyMenus.value.push(m);
          }
        } else {
          dailyMenus.value.push(m);
        }
      });
      for (const menu of menusCopies.value) {
        await Provider.store.dispatch('dailyMenus/create', menu);
      }
      togglePasteWindow();
    };

    const togglePasteWindow = () => {
      isOpenPaste.value = !isOpenPaste.value;
    };

    return {
      paste,
      sameNamesExists,
      menusCopies,
      isOpenPaste,
      togglePasteWindow,
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

.attention {
  font-size: 10px;
  color: #f3911c;
  width: 100%;
}

.hidden-paste {
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

.icon-paste {
  width: 24px;
  height: 24px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-paste:hover {
  fill: #379fff;
}
</style>
