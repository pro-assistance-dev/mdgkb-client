<template>
  <div v-if="mounted">
    <el-form v-model="dpoApplication" label-position="top">
      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая документы работников
          МДГКБ).
        </div>
      </i>
      <h4>Образцы:</h4>
      <div>
        <li>
          <a href="http://мороздгкб.рф/wp-content/uploads/2018/09/Заявление-на-обучение-по-ДПП-1.pdf" target="_blank"
            >Заявление на обучение</a
          >
        </li>
        <li>
          <a href="http://мороздгкб.рф/wp-content/uploads/2018/10/Договор-с-физ.лицом.pdf" target="_blank">Договор с физическим лицом</a>
        </li>
        <li>
          <a href="http://мороздгкб.рф/wp-content/uploads/2018/10/Договор-с-Юр.лицом.pdf" target="_blank">Договор с юридическим лицом</a>
        </li>
      </div>
      <h4>
        Перечень документов, необходимых для зачисления на циклы повышения квалификации или профессиональной переподготовки медработников:
      </h4>
      <el-form-item label="Заявление на обучение от СЛУШАТЕЛЯ:">
        <FileUploader :file-info="dpoApplication.application" />
      </el-form-item>
      <el-form-item
        label="Заявка от ОРГАНИЗАЦИИ на зачисление (на имя руководителя МДГКБ, только в том случае, если обучение будет оплачивать работодатель):"
      >
        <FileUploader :file-info="dpoApplication.organizationApplication" />
      </el-form-item>
      <el-form-item label="Договор на оказание платных образовательных услуг:">
        <FileUploader :file-info="dpoApplication.paidEducationalServicesContract" />
      </el-form-item>
      <el-form-item label="Копия документа о среднем или высшем медицинском образовании:">
        <FileUploader :file-info="dpoApplication.secondaryOrHigherMedicalEducation" />
      </el-form-item>
      <el-form-item
        label="Копия документа о послевузовском профессиональном образовании (для лиц с высшим профессиональным медицинским образованием):"
      >
        <FileUploader :file-info="dpoApplication.postgraduateProfEducation" />
      </el-form-item>
      <el-form-item
        label="Копия документа о дополнительном профессиональном образовании (повышении квалификации или профессиональной переподготовке):"
      >
        <FileUploader :file-info="dpoApplication.additionalProfEducation" />
      </el-form-item>
      <el-form-item label="Копия сертификата специалиста по данной специальности (при наличии):">
        <FileUploader :file-info="dpoApplication.specialistCertificate" />
      </el-form-item>
      <el-form-item
        label="Копия трудовой книжки с записью на последней странице «работает по настоящее время в должности …» (при наличии) или справку с места работы с указанием должности и стажа работы в ней (исключая работников МДГКБ):"
      >
        <FileUploader :file-info="dpoApplication.employmentHistory" />
      </el-form-item>
      <el-form-item label="Лицам, изменившим фамилию, имя или отчество необходимо предоставить копию подтверждающего документа:">
        <FileUploader :file-info="dpoApplication.nameChangeDocument" />
      </el-form-item>
      <h4>Для иностранных граждан дополнительно:</h4>
      <el-form-item
        label="Свидетельство или письмо Рособрнадзора о признании документов иностранных государств об уровне образования и (или) квалификации на территории РФ (копии документов должны быть переведены на русский язык и заверены в установленном порядке):"
      >
        <FileUploader :file-info="dpoApplication.foreignStudentQualificationDocument" />
      </el-form-item>
    </el-form>
    <el-divider />
    <div style="text-align: right">
      <button class="response-btn" @click="submit">Отправить заявление</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FileUploader from '@/components/FileUploader.vue';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'DpoApplicationForm',
  components: { FileUploader },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const dpoApplication: ComputedRef<IDpoApplication> = computed<IDpoApplication>(() => store.getters['dpoApplications/item']);
    const dpoCourse: Ref<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
    watch(user, () => {
      store.commit('dpoApplications/setUser', user.value);
    });

    const submit = async () => {
      await store.dispatch('dpoApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('dpoApplications/setCourse', dpoCourse.value);
      store.commit('dpoApplications/setUser', user.value);
      console.log('user.value', user.value);
      mounted.value = true;
    });

    return {
      dpoApplication,
      mounted,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  line-height: 1.2;
}
//:deep(a) {
//  color: blue !important;
//}

a {
  color: #2754eb;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: darken(#2754eb, 30%);
  }
}
</style>
