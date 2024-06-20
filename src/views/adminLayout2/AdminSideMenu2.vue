<template>
  <div class="menu-icon" @click="openMenuBar()">
    <IconMenuLines hover-color="#343D5C" size="32px" margin="0 0 0 15px" />
  </div>
  <div v-if="mounted" class="admin-side-menu" :style="{
    marginLeft: showMenuBar ? '0px' : '-250px',
    boxShadow: shadow ? '0 0 6px rgba(0, 0, 0, 0.3)' : 'none',
    borderRight: border ? '1px solid #c4c4c4' : 'none',
  }">
    <div class="menu-header">
      <StringItem string="Логотип" padding="33px 0 0 0" color="#6B7CC6" /> <!--Logo-->
    </div>
    <div class="menu-tools" @click="showMenuBar = false">
      <IconPfArrowLeft size="20px" />
      <StringItem string="Скрыть меню" width="auto" margin="0 0 0 10px" padding="3px 0 0 0" />
    </div>
    <div class="menu-body">
      <div>         
        <DropListItem name="Администрирование" >
          <StringItem string="Список анкет" width="auto" justify-content="left" padding="6px 0" />
          <StringItem string="Список анкет" width="auto" justify-content="left" padding="6px 0" />
          <StringItem string="Список анкет" width="auto" justify-content="left" padding="6px 0" />
          <!-- <template v-for="item in menus" :key="item.name">
            <div v-if="item.link !== '/'"
              :class="{ 'selected-menu-item': item.link === activePath, 'menu-item': item.to !== activePath }"
              :index="item.link" @click="Router.To(item.link)">
              {{ item.name }}
            </div>
          </template> -->
        </DropListItem>
      </div>
    </div>
    <div class="exit-button-container">
      <!-- <PButton skin="royal" type="blue" text="Выйти"  height="30px" margin="0 10px" /> -->
    </div>
  </div>


  <!-- <div v-if="mounted" class="admin-side-menu">
    <el-menu :default-active="activePath" :collapse="isCollapseSideMenu" background-color="whitesmoke" unique-opened
      @select="closeDrawer">
      <template v-for="item in menus" :key="item.title">
        <el-sub-menu v-if="item?.children?.length" :index="item.title">
          <template #title>
            <div class="sub-menu-container">
              <el-badge v-if="item.children.some((i) => i.count && i.count > 0)" is-dot type="danger"> </el-badge>
              <i :class="item.icon"></i>
              <span class="row-menu-title">{{ item.title }}</span>
            </div>
          </template>

          <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to"
            @click="$router.push(children.to)">
            <div class="menu-item-container">
              {{ children.title }}
              <el-badge v-if="children.count && children.count > 0" :value="children.count" type="danger"></el-badge>
            </div>
          </el-menu-item>
        </el-sub-menu>
        <div v-else>
          <el-menu-item v-if="item.to !== '/'" :index="item.to" @click="$router.push(item.to)">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
  </div> -->
</template>

<script lang="ts" setup>

// import IAdminMenu from '@/interfaces/IAdminMenu';
// import IApplicationsCount from '@/interfaces/IApplicationsCount';
// import IPathPermission from '@/interfaces/IPathPermission';

const props = defineProps({
  shadow: { type: Boolean as PropType<Boolean>, default: true },
  border: { type: Boolean as PropType<Boolean>, default: true },
});
  // const store = useStore();
  // const route = useRoute();
  // const activePath: Ref<string> = ref('');
  // const applicationsCounts: Ref<IApplicationsCount[]> = computed(() => store.getters['admin/applicationsCounts']);
  // const mounted = ref(false);
  // const userPermissions: ComputedRef<IPathPermission[]> = computed(() => store.getters['auth/userPathPermissions']);
  // const menus: ComputedRef<IAdminMenu[]> = computed<IAdminMenu[]>(() => store.getters['admin/menus']);
  const showMenuBar: Ref<boolean> = ref(true);
  // watch(
  //   () => route.path,
  //   () => {
  //     activePath.value = route.path;
  //   }
  // );

  const openMenuBar = async () => {
    showMenuBar.value = true;
  };

  // onBeforeMount(async () => {
  //   await store.dispatch('admin/updateApplicationsCounts');
  //   activePath.value = route.path;
  //   mounted.value = true;
  // });

  // onBeforeUnmount(async () => {
  // });
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$background-color: whitesmoke;

::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(245, 245, 245, 0.47);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 5px 0;
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(85, 85, 85, 0.25);
}

.admin-side-menu {
  min-height: inherit;
  height: inherit;
  float: left;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;
  overflow-y: scroll;
  overflow-x: hidden;

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

.sub-menu-container {
  position: relative;

  .el-badge {
    position: absolute;
    top: -10px;
    left: -10px;
  }
}

.menu-item-container {
  display: flex;
  align-items: center;

  .el-badge {
    margin-left: 5px;
  }
}
</style>
