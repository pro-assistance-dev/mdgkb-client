<template>
  <el-form v-if="mounted" ref="form" :model="educationalOrganisation" label-position="top" :rules="rules">
    <el-row :gutter="40" style="margin-bottom: 10px">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <div class="flex-row-between">
                <div>
                  <span> Основная информация </span>
                </div>
                <div>
                  <el-button s size="small" type="success" icon="el-icon-plus" @click="addProperty">Добавить</el-button>
                </div>
              </div>
            </template>
            <el-row :gutter="40" style="margin-bottom: 10px">
              <el-col :xl="7" :lg="7">Имя</el-col>
              <el-col :xl="7" :lg="7">Значение</el-col>
            </el-row>
            <el-row v-for="prop in educationalOrganisation.educationalOrganizationProperties" :key="prop.id" :gutter="40">
              <el-col :xl="7" :lg="7">
                <el-form-item>
                  <el-input v-model="prop.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="15" :lg="15">
                <el-form-item>
                  <el-input v-model="prop.value"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="1" :lg="1">
                <el-form-item>
                  <el-button icon="el-icon-delete" type="danger" @click="removeProperty(prop.id)"></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <AdminEducationalOrganizationManagers />
      </el-col>
    </el-row>

    <el-row :gutter="40" style="margin-bottom: 10px">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <AdminEducationalOrganizationTeachers />
      </el-col>
    </el-row>

    <div></div>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';
import { useStore } from 'vuex';

import AdminEducationalOrganizationManagers from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationManagers.vue';
import AdminEducationalOrganizationTeachers from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationTeachers.vue';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminEducationalOrganizationPage',
  components: {
    AdminEducationalOrganizationManagers,
    AdminEducationalOrganizationTeachers,
  },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();

    // const rules = ref(SideOrganizationRules);
    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/setSubmit', submit);
      await store.dispatch('doctors/getAll');
      await store.dispatch('educationalOrganization/get');
      store.commit('admin/setPageTitle', { title: 'Образовательная организация', saveButton: true });
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(educationalOrganisation, formUpdated, { deep: true });
      mounted.value = true;
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async () => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await store.dispatch('educationalOrganization/update', educationalOrganisation.value);
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const addProperty = (): void => {
      store.commit('educationalOrganization/addProperty');
    };

    const removeProperty = (id: string): void => {
      store.commit('educationalOrganization/removeProperty', id);
    };

    return {
      filteredDoctors,
      removeProperty,
      addProperty,
      mounted,
      form,
      // rules,
      educationalOrganisation,
      submit,
    };
  },
});
</script>
<style>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
