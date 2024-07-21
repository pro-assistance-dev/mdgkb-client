<!-- <template>
  <PageWrapper v-if="mounted" title="Сведения об организациях в сфере охраны здоровья">
    <template #filters>
      <FiltersWrapper>
        <template #header-left-top>
          <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти организацию" />
        </template>
      </FiltersWrapper>
    </template>
    <el-container direction="vertical">
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
  </PageWrapper>
</template> -->
<template>
  <PageWrapper v-if="mounted" title="Сведения об организациях в сфере охраны здоровья">
    <template #filters>
      <FiltersWrapper>
        <template #header-left-top>
          <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти организацию" />
        </template>
      </FiltersWrapper>
    </template>
    <div class="organizations-container">
      <template v-for="(organization, item) in list" :key="organization.id">
        <div :name="item + 1" style="margin-bottom: 30px">
          <div class="organization-container">
            <div v-if="organization.name" style="font-weight: 600">{{ organization.name }}</div>
            <hr class="hr-line" />
            <div v-if="organization.description" class="font-style">{{ organization.description }}</div>
            <h4
              v-if="organization?.contactInfo?.telephoneNumbers && checkArrayLength(organization?.contactInfo?.telephoneNumbers)"
              class="margin"
            >
              Телефоны:
            </h4>
            <div v-for="phone in organization?.contactInfo?.telephoneNumbers" :key="phone.id" class="block-container">
              <li>
                <span class="margin-left">
                  <a :href="`tel:${phone.number}`">{{ phone.number }}</a>
                </span>
                <span v-if="phone.description"> - {{ phone.description }}</span>
              </li>
            </div>

            <h4
              v-if="organization?.contactInfo?.postAddresses && checkArrayLength(organization?.contactInfo?.postAddresses)"
              class="margin"
            >
              Адреса:
            </h4>
            <div v-for="address in organization?.contactInfo?.postAddresses" :key="address.id" class="block-container">
              <span>{{ address.address }}</span>
              <span v-if="address.description"> - {{ address.description }}</span>
            </div>

            <h4 v-if="organization?.contactInfo?.emails && checkArrayLength(organization?.contactInfo?.emails)" class="margin">
              Адреса электронной почты:
            </h4>
            <div v-for="email in organization?.contactInfo?.emails" :key="email.id" class="block-container">
              <span>
                <a :href="`mailto:${email.address}`">{{ email.address }}</a>
              </span>
              <span v-if="email.description"> - {{ email.description }}</span>
            </div>

            <h4 v-if="organization?.contactInfo?.websites && checkArrayLength(organization?.contactInfo?.websites)" class="margin">
              Сайты:
            </h4>
            <div v-for="site in organization?.contactInfo?.websites" :key="site.id" class="block-container">
              <span>
                <a :href="`http://${site.address}`">{{ site.address }}</a>
              </span>
              <span v-if="site.description"> - {{ site.description }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import SideOrganization from '@/classes/SideOrganization';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Email from '@/services/classes/Email';
import Phone from '@/services/classes/Phone';
import PostAddress from '@/services/classes/PostAddress';

export default defineComponent({
  name: 'SideOrganizationsPage',
  components: {
    PageWrapper,
    FiltersWrapper,
    // yandexMap,
    // ymapMarker,
  },
  setup() {
    const filter = ref('');
    const sideOrganizations = SideOrganizationsStore.Items();
    const activeName = ref(1);
    const mounted: Ref<boolean> = ref(false);

    // const allowMap = ref(false);

    // const openedOrganization = () => {
    //   allowMap.value = false;
    //   setTimeout(function () {
    //     allowMap.value = true;
    //   }, 500);
    // };

    // watch(sideOrganizations, openedOrganization);

    onBeforeMount(async () => {
      await SideOrganizationsStore.GetAll();
      mounted.value = true;
    });

    const list = computed((): SideOrganization[] => {
      if (filter.value) {
        return sideOrganizations.filter((o: SideOrganization) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return sideOrganizations;
      }
    });

    return {
      filter,
      list,
      sideOrganizations,
      // allowMap,
      activeName,
      mounted,
    };
  },
  methods: {
    checkArrayLength(arr: Phone[] | PostAddress[] | Email[]) {
      const arrIds = arr.map((item) => item.id);
      return typeof arrIds[0] === 'string';
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
// @import '@/assets/styles/elements/collapse.scss';
.organizations-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}
.organization-container {
  background: white;
  height: 100%;
  width: 300px;
  padding: 10px 20px 0;
}

.margin {
  margin: 10px 0;
}

.font-style {
  font-style: italic;
}

li::marker {
  color: #31af5e;
  font-size: 1.5em;
}

.margin-left {
  margin-left: -15px;
}

.block-container {
  line-height: 25px;
}
</style>
