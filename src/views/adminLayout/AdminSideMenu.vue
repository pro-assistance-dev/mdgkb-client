<template>
  <div class="admin-side-menu">
    <el-menu
      default-active="1-1"
      :collapse="isCollapseSideMenu"
      background-color="whitesmoke"
      @select="closeDrawer"
      v-for="(item, i) in menuList"
      :key="item.title"
    >
      <el-submenu v-if="item.children">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(children, j) in item.children"
          :key="children.title"
          :index="`${String(i + 1)}-${String(j + 1)}`"
          @click="$router.push(children.to)"
        >
          {{ children.title }}
        </el-menu-item>
      </el-submenu>

      <el-menu-item v-else :index="String(i + 1)" @click="$router.push(item.to)">
        <i :class="item.icon"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');

    const menuList = ref([
      {
        title: 'Главная',
        to: '/admin/news',
        icon: 'el-icon-s-home',
      },
      {
        title: 'Новости',
        to: '/',
        icon: 'el-icon-news',
        children: [
          {
            title: 'Все новости',
            to: '/admin/news',
            icon: 'las la-list',
          },
          {
            title: 'Добавить новую',
            to: '/admin/news/item',
            icon: 'las la-plus-square',
          },
          {
            title: 'Категории',
            // to: '/admin/news/categories',
            icon: 'las la-folder-open',
          },
        ],
      },
      {
        title: 'Статические страницы',
        // to: '/admin/pages',
        icon: 'el-icon-document',
      },
      {
        title: 'Галереи',
        // to: '/admin/galleries',
        icon: 'el-icon-picture',
      },
      {
        title: 'Тэги',
        // to: '/admin/tags',
        icon: 'el-icon-price-tag',
      },
      {
        title: 'Справочники',
        to: '/',
        icon: 'el-icon-notebook-1',
        children: [
          {
            title: 'Нормативные документы',
            // to: '/admin/dictionary/normative_documents',
            icon: 'las la-list',
          },
          {
            title: 'Здания',
            // to: '/admin/dictionary/buildings',
            icon: 'las la-list',
          },
          {
            title: 'Отделения',
            // to: '/admin/dictionary/divisions',
            icon: 'las la-list',
          },
          {
            title: 'Организации здравоохранения',
            // to: '/admin/dictionary/side_organizations',
            icon: 'las la-list',
          },
          {
            title: 'Анализы',
            // to: '/admin/dictionary/analyzes',
            icon: 'las la-list',
          },
          {
            title: 'Специальности',
            // to: '#',
            icon: 'las la-list',
          },
          {
            title: 'Сотрудники',
            // to: '#',
            icon: 'las la-list',
          },
        ],
      },
      {
        title: 'Мероприятия',
        to: '/',
        icon: 'el-icon-date',
        children: [
          {
            title: 'Все мероприятия',
            // to: '/admin/event',
            icon: 'las la-list',
          },
          {
            title: 'Добавить мероприятие',
            // to: '/admin/event/item',
            icon: 'las la-plus-square',
          },
        ],
      },
      {
        title: 'Школы',
        // to: '/admin/school',
        icon: 'el-icon-reading',
      },
      {
        title: 'Карусели',
        to: '/admin/carousels',
        icon: 'el-icon-copy-document',
      },
    ]);
    return { menuList, closeDrawer, isCollapseSideMenu };
  },
});
</script>

<style lang="scss" scoped>
$background-color: whitesmoke;

.admin-side-menu {
  height: inherit;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;

  :deep(.el-submenu__icon-arrow) {
    margin-left: 10px;
  }

  :deep(i) {
    font-size: 24px;
  }

  :deep(.el-submenu__icon-arrow) {
    font-size: unset;
  }
}
.el-menu,
.el-menu-item {
  border: none;
}
</style>
