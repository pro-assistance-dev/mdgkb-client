<template>
  <div class="check-line">
    <label class="check-field__label" :style="{ fontSize: fontSize }">
      {{ value }}
      <input class="check-field__input" type="checkbox" v-model="value" onchange="change">
      <div class="pointer">
        <slot />
      </div>
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
const value: Ref<boolean> = defineModel(Boolean);
const emits = defineEmits(['change']);

const props = defineProps({
  label: { type: String as PropType<string>, default: 'label' },
  fontSize: { type: String as PropType<string>, default: '14px' },
});

const change = (v: boolean) => {
  emits('change', v);
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.hidden {
  display: none
}

.pointer {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  height: auto;
}

.check-line {
  display: flex;
  justify-content: left;
  align-items: center;
  max-width: 560px;
  width: 100%;
  display: flex;
  justify-content: left;
  margin: 0 auto;
}

.check-field__input {
  display: none;
}

.check-field__label {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 12px;
  font-family: Gilroy, Arial, Helvetica, sans-serif;
  color: #5F6A99;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}
</style>
