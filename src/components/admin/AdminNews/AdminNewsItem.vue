<template>
  <el-form>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-container direction="vertical">
          <el-card>
            <template #header>Заголовок</template>
            <el-form-item>
              <el-input placeholder="Заголовок"></el-input>
            </el-form-item>
          </el-card>
          <el-card>
            <template #header>Контент</template>
            <el-form-item>
              <el-input placeholder="Контент" type="textarea" :autosize="{ minRows: 5, maxRows: 8 }"></el-input>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="4">
        <el-container direction="vertical">
          <el-button type="success" style="margin-bottom: 20px">Сохранить</el-button>
          <el-card>
            <template #header>Статус</template>
            <el-space direction="vertical" alignment="start" :size="10">
              <el-form-item>
                <el-select v-model="select" placeholder="Статус">
                  <el-option label="Черновик" value="Черновик"></el-option>
                  <el-option label="Опубликована" value="Опубликована"></el-option>
                  <el-option label="Запланировать дату" value="Запланировать дату"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker type="datetime" placeholder="Дата публикации" v-if="select !== 'Черновик'" />
              </el-form-item>
            </el-space>
          </el-card>
          <el-card>
            <template #header>Тэги</template>
            <el-form-item>
              <el-checkbox-group size="small" wrap style="width: 100%">
                <div class="vertical-wrap">
                  <el-checkbox label="Option1" border></el-checkbox>
                  <el-checkbox label="Option2" border></el-checkbox>
                  <el-checkbox label="Option3" border></el-checkbox>
                  <el-checkbox label="Option4" border></el-checkbox>
                </div>
              </el-checkbox-group>
            </el-form-item>
          </el-card>
          <el-card>
            <template #header>Картинка</template>
            <el-form-item>
              <el-button type="success" style="margin-bottom: 20px">Загрузить</el-button>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'AdminNewsItem',

  setup() {
    const store = useStore();
    // TODO confitional 'Создать' или 'Редактировать' или 'Название новости'
    store.commit('admin/setPageTitle', 'Создать новость');
    // Временная переменная
    const select = ref();

    return { select };
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
</style>
