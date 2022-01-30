<template>
  <div class="med-data-title"><h2>Данные о медицинской организации</h2></div>
  <div class="med-data">
    <ul class="med-data-list">
      <li class="med-data-list-item">
        <med-data-list-item-h4
          ><b>Полное наименование:</b> Государственное бюджетное учреждение здравоохранения города Москвы «Морозовская детская городская
          клиническая больница Департамента здравоохранения города Москвы»</med-data-list-item-h4
        >
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4><b>Сокращенное наименование:</b> ГБУЗ «Морозовская ДГКБ ДЗМ»</med-data-list-item-h4>
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4><b>Дата основания:</b> 1903 год</med-data-list-item-h4>
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4><b>Дата государственной регистрации:</b> 04 апреля 1997 года</med-data-list-item-h4>
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4
          ><b>Учредитель:</b> Учредителем ГБУЗ «Морозовская ДГКБ ДЗМ» является город Москва. Функции и полномочия учредителя в соответствии
          с Федеральными законами, законами города Москвы, нормативными правовыми актами Правительства Москвы осуществляет Департамент
          здравоохранения города Москвы</med-data-list-item-h4
        >
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4><b>Лечение проводится:</b> по полисам ОМС, ДМС, на платной основе</med-data-list-item-h4>
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4
          ><b>Наши пациенты:</b> дети от рождения до 18 лет. Лица старше 18 лет могут получить медицинские услуги на платной
          основе</med-data-list-item-h4
        >
      </li>
      <li class="med-data-list-item">
        <med-data-list-item-h4><b>График работы больницы:</b> круглосуточно, ежедневно</med-data-list-item-h4>
      </li>
    </ul>
  </div>
  <CallBack />
</template>

<script lang="ts">
import CallBack from '@/components/MedicalOrganization/CallBack.vue';
export default {
  name: 'MedicalOrganization',
  components: { CallBack },
};
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

.med-data-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  height: 60px;
  background: #e4e5e7;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
  font-weight: normal;
}

.med-data {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
}

.med-data-list {
  list-style-type: none;
}

.med-data-list-item-h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  overflow-wrap: break-word;
  color: #4a4a4a;
  text-align: left;
  justify-content: left;
}
</style>
