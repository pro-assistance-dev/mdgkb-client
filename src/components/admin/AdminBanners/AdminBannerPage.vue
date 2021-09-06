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
          <AdminBannerImage v-if="mounted" />
        </el-container>
      </el-col>
    </el-row>
  </el-form>

  <ImageCropper />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import BannerRules from '@/classes/banners/BannerRules';
import Division from '@/classes/buildings/Division';
import AdminBannerImage from '@/components/admin/AdminBanners/AdminBannerImage.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminBannerPage',
  components: { ImageCropper, AdminBannerImage },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const rules = ref(BannerRules);
    const mounted = ref(false);

    const divisionOptions = ref([new Division()]);
    const banner = computed(() => store.getters['banners/banner']);

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!banner.value.fileInfo.fileSystemPath) {
        ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('banners/update', banner.value);
        } else {
          await store.dispatch('banners/create', banner.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/banners');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
      await loadBanner();
    });

    const loadBanner = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('banners/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: banner.value.name, saveButton: true });
      } else {
        store.commit('banners/resetState');
        store.commit('admin/setPageTitle', { title: 'Добавить баннер', saveButton: true });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(banner, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      rules,
      submit,
      banner,
      divisionOptions,
      form,
      mounted,
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
</style>
