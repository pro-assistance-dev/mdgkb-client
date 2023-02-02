<template>
  <div class="side-container">
    <div class="side-item">
      <div class="card-item">
        <h4>{{ page.title }}</h4>
        <el-divider />
        <el-table :data="page.pageSideMenus" cell-class-name="cell-row" :show-header="false">
          <el-table-column>
            <template #default="scope" @click="changeMenu(scope.row.id)">
              <div class="menu-item" :class="isActive(scope.row.id)" @click="changeMenu(scope.row.id)">
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType } from 'vue';

import Page from '@/classes/page/Page';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'PageSideMenu',
  props: {
    page: {
      type: Object as PropType<Page>,
      required: true,
    },
  },
  setup(props) {
    const setMenuFromRoute = () => {
      let menu = Provider.route().query.menu as string;
      changeMenu(menu);
    };

    const isActive = (id: string): string => {
      return id === props.page.getSelectedSideMenu().id ? 'is-active' : '';
    };

    const changeMenu = (id: string) => {
      props.page.selectSideMenu(id);
      Provider.router.replace({ query: { menu: props.page.getSelectedSideMenu().id as string } });
      console.log(props.page.getSelectedSideMenu());
    };

    onBeforeMount(() => {
      setMenuFromRoute();
    });

    return {
      isActive,
      changeMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
$side-cotainer-max-width: 300px;
$card-margin-size: 30px;

.menu-item {
  padding: 10px 0;
}

h4 {
  margin: 0;
}
.el-divider {
  margin: 10px 0 0;
}
:deep(.cell) {
  padding: 0 !important;
}
:deep(.cell-row) {
  padding: 0 !important;
  cursor: pointer;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.is-active {
  color: #42a4f5;
}
</style>
