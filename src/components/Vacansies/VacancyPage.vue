<template>
  <div v-if="mounted" class="page-container">
    <div class="card-item">
      <div class="vacancy-block">
        <div class="vacancy-title">{{ vacancy.title }}</div>
        <div class="vacancy-salary">
          <i>{{ vacancy.getSalary() }}</i>
        </div>
      </div>
      <div class="vacancy-block">
        <div v-if="vacancy.experience">
          <b>Требуемый опыт работы:</b>
          <div>
            <i class="experience">{{ vacancy.experience }}</i>
          </div>
        </div>
        <div v-if="vacancy.schedule" class="schedule-block">
          <div class="schedule-item"><b>График работы:</b></div>
          <span>{{ vacancy.schedule }}</span>
        </div>
      </div>
      <div v-if="vacancy.vacancyDuties" class="vacancy-block">
        <div><b>Должностные обязанности:</b></div>
        <ul>
          <li v-for="duty in vacancy.vacancyDuties" :key="duty.id">
            <i>{{ duty.name }}</i>
          </li>
        </ul>
      </div>
      <div v-if="vacancy.vacancyRequirements" class="vacancy-block">
        <div><b>Требования к кандидату:</b></div>
        <ul>
          <li v-for="requirement in vacancy.vacancyRequirements" :key="requirement.id">
            <i>{{ requirement.name }}</i>
          </li>
        </ul>
      </div>
      <div v-if="vacancy.contactInfo" class="vacancy-block">
        <div><b>Контактная информация:</b></div>
        <div class="vice-doctor-title">
          <!-- <ContactBlock :contact-info="vacancy.contactInfo" /> -->
        </div>
      </div>
      <div class="vacancy-footer">
        <button class="btn" @click="openRespondForm">Откликнуться</button>
      </div>
    </div>
    <div v-if="showForm" id="vacancy-form" class="card-item">
      <div class="vacancy-title">Форма для подачи заявления</div>
      <el-divider />
      <VacancyResponseForm @close="closeRespondForm" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import User from '@/classes/User';
import Vacancy from '@/classes/Vacancy';
import ContactBlock from '@/components/ContactBlock.vue';
import VacancyResponseForm from '@/components/Vacansies/VacancyResponseForm.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';

import Message from '@/services/classes/Message';

  const showForm: Ref<boolean> = ref(false);
  const mounted: Ref<boolean> = ref(false);
  const vacancy: ComputedRef<Vacancy> = Store.Item('vacancies');
  // const user: ComputedRef<User> = Store.Item('auth', 'user');
  // const emailExists: ComputedRef<boolean> = Store.Items('vacancyResponses/emailExists');
  // const isAuth: ComputedRef<boolean> = Store.Item('auth/isAuth');
  const user: ComputedRef<User> = computed(() => Provider.store.getters['auth/user']);
  const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['vacancyResponses/emailExists']);
  const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);

  watch(isAuth, async () => await findEmail());

  const findEmail = async () => {
    Provider.store.commit('vacancyResponses/setUser', user.value);
    await Provider.store.dispatch('vacancyResponses/emailExists', vacancy.value.id);
  };

  const showFormFunc = async () => (showForm.value = true);

  const openRespondForm = async () => {
    await findEmail();
    if (emailExists.value) {
      Message.Error('Вы уже откликались на эту вакансию');
      return;
    }
    await showFormFunc();
    scroll('#vacancy-form');
  };

  const closeRespondForm = () => {
    showForm.value = false;
    scroll();
  };


  onBeforeMount(async () => {
    const ftsp = new FTSP();
    await Store.FTSP('vacancies', { ftsp: ftsp, withCache: true });
    mounted.value = true;
    if (Provider.route().query.respondForm) {
      await openRespondForm();
    }
  });

  // onBeforeMount(async () => {
  //   await Provider.store.dispatch('vacancies/get', Provider.route().params['slug']);
  //   await findEmail();
  //   mounted.value = true;
  //   if (Provider.route().query.respondForm) {
  //     await openRespondForm();
  //   }
  // });

  const register = Store.Commit('admin/showLoading');

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.flex-row {
  justify-content: left;
  display: block;
  flex-wrap: wrap;
  gap: 80px;
  width: 100%;
}

.justify-center {
  justify-content: center;
}

.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

:deep(.avatar-uploader-cover) {
  text-align: unset;
}

.page-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

:deep(.card-item) {
  font-weight: 16px;
  margin-bottom: 20px;

  .btn {
    border-radius: 20px;
    background-color: #31af5e;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);

    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
  }
}

.vacancy-title {
  font-size: 21px;
  font-weight: bold;
}

.vacancy-salary {
  color: #2754eb;
}

.vacancy-block {
  align-items: center;
  margin-bottom: 20px;
}

.vacancy-footer {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 30px;
}

:deep(.vice-doctor-title) {
  display: block;
  width: auto;
  height: auto;
  margin: 16px 0;

  .item {
    font-size: 16px;
  }
}

:deep(.el-tag--plain) {
  background-color: #2754eb;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  padding: 1px 15px 0px 15px;
  cursor: pointer;
}

:deep(.el-tag--plain):hover {
  background-color: #133dcc;
}

.schedule-block {
  display: flex;
  justify-content: left;
}

.experience {
  color: #2754eb;
}

ul {
  list-style: none;
}

ul li:before {
  content: '-';
  position: relative;
  left: -5px;
}

.header-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.register-button {
  display: flex;
  align-items: center;
  text-align: center;
}

.register {
  background: #2754eb;
  border-radius: 40px;
  border: none;
  font-family: roboto;
  font-size: 0.8rem;
  color: #ffffff;
  margin-left: 5px;
  padding: 3px 18px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: #133dcc;
  }
}

.reg-h5 {
  font-size: 10px;
  font-family: Roboto, Verdana, sans-serif;
  font-weight: normal;
}

ul {
  padding-left: 10px;
}
</style>
