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
          <PButton skin="profile" type="primary" text="Вставить" margin="5px 0 0 0" width="80px" @click="paste(false)" />
          <PButton
            v-if="sameNamesExists"
            skin="profile"
            type="success"
            text="Заменить"
            margin="5px 0 0 0"
            width="80px"
            @click="paste(true)"
          />
          <PButton skin="profile" color="neutral" text="Отмена" margin="5px 0 0 0" :width="'80px'" @click="togglePasteWindow" />
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
export default defineComponent({
  name: 'PasteWindow',
  components: { ClickWindow, Paste },
  emits: ['onClick'],
  setup() {
    const menusCopies: DailyMenu[] = DailyMenusStore.MenusCopies();
    const dailyMenus: DailyMenu[] = DailyMenusStore.Items();
    const sameNamesExists: ComputedRef<boolean> = computed(() =>
      dailyMenus.some((d: DailyMenu) => menusCopies.some((c: DailyMenu) => c.name === d.name))
    );
    const isOpenPaste: Ref<boolean> = ref(false);

    const paste = async (replace: boolean) => {
      menusCopies.forEach((m: DailyMenu) => {
        m.initGroups();
        const findedSameNameIndex = dailyMenus.findIndex((d: DailyMenu) => m.name === d.name);
        if (findedSameNameIndex > -1) {
          if (replace) {
            dailyMenus[findedSameNameIndex] = m;
          } else {
            m.name += '-копия';
            dailyMenus.push(m);
          }
        } else {
          dailyMenus.push(m);
        }
      });
      for (const menu of menusCopies) {
        await DailyMenusStore.Create(menu);
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
