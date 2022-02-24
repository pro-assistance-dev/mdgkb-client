<template>
  <div class="card-item">
    <h2>Для иностранных граждан дополнительно</h2>
    <ul>
      <li v-for="doc in docs" :key="doc">
        <div>
          <b>{{ doc.doc }}</b>
          <div>
            {{ doc.comment }}
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="card-item">
    <h2>Для иностранных граждан дополнительно</h2>
    <ul>
      <li v-for="doc in ino" :key="doc">
        <div>
          <b>{{ doc.doc }}</b>
          <div>
            {{ doc.comment }}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="card-item">
    <h4 style="text-align: center">Образцы</h4>
    <ul>
      <li v-for="file in files" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'AdditionalEducationDocumentsForAdmission',
  components: {},

  setup() {
    const fileInfos = ['Договор с физическим лицом', 'Договор с юридическим лицом'];
    const files: any = [];
    onBeforeMount(() => {
      const url = process.env.VUE_APP_STATIC_URL + '/educ/dop/forms/';
      fileInfos.forEach((f: string, i: number) => {
        files.push({ url: url + i + '.pdf', download: f });
      });
    });

    const docs = [
      {
        doc: 'Заявление на обучение',
        comment: '',
      },
      {
        doc: 'Заявка от ОРГАНИЗАЦИИ на зачисление на имя руководителя МДГКБ',
        comment: 'Только в том случае, если обучение будет оплачивать работодатель',
      },
      {
        doc: 'Договор на оказание платных образовательных услуг',
        comment: '',
      },
      {
        doc: 'Копия документа о среднем или высшем медицинском образовании',
        comment: '',
      },
      {
        doc: 'Копия документа о послевузовском профессиональном образовании',
        comment: 'Для лиц с высшим профессиональным медицинским образованием',
      },
      {
        doc: 'Копия документа о дополнительном профессиональном образовании',
        comment: 'Повышении квалификации или профессиональной переподготовке',
      },
      {
        doc: 'Копия сертификата специалиста по данной специальностии',
        comment: 'При наличии',
      },
      {
        doc: "Копия трудовой книжки с записью на последней странице 'работает по настоящее время в должности ...' или справку с места работы с указанием должности и стажа работы в ней",
        comment: 'При наличии. Исключая работников МДГКБ',
      },

      {
        doc: 'Копию документа, поддтверждающего смену фамилии',
        comment: 'Лицам, изменившим фамилию имя или отчество',
      },
    ];

    const ino = [
      {
        doc: 'Cвидетельство или письмоРособрнадзора о признании документов иностранных государств об уровне образования и (или) квалификации на территории РФ',
        comment:
          'копии документов должны быть переведены на русский язык и заверены в установленном порядке). Печать документов должна быть\n' +
          '          высокого качества. При заполнении от руки – ПЕЧАТНЫМИ буквами. Не допускается исправление ошибок путем зачеркивания или с помощью\n' +
          '          корректирующих средств. Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая\n' +
          '          документы работников МДГКБ)',
      },
    ];
    return { docs, ino, files };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
