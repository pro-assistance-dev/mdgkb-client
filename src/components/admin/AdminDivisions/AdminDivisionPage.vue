<template>
  <el-form :model="division" label-position="top" :key="division">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Наименование отделения">
              <el-input v-model="division.name" placeholder="Наименование отделения"></el-input>
            </el-form-item>
            <el-form-item label="Общая информация">
              <QuillEditor style="height: 350px" v-model:content="division.info" contentType="html" theme="snow"></QuillEditor>
            </el-form-item>
            <el-form-item label="Адрес">
              <el-input v-model="division.address" placeholder="Адрес" disabled></el-input>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="4">
        <el-container direction="vertical">
          <el-button @click="submit" type="success" style="margin-bottom: 20px">Сохранить</el-button>
          <el-card>
            <el-form-item label="Телефон">
              <el-input v-model="division.phone" placeholder="Телефон"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="division.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="Здание">
              <el-select v-model="buildingOptionId" placeholder="Выберите здание" @change="changeBuildingHandler">
                <el-option v-for="item in buildingOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Этаж">
              <el-select
                v-model="division.floorId"
                placeholder="Выберите этаж"
                @change="changeFloorHandler"
                :disabled="buildingOptionId ? false : true"
              >
                <template v-if="buildingOptionId">
                  <el-option v-for="item in floorOptions.floors" :key="item.id" :label="item.number" :value="item.id" />
                </template>
              </el-select>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useStore } from 'vuex';
import Division from '@/classes/buildings/Division';
import Building from '@/classes/buildings/Building';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import IFloor from '@/interfaces/buildings/IFloor';

export default defineComponent({
  name: 'AdminDivisionPage',
  components: { QuillEditor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const division = computed(() => store.getters['divisions/division']);
    const buildingOptionId = ref();
    const floorOptions = ref();
    const buildingOptions = ref([new Building()]);
    const loadB1uildingOptions = async (): Promise<void> => {
      await store.dispatch('buildings/getAll');
      buildingOptions.value = store.getters['buildings/buildings'];
    };
    const loadDivision = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('divisions/get', route.params['id']);
        if (division.value.floorId) {
          await store.dispatch('buildings/getByFloorId', division.value.floorId);
          buildingOptionId.value = store.getters['buildings/building'].id;
          floorOptions.value = buildingOptions.value.find((item) => item.id == buildingOptionId.value);
        }
        store.commit('admin/setPageTitle', division.value.name);
      } else {
        store.commit('admin/setPageTitle', 'Создать отделение');
        store.commit('divisions/set', new Division());
      }
    };

    const load = async (): Promise<void> => {
      await loadB1uildingOptions();
      await loadDivision();
    };

    onMounted(load);

    const submit = () => {
      try {
        if (route.params['id']) {
          store.dispatch('divisions/update', division.value);
        } else {
          store.dispatch('divisions/create', division.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      router.push('/admin/divisions');
    };

    const changeBuildingHandler = () => {
      floorOptions.value = buildingOptions.value.find((item) => item.id == buildingOptionId.value);
      division.value.floorId = '';
    };

    const changeFloorHandler = () => {
      const building = buildingOptions.value.find((item) => item.id == buildingOptionId.value);
      const floor = floorOptions.value.floors.find((item: IFloor) => item.id == division.value.floorId);
      if (building) division.value.address = `${building.address}, ${floor.number} этаж`;
    };

    return {
      division,
      buildingOptionId,
      buildingOptions,
      changeBuildingHandler,
      changeFloorHandler,
      floorOptions,
      submit,
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

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-checkbox {
    margin: 5px !important;
  }
}

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.content-card {
  height: 450px;
}
</style>
