<template>
  <el-form :model="sideOrganization" label-position="top" :rules="rules" ref="form">
    <el-card>
      <el-form-item label="Наименование" prop="name">
        <el-input v-model="sideOrganization.name" placeholder="Наименование"></el-input>
      </el-form-item>
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="sideOrganization.address" placeholder="Адрес"></el-input>
      </el-form-item>
      <el-form-item label="Веб-сайт" prop="site">
        <el-input v-model="sideOrganization.site" placeholder="Веб-сайт"></el-input>
      </el-form-item>
      <el-form-item label="Телефон" prop="phone">
        <el-input v-model="sideOrganization.phone" placeholder="Телефон"></el-input>
      </el-form-item>
      <el-button @click="submit" type="success" style="margin-bottom: 20px">Сохранить</el-button>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import SideOrganizationRules from '@/classes/sideOrganization/SideOrganizationRules';
import SideOrganization from '@/classes/sideOrganization/SideOrganization';

export default defineComponent({
  name: 'AdminSideOrganizationPage',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const sideOrganization = computed(() => store.getters['sideOrganizations/sideOrganization']);
    const rules = ref(SideOrganizationRules);
    store.commit('sideOrganizations/set', new SideOrganization());

    const loadSideOrganization = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('sideOrganizations/get', route.params['id']);
        store.commit('admin/setPageTitle', sideOrganization.value.name);
      } else {
        store.commit('admin/setPageTitle', 'Создать организацию');
      }
    };
    onMounted(loadSideOrganization);

    const submit = async () => {
      let validationResult;
      form.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
      });
      if (!validationResult) return;
      try {
        if (route.params['id']) {
          store.dispatch('sideOrganizations/update', sideOrganization.value);
        } else {
          store.dispatch('sideOrganizations/create', sideOrganization.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      router.push('/admin/side-organizations');
    };

    return { submit, rules, form, sideOrganization };
  },
});
</script>
