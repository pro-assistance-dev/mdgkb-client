<template>
  <div class="main-holiday">
    <div class="description">
      <StringItem string="Привет наш юный друг!" class="check-title" />
      <StringItem
        string="2 марта 2024 года в Московской больнице состоится большое празднование 'Дня редких заболеваний'."
        class="check-title"
      />
      <StringItem
        string="У нас запланированы выступления, различные игры и конкурсы, сахарная вата и классные подарки."
        class="check-title"
      />
      <StringItem string="Что скажешь? Придешь? ;)" margin="20px 0 0 0" class="check-title" />
    </div>
    <div class="survey-list">
      <CollapseContainer>
        <CollapseItem background="inherit" background-attention="inherit" title="Я обязательно приду" margin="30px 0px 0 0px">
          <template #inside-content>
            <div class="content">
              <StringItem string="Заполни коротко анкету:" class="check-title" />
              <div>
                <el-form-item label="Твое ФИО:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="ФИО родителей:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Телефон:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="С кем ты придешь:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
              </div>
            </div>
          </template>
        </CollapseItem>
        <CollapseItem background="inherit" background-attention="inherit" title="Я хочу выступать со своим номером" margin="0px 0px 0 0px">
          <template #inside-content>
            <div class="content">
              <StringItem string="Я подготовлю:" class="check-title" />
              <div>
                <el-form-item label="Песню:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Танец:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Стихотворение:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Игру на музыкальном инструменте:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Уникальный номер (напиши свой вариант выступления):">
                  <el-input @change="updateSurvey" />
                </el-form-item>
              </div>
              <StringItem string="Что тебе нужно для выступления:" class="check-title" />
              <div class="my-2 flex items-center text-sm">
                <el-radio-group class="ml-4">
                  <el-radio label="1" size="large">музыкальные инструменты</el-radio>
                  <el-radio label="2" size="large">краски и кисточки</el-radio>
                  <el-radio label="3" size="large">музыкальное сопровождение</el-radio>
                  <el-radio label="3" size="large"> свой вариант ответа: </el-radio>
                </el-radio-group>
                <el-form-item label="">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <StringItem string="За выступление полагается приз! ;)" class="check-title" />
              </div>
            </div>
          </template>
        </CollapseItem>
        <CollapseItem
          background="inherit"
          background-attention="inherit"
          title="'Сундучок счастья' расскажи о своей мечте"
          margin="0px 0px 0 0px"
        >
          <template #inside-content>
            <div class="content">
              <StringItem string="Хочешь, чтобы твое желание исполнилось?" class="check-title" />
              <StringItem string="Мечты сбываются не только в Новый год! " class="check-title" />
              <StringItem string="Заполни анкету ниже:" class="check-title" />
              <div>
                <el-form-item label="Какой твой любимый цвет?">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Чем ты любишь заниматься?:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <el-form-item label="Что делает темя счастливым?">
                  <el-input @change="updateSurvey" />
                </el-form-item>
                <StringItem string="Где бы ты хотел побывать (не более 3-х вариантов)?" class="check-title" />
                <div>
                  <el-checkbox label="в цирке" size="large" />
                  <el-checkbox label="в театре" size="large" />
                  <el-checkbox label="в музее" size="large" />
                  <el-checkbox label="в зоопарке" size="large" />
                  <el-checkbox label="на выставке животных" size="large" />
                  <el-checkbox label="на ВДНХ" size="large" />
                  <el-checkbox label="на киностудии Мосфильм" size="large" />
                  <el-checkbox label="на фабрике шоколада/мороженого" size="large" />
                  <el-checkbox label="в городе профессий" size="large" />
                  <el-checkbox label="свой вариант:" size="large" />
                  <el-form-item label="">
                    <el-input @change="updateSurvey" />
                  </el-form-item>
                </div>

                <el-form-item label="Укажи свой email для связи:">
                  <el-input @change="updateSurvey" />
                </el-form-item>
              </div>
            </div>
          </template>
        </CollapseItem>
        <CollapseItem background="inherit" background-attention="inherit" title="Флешмоб 'Мы вместе'" margin="0px 0px 0 0px">
          <template #inside-content>
            <div class="content">
              <StringItem string="Нам срочно нужна твоя помощь!" class="check-title" />
              <StringItem string="1. Возьми лист цветной бумаги" class="check-title" margin="20px 0 0 0" />
              <StringItem string="2. Обведи на нём свою руку" class="check-title" />
              <StringItem string="3. Вырежи получившуюся ладошку" class="check-title" />
              <StringItem string="4. Напиши на одной стороне свои фамилию и имя" class="check-title" />
              <StringItem string="5. Подписанную ладошку опусти в коробку" class="check-title" />
              <StringItem string="Твоя ручка окажется на общей картине. Вот увидишь! ;)" class="check-title" margin="20px 0 0 0" />
              <StringItem string="Волшебная коробка с ладошками находится около елки" class="check-title" margin="20px 0 0 0" />
            </div>
          </template>
        </CollapseItem>
      </CollapseContainer>
      <Button
        width="296px"
        height="80px"
        margin-top="30px"
        text="Отправить заявку участника"
        border-radius="5px"
        font-size="18px"
        color="#4472C4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import StringItem from '@/components/Base/StringItem.vue';

export default defineComponent({
  name: 'HolidayPage',
  components: {
    StringItem,
    Button,
    CollapseContainer,
    CollapseItem,
  },
  async setup() {
    const store = useStore();
    const updateSurvey = () => {
      // store.commit(`${props.storeName}/setHuman`, human);
    };

    return {
      // survey,
      updateSurvey,
    };
  },
});
</script>

<style scoped lang="scss">
.main-holiday {
  width: calc(100% - 10px);
  height: 100%;
  margin: 0 auto;
  margin: 0 5px;
}

.description {
  width: 100%;
  min-height: 100px;
  margin: auto;
  text-align: center;
  background: #ffffff;
  border: 1px solid #b0a4c0;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  min-height: 300px;
  // background: #ffffff;
  padding: 20px;
  box-sizing: border-box;
}

.check-title {
  font-size: 15px;
  color: #343e5c;
}

.el-form-item {
  height: auto;
  margin-bottom: 10px;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 15px;
  height: 30px;
}
:deep(.el-checkbox__label) {
  color: #a3a9be;
  min-width: 280px;
}

:deep(.el-radio__label) {
  color: #a3a9be;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

@media screen and (max-width: 400px) {
  .description {
    padding: 10px;
  }
  .content {
    padding: 10px 10px 10px 20px;
  }

  .check-title {
    font-size: 13px;
    color: #343e5c;
  }

  :deep(.el-form-item__label) {
    font-size: 12px;
    line-height: 0px;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  :deep(.el-radio__label) {
    color: #a3a9be;
    font-size: 13px;
  }
  :deep(.el-checkbox__label) {
    color: #a3a9be;
    min-width: 280px;
    font-size: 13px;
  }
}
</style>
