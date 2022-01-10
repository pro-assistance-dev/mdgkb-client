<template>
  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <h4 style="text-align: center">Документы</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Заявление на обучение"></el-descriptions-item>
        <el-descriptions-item label="Заявка от ОРГАНИЗАЦИИ на зачисление на имя руководителя МДГКБ"
          >Только в том случае, если обучение будет оплачивать работодатель</el-descriptions-item
        >
        <el-descriptions-item label="Договор на оказание платных образовательных услуг"></el-descriptions-item>
        <el-descriptions-item label="Копия документа о среднем или высшем медицинском образовании"></el-descriptions-item>
        <el-descriptions-item label="Копия документа о послевузовском профессиональном образовании"
          >Для лиц с высшим профессиональным медицинским образованием</el-descriptions-item
        >
        <el-descriptions-item label="Копия документа о дополнительном профессиональном образовании"
          >Повышении квалификации или профессиональной переподготовке</el-descriptions-item
        >
        <el-descriptions-item label="Копия сертификата специалиста по данной специальностии">При наличии</el-descriptions-item>
        <el-descriptions-item
          label="Копия трудовой книжки с записью на последней странице 'работает по настоящее время в должности ...' или справку с места работы с указанием должности и стажа работы в ней"
          >При наличии. Исключая работников МДГКБ</el-descriptions-item
        >
        <el-descriptions-item label="Копию документа, поддтверждающего смену фамилии"
          >Лицам, изменившим фамилию имя или отчество</el-descriptions-item
        >
      </el-descriptions>
    </el-col>
  </el-row>

  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <h4 style="text-align: center">Для иностранных граждан дополнительно</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item
          label="видетельство или письмо
  Рособрнадзора о признании документов иностранных государств об уровне образования и (или) квалификации на территории РФ"
        >
          копии документов должны быть переведены на русский язык и заверены в установленном порядке). Печать документов должна быть
          высокого качества. При заполнении от руки – ПЕЧАТНЫМИ буквами. Не допускается исправление ошибок путем зачеркивания или с помощью
          корректирующих средств. Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая
          документы работников МДГКБ)
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>

  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <h4 style="text-align: center">Образцы</h4>
      <ul>
        <li>Заявление на обучение</li>
        <li>Договор с физическим лицом</li>
        <li>Договор с юридическим лицом</li>
      </ul>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdditionalEducationDocumentsForAdmission',
  components: {},

  setup() {
    return {};
  },
});
</script>

<style>
h1 {
  text-align: center;
  font-size: 24px;
}
.ques-answ-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
