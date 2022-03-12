<template>
  <div class="flex-column">
    <el-card>
      <el-table :data="applicationsCars">
        <el-table-column label="Номер Авто" sortable> 
          <template #default="scope">
            {{ scope.row.carNumber }}
          </template>         
        </el-table-column>
        <el-table-column label="ФИО" sortable> 
          <template #default="scope">
            {{ scope.row.user.human.getFullName() }}
          </template>          
        </el-table-column>
        <el-table-column  label="Дата заявки" sortable> 
          <template #default="scope">
            {{ $dateFormatRu(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column prop="movedIn" label="Въехал" sortable>
          <template #default="scope">
            {{ scope.row.movedIn ? 'Да' : 'Нет' }}
          </template>
        </el-table-column>
        <el-table-column prop="movedOut" label="Выехал" sortable>
          <template #default="scope">
            {{ scope.row.movedOut ? 'Да' : 'Нет' }}
          </template>
        </el-table-column>                
        <!-- <el-table-column prop="date" label="Дата заявки" sortable> </el-table-column> -->
        <!-- <el-table-column prop="applicationsCar.user.human.getFullName()" label="ФИО" sortable> </el-table-column> -->
        <!-- <el-table-column prop="email" label="Email" sortable> </el-table-column> -->
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.show" @change="update(scope.row)" />
          </template>
        </el-table-column>
        <!-- <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IApplicationCar from '@/interfaces/IApplicationCar';

export default defineComponent({
  name: 'AdminApplicationForEntryList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const applicationsCars = computed(() => store.getters['applicationsCars/items']);

    onBeforeMount(async () => {
      store.commit('applicationsCars/setOnlyShowed', false);
      store.commit('admin/showLoading');
      await loadApplicationsCar();
      store.commit('admin/closeLoading');
    });

    const loadApplicationsCar = async (): Promise<void> => {
      await store.dispatch('applicationsCars/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Заявки на въезд',
        buttons: [{ text: 'Добавить заявку', type: 'primary', action: create }],
      });
    };

    const update = async (gate: IApplicationCar) => await store.dispatch('applicationsCar/update', gate);

    const create = () => router.push(`/admin/applicationsCar/new`);
    const edit = (id: string) => router.push(`/admin/applicationsCar/${id}`);
    const remove = async (id: string) => await store.dispatch('applicationsCar/remove', id);

    return { applicationsCars, remove, edit, create, update };
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
</style>