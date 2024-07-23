<template>
  <div class="navbar">
    <!-- <div v-if="devTitle === 'dev'" class="app-title">Разработка</div> -->
    <div class="support-field"><SupportForm /></div>
    <div class="container">
      <div class="menu">
        <div class="menu-left"><BurgerMobile /></div>

        <div class="left-block">
          <button
            v-if="scrollOffset >= 66 || mobileWindow"
            class="menu-item"
            :style="{
              background: hovering ? '#ffffff' : '',
            }"
            @click="$router.push('/')"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
          >
            <img :src="MdgkbLogoMini" alt="mdgkb-logo-mini" @click="Router.To('/')" />
          </button>
        </div>
        <div id="top" class="menu-center"><NavMenu /></div>
        <div class="menu-right">
          <PhoneInfo />
          <div class="support-block"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MdgkbLogoMini from '@/assets/img/mdgkb-logo-mini.webp';

const scrollOffset = ref(0);
const previousOffset = ref(0);
const rememberedOffset = ref(0);
const tabletWindow = ref(window.matchMedia('(max-width: 768px)').matches);
const mobileWindow = ref(window.matchMedia('(max-width: 480px)').matches);
// const devTitle = process.env.VUE_APP_MODE;
const hovering = ref(false);

const handleScroll = () => {
  if (scrollOffset.value > previousOffset.value && rememberedOffset.value != 0) {
    rememberedOffset.value = 0;
  }
  previousOffset.value = scrollOffset.value;
  scrollOffset.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    tabletWindow.value = window.matchMedia('(max-width: 768px)').matches;
    mobileWindow.value = window.matchMedia('(max-width: 480px)').matches;
  });
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.navbar {
  background: #f0f2f7;
  border-top: 1px solid #dfe4ee;
  box-shadow: 0 4px 4px (rgba($color: #000000, $alpha: 0.2));

  display: flex;
  top: 0px;
  z-index: 99;
  height: auto;
  position: sticky;
  margin-top: 0px;
}

.container {
  margin: 0 auto;
  padding: 0;
  height: auto;
}

.icon-menu {
  width: 28px;
  height: 28px;
  stroke: #343e5c;
  transition: 0.25s;
  padding-right: 30px;
  padding-left: 15px;
}

.icon-menu:hover {
  stroke: #379fff;
}

.menu {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
  height: auto;
}

.left-block {
  min-width: 204px;
}

.menu-left {
  display: none;
  align-items: center;
}

.menu-item {
  padding: 23px;
  height: 58px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f7;
  border: none;
  border-radius: 0px;
  text-decoration: none;
}

.app-title {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  padding: 0 6px;
  background: #2754eb;
  color: #ffffff;
  border-radius: 2px;
}

.support-field {
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 101;
  width: 120px;
}

.support-block {
  width: 120px;
}

@media screen and (max-width: 1600px) {
  .support-block {
    width: 120px;
  }
  .menu-right {
    display: flex;
    justify-content: right;
  }
}

@media screen and (max-width: 1330px) {
  .menu-center {
    display: none;
  }

  .menu-left {
    display: flex;
  }

  .left-block {
    min-width: 0px;
  }

  .menu-right {
    display: flex;
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .app-title {
    display: none;
  }
  .support-block {
    display: none;
  }

  .support-field {
    display: none;
  }
}
</style>
