<template>
  <div id="personal" class="main-holiday">
    <div class="description">
      <HolidayGallery />
    </div>
    <CubeLine margin="20px 0" />
    <div class="invitation">
      <StringItem string="Привет, наш юный друг!" class="check-title" color="#ffffff" font-size="20px" />
      <StringItem
        string="2 марта 2024 года в Московской больнице состоится большое празднование 'Дня редких заболеваний'."
        class="check-title"
        margin="20px 0 0 0"
        color="#ffffff"
      />
      <StringItem
        string="У нас запланированы выступления, различные игры и конкурсы, сахарная вата и классные подарки."
        class="check-title"
        color="#ffffff"
      />
      <StringItem string="Что скажешь? Придешь? ;)" margin="20px 0 0 0" class="check-title" color="#ffffff" font-size="20px" />
    </div>
    <div class="survey-list">
      <el-form>
        <CollapseContainer>
          <CollapseItem
            background="inherit"
            background-attention="inherit"
            title="Я обязательно приду"
            margin="30px 0px 0 0px"
            title-color="#F6922E"
          >
            <template #inside-content>
              <div class="content">
                <StringItem string="Заполни коротко анкету:" class="check-title" />
                <div>
                  <el-form-item label="Твое ФИО:">
                    <el-input v-model="item.fio" />
                  </el-form-item>
                  <el-form-item label="ФИО родителей:">
                    <el-input v-model="item.parentFio" />
                  </el-form-item>
                  <el-form-item label="Телефон:">
                    <el-input v-model="item.phone" placeholder="+7(___) ___ __ __" @input="(e) => (item.phone = PhoneService.Format(e))" />
                  </el-form-item>
                  <el-form-item label="Укажи свой email для связи:">
                    <el-input v-model="item.email" />
                  </el-form-item>
                  <el-form-item label="С кем ты придешь:">
                    <el-input v-model="item.representative" />
                  </el-form-item>
                </div>
              </div>
            </template>
          </CollapseItem>
          <CollapseItem
            background="inherit"
            background-attention="inherit"
            title="Я хочу выступать со своим номером"
            margin="0px 0px 0 0px"
            title-color="#0BAE57"
          >
            <template #inside-content>
              <div class="content">
                <StringItem v-if="countShow > 2" string="Укажи, пожалуйста, только два номера" class="check-title-red" />
                <StringItem string="Я подготовлю номер (не больше двух):" class="check-title" />
                <div>
                  <el-form-item label="Песню:">
                    <el-input v-model="item.song" />
                  </el-form-item>
                  <el-form-item label="Танец:">
                    <el-input v-model="item.dance" />
                  </el-form-item>
                  <el-form-item label="Стихотворение:">
                    <el-input v-model="item.poem" />
                  </el-form-item>
                  <el-form-item label="Игру на музыкальном инструменте:">
                    <el-input v-model="item.music" />
                  </el-form-item>
                  <el-form-item label="Уникальный номер (напиши свой вариант выступления):">
                    <el-input v-model="item.customShow" />
                  </el-form-item>
                </div>
                <StringItem string="Что тебе нужно для выступления:" class="check-title" />
                <div class="my-2 flex items-center text-sm">
                  <el-checkbox-group v-model="item.needing" class="ml-4">
                    <el-checkbox label="музыкальные инструменты" size="large">музыкальные инструменты</el-checkbox>
                    <el-checkbox label="краски и кисточки" size="large">краски и кисточки</el-checkbox>
                    <el-checkbox label="музыкальное сопровождение" size="large">музыкальное сопровождение</el-checkbox>
                    <el-checkbox label="свой вариант ответа: " size="large">свой вариант ответа: </el-checkbox>
                  </el-checkbox-group>
                  <el-form-item label="">
                    <el-input v-model="item.customNeeding" />
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
            title-color="#0671BA"
          >
            <template #inside-content>
              <div class="content">
                <StringItem string="Хочешь, чтобы твое желание исполнилось?" class="check-title" />
                <StringItem string="Мечты сбываются не только в Новый год! " class="check-title" />
                <StringItem string="Заполни анкету ниже:" class="check-title" />
                <div>
                  <el-form-item label="Какой твой любимый цвет?">
                    <el-input v-model="item.color" />
                  </el-form-item>
                  <el-form-item label="Чем ты любишь заниматься?:">
                    <el-input v-model="item.hobby" />
                  </el-form-item>
                  <el-form-item label="Что делает темя счастливым?">
                    <el-input v-model="item.happy" />
                  </el-form-item>
                  <StringItem string="Где бы ты хотел побывать (не более 3-х вариантов)?" class="check-title" />
                  <div>
                    <el-checkbox-group v-model="item.place">
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
                        <el-input v-model="item.customPlace" />
                      </el-form-item>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </template>
          </CollapseItem>
          <CollapseItem
            background="inherit"
            background-attention="inherit"
            title="Флешмоб 'Мы вместе'"
            margin="0px 0px 0 0px"
            title-color="#EF3B2D"
          >
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
              <div class="footer"></div>
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
          @click="submit"
        />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref } from 'vue';

import HolidayForm from '@/classes/HolidayForm';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import StringItem from '@/components/Base/StringItem.vue';
import HolidayGallery from '@/components/HolidayGallery.vue';
import CubeLine from '@/components/StopComa/CubeLine.vue';
import PhoneService from '@/services/PhoneService';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';
export default defineComponent({
  name: 'HolidayPage',
  components: {
    StringItem,
    Button,
    CollapseContainer,
    CollapseItem,
    CubeLine,
    HolidayGallery,
  },
  async setup() {
    const item: ComputedRef<HolidayForm> = computed<HolidayForm>(() => Provider.store.getters['holidayForms/item']);
    const blockButton = ref(false);

    const part1 = ref(true);
    const part2 = ref(false);
    const part3 = ref(false);
    const part4 = ref(false);

    const countShow = computed(() => {
      let count = 0;
      const i = item.value;
      const a = [i.dance, i.song, i.poem, i.customShow, i.music];
      a.forEach((s: string) => {
        if (s) {
          count++;
        }
      });
      return count;
    });

    const sendForm = async () => {
      await Provider.store.dispatch('holidayForms/create');
      ElMessage({
        message: 'Заявка успешно отправлена',
        type: 'success',
      });
      scroll();
      Provider.router.push('/');
    };

    const submit = async () => {
      if (!item.value.canPart2()) {
        ElMessage({
          message: 'Заполни, пожалуйста, первую часть анкеты',
          type: 'warning',
        });
        scroll('#personal');
        return;
      }
      if (!item.value.part3Filled()) {
        ElMessageBox.confirm('Сундучок счастья заполнен не до конца. Может быть вернёшься и заполнишь?', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Отправить',
          cancelButtonText: 'Вернуться',
        })
          .then(async () => {
            await sendForm();
          })
          .catch((action: string) => {
            ElMessage({
              type: 'warning',
              message: 'Заполни свои желания',
            });
          });
      } else {
        await sendForm();
      }
    };

    return {
      part1,
      countShow,
      part2,
      part3,
      part4,
      item,
      blockButton,
      submit,
      PhoneService,
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

.invitation {
  width: 100%;
  min-height: 100px;
  margin: auto;
  text-align: center;
  background: #ffffff;
  background: #0671ba;
  border: 1px solid #b0a4c0;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}

.description {
  position: relative;
  width: 100%;
  min-height: 100px;

  margin: auto;
  text-align: center;
  background: #ffffff;
  border: 1px solid #b0a4c0;
  border-radius: 5px;
  padding: 10px 0;
  box-sizing: border-box;
}

.color-line {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content {
  width: 100%;
  min-height: 300px;
  // background: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  background-repeat: repeat;
}

.footer {
  width: 100%;
  background: url(../assets/img/for_holiday/photo_x.jpg);
  height: 300px;
}

.check-title {
  font-size: 15px;
  color: #343e5c;
}

.check-title-red {
  font-size: 15px;
  color: #f6922e;
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

:deep(.el-checkbox__label) {
  color: #a3a9be;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

.doctor-img {
  position: relative;
  z-index: 1;
  img {
    border-radius: 5px;
    height: auto;
    width: 500px;
  }
}

@media screen and (max-width: 540px) {
  .doctor-img {
    position: relative;
    z-index: 1;
    img {
      border-radius: 5px;
      height: auto;
      width: 380px;
    }
  }
  #active label {
    /*стиль отдельного переключателя*/
    border-radius: 15px; /*скругление углов*/
    display: inline-block; /*расположение в строку*/
    width: 30px;
    height: 30px;
    margin-right: 10px;
    background: #bbb;
  }
}

@media screen and (max-width: 420px) {
  .doctor-img {
    position: relative;
    z-index: 1;
    img {
      border-radius: 5px;
      height: auto;
      width: 280px;
    }
  }
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

  :deep(.el-checkbox__label) {
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
