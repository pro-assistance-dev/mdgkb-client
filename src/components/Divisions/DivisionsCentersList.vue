<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="filters">
        <ModeButtons
          :second-mode-active="divisionsMode"
          :store-mode="false"
          first-mode="Отделения"
          second-mode="Центры"
          @changeMode="changeMode"
        />
        <DivisionsListFilters v-if="divisionsMode" />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <DivisionsList v-if="divisionsMode" />
        <CentersList v-else />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CentersList from '@/components/Divisions/CentersList.vue';
import DivisionsList from '@/components/Divisions/DivisionsList.vue';
import DivisionsListFilters from '@/components/Divisions/DivisionsListFilters.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DivisionsCentersList',
  components: {
    CentersList,
    DivisionsList,
    ModeButtons,
    DivisionsListFilters,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const mount = ref(false);
    const divisionsMode: Ref<boolean> = ref(route.path === '/divisions');

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      mount.value = true;
    });

    const changeMode = async (divisionsModeActive: boolean) => {
      divisionsMode.value = divisionsModeActive;
      if (divisionsModeActive) {
        await router.replace('/divisions');
      } else {
        await router.replace('/centers');
      }
    };

    return {
      divisionsMode,
      changeMode,
      TokenService,
      Operators,
      DataTypes,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  .right-side {
    // max-width: $right-side-max-width;
  }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
.filters {
  position: sticky;
  top: 79px;
  height: 100%;
}
</style>
