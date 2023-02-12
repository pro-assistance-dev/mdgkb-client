<template>
  <div v-if="mounted && educationalOrganisationAcademics.length" class="flex">
    <div v-for="item in educationalOrganisationAcademics" :key="item.id" class="doctors-wrapper">
      <AcademicCard :doctor="item.doctor" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import SortModel from '@/classes/filters/SortModel';
import AcademicCard from '@/components/Educational/AcademicCard.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import ISchema from '@/interfaces/schema/ISchema';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'PostgraduateAcademics',
  components: { AcademicCard },
  setup() {
    const mounted = ref(false);
    const schema: Ref<ISchema> = computed(() => Provider.store.getters['meta/schema']);
    const educationalOrganisationAcademics: Ref<IEducationalOrganizationAcademic[]> = computed(
      () => Provider.store.getters['educationalOrganizationAcademics/items']
    );

    onBeforeMount(async () => {
      Provider.store.commit(`filter/resetQueryFilter`);
      await Provider.getAll('educationalOrganizationAcademics');
      Provider.store.commit('pagination/setCurPage', 1);
      mounted.value = true;
    });

    return {
      mounted,
      educationalOrganisationAcademics,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  margin-top: 20px;
}

:deep(.card-content) {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;

  .card-header {
    text-align: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }
  h2 {
    margin: 0;
  }

  .article-body {
    text-align: justify;
  }
}

.doctors-wrapper {
  margin: 10px;
}

.el-descriptions__label {
  font-size: 15px;
}
.flex-row {
  display: flex;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
}

@media screen and (max-width: 687px) {
  .flex {
    justify-content: center;
  }
}
</style>
