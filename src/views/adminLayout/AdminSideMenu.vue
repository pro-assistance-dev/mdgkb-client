<template>
  <div class="admin-side-menu">
    <el-menu
      v-for="item in menuList"
      :key="item.title"
      :default-active="activePath"
      :collapse="isCollapseSideMenu"
      background-color="whitesmoke"
      @select="closeDrawer"
    >
      <el-sub-menu v-if="item.children" :index="item.title">
        <template #title>
          <i :class="item.icon"></i>
          <span class="row-menu-title">{{ item.title }}</span>
        </template>
        <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to" @click="$router.push(children.to)">
          {{ children.title }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="item.to" @click="$router.push(item.to)">
        <i :class="item.icon"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const route = useRoute();
    const activePath: Ref<string> = ref('');
    onBeforeMount(() => {
      activePath.value = route.path;
    });
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    const menuList = ref([
      {
        title: 'Новости',
        to: '/admin/news',
        icon: 'el-icon-tickets',
      },
      {
        title: 'Вакансии',
        to: '/admin/vacancies',
        icon: 'el-icon-tickets',
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
        title: 'Слайдер новостей',
        to: '/admin/news-slides',
        icon: 'el-icon-picture-outline',
      },
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
            to: '/admin/normative-document-types',
          },
          {
            title: 'Типы нормативных документов',
            to: '/admin/normative-document-types',
          },
          {
            title: 'Документы',
            to: '/admin/documents-types',
          },
        ],
      },
      {
        title: 'Врачи',
        to: '/admin/doctors',
        icon: 'el-icon-first-aid-kit',
      },
      {
        title: 'Комментарии',
        to: '',
        icon: 'el-icon-s-comment',
        children: [
          {
            title: 'Все',
            to: '/admin/comments/all',
          },
          {
            title: 'Отмодерированные',
            to: '/admin/comments/mod-checked',
          },
          {
            title: 'Неотмодерированные',
            to: '/admin/comments/not-mod-checked',
          },
        ],
      },
      {
        title: 'Структура сайта',
        to: '/',
        icon: 'el-icon-data-board',
        children: [
          {
            title: 'Меню',
            to: '/admin/menus',
          },
          {
            title: 'Рекламные баннеры',
            to: '/admin/banners',
          },
          {
            title: 'Страницы',
            to: '/admin/pages',
          },
        ],
      },
    ]);
    return { menuList, closeDrawer, isCollapseSideMenu, activePath };
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

  :deep(.el-sub-menu__icon-arrow) {
    margin-left: 10px;
  }

  :deep(i) {
    font-size: 24px;
  }

  :deep(.el-sub-menu__icon-arrow) {
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
