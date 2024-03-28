<template>
  <div class="number">
    <button class="number-minus" type="button" @click="decrease">
      <svg class="icon-minus">
        <use xlink:href="#minus"></use>
      </svg>
    </button>
    <input v-model="num" class="input-field" type="number" min="0" step="0.1" @input="input" />
    <button class="number-plus" type="button" @click="increase">
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </button>
  </div>
  <Icons />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import Icons from '@/assets/svg/Button/Icons.svg';

export default defineComponent({
  name: 'InputNumber',
  components: { Icons },
  props: {
    modelValue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const num: Ref<number> = ref(props.modelValue ?? 0);
    const increase = () => {
      num.value++;
      emit('update:modelValue', num.value);
      emit('change');
    };

    const decrease = () => {
      num.value--;
      emit('update:modelValue', num.value);
      emit('change');
    };

    const input = (v: number) => {
      console.log(v);
      emit('update:modelValue', num.value);
      emit('change');
    };

    return {
      num,
      increase,
      decrease,
      input,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.input-field:hover {
  cursor: text !important;
}

.icon-plus {
  width: 16px;
  height: 16px;
  fill: #828587;
  cursor: pointer;
  transition: 0, 3s;
  opacity: 0.8;
  padding: 11px;
}

.icon-plus:hover {
  transform: scale(1.2, 1.2);
  opacity: 1;
}

.icon-plus:active {
  transform: scale(1.2, 1.2);
  opacity: 0.8;
}

.icon-minus {
  width: 16px;
  height: 16px;
  fill: #828587;
  cursor: pointer;
  transition: 0, 3s;
  opacity: 0.8;
  padding: 11px;
}

.icon-minus:hover {
  transform: scale(1.2, 1.2);
  opacity: 1;
}

.icon-minus:active {
  transform: scale(1.2, 1.2);
  opacity: 0.8;
}

.number {
  display: inline-block;
  position: relative;
  width: 190px;
  background: #ffffff;
  margin: 10px;
  border-radius: 3px;
}
.number input[type='number'] {
  display: block;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
  background: #ffffff;
  cursor: pointer;
}
.number input[type='number']::-webkit-outer-spin-button,
.number input[type='number']::-webkit-inner-spin-button {
  display: none;
}
.number-minus {
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  width: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-right: 1px solid #ddd;
  background: #f5f7fa;
  cursor: pointer;
  overflow: hidden;
}
.number-plus {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  width: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-left: 1px solid #ddd;
  background: #f5f7fa;
  cursor: pointer;
  overflow: hidden;
}

input[type='number'] {
  background: #ffffff;
  vertical-align: top;
  outline: none;
  padding: 0;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  font-size: 14px;
  border-radius: 3px;
}

input[type='number']:focus {
  outline: 0px solid #ffffff;
}
</style>
