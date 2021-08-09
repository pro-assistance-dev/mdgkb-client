<template>
  <el-container direction="vertical">
    <div class="header-center">
      <h3>Сведения об организациях в сфере охраны здоровья</h3>
    </div>
    <el-input prefix-icon="el-icon-search" v-model="filter" placeholder="Найти организацию" class="filter" size="large" />
    <el-collapse v-model="activeName" accordion>
      <template v-for="organization in list" :key="organization.id">
        <el-collapse-item>
          <template #title>
            <h4 class="collapseHeader">{{ organization.name }}</h4>
          </template>
          <el-row class="collapse-content-container">
            <el-col>
              <h4 v-if="organization?.contactInfo?.telephoneNumbers">Телефоны:</h4>
              <div v-for="phone in organization?.contactInfo?.telephoneNumbers" :key="phone.id">
                <span v-if="phone.description">{{ phone.description }}: </span>
                <span>{{ phone.number }}</span>
              </div>

              <h4 v-if="organization?.contactInfo?.postAddresses">Адреса:</h4>
              <div v-for="address in organization?.contactInfo?.postAddresses" :key="address.id">
                <span v-if="address.description">
                  <b>{{ address.description }}: </b>
                </span>
                <span>{{ address.address }}</span>
              </div>

              <h4 v-if="organization?.contactInfo?.emails">Адреса электронной почты:</h4>
              <div v-for="email in organization?.contactInfo?.emails" :key="email.id">
                <span v-if="email.description">
                  <b>{{ email.description }}: </b>
                </span>
                <span>{{ email.address }}</span>
              </div>

              <h4 v-if="organization?.contactInfo?.websites">Сайты:</h4>
              <div v-for="site in organization?.contactInfo?.websites" :key="site.id">
                <span v-if="site.description">
                  <b>{{ site.description }}: </b>
                </span>
                <span>{{ site.address }}</span>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeMount, watch, computed } from 'vue';
import { useStore } from 'vuex';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
// import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'SideOrganizationsPage',
  components: {
    // yandexMap,
    // ymapMarker,
  },
  setup() {
    const store = useStore();
    const filter = ref('');
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

    const list = computed((): ISideOrganization[] => {
      if (filter.value) {
        return sideOrganizations.value.filter((o: ISideOrganization) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return sideOrganizations.value;
      }
    });

    return {
      filter,
      list,
      sideOrganizations,
      // allowMap,
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-center {
  text-align: center;
}
.filter {
  border-radius: 20px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.collapseHeader {
  padding-left: 10px;
  line-height: 15px;
}

.el-collapse-item {
  background-color: white;
  margin-bottom: 20px;
  padding: 4px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
:deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

:deep(.el-collapse-item__header) {
  height: 32px;
}
:deep(.el-collapse-item__header, .el-collapse-item__wrap) {
  border: none;
}

.collapse-content-container {
  margin-left: 10px;
}
</style>
