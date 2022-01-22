<template>
  <h1>Профили помощи</h1>
  <div class="wrapper">
    <template v-for="medicalProfile in medicalProfiles" :key="medicalProfile.id">
      <el-card class="donor-card">
        <div class="donor-img-container">
          <div class="donor-img-container">{{ medicalProfile.name }}</div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default defineComponent({
  name: 'DonorRulesPage',
  components: {},
  setup() {
    const store = useStore();
    const medicalProfiles: ComputedRef<IMedicalProfile[]> = computed(() => store.getters['medicalProfiles/items']);

    onBeforeMount(async () => {
      await store.dispatch('medicalProfiles/getAll');
    });

    return {
      medicalProfiles,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.donor-card {
  width: 400px;
  border-radius: 15px;
  margin: 10px;
  color: #4a4a4a;
  font-size: 14px;
  position: relative;

  &:hover {
    cursor: pointer;
    margin-top: 5px;
  }

  .donor-img-container {
    margin: 0 10px 10px 0;
    img {
      width: 100%;
    }
    .star-icon-container {
      position: absolute;
      top: 5px;
      right: 30px;
      transition: transform 0.2s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
      .icon {
        font-size: 30px;
        margin: 5px;
        background-color: white;
      }
      .favor {
        color: orange;
      }
    }
  }
  .donor-name {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
}

h2 {
  text-align: center;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.scale-image-container {
  width: 100%;
  height: 100%;
}
.scale-image {
  width: 100%;
  height: 100%;
}
</style>
