<template>
  <div class="text-field" :style="{ margin: margin, padding: padding }">
    <label v-if="label" class="text-field__label" :for="label">
      {{ label }}
    </label>
    <div class="field">
      <div class="left-field">
        <slot name="left" />
      </div>
      <div class="sl" @mouseover="showClearIcon = true" @mouseleave="showClearIcon = false">
        <div v-if="clearable" v-show="showClearIcon" class="clear" @click="clear">
          <IconClose margin="3px 0 0 0" />
        </div>
        <select v-model="model" class="text-field__input" @change="select">
          <option selected hidden>{{ placeholder }}</option>
          <slot />
        </select>
      </div>
      <div class="right-field">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClose from '@/services/components/Icons/IconClose.vue';

const model: unknown = defineModel<unknown>();
const ph: Ref<boolean> = ref(true);
const emits = defineEmits(['change', 'clear']);
defineOptions({ inheritAttrs: false });

const showClearIcon = ref(false);

defineProps({
  text: { type: String as PropType<string>, default: '', required: false },
  label: { type: String as PropType<string>, default: '', required: false },
  placeholder: { type: String as PropType<string>, default: '', required: false },
  value: { type: String as PropType<string>, default: '', required: false },
  readonly: { type: Boolean as PropType<Boolean>, default: false, required: false },
  disabled: { type: Boolean as PropType<Boolean>, default: false, required: false },
  margin: { type: String as PropType<string>, required: false, default: '' },
  padding: { type: String as PropType<string>, required: false, default: '' },
  clearable: { type: Boolean as PropType<boolean>, required: false, default: false },
});

const select = (v: unknown) => {
  ph.value = false;
  emits('change', v);
};
const clear = () => {
  emits('clear', undefined);
  emits('change', undefined);
  ph.value = true;
};
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}

option {
  padding: 0;
}

.field {
  display: flex;
  justify-content: left;
  align-items: center;
  background: $input-background;
  border-radius: $p-input-border-radius;
  border: $p-input-border;
  padding: $p-input-padding;
  margin: $p-input-margin;
  overflow: hidden;
}

.sl {
  width: 100%;
  position: relative;
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
  font-size: $base-font-size;
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
  cursor: pointer;
}

.ph {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  z-index: 0;
  font-family: $input-font;
  font-size: $input-font-size;
  color: $input-font-color;
  white-space: nowrap;
  pointer-events: none;
  cursor: pointer;
}

.text-field__input:focus {
  color: $input-font-color;
  outline: 0;
}

.text-field__input::-ms-expand {
  display: none;
}

.text-field__input:hover {
  border-color: #888;
}

.text-field__input option {
  font-weight: normal;
}

.clear {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -6px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $input-background;
  transition: 0;
  cursor: pointer;
}
</style>
