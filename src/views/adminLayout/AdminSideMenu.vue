<template>
  <div class="admin-side-menu">
    <el-menu
      v-for="(item, i) in menuList"
      :key="item.title"
      default-active="1-1"
      :collapse="isCollapseSideMenu"
      background-color="whitesmoke"
      @select="closeDrawer"
    >
      <el-submenu v-if="item.children" :index="String(i + 1)">
        <template #title>
          <i :class="item.icon"></i>
          <span class="row-menu-title">{{ item.title }}</span>
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
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');

    const menuList = ref([
      // {
      //   title: 'Главная',
      //   to: '/admin/news',
      //   icon: 'el-icon-s-home',
      // },
      {
        title: 'Новости',
        to: '/admin/news',
        icon: 'el-icon-tickets',
        // children: [
        //   {
        //     title: 'Все новости',
        //     to: '/admin/news',
        //   },
        //   {
        //     title: 'Добавить новую',
        //     to: '/admin/news/new',
        //   },
        // {
        //   title: 'Категории',
        // to: '/admin/news/categories',
        // icon: 'las la-folder-open',
        // },
        // ],
      },
      {
        title: 'Образование',
        to: '/',
        icon: 'el-icon-school',
        children: [
          {
            title: 'Сведения об образовательной организации',
            to: '/admin/educational-organization',
          },
          {
            title: 'Ординатура/аспирантура (абитуриенту)',
            to: '/admin/educational-organization',
          },
          {
            title: 'Дополнительное профессиональное образование',
            to: '/admin/educational-organization',
          },
        ],
      },
      {
        title: 'Карусели новостей',
        to: '/admin/carousels',
        icon: 'el-icon-picture-outline',
      },
      // {
      //   title: 'Статические страницы',
      // to: '/admin/pages',
      //   icon: 'el-icon-document',
      // },
      // {
      //   title: 'Галереи',
      // to: '/admin/galleries',
      //   icon: 'el-icon-picture',
      // },
      // {
      //   title: 'Тэги',
      // to: '/admin/tags',
      //   icon: 'el-icon-price-tag',
      // },
      {
        title: 'Справочники',
        to: '/',
        icon: 'el-icon-collection',
        children: [
          {
            title: 'Здания',
            to: '/admin/buildings',
          },
          {
            title: 'Отделения',
            to: '/admin/divisions',
          },
          {
            title: 'Организации здравоохранения',
            to: '/admin/side-organizations',
          },
          {
            title: 'Нормативные документы',
            to: '/admin/normative-documents',
          },
          {
            title: 'Типы нормативных документов',
            to: '/admin/normative-document-types',
          },
          // {
          //   title: 'Анализы',
          // to: '/admin/analyzes',
          //   icon: 'las la-list',
          // },
          // {
          //   title: 'Специальности',
          // to: '#',
          //   icon: 'las la-list',
          // },
          // {
          //   title: 'Сотрудники',
          // to: '#',
          //   icon: 'las la-list',
          // },
        ],
      },
      // {
      //   title: 'Мероприятия',
      //   to: '/',
      //   icon: 'el-icon-date',
      //   children: [
      //     {
      //       title: 'Все мероприятия',
      // to: '/admin/event',
      //   icon: 'las la-list',
      // },
      // {
      //   title: 'Добавить мероприятие',
      // to: '/admin/event/item',
      //       icon: 'las la-plus-square',
      //     },
      //   ],
      // },
      // {
      //   title: 'Школы',
      // to: '/admin/school',
      //   icon: 'el-icon-reading',
      // },
      {
        title: 'Врачи',
        to: '/admin/doctors',
        icon: 'el-icon-first-aid-kit',
      },
      {
        title: 'Структура сайта',
        to: '/',
        icon: 'el-icon-data-board',
        children: [
          {
            title: 'Рекламные баннеры',
            to: '/admin/banners',
          },
        ],
      },
    ]);
    return { menuList, closeDrawer, isCollapseSideMenu };
  },
});
</script>

<style lang="scss" scoped>
$background-color: whitesmoke;

.admin-side-menu {
  min-height: inherit;
  height: inherit;
  float: left;
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
.row-menu-title {
  margin-right: 20px;
}
</style>
