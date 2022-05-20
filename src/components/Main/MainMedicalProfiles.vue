<template>
  <component
    :is="'MainContainer'"
    header-title="Профили медицинской помощи"
    footer-button-title="Все профили"
    footer-button-link="/medical-profiles"
  >
    <div v-if="mounted" class="main-medical-profiles">
      <div v-for="item in medicalProfiles.splice(0, 12)" :key="item.name">
        <div
          :style="{ 'background-color': item.background }"
          class="main-medical-profiles-card card-hover"
          @click="$router.push(`/medical-profiles/${item.id}`)"
        >
          <div class="main-medical-profiles-card-name">
            {{ item.name }}
          </div>
          <div class="icon">
            <BaseIcon width="90" height="90" :icon-name="item.icon">
              <HelpProfileIcon :svg-code="item.svgCode" />
            </BaseIcon>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mounted" class="main-medical-profiles-mobile1">
      <div v-for="item in medicalProfiles.splice(0, 12)" :key="item.name">
        <div
          :style="{ 'background-color': item.background }"
          class="main-medical-profiles-card card-hover"
          @click="$router.push(`/medical-profiles/${item.id}`)"
        >
          <div class="main-medical-profiles-card-name">
            {{ item.name }}
          </div>
          <div class="icon">
            <BaseIcon width="60" height="60" :icon-name="item.icon">
              <HelpProfileIcon :svg-code="item.svgCode" />
            </BaseIcon>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mounted" class="main-medical-profiles-mobile2">
      <div v-for="item in medicalProfiles.splice(0, 12)" :key="item.name">
        <div
          :style="{ 'background-color': item.background }"
          class="main-medical-profiles-card card-hover"
          @click="$router.push(`/medical-profiles/${item.id}`)"
        >
          <div class="main-medical-profiles-card-name">
            {{ item.name }}
          </div>
          <div class="icon">
            <BaseIcon width="60" height="60" :icon-name="item.icon">
              <HelpProfileIcon :svg-code="item.svgCode" />
            </BaseIcon>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mounted" class="main-medical-profiles-mobile3">
      <div v-for="item in medicalProfiles.splice(0, 9)" :key="item.name">
        <div
          :style="{ 'background-color': item.background }"
          class="main-medical-profiles-card card-hover"
          @click="$router.push(`/medical-profiles/${item.id}`)"
        >
          <div class="main-medical-profiles-card-name">
            {{ item.name }}
          </div>
          <div class="icon">
            <BaseIcon width="60" height="60" :icon-name="item.icon">
              <HelpProfileIcon :svg-code="item.svgCode" />
            </BaseIcon>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mounted" class="main-medical-profiles-mobile4">
      <div v-for="item in medicalProfiles.splice(0, 8)" :key="item.name">
        <div
          :style="{ 'background-color': item.background }"
          class="main-medical-profiles-card card-hover"
          @click="$router.push(`/medical-profiles/${item.id}`)"
        >
          <div class="main-medical-profiles-card-name">
            {{ item.name }}
          </div>
          <div class="icon">
            <BaseIcon width="80" height="80" :icon-name="item.icon">
              <HelpProfileIcon :svg-code="item.svgCode" />
            </BaseIcon>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import BaseIcon from '@/components/Base/MedicalIcons/BaseIconMedicalProfiles.vue';
import HelpProfileIcon from '@/components/Base/MedicalIcons/icons/HelpProfileIcon.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default defineComponent({
  name: 'MainMedicalProfiles',
  components: {
    MainContainer,
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
      return `/src/assets/medicine/${i + 1}.webp`;
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
.main-medical-profiles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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

.main-medical-profiles-mobile1 {
  display: none;
}

.main-medical-profiles-mobile2 {
  display: none;
}

.main-medical-profiles-mobile3 {
  display: none;
}

.main-medical-profiles-mobile4 {
  display: none;
}

@media screen and (max-width: 1300px) {
  .main-medical-profiles {
    display: none;
  }

  .main-medical-profiles-mobile2 {
    display: none;
  }

  .main-medical-profiles-mobile3 {
    display: none;
  }

  .main-medical-profiles-mobile4 {
    display: none;
  }

  .main-medical-profiles-mobile1 {
    margin: 0 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
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

  :deep(.main-medical-profiles-card-name) {
    font-size: 12px;
    margin: 0 10px;
  }
}

@media screen and (max-width: 1100px) {
  .main-medical-profiles {
    display: none;
  }

  .main-medical-profiles-mobile1 {
    display: none;
  }

  .main-medical-profiles-mobile3 {
    display: none;
  }

  .main-medical-profiles-mobile4 {
    display: none;
  }

  .main-medical-profiles-mobile2 {
    margin: 0 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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
        max-height: 100px;
        max-width: 100px;
        margin: 5px;
        transform: scale(0.65);
        fill: white;
      }
    }
  }
  :deep(.main-medical-profiles-card-name) {
    font-size: 12px;
    margin: 0 10px;
  }
}

@media screen and (max-width: 768px) {
  .main-medical-profiles {
    display: none;
  }

  .main-medical-profiles-mobile1 {
    display: none;
  }

  .main-medical-profiles-mobile2 {
    display: none;
  }

  .main-medical-profiles-mobile4 {
    display: none;
  }

  .main-medical-profiles-mobile3 {
    margin: 0 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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
}

@media screen and (max-width: 680px) {
  :deep(.main-medical-profiles-card-name) {
    font-size: 16px;
    margin: 0 10px;
  }

  .main-medical-profiles {
    display: none;
  }

  .main-medical-profiles-mobile1 {
    display: none;
  }

  .main-medical-profiles-mobile2 {
    display: none;
  }

  .main-medical-profiles-mobile3 {
    display: none;
  }

  .main-medical-profiles-mobile4 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
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
  :deep(.main-medical-profiles-card) {
    padding: 20px 0 200px;
  }
}

@media screen and (max-width: 480px) {
  :deep(.main-medical-profiles-card) {
    padding: 20px 0 170px;
  }

  :deep(.main-medical-profiles-card-name) {
    font-size: 16px;
    margin: 0 10px;
  }

  .main-medical-profiles {
    display: none;
  }

  .main-medical-profiles-mobile1 {
    display: none;
  }

  .main-medical-profiles-mobile2 {
    display: none;
  }

  .main-medical-profiles-mobile4 {
    display: none;
  }

  .main-medical-profiles-mobile3 {
    width: 250px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;

    &-card {
      text-align: center;
      border-radius: 5px;
      background-color: #34adcb;
      color: white;
      letter-spacing: 1px;
      position: relative;
      width: 100%;
      height: 0px;
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

  :deep(.main-medical-profiles-card card-hover) {
    height: 200px;
  }
}
</style>
