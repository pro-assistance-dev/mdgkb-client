<template>
  <div class="text-field">
    <label v-if="label" class="text-field__label" :for="label">
      {{ label }}
    </label>
    <input 
      class="text-field__input" 
      type="text" :name="label" 
      :id="label" 
      :placeholder="placeholder" 
      :readonly="readonly"
      :disabled="disabled"
      v-model="model">
  </div>
</template>

<script setup lang="ts">

const model = defineModel();

defineOptions({ inheritAttrs: false });

const props = defineProps({
  text: { type: String as PropType<string>, default: '', required: false },
  label: { type: String as PropType<string>, default: '', required: false },
  placeholder: { type: String as PropType<string>, default: '', required: false },
  value: { type: String as PropType<string>, default: '', required: false },
  readonly: { type: Boolean as PropType<Boolean>, default: false, required: false },
  disabled: { type: Boolean as PropType<Boolean>, default: false, required: false },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}

input[type='text'] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.text-field {
  margin-bottom: 1rem;
  margin: 0 2px;
}

.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
}

.text-field__input {
  display: block;
  width: calc(100% - 6px);
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.text-field__input::placeholder {
  color: #a8abb2;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.text-field__input:focus {
  color: #212529;
  background-color: #fff;
  border-color: #409eff;
  outline: 0;
  box-shadow: 0 0 0 0.1rem rgba(64, 158, 255, 0.8);
  box-shadow: rgb(25, 121, 207) 0px 0px 1px 1px;
}

.text-field__input:disabled,
.text-field__input[readonly] {
  background-color: #f5f5f5;
  opacity: 1;
}
</style>
