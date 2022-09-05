<template>
  <div v-if="mounted" class="wrapper menus-flex">
    <draggable class="groups" :list="menus" item-key="id" handle=".handle" @end="sort(menus)">
      <template #item="{ element, index }">
        <div>
          <div v-if="element.editMode" class="menu-card">
            <el-icon class="handle"><Grid /></el-icon>
            <el-input v-model="element.name"></el-input>
            <el-button type="danger" size="medium" icon="el-icon-delete" @click="removeMenu(index)" />
            <el-button type="success" size="medium" icon="el-icon-edit" @click="element.editMode = false" />
          </div>
          <div v-else class="menu-show" :class="{ 'menu-selected': element.selected }" @click="selectMenu(index)">
            <el-icon class="handle"><Grid /></el-icon>
            <div class="menu-show-body">{{ element.name }}</div>
            <div class="menu-show-footer">
              <el-button type="danger" size="medium" icon="el-icon-delete" @click.stop="removeMenu(index)" />
              <el-button type="info" size="medium" icon="el-icon-edit" @click="element.editMode = true" />
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>

  <div>
    <el-button @click="addMenu">Добавить меню</el-button>
  </div>
  <template v-if="selectedMenu">
    <hr />

    <draggable class="groups" :list="selectedMenu.subMenus" item-key="id" handle=".handle" @end="sort(selectedMenu.subMenus)">
      <template #item="{ element, index }">
        <div>
          <div v-if="element.editMode" class="menu-card">
            <el-icon class="handle"><Grid /></el-icon>
            <el-input v-model="element.name"></el-input>
            <UploaderSingleScan :file-info="element.icon" :crop-ratio="false" />
            <el-button type="danger" size="medium" icon="el-icon-delete" @click="removeMenu(index)" />
            <el-button type="success" size="medium" icon="el-icon-edit" @click="element.editMode = false" />
          </div>
          <div v-else class="menu-show" :class="{ 'menu-selected': element.selected }">
            <el-icon class="handle"><Grid /></el-icon>
            <div class="menu-show-body">{{ element.name }}</div>
            <div class="menu-show-footer">
              <el-button type="danger" size="medium" icon="el-icon-delete" @click.stop="selectedMenu.removeSubMenu(index)" />
              <el-button type="info" size="medium" icon="el-icon-edit" @click="element.editMode = true" />
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <div class="menu-card">
      <el-button @click="selectedMenu.addSubMenu()">Добавить подменю</el-button>
    </div>
  </template>
</template>

<script lang="ts">
import { Grid } from '@element-plus/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import Menu from '@/classes/Menu';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IMenu from '@/interfaces/IMenu';
import sort from '@/services/sort';
export default defineComponent({
  name: 'AdminMenus',
  components: { draggable, Grid, UploaderSingleScan },
  setup() {
    const store = useStore();
    const menus: ComputedRef<IMenu[]> = computed(() => store.getters['menus/items']);
    const mounted: Ref<boolean> = ref(false);
    const selectedMenu: Ref<IMenu | undefined> = ref(undefined);

    const save = async () => {
      await store.dispatch('menus/updateMany');
    };
    const remove = (id: string) => {
      store.dispatch('menus/remove', id);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('menus/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Меню',
        buttons: [{ text: 'Сохранить', type: 'primary', action: save }],
      });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    const addMenu = () => {
      menus.value.push(new Menu());
    };

    const removeMenu = (i: number) => {
      const idForDelete = menus.value[i].id;
      if (idForDelete) {
        store.commit('menus/addToDeleting', idForDelete);
      }
      menus.value.splice(i, 1);
      if (selectedMenu.value && selectedMenu.value.id === idForDelete) {
        selectedMenu.value = undefined;
      }
    };

    const selectMenu = (i: number) => {
      const prevSelected = menus.value.find((menu: IMenu) => menu.selected);
      if (prevSelected) {
        prevSelected.selected = false;
      }
      menus.value[i].selected = true;
      selectedMenu.value = menus.value[i];
    };

    return {
      sort,
      selectedMenu,
      selectMenu,
      removeMenu,
      addMenu,
      mounted,
      menus,
      remove,
    };
  },
});
</script>

<style lang="scss" scoped>
.groups {
  display: flex;
  flex-wrap: wrap;
}

.menu-show {
  height: 150px;
  width: 120px;
}
.menus-flex {
  display: flex;
  flex-wrap: wrap;
}
.menu-card {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;
}
.menu-show {
  border: black 1px solid;
  margin: 10px;
  padding: 10px;

  &-body {
    height: 80%;
  }

  &-footer {
    display: flex;
    height: 20%;
    margin-bottom: 0;
  }

  &:hover {
    border: 2px;
    cursor: pointer;
    background: #7a7a7a;
  }
}

.menu-selected {
  background: #0075b2;
}
</style>
