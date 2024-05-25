<template>
  <button
    class="button"
    :style="buttonStyle"
    :class="buttonClass"
    :disabled="disabled"
    @click.prevent="changeState"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-if="icon" class="button-icon" :style="buttonIconStyle">
      <!-- {{ icon }} -->
      <svg :class="iconClass">
        <use :xlink:href="'#' + icon"></use>
      </svg>
    </div>
    <div class="text" :style="textStyle">
      {{ text }}
    </div>
    <component :is="iconComponent[icon]" />
  </button>
</template>

<script setup lang="ts">
// import Aright from '@/assets/svg/Aright.svg';
// import Back from '@/assets/svg/Back.svg';
// import Close from '@/assets/svg/Close.svg';
// import Commission from '@/assets/svg/Commission.svg';
// import Del from '@/assets/svg/Del.svg';
// import Download from '@/assets/svg/Download.svg';
// import EditTitle from '@/assets/svg/EditTitle.svg';
// import Edit from '@/assets/svg/Edit.svg';
// import Filter from '@/assets/svg/Filter.svg';
// import Outlined from '@/assets/svg/Outlined.svg';
// import Plus from '@/assets/svg/Plus.svg';
// import Save from '@/assets/svg/Save.svg';
// import Settings from '@/assets/svg/Settings.svg';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  text: { type: String as PropType<string>, default: '', required: false },
  color: { type: String as PropType<string>, default: '', required: false },
  colorSwap: { type: Boolean as PropType<boolean>, default: false, required: false },
  background: { type: String as PropType<string>, default: '', required: false },
  backgroundHover: { type: String as PropType<string>, default: '', required: false },
  margin: { type: String as PropType<string>, required: false, default: '' },
  width: { type: String as PropType<string>, required: false, default: '' },
  height: { type: String as PropType<string>, required: false, default: '' },
  borderRadius: { type: String as PropType<string>, required: false, default: '' },
  border: { type: Boolean as PropType<boolean>, required: false, default: true },
  withIcon: { type: Boolean as PropType<boolean>, required: false, default: false },
  fontSize: { type: String as PropType<string>, required: false, default: '' },
  toggleMode: { type: Boolean as PropType<boolean>, required: false, default: false },
  buttonClass: { type: String as PropType<string>, required: false, default: '' },
  iconClass: { type: String as PropType<string>, required: false, default: '' },
  icon: { type: String as PropType<string>, required: false, default: '' },
  isToggle: { type: Boolean as PropType<boolean>, required: false, default: false },
  inverse: { type: Boolean as PropType<boolean>, required: false, default: false },
  disabled: { type: Boolean as PropType<boolean>, required: false, default: false },
});

const iconComponent = {
  // edit: Edit,
  // 'edit-title': EditTitle,
  // aright: Aright,
  // close: Close,
  // back: Back,
  // commission: Commission,
  // del: Del,
  // download: Download,
  // filter: Filter,
  // outlined: Outlined,
  // plus: Plus,
  // save: Save,
  // settings: Settings,
};
// const dynSvg = computed(() => import(`@/assets/svg/${props.}`))
const emit = defineEmits(['click']);
const hovering = ref(false);
const changeState = () => {
  emit('click');
};

const buttonIsActive = computed(() => props.isToggle || hovering.value);
const getActiveColor = (active: string, inactive: string): string => {
  return buttonIsActive.value ? active : inactive;
};

const getInvertedColor = (): string => {
  return props.colorSwap ? getActiveColor(props.background, props.color) : props.color;
};

const buttonStyle = computed(() => {
  return {
    color: props.toggleMode ? getActiveColor(props.color, '#B0A4C0') : getInvertedColor(),
    background: props.colorSwap ? getActiveColor(props.color, props.background) : getActiveColor(props.backgroundHover, props.background),
    margin: props.margin,
    minWidth: props.width,
    maxWidth: props.width,
    border: props.border ? '' : 'none',
    borderColor: props.toggleMode ? getActiveColor(props.color, '#B0A4C0') : props.color,
    height: props.height,
    borderRadius: props.borderRadius,
    fontSize: props.fontSize,
  };
});

const getAnimation = (): string => {
  return props.colorSwap || props.toggleMode
    ? getActiveColor(props.backgroundHover, props.background)
    : getActiveColor('scale(1.1, 1.1)', '');
};

const buttonIconStyle = computed(() => {
  return {
    fill: props.color,
    marginRight: props.text ? '10px' : '',
    transform: getAnimation(),

    transition: props.colorSwap || props.toggleMode ? '' : '0s',
  };
});

const textStyle = computed(() => {
  return {
    transform: getAnimation(),
    transition: props.colorSwap || props.toggleMode ? '' : '0s',
  };
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  transition: 0.15s;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  overflow: hidden;
}

.button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.text {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
  height: auto;
  max-height: 36px;
}
</style>
