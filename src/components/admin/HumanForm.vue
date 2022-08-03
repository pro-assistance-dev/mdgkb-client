<template>
  <div :class="{ 'human-form-container': withStyles }">
    <div class="mobile-help">
      <div class="line-item">
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Фамилия" prop="human.surname">
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
            <el-form-item label="Имя" prop="human.name">
              <el-input v-model="human.name" placeholder="Введите имя" @blur="checkCompleteName"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Отчество" prop="human.patronymic">
              <el-input v-model="human.patronymic" placeholder="Введите отчество" @blur="checkCompleteName"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block">
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
          <div class="item-data">
            <el-form-item label="Место&nbsp;рождения" prop="human.placeBirth">
              <el-input v-model="human.placeBirth" placeholder="Введите страну"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-block">
          <div class="item-data">
            <el-form-item label="Дата рождения" prop="human.dateBirth">
              <DatePicker v-model="human.dateBirth" />
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="line-item">
        <div class="item-block">
          <el-form-item label="Гражданство" prop="human.citizenship">
            <el-input v-model="human.citizenship" placeholder="Введите гражданство"></el-input>
          </el-form-item>
        </div>
        <div class="item-block">
          <el-form-item label="СНИЛС" prop="human.snils">
            <el-input v-model="human.snils" placeholder="Введите СНИЛС"></el-input>
          </el-form-item>
        </div>
        <div class="item-block"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DatePicker from '@/components/DatePicker.vue';
import IHuman from '@/interfaces/IHuman';

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

    const human: Ref<IHuman> = computed(() => store.getters[`${props.storeModule}/item`].human);

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

<style scoped lang="scss">
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
  }

  :deep(.el-input__prefix) {
    left: auto;
    right: 10px;
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
