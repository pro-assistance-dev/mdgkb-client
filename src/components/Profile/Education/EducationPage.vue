<template>
  <div class="size">
    <div class="title">
      <div class="hidden">
        <h2><b>Мои заявки</b></h2>
      </div>
      <MyApplicationsButton />
    </div>
    <div v-if="!user.formValues.length" class="no-progmam">
      <h3>У вас нет заявок</h3>
    </div>
    <div v-if="user.formValues.length" class="my-block">
      <div class="yes-progmam">
        <div class="box">
          <h2>
            Мои заявки
            <div v-if="user.formValues.length && user.formValues.some((el) => !el.viewedByUser)" class="sup-cymbol-counter">
              {{ user.getNotViewedApplicationsCount() }}
            </div>
          </h2>
        </div>
      </div>
      <div class="card-flex-container card-item">
        <div class="mobile-container">
          <ul class="application-card">
            <li v-for="formValue in user.formValues" :key="formValue.id">
              <ApplicationCard :form="formValue" />
            </li>
          </ul>
        </div>
        <div class="table-container">
          <ApplicationTable :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ApplicationCard from '@/components/Profile/Education/ApplicationCard.vue';
import ApplicationTable from '@/components/Profile/Education/ApplicationTable.vue';
import MyApplicationsButton from '@/components/Profile/Education/MyApplicationsButton.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'EducationPage',
  components: { ApplicationCard, MyApplicationsButton, ApplicationTable },
  setup() {
    const store = useStore();
    const router = useRouter();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => store.getters['users/item']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    };

    const updateFormStatus = async (formValue: IForm, status: IFormStatus) => {
      if (status.isClarified()) {
        router.push(`/profile/education/applications/${formValue.id}`);
        return;
      }
      formValue.setStatus(status, formStatuses.value);
      await store.dispatch('formValues/update', formValue);
    };
    onBeforeMount(async () => {
      await loadUser();
      await store.dispatch('formStatuses/getAll');
    });

    onBeforeUnmount(async () => {
      user.value.setApplicationsViewed();
      await store.dispatch('formValues/updateMany', user.value.formValues);
    });

    return {
      mounted,
      user,
      formStatuses,
      updateFormStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
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
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background: #ffffff;
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
  max-width: 900px;
  padding-right: 20px;
}

.mobile-container {
  display: none;
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
    display: none;
  }

  .mobile-container {
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
    margin-top: 20px;
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
