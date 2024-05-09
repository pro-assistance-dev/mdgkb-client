<template>    
  <div class="text-field" :style="{margin: margin, padding: padding}" >
    <label v-if="label" class="text-field__label" :for="label">
        {{ label }}
      </label>
    <div class="field">
      <div class="left-field"><slot name="left" /></div>
      <select class="text-field__input" >
        <option value disabled selected>{{ placeholder }}</option>
        <slot />
      </select>
      <div class="right-field"><slot name="right" /></div>
    </div>
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
  margin: { type: String as PropType<string>, required: false, default: '' },
  padding: { type: String as PropType<string>, required: false, default: '' },
});

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}

option {
  padding: 0;
}

.field {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  background: $input-background;
  border-radius: $border-radius;
  padding: $p-input-padding;
  margin: $p-input-margin;
  overflow: hidden;
}

.right-field {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
}

.left-field {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
}

.text-field {
  width: $input-width;
}

.text-field__label {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  font-family: $input-font;
  color: $input-label-color;
  font-size: $base-font-small-size;
  margin: $input-label-margin;
}

.text-field__input {
  width: 100%;
  height: $input-height;
  font-family: $input-font;
  font-size: $input-font-size;
  background: $input-background;
  color: $input-font-color;
  border: $input-border;
  margin: $input-margin;
  padding: $input-padding;
  padding: 0;
}

.text-field__input::placeholder {
  font-family: $input-font;
  font-size: $input-font-size;
  color: $input-font-color;
}

.text-field__input:focus {
  color: $input-font-color;
  outline: 0;
}

// .text-field__input:disabled,
// .text-field__input[readonly] {
//   background-color: $input-readonly-background;
//   opacity: 1;
// }


.text-field__input::-ms-expand { display: none; } 
 .text-field__input:hover { 
  
  border-color: #888; } 
 .text-field__input:focus { 
    // border-color: #aaa; 
    // box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    // box-shadow: 0 0 0 3px -moz-mac-focusring; 
    // color: #222;
    // outline: none; 
} 
 .text-field__input option { 
  
  font-weight:normal; } 
//  *[dir="rtl"] .text-field__input, :root:lang(ar) .text-field__input, :root:lang(iw) .text-field__input { 
//     background-position: left .7em top 50%, 0 0; 
//     padding: .6em .8em .5em 1.4em; 
// }
</style>
