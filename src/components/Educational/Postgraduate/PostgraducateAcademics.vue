<template>
  <div v-if="mounted && educationalAcademics.length" class="flex">
    <div v-for="item in educationalAcademics" :key="item.id" class="doctors-wrapper">
      <AcademicCard :employee="item.employee" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EducationalAcademic from '@/classes/EducationalAcademic';

const mounted = ref(false);
const educationalAcademics: Ref<EducationalAcademic[]> = Store.Items('educationalAcademics');

onBeforeMount(async () => {
  await Store.GetAll('educationalAcademics');
  mounted.value = true;
});
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  margin-top: 20px;
}

:deep(.card-content) {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;

  .card-header {
    text-align: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }

  h2 {
    margin: 0;
  }

  .article-body {
    text-align: justify;
  }
}

.doctors-wrapper {
  margin: 10px;
}

.el-descriptions__label {
  font-size: 15px;
}

.flex-row {
  display: flex;
}

.doctor-img-container {
  margin: 0 10px 10px 0;
}

@media screen and (max-width: 687px) {
  .flex {
    justify-content: center;
  }
}
</style>
