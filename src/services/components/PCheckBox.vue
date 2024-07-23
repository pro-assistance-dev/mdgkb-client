<template>
  <div class="check-line">
    <label class="check-field__label" :style="{ fontSize: fontSize }">
      <input v-model="switchPosition" class="check-field__input" type="checkbox" />
      <div class="pointer">
        <slot />
      </div>
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
const switchPosition = defineModel<boolean>();
const emits = defineEmits(['switchPosition']);
defineProps({
  label: { type: String as PropType<string>, default: 'label' },
  fontSize: { type: String as PropType<string>, default: '14px' },
});
emits('switchPosition', switchPosition);
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

.hidden {
  display: none;
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
  color: #5f6a99;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
