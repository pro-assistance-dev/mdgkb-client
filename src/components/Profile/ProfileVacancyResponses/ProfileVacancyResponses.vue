<template>
  <div class="size">
    <div class="my-block">
      <div class="yes-progmam">
        <div class="box">
          <h2>
            Отклики на вакансии
            <div v-if="user.vacancyResponses.some((el) => el.formValue.viewedByUser)" class="sup-cymbol-counter">
              {{ user.vacancyResponses.filter((d) => d.formValue.viewedByUser).length }}
            </div>
          </h2>
        </div>
      </div>
      <div class="table-container">
        <ProfileVacancyResponsesCards />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';

import User from '@/classes/User';
import ProfileVacancyResponsesCards from '@/components/Profile/ProfileVacancyResponses/ProfileVacancyResponsesCards.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ProfileVacancyResponses',
  components: {
    ProfileVacancyResponsesCards,
  },

  setup() {
    const mounted = ref(true);
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
    const user: ComputedRef<User> = computed(() => Provider.store.getters['users/item']);

    onBeforeMount(async () => {
      console.log('VACAN');

      await Provider.store.dispatch('users/get', userId.value);
      mounted.value = true;
    });

    return {
      mounted,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

.title {
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 100%;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
  display: block;
  padding: 0px;
}

.table-container {
  width: 100%;
  // background: #f1f2f7;
}

.no-progmam {
  display: block;
  color: #b5b5b5;
}

.yes-progmam {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.my-block {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  padding: 20px;
  width: calc(100% - 40px);
}

.sup-cymbol-counter {
  display: flex;
  position: absolute;
  right: -20px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-weight: bold;
  background: #2754eb;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.box {
  position: relative;
  margin-right: 20px;
}

ul {
  margin: 0;
  padding: 0;
}

.size {
  // max-width: 900px;
  padding-right: 20px;
}

.application-card {
  width: 100%;
  min-height: 20px;
  border-radius: 5px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 0 5px;
  width: calc(100% - 10px);
  border-radius: none;
  border: none;
}

ul.application-card {
  list-style-type: none;
}

ul.application-card li {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin-bottom: 30px;
}

@media screen and (max-width: 980px) {
  .size {
    padding: 0 10px;
  }
  .table-container {
    display: block;
    width: 100%;
  }
  .box {
    margin-right: 0px;
    background: #ffffff;
  }

  .my-block {
    padding: 10px;
    width: calc(100% - 20px);
  }

  .application-card {
    width: 100%;
    min-height: 20px;
  }

  .card-item {
    justify-content: left;
  }
}

@media screen and (max-width: 560px) {
  .size {
    margin-top: 0px;
  }
  .hidden {
    display: none;
  }
  .title {
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .my-block {
    padding: 5px;
    width: calc(100% - 10px);
  }

  .card-item {
    padding: 0 5px;
    width: calc(100% - 10px);
  }
  .size {
    padding: 0 5px;
  }
}
</style>
