<template>
  <!-- TODO: Fix validation -->
  <el-form ref="form" :model="sideOrganization" label-position="top" :rules="rules">
    <el-card style="margin-bottom: 20px;">
      <el-form-item label="Наименование" prop="name">
        <el-input v-model="sideOrganization.name" placeholder="Наименование" />
      </el-form-item>

      <el-form-item label="Описание / доп. информация" prop="description">
        <el-input v-model="sideOrganization.description" placeholder="Описание" />
      </el-form-item>
    </el-card>
    <AdminContactAttribute
      attribute-label="Телефоны"
      column-value-label="Телефон"
      list-name="telephoneNumbers"
      property-value-name="number"
    />
    <AdminContactAttribute
      attribute-label="Почтовые адреса"
      column-value-label="Адрес"
      list-name="postAddresses"
      property-value-name="address"
    />
    <AdminContactAttribute
      attribute-label="Адреса электронной почты"
      column-value-label="Email"
      list-name="emails"
      property-value-name="address"
    />
    <AdminContactAttribute
      attribute-label="Сайты в сети интернет"
      column-value-label="URL-адрес сайта"
      list-name="websites"
      property-value-name="address"
    />

    <!-- <el-button type="success" style="margin-bottom: 20px;" @click.prevent="submit">Сохранить</el-button> -->
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, ref, WritableComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SideOrganization from '@/classes/sideOrganization/SideOrganization';
import SideOrganizationRules from '@/classes/sideOrganization/SideOrganizationRules';
import AdminContactAttribute from '@/components/admin/Contacts/AdminContactAttribute.vue';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import validate from '@/mixinsAsModules/validate';

export default defineComponent({
  name: 'AdminSideOrganizationPage',
  components: { AdminContactAttribute },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isEdit = ref(false);
    const form = ref();
    const rules = ref(SideOrganizationRules);
    const sideOrganization: WritableComputedRef<ISideOrganization> = computed({
      get(): ISideOrganization {
        return store.getters['sideOrganizations/sideOrganization'];
      },
      set(organization: ISideOrganization): void {
        store.commit('sideOrganizations/set', organization);
      },
    });

    onBeforeMount(() => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
    });

    const loadSideOrganization = async (): Promise<void> => {
      if (!isEdit.value) {
        store.commit('sideOrganizations/set', new SideOrganization());
        store.commit('admin/setPageTitle', { title: 'Создать организацию', saveButton: true });
      } else {
        await store.dispatch('sideOrganizations/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: sideOrganization.value.name, saveButton: true });
      }
    };

    const submit = async () => {
      if (!validate(form)) return;
      try {
        if (!isEdit.value) {
          store.dispatch('sideOrganizations/create', sideOrganization.value);
        } else {
          store.dispatch('sideOrganizations/update', sideOrganization.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }

      router.push('/admin/side-organizations');
    };

    onBeforeMount(() => {
      isEdit.value = route.params['id'] ? true : false;
      loadSideOrganization();
    });

    return {
      form,
      isEdit,
      rules,
      sideOrganization,
      submit,
    };
  },
});
</script>
