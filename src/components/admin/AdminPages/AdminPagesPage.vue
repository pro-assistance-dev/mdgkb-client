<template>
  <MenuContainer min-menu-item-width="160px" background="#DFF2F8">
    <template #menu>
      <div v-for="menu in customSections" :key="menu.id">
        <div>
          {{ menu.name }}
        </div>
      </div>
    </template>
    <template #body>
      <!-- <component v-bind="menusProperties" :is="activeMenu.component" :key="componentKey" /> -->
    </template>
  </MenuContainer>
</template>

<script lang="ts" setup>
import CustomSection from '@/services/classes/page/CustomSection';

const customSections = [new CustomSection(), new CustomSection(), new CustomSection()];
customSections[0].name = '1';
customSections[1].name = '2';
customSections[2].name = '3';
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.field {
  width: 100%;
  height: 100%;
  background: red;
  padding: 10px;
}

.tab {
  font-size: 12px;
  text-transform: uppercase;
  color: #b0a4c0;
  border: 1px solid #999999;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;

  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */

  background: #f5f5f5;
  margin: -0.5px;
}

.selected-tab {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: $site_dark_gray;
  position: relative;
  border: 1px solid #343d5c;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */

  margin: -0.5px;
  z-index: 1;
}
</style>
