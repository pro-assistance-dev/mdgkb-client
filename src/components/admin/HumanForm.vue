<template>
  
  <GridContainer max-width="1024px" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" grid-gap="30px" margin="0">
    <PInput v-model="human.surname" label="ФАМИЛИЯ" placeholder="Введите фамилию" />
    <PInput v-model="human.name" label="ИМЯ" placeholder="Введите имя"  />
    <PInput v-model="human.patronymic" label="ОТЧЕСТВО" placeholder="Введите отчество"/>
    <PSelect v-model="human.isMale" label="ПОЛ" placeholder="Выберите пол">
      <option :value="true">Мужчина</option>
      <option :value="false">Женщина</option>
    </PSelect>
    <PInput v-model="human.placeBirth" label="МЕСТО РОЖДЕНИЯ" placeholder="Введите страну"/>
    <PInputData v-model="human.dateBirth" label="ДАТА РОЖДЕНИЯ" placeholder="Введите дату"/>
    <PInput v-model="human.citizenship" label="ГРАЖДАНСТВО" placeholder="Введите гражданство"/>
    <PInput v-model="human.snils" label="СНИЛС" placeholder="Введите СНИЛС"/>
    <PInput v-model="human.address" label="АДРЕС" placeholder="Введите адрес"/>
  </GridContainer>

  <!-- <div :class="{ 'human-form-container': withStyles }">
    <div class="mobile-help">
      <div class="line-item">
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Фамилия">
              <el-input
                v-model="human.surname"
                placeholder="Введите фамилию"
                formatter="firstLetterUpper"
                @blur="checkCompleteName"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Имя">
              <el-input v-model="human.name" placeholder="Введите имя" @blur="checkCompleteName"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Отчество">
              <el-input v-model="human.patronymic" placeholder="Введите отчество" @blur="checkCompleteName"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Пол">
              <el-select v-model="human.isMale" placeholder="Выберите пол">
                <el-option label="Мужчина" :value="true"></el-option>
                <el-option label="Женщина" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Место&nbsp;рождения">
              <el-input v-model="human.placeBirth" placeholder="Введите страну"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Дата рождения">
              <DatePicker v-model="human.dateBirth" />
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block">
          <el-form-item label="Гражданство">
            <el-input v-model="human.citizenship" placeholder="Введите гражданство"></el-input>
          </el-form-item>
        </div>
        <div class="item-block">
          <el-form-item label="СНИЛС">
            <el-input v-model="human.snils" placeholder="Введите СНИЛС"></el-input>
          </el-form-item>
        </div>
        <div class="item-block">
          <el-form-item label="Адрес">
            <el-input v-model="human.address" placeholder="Введите адрес"></el-input>
          </el-form-item>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DatePicker from '@/components/DatePicker.vue';
import Human from '@/services/classes/Human';
import GridContainer from '@/services/components/GridContainer.vue';
import PInput from '@/services/components/PInput.vue';
import PInputData from '@/services/components/PInputData.vue';
import PSelect from '@/services/components/PSelect.vue';

export default defineComponent({
  name: 'HumanForm',
  components: { DatePicker },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
    withStyles: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const form = ref();

    const human: Ref<Human> = computed(() => store.getters[`${props.storeModule}/item`].getHuman());

    const checkCompleteName = (n: string): void => {
      if (!!human.value.name && !!human.value.surname && !!human.value.patronymic) {
        emit('inputNameComplete', human.value);
      }
    };
    const sanitizeName = () => human.value.sanitizeName();

    watch(human, sanitizeName, { deep: true });

    return {
      checkCompleteName,
      human,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.human-form-container {
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
    color: $base-light-font-color;
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
    color: $base-light-font-color;
    padding: 0 !important;
    text-transform: uppercase;
    margin-left: 5px;
  }

  :deep(.el-input__prefix) {
    left: auto;
    right: 10px;
  }


  :deep(.el-input__suffix-inner) {
    background: #ffffff;
    padding: 0 5px 0 0;
  }

  @media screen and (max-width: 910px) {
    .mobile-help {
      display: flex;
      justify-content: space-between;
    }
    .line-item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      margin-right: 20px;
    }

    .line-item:last-child {
      margin-right: 0;
    }

    .item-block {
      width: 100%;
      height: 60px;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .column-block {
      display: block;
    }
    .column-item {
      width: 100%;
      margin-left: 0px;
    }
    .column-item2 {
      width: 100%;
      margin-left: 0px;
    }
    .column-item3 {
      width: 100%;
      margin-left: 0px;
    }

    .column-item3:first-child {
      width: 100%;
      margin-left: 0px;
    }
  }

  @media screen and (max-width: 730px) {
    /*     .hidden-less-730 {
      display: none;
    } */

    .mobile-help {
      display: block;
      justify-content: space-between;
    }
    .line-item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      margin-right: 20px;
    }

    .line-item:last-child {
      margin-right: 0;
    }

    .item-block {
      width: 100%;
      height: 60px;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
  }
}
</style>
