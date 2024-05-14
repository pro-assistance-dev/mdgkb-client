<template>
  <div v-if="mounted" class="partner-page-container">
    <el-form ref="form" :rules="rules" :model="partner" label-position="top">
      <el-card>
        <el-form-item label="Наименование" prop="name">
          <el-input v-model="partner.name" placeholder="Наименование"></el-input>
        </el-form-item>
        <el-form-item label="Тип партнера" prop="partnerType">
          <el-select v-model="partner.partnerType" value-key="id" placeholder="Выберите тип партнера">
            <el-option v-for="item in partnerTypes" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
      </el-card>
      <el-card>
        <el-form-item label="Лого" prop="image.fileSystemPath" :rules="rules.image">
          <UploaderSingleScan :file-info="partner.image" :crop-ratio="false" @ratio="(e) => (element.ratio = e)" />
        </el-form-item>
        <el-form-item label="Ссылка" prop="link">
          <el-input v-model="partner.link" placeholder="Ссылка"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Partner from '@/classes/Partner';
import PartnerType from '@/classes/PartnerType';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPartnerPage',
  components: { UploaderSingleScan },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const partner: ComputedRef<Partner> = computed(() => store.getters['partners/item']);
    const partnerTypes: ComputedRef<PartnerType[]> = computed(() => store.getters['partnerTypes/items']);

    const imageRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (partner.value.partnerType && partner.value.partnerType.showImage) {
        if (!value) {
          callback(new Error('Необходимо приложить лого'));
        }
      }
      callback();
      return;
    };
    const rules = {
      name: [{ required: true, message: 'Необходимо указать наименование', trigger: 'blur' }],
      partnerType: [{ required: true, message: 'Необходимо указать наименование', trigger: 'change' }],
      image: [{ validator: imageRule, trigger: 'change' }],
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('partners/update', partner.value);
        } else {
          await store.dispatch('partners/create', partner.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/partners');
    };

    onBeforeMount(async () => {
      store.commit('partners/resetItem');
      store.commit('admin/showLoading');
      await store.dispatch('partnerTypes/getAll');
      if (route.params['id']) {
        await store.dispatch('partners/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить партнера', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить партнера', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(partner, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      form,
      rules,
      mounted,
      partner,
      partnerTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.partner-page-container {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
:deep(.avatar-uploader-cover) {
  text-align: start;
}
</style>
