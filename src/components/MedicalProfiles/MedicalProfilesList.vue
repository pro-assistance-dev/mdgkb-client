<template>
  <h2>Профили помощи</h2>
  <div class="wrapper">
    <div v-if="mounted" class="main-medical-profiles">
      <div v-for="item in medicalProfiles" :key="item.name">
        <div
          :style="{ 'background-color': item.background }"
          class="main-medical-profiles-card card-hover"
          @click="$router.push(`/medical-profiles/${item.id}`)"
        >
          <div class="main-medical-profiles-card-name">
            {{ item.name }}
          </div>
          <div class="icon">
            <BaseIcon width="120" height="120" :icon-name="item.icon">
              <HelpProfileIcon :svg-code="item.svgCode" />
            </BaseIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import BaseIcon from '@/components/Base/MedicalIcons/BaseIconMedicalProfiles.vue';
import HelpProfileIcon from '@/components/Base/MedicalIcons/icons/HelpProfileIcon.vue';
import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default defineComponent({
  name: 'MainMedicalProfiles',
  components: {
    BaseIcon,
    HelpProfileIcon,
  },
  setup() {
    const store = useStore();
    const medicalProfiles: ComputedRef<IMedicalProfile[]> = computed(() => store.getters['medicalProfiles/items']);
    const mounted: Ref<boolean> = ref(false);
    onBeforeMount(async () => {
      await store.dispatch('medicalProfiles/getAll');
      setColors();
      mounted.value = true;
    });

    const setColors = (): void => {
      const colors: string[] = ['#31af5e', '#ff4d3b', '#006BB5', '#f3911c'];
      let i = 0;
      medicalProfiles.value.forEach((item) => {
        item.background = colors[i];
        i === colors.length - 1 ? (i = 0) : i++;
      });
    };
    const getIcon = (i: number): string => {
      return `/src/assets/medicine/${i + 1}.png`;
    };
    return {
      getIcon,
      medicalProfiles,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
// h1 {
//   text-align: center;
// }

// .donor-card {
//   width: 400px;
//   border-radius: 15px;
//   margin: 10px;
//   color: #4a4a4a;
//   font-size: 14px;
//   position: relative;

//   &:hover {
//     cursor: pointer;
//     margin-top: 5px;
//   }

//   .donor-img-container {
//     margin: 0 10px 10px 0;
//     img {
//       width: 100%;
//     }
//     .star-icon-container {
//       position: absolute;
//       top: 5px;
//       right: 30px;
//       transition: transform 0.2s;
//       &:hover {
//         cursor: pointer;
//         transform: scale(1.1);
//       }
//       .icon {
//         font-size: 30px;
//         margin: 5px;
//         background-color: white;
//       }
//       .favor {
//         color: orange;
//       }
//     }
//   }
//   .donor-name {
//     font-size: 16px;
//     font-weight: 600;
//     cursor: pointer;
//   }
// }

h2 {
  text-align: center;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

// .scale-image-container {
//   width: 100%;
//   height: 100%;
// }
// .scale-image {
//   width: 100%;
//   height: 100%;
// }

.main-medical-profiles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  &-card {
    text-align: center;
    border-radius: 5px;
    background-color: #34adcb;
    color: white;
    letter-spacing: 1px;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 20px;
    padding-bottom: 100%;
    &-name {
      height: 20%;
    }
    &-svg {
      max-height: 150px;
      max-width: 150px;
      margin: 5px;
      transform: scale(0.65);
      fill: white;
    }
  }
}
.icon {
  margin: 80px 30px 10px 30px;
  // padding-top: 10px;
  // border: 3px solid #ffffff;
  border-radius: 5px;
}
</style>
