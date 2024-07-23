<template>
  <div
    id="line"
    ref="line"
    :style="{
      margin: margin,
    }"
    @mouseenter="circulateColors"
    @mouseleave="stopCirculate"
  >
    <template v-for="(cube, index) in cubes" :key="index">
      <div
        :style="`width:${cube.width}; height:${cube.height}; background-color: ${cube.color}; margin-left: ${gap}px; margin-right: ${gap}px;`"
        class="cube"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

export default defineComponent({
  name: 'CubeLine',
  props: {
    margin: {
      type: String as PropType<string>,
      default: '0',
    },
  },
  setup() {
    interface ICubes {
      width: string;
      height: string;
      color: string;
    }

    const line = ref<HTMLDivElement>();
    const side = ref(12);
    const gap = ref(2);
    const width = ref(0);
    const cubes = ref<ICubes[]>([]);
    const circleInterval = ref<ReturnType<typeof setInterval>>();

    const long = computed(() => side.value * 3);

    const generateCubes = () => {
      if (line.value) {
        width.value = line.value.clientWidth;
      }

      if (!width.value) {
        return [];
      }

      let processedWidth = 0;
      let i = 0;
      const colors = ['#e62c21', '#006bb4', '#0aa249', '#f3911c'];
      let lastColor = '';
      const cubesResult = [];

      const colorChooser = function () {
        let selected = null;
        while (selected === null || selected === lastColor) {
          selected = colors[Math.floor(Math.random() * colors.length)];
        }
        lastColor = selected;
        return selected;
      };

      while (processedWidth < width.value) {
        const color = colorChooser();
        if (i === 3) {
          cubesResult.push({ width: long.value + 'px', height: side.value + 'px', color: color });
          processedWidth += long.value + gap.value * 2;
          i = 0;
        } else {
          cubesResult.push({ width: side.value + 'px', height: side.value + 'px', color: color });
          processedWidth += side.value + gap.value * 2;
          i++;
        }
      }
      cubes.value = cubesResult;
    };

    const colorsStep = () => {
      const setColors: Record<string, string> = {};
      for (const index in cubes.value) {
        let color = null;
        if (Number(index) === 0) {
          color = cubes.value[cubes.value.length - 1].color;
        } else {
          color = cubes.value[Number(index) - 1].color;
        }

        setColors[index] = color;
      }

      let i = 0;
      for (const index in setColors) {
        cubes.value[i].color = setColors[index];
        i += 1;
        // cubes.value.map((cube: ICubes) => (cube.color = setColors[index]));
        // this.$set(this.cubes[index], 'color', setColors[index]);
      }
    };

    const circulateColors = () => {
      circleInterval.value = setInterval(colorsStep, 200);
    };

    const stopCirculate = () => {
      circleInterval.value ? clearInterval(circleInterval.value) : '';
    };

    onMounted(generateCubes);

    return {
      line,
      side,
      gap,
      width,
      cubes,
      circleInterval,
      long,
      generateCubes,
      circulateColors,
      stopCirculate,
    };
  },
});
</script>

<style scoped>
#line {
  display: flex;
}

.cube {
  border-radius: 2px;
  transition: background-color 100ms;
}
.container {
  width: 100%;
  margin: 20px 0;
}
</style>
