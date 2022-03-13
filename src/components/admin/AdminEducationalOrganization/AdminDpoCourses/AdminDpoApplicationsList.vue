<template>
  <el-table v-if="mounted" :data="dpoApplications">
    <el-table-column label="Email заявителя" sortable>
      <template #default="scope">
        {{ scope.row.user.email }}
      </template>
    </el-table-column>
    <el-table-column label="Наименование курса" sortable>
      <template #default="scope">
        {{ scope.row.dpoCourse.name }}
      </template>
    </el-table-column>
    <el-table-column label="Заявление на обучение от СЛУШАТЕЛЯ" sortable>
      <template #default="scope">
        <a v-if="scope.row.application.fileSystemPath" :href="scope.row.application.getFileUrl()" target="_blank">
          {{ scope.row.application.originalName }}
        </a>
        <span v-else>Нет файла</span>
      </template>
    </el-table-column>
    <el-table-column label="Заявка от ОРГАНИЗАЦИИ на зачисление" sortable>
      <template #default="scope">
        <a v-if="scope.row.organizationApplication.fileSystemPath" :href="scope.row.organizationApplication.getFileUrl()" target="_blank">
          {{ scope.row.organizationApplication.originalName }}
        </a>
        <span v-else>Нет файла</span>
      </template>
    </el-table-column>

    <!-- <el-table-column label="Преподаватель" sortable>
      <template #default="scope">
        <div v-if="scope.row.getMainTeacher()">
          {{ scope.row.getMainTeacher().doctor.human.getFullName() }}
        </div>
        <div v-else>Руководителя нет</div>
      </template>
    </el-table-column> -->
    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDpoApplication from '@/interfaces/IDpoApplication';

export default defineComponent({
  name: 'AdminDpoApplicationsList',
  components: { TableButtonGroup },

  setup() {
    const mounted: Ref<boolean> = ref(false);
    const store = useStore();
    const router = useRouter();

    const dpoApplications: ComputedRef<IDpoApplication[]> = computed(() => store.getters['dpoApplications/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('dpoApplications/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Заявки ДПО',
        // buttons: [{ text: 'Добавить программу', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
      console.log(dpoApplications.value);
    });

    // const create = () => router.push(`/admin/educational-organization/dpo/courses/new`);
    // const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => router.push(`/admin/educational-organization/dpo/applications/${id}`);

    return {
      mounted,
      dpoApplications,
      edit,
    };
  },
});
</script>
