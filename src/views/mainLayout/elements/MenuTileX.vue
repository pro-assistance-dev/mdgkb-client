<template>
  <div id="item" :class="`${expand ? 'active' : ''} ff${item.id}`" @click.stop="$emit('done'), (expand = !expand)">
    <div id="inner">
      <img id="bg" :src="require(`../../../assets/img/services-menu/banner/${item.id}.png`)" />
      <div id="icon">
        <Component :is="require(`../../../assets/img/services-menu/icon/${item.id}.svg`).default"></Component>
      </div>
      <div id="label">
        {{ item.label }}
      </div>
      <div id="description">
        {{ item.description }}
      </div>
      <div id="actions">
        <el-button round style="background: transparent" @click="$emit('done'), $router.push(item.to)">Подробнее</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import IMenuItem from '@/interfaces/IMenuItem';

export default defineComponent({
  name: 'MenuTileX',
  props: {
    item: {
      type: Object as PropType<IMenuItem>,
      required: true,
    },
  },
  setup() {
    let expand = ref(false);

    const collapseCard = () => {
      expand.value = false;
    };

    return {
      collapseCard,
      expand,
    };
  },
});
</script>

<style scoped>
#item {
  transform-origin: 0px 0px;
  background-size: cover;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  max-width: 144px;
  max-height: 144px;
  background-color: rgba(240, 242, 247, 1);
  cursor: pointer;
  transition: all linear 0.5s;
}

#item.active {
  grid-row: 3 / 1;
  grid-column: 4 / 1;
  max-width: 100%;
  max-height: 100%;
}

#bg {
  width: 500px;
  max-width: 500px;
  height: 320px !important;
  max-height: 320px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: all 1s;
}

#item.active #bg {
  transition: all 1s;
  opacity: 1;
}

#inner {
  transform-origin: 0px 0px;
  padding: 15px;
  height: 100%;
}

#icon {
  position: relative;
  z-index: 0;
}

#icon svg {
  transition: all 1s;
  width: 32px;
}

#label {
  height: 76px;
  width: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: flex;
  align-items: flex-end;
  transition: all 1s;
  transform: scale(1) translate(0, 0);
  transform-origin: 0 0;
}

#item.active #label {
  bottom: 75%;
  width: 312px;
  transform: scale(1.5) translate(0, -35px);
  color: #fff;
}

#description {
  overflow: hidden;
  width: 270px;
  font-size: 80%;
  font-style: italic;
  transform: scale(1) translate(0, 50px);
  transition: all 1.5s;
  transform-origin: 0 0;
}

#item.active #description {
  transform: scale(1) translate(0, 0px);
  color: #fff;
}

#actions {
  overflow: hidden;
  width: 420px;
  transform: scale(1) translate(0, 50px);
  transition: all 1s;
  transform-origin: 0 0;
}

#item.active #actions {
  transform: scale(1) translate(0, 30px);
  color: #fff;
}

#item #actions a {
  color: #fff;
}

#item.active #icon svg path,
#item.active #icon svg circle {
  transition: all 1s;
}

#item.active #icon svg path,
#item.active #icon svg circle {
  fill: #ffffff;
}

.ff01 svg path,
.ff01 svg circle {
  fill: #6201e9;
}
.ff02 svg path,
.ff02 svg circle {
  fill: #ee7d9e;
}
.ff03 svg path,
.ff03 svg circle {
  fill: #fac808;
}
.ff04 svg path,
.ff04 svg circle {
  fill: #2753eb;
}
.ff05 svg path,
.ff05 svg circle {
  fill: #eaadee;
}
.ff06 svg path,
.ff06 svg circle {
  fill: #43ce37;
}
.ff07 svg path,
.ff07 svg circle {
  fill: #9fc438;
}
.ff08 svg path,
.ff08 svg circle {
  fill: #9375b1;
}
.ff09 svg path,
.ff09 svg circle {
  fill: #01ceab;
}
.ff10 svg path,
.ff10 svg circle {
  fill: #01bcee;
}
.ff11 svg path,
.ff11 svg circle {
  fill: #e34b42;
}
.ff12 svg path,
.ff12 svg circle {
  fill: #eaa674;
}
</style>
