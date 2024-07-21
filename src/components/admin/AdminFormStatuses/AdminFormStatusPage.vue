<template>
  <div class="flex-column">
    <el-form v-if="mounted" ref="form" :model="formStatus" label-position="top">
      <el-card>
        <el-form-item label="Группа статусов">
          <el-select v-model="formStatus.formStatusGroup" value-key="id" placeholder="Группа статусов">
            <el-option v-for="item in formStatusGroups" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="Кодовое название" prop="name">
          <el-input v-model="formStatus.name" placeholder="Кодовое название"></el-input>
        </el-form-item> -->
        <el-form-item label="Код (при отутствии совпадений - оставить пустым)" name="">
          <el-select v-model="formStatus.name" placeholder="Код" clearable>
            <el-option v-for="item in Object.values(FormStatusNames)" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Название" prop="label">
          <el-input v-model="formStatus.label" placeholder="Название"></el-input>
        </el-form-item>
        <el-form-item label="Название действия для модератора" prop="modActionName">
          <el-input v-model="formStatus.modActionName" placeholder="Название действия для модератора"></el-input>
        </el-form-item>
        <el-form-item label="Название действия для пользователя" prop="userActionName">
          <el-input v-model="formStatus.userActionName" placeholder="Название действия для пользователя"></el-input>
        </el-form-item>
        <el-form-item label="Форма доступна для редакторивания" prop="isEditable">
          <el-switch v-model="formStatus.isEditable" active-text="Да" inactive-text="Нет" />
        </el-form-item>
        <el-form-item label="Слать email при смене статуса" prop="isEditable">
          <el-switch v-model="formStatus.sendEmail" active-text="Да" inactive-text="Нет" />
        </el-form-item>
        <el-form-item label="Цвет" prop="color">
          <el-color-picker v-model="formStatus.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="Исконка" prop="icon">
          <UploaderImage :file-info="formStatus.icon" :crop-ratio="false" />
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';

import FormStatus from '@/classes/FormStatus';
import FormStatusGroup from '@/classes/FormStatusGroup';
import { FormStatusNames } from '@/interfaces/FormStatusNames';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

export default defineComponent({
  name: 'AdminFormStatusPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const formStatus: FormStatus = FormStatusesStore.Item();
    const formStatusGroups: FormStatusGroup[] = FormStatusGroupsStore.Items();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const form = ref();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      try {
        if (Router.Id()) {
          await FormStatusesStore.Update();
        } else {
          await FormStatusesStore.Create();
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.go(-1);
    };

    onBeforeMount(async () => {
      if (route.params['id']) {
        await FormStatusesStore.Get(Router.Id());
        PHelp.AdminUI.Head.Set('Обновить статус', [Button.Success('Создать', submit)]);
      } else {
        FormStatusesStore.SetGroupId(route.params['groupId']);
        PHelp.AdminUI.Head.Set('Создать статус', [Button.Success('Создать', submit)]);
      }
      await FormStatusGroupsStore.GetAll();
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(formStatus, formUpdated, { deep: true });
    });

    onBeforeUnmount(() => {
      FormStatusesStore.ResetItem();
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      formStatus,
      form,
      mounted,
      formStatusGroups,
      FormStatusNames,
    };
  },
});
</script>
