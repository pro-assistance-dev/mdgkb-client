<template>
  <el-container direction="vertical" align="center">
    <h3>Сведения об организациях в сфере охраны здоровья</h3>
    <el-collapse v-model="activeName" accordion>
      <template v-for="organization in sideOrganizations" :key="organization.id">
        <el-collapse-item :title="organization.name">
          <div>Телефоны:</div>
          <div v-for="phone in organization?.contactInfo?.telephoneNumbers" :key="phone">
            {{ phone.number }}
          </div>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeMount, watch, computed } from 'vue';
import { useStore } from 'vuex';
// import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'SideOrganizationsPage',
  components: {
    // yandexMap,
    // ymapMarker,
  },
  setup() {
    const store = useStore();
    const sideOrganizations = computed(() => store.getters['sideOrganizations/sideOrganizations']);
    const activeName = ref(1);

    // const allowMap = ref(false);

    // const openedOrganization = () => {
    //   allowMap.value = false;
    //   setTimeout(function () {
    //     allowMap.value = true;
    //   }, 500);
    // };

    // watch(sideOrganizations, openedOrganization);

    onBeforeMount(async () => {
      await store.dispatch('sideOrganizations/getAll');
    });

    return {
      sideOrganizations,
      // allowMap,
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
// $table-border: #f1f1f1;

// .info-container {
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
// }

// .organization-title {
//   text-transform: uppercase;
// }

// .table-shadow {
//   box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%); /* Параметры тени */
//   border: 1px solid $table-border;
//   border-radius: 5px;
// }

// h3 {
//   font-size: 16px;
// }

// h3,
// h4 {
//   margin: 0;
//   text-align: start;
// }

// .el-collapse {
//   width: 100%;
//   border: none;
// }
// .el-collapse-item {
//   background-color: white;
//   margin-bottom: 20px;
//   padding: 10px 20px;
//   border-radius: 10px;
//   width: 100%;
//   box-sizing: border-box;
// }
// :deep(.el-collapse-item__header),
// :deep(.el-collapse-item__wrap) {
//   border: none;
// }
</style>
