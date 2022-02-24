<template>
  <div class="card-item">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AspiranturaExams',
  components: {},

  setup() {
    const docs = [
      {
        doc: 'Документ (документы), удостоверяющий личность, гражданство',
        comment: '',
      },
      {
        doc: 'Документ об образовании и приложение к нему',
        comment:
          'При предъявлении копии поступающий указывает в заявлении о приеме обязательство представить указанный документ не позднее дня завершения приема документа установленного образца',
      },
      {
        doc: 'Документ, подтверждающий инвалидность при необходимости создания специальных условий при проведении',
        comment:
          ' Вступительных испытаний (указанный документ принимается организацией, если срок его действия истекает не ранее дня подачи заявления о приеме; если в документе не указан срок его действия, то документ действителен в течение года, начиная с даты его выдачи)',
      },
      {
        doc: '2 фотографии поступающего',
        comment: '',
      },
      {
        doc: 'По усмотрению поступающего - документы, подтверждающие индивидуальные достижения',
        comment: '',
      },
    ];

    return { docs };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
