<template>
  <h2>Профили помощи</h2>
  <div class="filter-form">
    <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти профиль" class="filter" size="large" />
  </div>
  <div class="wrapper">
    <div v-if="mounted" class="main-medical-profiles">
      <div v-for="item in list" :key="item.name">
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

<script setup lang="ts">
const medicalProfiles: ComputedRef<MedicalProfile[]> = Store.Items('medicalProfiles');
const mounted: Ref<boolean> = ref(false);
const filter = ref('');

onBeforeMount(async () => {
  await Provider.store.dispatch('medicalProfiles/getAll');
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

const list = computed((): MedicalProfile[] => {
  if (filter.value) {
    return medicalProfiles.value.filter((i: MedicalProfile) => {
      if (i.name) return i.name.toLowerCase().includes(filter.value.toLowerCase());
    });
  } else {
    return medicalProfiles.value;
  }
});
</script>

<style lang="scss" scoped>
.filter-form {
  margin: 10px 0;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 38px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}
h2 {
  text-align: center;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

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
