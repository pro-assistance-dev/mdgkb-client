<template>
  <el-form v-if="mounted" ref="form" :model="banner" label-position="top" :rules="rules">
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
          <UploaderSingleScan crop-ratio="1" :file-info="banner.fileInfo" :height="150" @ratio="(e) => (element.ratio = e)" />
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';

import Banner from '@/classes/Banner';
import BannerRules from '@/classes/BannerRules';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminBannerPage',
  components: { UploaderSingleScan },

  setup() {
    const form = ref();
    Provider.form = form;
    const rules = ref(BannerRules);

    const banner: ComputedRef<Banner> = computed<Banner>(() => Provider.store.getters['banners/item']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    Hooks.onBeforeMount(Provider.loadItem, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? banner.value.name : 'Добавить баннер')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave();

    return {
      rules,
      banner,
      form,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
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
