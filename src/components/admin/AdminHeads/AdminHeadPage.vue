<template>
  <el-form v-if="mounted" ref="form" :model="head" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <CardHeader :label="'Личная информация'" :add-button="false" />
            </template>
            <HumanForm :store-module="'heads'" />
          </el-card>
          <TimetableConstructorV2 :store-module="'heads'" />
          <AdminContactInfo store-module="heads" />
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-container direction="vertical">
          <el-card>
            <template #header>Загрузить фото</template>
            <UploaderSingleScan v-if="mounted" :file-info="head.photo" :height="300" :width="300" />
          </el-card>
          <el-card>
            <template #header>
              <CardHeader :label="'Регалии, звания'" :add-button="false" />
            </template>
            <el-form-item label="Является главным врачом" prop="isMain">
              <el-checkbox v-model="head.isMain"></el-checkbox>
            </el-form-item>
            <el-form-item label="Должность" prop="position">
              <el-input v-model="head.position"></el-input>
            </el-form-item>
            <el-form-item label="Учёная степень">
              <el-input v-model="head.academicDegree" />
            </el-form-item>
            <el-form-item label="Звание">
              <el-input v-model="head.academicRank" />
            </el-form-item>
            <el-form-item label="Регалии">
              <el-button @click="addRegalia"> Добавить регалию</el-button>
              <div v-for="(regalia, i) in head.regalias" :key="i">
                <el-input v-model="regalia.name" />
                <el-button @click="removeRegalia(i)">Удалить регалию</el-button>
              </div>
            </el-form-item>

            <el-form-item label="Отделы в подчинении">
              <el-button @click="addDepartment"> Добавить отдел</el-button>
              <div v-for="(department, i) in head.departments" :key="i">
                <el-input v-model="department.name" />
                <el-button @click="removeDepartment(i)">Удалить отдел</el-button>
              </div>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>

  <ImageCropper />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Division from '@/classes/Division';
import AdminContactInfo from '@/components/admin/AdminContactInfo.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import TimetableConstructorV2 from '@/components/admin/TimetableConstructorV2.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IHead from '@/interfaces/IHead';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminHeadPage',
  components: { AdminContactInfo, UploaderSingleScan, TimetableConstructorV2, HumanForm, ImageCropper, CardHeader },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted = ref(false);

    const divisionOptions = ref([new Division()]);
    const head: Ref<IHead> = computed(() => store.getters['heads/item']);

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('heads/update', head.value);
        } else {
          await store.dispatch('heads/create', head.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/heads');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await load();
      store.commit('admin/closeLoading');
    });

    const load = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('heads/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: head.value.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('heads/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить руководителя', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(head, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const addRegalia = () => head.value.addRegalia();
    const removeRegalia = (i: number) => head.value.removeRegalia(i);
    const addDepartment = () => head.value.addDepartment();
    const removeDepartment = (i: number) => head.value.removeDepartment(i);

    return {
      removeDepartment,
      addDepartment,
      removeRegalia,
      addRegalia,
      submit,
      head,
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
</style>
