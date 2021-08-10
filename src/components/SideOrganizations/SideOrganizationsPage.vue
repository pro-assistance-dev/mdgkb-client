<template>
  <el-container direction="vertical">
    <div class="header-center">
      <h2>Сведения об организациях в сфере охраны здоровья</h2>
    </div>
    <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти организацию" class="filter" size="large" />
    <el-collapse v-model="activeName" accordion>
      <template v-for="(organization, item) in list" :key="organization.id">
        <el-collapse-item :name="item + 1">
          <template #title>
            <h3 class="collapseHeader">{{ organization.name }}</h3>
          </template>
          <el-row class="collapse-content-container">
            <el-col>
              <div v-if="organization.description">{{ organization.description }}</div>
              <h4 v-if="organization?.contactInfo?.telephoneNumbers.length > 0">Телефоны:</h4>
              <div v-for="phone in organization?.contactInfo?.telephoneNumbers" :key="phone.id">
                <span>
                  <a :href="`tel:${phone.number}`">{{ phone.number }}</a>
                </span>
                <span v-if="phone.description"> - {{ phone.description }}</span>
              </div>

              <h4 v-if="organization?.contactInfo?.postAddresses.length > 0">Адреса:</h4>
              <div v-for="address in organization?.contactInfo?.postAddresses" :key="address.id">
                <span>{{ address.address }}</span>
                <span v-if="address.description"> - {{ address.description }}</span>
              </div>

              <h4 v-if="organization?.contactInfo?.emails.length > 0">Адреса электронной почты:</h4>
              <div v-for="email in organization?.contactInfo?.emails" :key="email.id">
                <span>
                  <a :href="`mailto:${email.address}`">{{ email.address }}</a>
                </span>
                <span v-if="email.description"> - {{ email.description }}</span>
              </div>

              <h4 v-if="organization?.contactInfo?.websites.length > 0">Сайты:</h4>
              <div v-for="site in organization?.contactInfo?.websites" :key="site.id">
                <span>
                  <a :href="`http://${site.address}`">{{ site.address }}</a>
                </span>
                <span v-if="site.description"> - {{ site.description }}</span>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
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
@import '@/assets/styles/elements/collapse.scss';
</style>
