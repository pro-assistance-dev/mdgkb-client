<template>
  <div>
    <div class="line-item">
      <div class="item-block">
        <!-- <div class="item-title"><h5>ФАМИЛИЯ&nbsp;*</h5></div> -->
        <div class="item-data">
          <el-form-item label="ФАМИЛИЯ" prop="human.surname">
            <el-input v-model="human.surname" placeholder="Введите фамилию"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="item-block">
        <!-- <div class="item-title"><h5>ИМЯ&nbsp;*</h5></div> -->
        <div class="item-data">
          <el-form-item label="ИМЯ" prop="human.name">
            <el-input v-model="human.name" placeholder="Введите имя"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="item-block">
        <!-- <div class="item-title"><h5>ОТЧЕСТВО</h5></div> -->
        <div class="item-data">
          <el-form-item label="Введите отчество" prop="human.patronymic">
            <el-input v-model="human.patronymic" placeholder="Введите отчество"></el-input>
          </el-form-item>
        </div>
      </div>
    </div>

    <div class="line-item">
      <div class="item-block">
        <!-- <div class="item-title"><h5>ПОЛ</h5></div> -->
        <div class="item-data">
          <el-form-item label="Пол" prop="human.isMale">
            <el-select v-model="human.isMale" placeholder="Выберите пол">
              <el-option label="Мужчина" :value="true"></el-option>
              <el-option label="Женщина" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="item-block">
        <!--        <div class="item-title"><h5>СЕМЕЙНЫЙ&nbsp;СТАТУС</h5></div>-->
        <!--        <div class="item-data">-->
        <!--          <el-form-item>-->
        <!--            <el-select v-model="human.isStatus" placeholder="Выберите статус">-->
        <!--              <el-option v-if="human.isMale === true" label="Женат" :value="true"></el-option>-->
        <!--              <el-option v-if="human.isMale === true" label="Холост" :value="false"></el-option>-->
        <!--              <el-option v-if="human.isMale === false" label="Замужем" :value="true"></el-option>-->
        <!--              <el-option v-if="human.isMale === false" label="Не замужем" :value="false"></el-option>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <!--        </div>-->
      </div>
      <div class="item-block">
        <!-- <div class="item-title"><h5>ДАТА&nbsp;РОЖДЕНИЯ *</h5></div> -->
        <div class="item-data">
          <el-form-item label="Дата рождения" prop="human.dateBirth">
            <el-date-picker v-model="human.dateBirth" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
          </el-form-item>
        </div>
      </div>
    </div>

    <!--    <div class="line-item">-->
    <!--      <div class="item-block-1">-->
    <!--        <div class="item-title"><h5>ДОКУМЕНТ&nbsp;УДОСТОВЕРЯЮЩИЙ&nbsp;ЛИЧНОСТЬ</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-select v-model="human.identityСard" placeholder="Выберите документ">-->
    <!--              <el-option label="Паспорт" :value="pasport"></el-option>-->
    <!--              <el-option label="Водительское удостоверение" :value="drivers_license"></el-option>-->
    <!--              <el-option label="Полис ОМС" :value="polis"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block-2">-->
    <!--        <div class="item-title"><h5>СЕРИЯ</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-input placeholder="Серия" minlength="4" />-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block-2">-->
    <!--        <div class="item-title"><h5>НОМЕР</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-input placeholder="Номер" minlength="6" />-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block-3">-->
    <!--        <div class="item-title"><h5>КЕМ&nbsp;ВЫДАН</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-select v-model="human.placeOfIssue" placeholder="Место выдачи">-->
    <!--              <el-option label="ОВД Центральный" :value="ovdCenter"></el-option>-->
    <!--              <el-option label="ОВД Северный" :value="ovdNorth"></el-option>-->
    <!--              <el-option label="ОВД Южный" :value="ovdSouth"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="line-item">-->
    <!--      <div class="item-block-4">-->
    <!--        <div class="item-title"><h5>АДРЕС&nbsp;*</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-input placeholder="Введите адрес" minlength="10" />-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block-3">-->
    <!--        <div class="item-title"><h5>КОНТАКТНЫЙ&nbsp;ТЕЛЕФОН&nbsp;*</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-input placeholder="Телефон" minlength="10" />-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block-3">-->
    <!--        <div class="item-title"><h5>ПОЧТА&nbsp;*</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-input placeholder="Почта" minlength="9" />-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="line-item">-->
    <!--      <div class="item-block">-->
    <!--        <div class="item-title"><h5>ЯЗЫК&nbsp;*</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-select v-model="human.language" placeholder="Выберите язык">-->
    <!--              <el-option label="Русский" :value="russian"></el-option>-->
    <!--              <el-option label="Английский" :value="english"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block">-->
    <!--        <div class="item-title"><h5>РЕЛИГИОЗНАЯ&nbsp;ПРИНАДЛЕЖНОСТЬ</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-select v-model="human.religion" placeholder="Ваше вероисповедание">-->
    <!--              <el-option label="Христианство" :value="christianity"></el-option>-->
    <!--              <el-option label="Ислам" :value="islam"></el-option>-->
    <!--              <el-option label="Индуизм" :value="hinduism"></el-option>-->
    <!--              <el-option label="Буддизм" :value="buddhism"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="item-block">-->
    <!--        <div class="item-title"><h5>ЭТНИЧЕСКАЯ&nbsp;ПРИНАДЛЕЖНОСТЬ</h5></div>-->
    <!--        <div class="item-data">-->
    <!--          <el-form-item>-->
    <!--            <el-select v-model="human.ethnic" placeholder="Выберите принадлежность">-->
    <!--              <el-option label="Русский" :value="russian"></el-option>-->
    <!--              <el-option label="Украинец" :value="ukrainian"></el-option>-->
    <!--              <el-option label="Белорус" :value="belarusian"></el-option>-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IHuman from '@/interfaces/IHuman';

export default defineComponent({
  name: 'HumanForm',
  components: {},
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const form = ref();

    const human: Ref<IHuman> = computed(() => store.getters[`${props.storeModule}/item`].human);

    return {
      human,
      form,
    };
  },
});
</script>

<style scoped lang="scss">
h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

h4 {
  margin: 0;
  font-weight: normal;
  font-size: 15px;
}

h5 {
  margin: 0;
  font-weight: normal;
  font-size: 11px;
}

.item-title {
  display: flex;
  width: 100%;
  color: #a3a9be;
  margin-bottom: 3px;
}

.item-data {
  width: 100%;
  color: #343e5c;
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-block {
  width: 31%;
  height: 60px;
  padding-bottom: 15px;
  margin-bottom: 20px;
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

.item-block-1 {
  width: 38.5%;
  height: 60px;
  padding-bottom: 15px;
}

.item-block-2 {
  width: 14%;
  height: 60px;
  padding-bottom: 15px;
}

.item-block-3 {
  width: 23%;
  height: 60px;
  padding-bottom: 15px;
}

.item-block-4 {
  width: 47%;
  height: 60px;
  padding-bottom: 15px;
}

:deep(.el-form-item__label) {
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  // display: none;
}
</style>
