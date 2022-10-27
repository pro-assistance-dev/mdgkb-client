<template>
  <div class="tab">
    <input :id="tabId" type="checkbox" name="tabs"/>
    <svg v-if="isCollaps" class="icon-arrow">
      <use xlink:href="#arrow-down"></use>
    </svg>
    <label :for="tabId">
      <div class="tab-name">
        <slot name="inside-title" />
      </div> 
    </label>
    <div :style="{  maxHeight: isCollaps ? '' : '100vh', }" class="tab-content">
      <slot name="inside-content" />
    </div>
  </div>
  <Arrow />
</template> 

<script lang="ts">
import { defineComponent, PropType, Ref, ref  } from 'vue';
import Arrow from '@/assets/svg/CollapsContainer/Arrow.svg'

export default defineComponent({
  name: 'CollapsContainer',
  components: { Arrow },
  
  props: {
    tabId: { type: String as PropType<string>, required: true },
    isCollaps: { type: Boolean as PropType<boolean>, default: true },
    collapsed: { type: Boolean as PropType<boolean>, default: true },
  },

  setup (prop) {
    const isCollapse: Ref<boolean> = ref(false);
    const isDrawerOpen: Ref<boolean> = ref(false);
    

    const toggleDrawer = (open?: boolean) => {
      isDrawerOpen.value = open ? open : !isDrawerOpen.value;
    };

    const menuClickHandler = () => {
      toggleDrawer(false);
    };

    return {
      isDrawerOpen,
      menuClickHandler,   
    }

  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.tab {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgb(black, 0.1);
  border-radius: $normal-border-radius;
  background: #ffffff;
  margin-top: 10px;

  &-name {
    cursor: pointer;
    position: relative;
    display: flex;
    // justify-content: space-between;
    // font-family: Comfortaa, Arial, Helvetica, sans-serif;
    // font-size: 22px;
    // letter-spacing: 0.1em;
    // color: $site_dark_gray;
    height: 60px;
    align-items: center;
    font-weight: bold;
    padding: 0 20px;
  }
}

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.tab-content {
  max-height: 0;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;
  color: #343e5c;
  padding-right: 5px;
}

.tab input:checked ~ .icon-arrow {
    transform: rotate(180deg);
}

.tab input:checked ~ .tab-content {
  max-height: 100vh;
  visibility: visible;
}

.tab label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  text-align: center;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.tab-window {
  width: 100%;
}

.hidden {
  display: none;
}

.icon-arrow {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 28px;
  height: 28px;
  fill: $site_dark_gray;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}


// #menu__toggle:checked ~ .menu__box {
//   visibility: visible;
//   .menu-zone {
//     visibility: visible;
//     left: 0;
//   }
// }
</style>
