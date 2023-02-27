<template>
  <el-dialog v-if="mounted" v-model="isSideMenuDialogActive" fullscreen destroy-on-close :before-close="handleClose">
    <el-input v-model="pageSideMenu.name" placeholder="Название меню" />
    <WysiwygEditor :key="pageSideMenu.name" v-model="pageSideMenu.description" />
    <el-button @click="() => openDrawer()"> Добавить раздел </el-button>
    <el-checkbox v-model="pageSideMenu.showContent" class="line"> Показывать содержание </el-checkbox>
    <draggable
      v-if="pageSideMenu.pageSections.length"
      class="groups"
      :list="pageSideMenu.pageSections"
      item-key="id"
      handle=".el-icon-s-grid"
      @end="sort(pageSideMenu.pageSections)"
    >
      <template #item="{ element, index }">
        <div class="side-menu-row">
          <i style="margin-right: 5px; cursor: pointer" class="el-icon-s-grid drug-icon" />
          <div style="width: 100%">
            <a @click="openDrawer(index)"> {{ element.name }} </a>
          </div>
          <TableButtonGroup
            :show-remove-button="true"
            :show-edit-button="true"
            @remove="$classHelper.RemoveFromClassByIndex(index, pageSideMenu.pageSections, pageSideMenu.pageSectionsForDelete)"
            @edit="openDrawer(index)"
          />
        </div>
      </template>
    </draggable>
  </el-dialog>
  <AdminPageSectionDialog />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import PageSideMenu from '@/classes/PageSideMenu';
import AdminPageSectionDialog from '@/components/admin/AdminPages/AdminPageSectionDialog.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';

export default defineComponent({
  name: 'AdminPageSideMenuDialog',
  components: { WysiwygEditor, draggable, TableButtonGroup, AdminPageSectionDialog },

  setup() {
    const form = ref();
    const isSideMenuDialogActive: ComputedRef<boolean> = computed(() => Provider.store.getters['pages/isSideMenuDialogActive']);
    const pageSideMenu: ComputedRef<PageSideMenu> = computed(() => Provider.store.getters['pages/sideMenu']);
    const mounted: Ref<boolean> = ref(false);
    const rules = {
      name: [{ required: true, message: 'Необходимо указать наименование страницы', trigger: 'blur' }],
    };

    const handleClose = () => {
      Provider.store.commit('pages/setSideMenuDialogActive', false);
    };

    onMounted(() => {
      mounted.value = true;
    });

    const openDrawer = async (index?: number) => {
      if (index !== undefined) {
        Provider.store.commit('pages/setPageSectionIndex', index);
      } else {
        await pageSideMenu.value.addPageSection();
        Provider.store.commit('pages/setPageSectionIndex', pageSideMenu.value.pageSections.length - 1);
      }
      Provider.store.commit('pages/setPageSectionDialogActive', true);
    };

    return {
      isSideMenuDialogActive,
      handleClose,
      pageSideMenu,
      mounted,
      sort,
      openDrawer,
      form,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
.side-menu-row {
  padding: 5px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: lightblue;
  }
}

:deep(.el-dialog) {
  margin-bottom: 0 !important;
}

.line {
  margin-left: 20px;
}
</style>
