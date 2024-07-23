<template>
  <el-form ref="form" :model="banner" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Наименование" prop="name">
              <el-input v-model="banner.name"></el-input>
            </el-form-item>
            <el-form-item label="Маршрут" prop="link">
              <el-input v-model="banner.link"></el-input>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
        <el-container direction="vertical">
          <UploderImage crop-ratio="1" :file-info="banner.fileInfo" :height="150" />
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import Banner from '@/classes/Banner';
import BannerRules from '@/classes/BannerRules';
import Hooks from '@/services/Hooks/Hooks';

export default defineComponent({
  name: 'AdminBannerPage',

  setup() {
    const form = ref();
    const rules = ref(BannerRules);

    const banner: Banner = BannersStore.Item();

    Hooks.onBeforeMount(async () => await BannersStore.Get(Router.Id()), {
      adminHeader: {
        title: computed(() => (Router.Id() ? banner.name : 'Добавить баннер')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave();

    return {
      rules,
      banner,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

.el-form-item {
  margin-bottom: 10px;
}
:deep(.el-form-item__label) {
  padding: 0;
}

:deep(.el-upload--picture-card) {
  width: 150px;
  font-size: 50px;
  margin: 10px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 54px;
}
</style>
