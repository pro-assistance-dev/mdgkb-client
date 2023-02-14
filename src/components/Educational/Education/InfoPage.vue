<template>
  <div class="card-item">
    <h1 style="text-align: center">Основные сведения</h1>
    <el-card>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item v-for="prop in educationalOrganisation.educationalOrganizationProperties" :key="prop.id" :label="prop.name">
          {{ prop.value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'EducationalOrganizationInfo',

  setup() {
    const mounted = ref(false);
    const store = useStore();

    const pageTitle: Ref<string> = ref('Основные сведения');
    const activeMenuName: Ref<string> = ref('Основные сведения');

    const menu = [
      { name: 'Основные сведения' },
      { name: 'Структура и орган управления организации' },
      { name: 'Документы' },
      { name: 'Образование' },
      { name: 'Образовательные стандарты' },
      { name: 'Руководство. Педагогический состав' },
      { name: 'Материально-техническое обеспечение и оснащенность образовательного процесса' },
      { name: 'Стипендии и иные виды материальной поддержки' },
      { name: 'Платные образовательные услуги' },
      { name: 'Финансово-хозяйственная деятельность' },
      { name: 'Вакантные места для приема (перевода)' },
      { name: 'Доступная среда' },
      { name: 'Международное сотрудничество' },
    ];

    const isActive = (name: string): string => {
      return name === activeMenuName.value ? 'is-active' : '';
    };
    const changeTab = (name: string) => {
      activeMenuName.value = name;
    };
    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };
    // const rules = ref(SideOrganizationRules);

    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    onBeforeMount(async () => {
      await store.dispatch('educationalOrganization/get');
      mounted.value = true;
    });

    return {
      filteredDoctors,
      mounted,
      // rules,
      test,
      menu,
      isActive,
      changeTab,
      pageTitle,
      activeMenuName,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
