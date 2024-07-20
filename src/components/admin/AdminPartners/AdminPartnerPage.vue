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
          <UploaderImage :file-info="partner.image" :crop-ratio="false" @ratio="(e) => (element.ratio = e)" />
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
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPartnerPage',
  setup() {
    const router = useRouter();
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const partner: Partner[] = PartnersStore.Item();
    const partnerTypes: PartnerType[] = PartnersTypesStore.Items();

    const imageRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (partner.partnerType && partner.partnerType.showImage) {
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
        if (Router.Id()) {
          await PartnersStore.Update();
        } else {
          await PartnersStore.Create();
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/partners');
    };

    onBeforeMount(async () => {
      await PartnersStore.ResetItem();
      await PartnersStore.GetAll();
      if (Router.Id()) {
        await PartnersStore.Get(Router.Id());
        PHelp.AdminUI.Head.Set('Обновить партнера', [Button.Success('Сохранить', submit)]);
      } else {
        PHelp.AdminUI.Head.Set('Добавить партнера', [Button.Success('Сохранить', submit)]);
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(partner, formUpdated, { deep: true });
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
