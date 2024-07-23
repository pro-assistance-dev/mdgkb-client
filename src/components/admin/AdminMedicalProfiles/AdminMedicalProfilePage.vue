<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="medicalProfile" :model="medicalProfile">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <template #header>Название</template>
              <el-form-item prop="title">
                <el-input v-model="medicalProfile.name" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Описание</template>
              <el-form-item prop="content">
                <WysiwygEditor v-model="medicalProfile.description" />
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRouter } from 'vue-router';

import MedicalProfile from '@/classes/MedicalProfile';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPagesPage',
  components: { WysiwygEditor },
  setup() {
    const editorOption = {
      modules: {
        toolbar: [
          ['полужирный', 'курсив', 'подчеркивание', 'зачеркивание'], // полужирный, курсив, подчеркивание, зачеркивание
          ['blockquote', 'code-block'], // цитата, кодовый блок
          [{ header: 1 }, { header: 2 }], // Заголовок в виде пар ключ-значение; 1, 2 означает размер шрифта
          [{ script: 'sub' }, { script: 'super' }], // нижний индекс и нижний индекс
          [{ indent: '- 1' }, { indent: '+ 1' }], // отступ
          [{ direction: 'rtl' }], // направление текста
          [{ size: ['small', false, 'large', 'huge'] }], // размер шрифта
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Несколько уровней заголовка
          [{ color: [] }, { background: [] }], // цвет шрифта, цвет фона шрифта
          [{ font: [] }], // шрифт
          [{ align: [] }], // Выравнивание
          ['clean'], // Очистить стиль шрифта
          ['image', 'video'], // Загрузить изображения, загрузить видео
        ],
      },
    };
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();

    const medicalProfile: MedicalProfile = MedicalProfilesStore.Item();

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      await loadItem();
    });

    const loadItem = async () => {
      if (Router.Id()) {
        await MedicalProfilesStore.Get(Router.Id());
        PHelp.AdminUI.Head.Set(medicalProfile.name, []);
      } else {
        PHelp.AdminUI.Head.Set('Добавить медицинский профиль', [Button.Success('Сохранить', submit)]);
        MedicalProfilesStore.ResetState();
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(medicalProfile, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (Router.Id()) {
        await MedicalProfilesStore.Create();
        await router.push('/admin/pages');
        return;
      }
      await MedicalProfilesStore.Update();
      next ? next() : await router.push('/admin/medical-profiles');
    };

    return {
      editorOption,
      mounted,
      submit,
      medicalProfile,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
