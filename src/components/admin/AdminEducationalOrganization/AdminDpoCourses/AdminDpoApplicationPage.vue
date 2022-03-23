<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="dpoApplication" :model="dpoApplication" label-position="top">
      <el-container direction="vertical">
        <el-card>
          <template #header>
            <span>Информация о заявителе</span>
          </template>
          <el-descriptions :column="1">
            <!-- <el-descriptions-item label="ФИО">{{ dpoApplication.user.human.getFullName() }}</el-descriptions-item> -->
            <el-descriptions-item label="Email">{{ dpoApplication.user.email }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card>
          <template #header>
            <div class="flex-between">
              <span>Документы</span>
              <div class="flex">
                <span style="margin-right: 5px">Статус:</span>
                <el-tag v-if="dpoApplication.isFieldValuesModChecked()" size="small" type="success">Данные проверены</el-tag>
                <el-tag v-else size="small" type="error">Данные не проверены</el-tag>
                <el-button
                  :disabled="dpoApplication.isFieldValuesModChecked()"
                  :type="dpoApplication.isFieldValuesModChecked() ? 'success' : 'primary'"
                  size="small"
                  style="margin-left: 5px"
                  @click="dpoApplication.changeFieldValuesModChecked(true)"
                >
                  Пометить все
                </el-button>
              </div>
            </div>
          </template>
          <el-table :data="dpoApplication.fieldValues">
            <el-table-column label="Название документа" sortable>
              <template #default="scope">
                {{ scope.row.field.name }}
              </template>
            </el-table-column>
            <el-table-column label="Документ" sortable>
              <template #default="scope">
                <a v-if="scope.row.file.fileSystemPath" :href="scope.row.file.getFileUrl()" target="_blank">
                  {{ scope.row.file.originalName }}
                </a>
                <span v-else>Нет файла</span>
              </template>
            </el-table-column>
            <el-table-column label="Проверено" width="100px" align="center">
              <template #default="scope">
                <el-checkbox v-model="scope.row.modChecked"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IDpoApplication from '@/interfaces/IDpoApplication';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminDpoApplicationPage',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();

    const dpoApplication: Ref<IDpoApplication> = computed<IDpoApplication>(() => store.getters['dpoApplications/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('teachers/getAll');
      await store.dispatch('specializations/getAll');
      await store.dispatch('search/searchGroups');
      await loadItem();
      await updateNew();
      store.commit('admin/closeLoading');
    });

    const updateNew = async () => {
      if (!dpoApplication.value.isNew) {
        return;
      }
      dpoApplication.value.isNew = false;
      await store.dispatch('dpoApplications/update', dpoApplication.value);
    };

    const loadItem = async () => {
      await store.dispatch('dpoApplications/get', route.params['id']);
      store.commit('admin/setHeaderParams', {
        title: `Заявка от ${dpoApplication.value.user.email}`,
        showBackButton: true,
        buttons: [{ action: submit }],
      });
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(dpoApplication, formUpdated, { deep: true });
    };

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      await store.dispatch('dpoApplications/update', dpoApplication.value);
      const typeCourse = dpoApplication.value.dpoCourse.isNmo ? 'nmo' : 'dpo';
      next ? next() : await router.push(`/admin/${typeCourse}/applications`);
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      form,
      dpoApplication,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}
table {
  height: 100%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dcdfe6;
  padding: 5px 7px 5px 7px;
}

th {
  text-align: left;
  padding: 5px;
  border-right: 1px solid #f2f2f2;
}

th:last-child {
  border-right: 1px solid #dcdfe6;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
