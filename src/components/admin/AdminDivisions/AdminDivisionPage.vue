<template>
  <el-form ref="form" :model="division" label-position="top" :rules="rules" :key="division">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Наименование отделения" prop="name">
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
            <el-form-item label="Email" prop="email">
              <el-input v-model="division.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="Здание" prop="buildingId">
              <el-select v-model="division.buildingId" placeholder="Выберите здание" @change="changeBuildingHandler">
                <el-option v-for="item in buildingOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Этаж" prop="floorId">
              <el-select
                v-model="division.floorId"
                placeholder="Выберите этаж"
                @change="changeFloorHandler"
                :disabled="division.buildingId ? false : true"
              >
                <template v-if="division.buildingId">
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
import { defineComponent, ref, onMounted, computed, watch, onBeforeMount } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Division from '@/classes/buildings/Division';
import Building from '@/classes/buildings/Building';
import IFloor from '@/interfaces/buildings/IFloor';
import DivisioinRules from '@/classes/buildings/DivisioinRules';

export default defineComponent({
  name: 'AdminDivisionPage',
  components: { QuillEditor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const rules = ref(DivisioinRules);

    const division = computed(() => store.getters['divisions/division']);
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
          division.value.buildingId = store.getters['buildings/building'].id;
          floorOptions.value = buildingOptions.value.find((item) => item.id == division.value.buildingId);
        }
        store.commit('admin/setPageTitle', division.value.name);
      } else {
        store.commit('divisions/set', new Division());
        store.commit('admin/setPageTitle', 'Создать отделение');
      }
    };

    const load = async (): Promise<void> => {
      await loadB1uildingOptions();
      await loadDivision();
    };

    onBeforeMount(load);

    const submit = () => {
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
      floorOptions.value = buildingOptions.value.find((item) => item.id == division.value.buildingId);
      division.value.floorId = '';
    };

    const changeFloorHandler = () => {
      const building = buildingOptions.value.find((item) => item.id == division.value.buildingId);
      const floor = floorOptions.value.floors.find((item: IFloor) => item.id == division.value.floorId);
      if (building) division.value.address = `${building.address}, ${floor.number} этаж`;
    };

    return {
      division,
      buildingOptions,
      changeBuildingHandler,
      changeFloorHandler,
      floorOptions,
      submit,
      form,
      rules,
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
