import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { ElForm } from 'element-plus';
import { ComponentPublicInstance } from 'vue';
import { createStore } from 'vuex';

import User from '@/classes/User';
import ProfileInfoPage from '@/components/Profile/ProfileInfoPage.vue';
import IUser from '@/interfaces/IUser';
import DateTimeFormatter from '@/services/DateFormat';

import ComponentStub from '../../../__mocks__/ComponentStub';

const dateTimeFormatter = new DateTimeFormatter('ru-RU');

describe('ProfileInfoPage.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let store = createStore({
    modules: {
      users: {
        actions: {
          get: jest.fn(),
        },
        namespaced: true,
      },
    },
  });

  beforeEach(() => {
    const user = new User();
    store = createStore({
      modules: {
        users: {
          state: {
            item: user,
          },
          actions: {
            get: jest.fn(),
          },
          getters: {
            item: (state) => {
              return state.item;
            },
            comments: () => {
              return [];
            },
          },
          mutations: {
            set(state, item: IUser) {
              state.item = new User(item);
            },
          },
          namespaced: true,
        },
      },
    });
  });

  const createWrapper = (): VueWrapper<ComponentPublicInstance> => {
    return mount(ProfileInfoPage, {
      global: {
        provide: {
          store,
        },
        stubs: {
          ElFormItem: ComponentStub,
          UploaderSingleScan: ComponentStub,
          EducationPage: ComponentStub,
        },
        components: {
          'el-form': ElForm,
        },
        mocks: {
          $dateTimeFormatter: new DateTimeFormatter('ru-RU'),
        },
      },
    });
  };

  test('Rendering component after mounted is true', async () => {
    wrapper = createWrapper();
    expect(wrapper.find('[data-test="profile-info-component"]').exists()).toBe(false);
    await flushPromises();
    expect(wrapper.find('[data-test="profile-info-component"]').exists()).toBe(true);
  });

  test('Users full name shows', async () => {
    wrapper = createWrapper();
    const user = new User();
    user.human.name = 'Иван';
    user.human.surname = 'Иванович';
    user.human.patronymic = 'Иваноч';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="full-name"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="full-name"]').text()).toBe(user.human.getFullName());
  });

  test('Users email shows', async () => {
    wrapper = createWrapper();
    const user = new User();
    user.email = 'ivanov@yandex.ru';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="user-email"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="user-email"]').text()).toBe(user.email);
  });

  test('Phone shows if exists', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('[data-test="user-phone"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="user-phone"]').text()).toBe('Не указан');
    const user = new User();
    user.phone = '+79999999999';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="user-phone"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="user-phone"]').text()).toBe(user.phone);
  });

  test('Birth date shows', async () => {
    wrapper = createWrapper();
    const user = new User();
    user.human.dateBirth = new Date();
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="user-birth-date"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="user-birth-date"]').text()).toBe(dateTimeFormatter.format(user.human.dateBirth));
  });

  test('User gender shows', async () => {
    wrapper = createWrapper();
    await flushPromises();
    // Displays in ComponentPublicInstance cases by default human.isMale = true
    expect(wrapper.find('[data-test="user-gender"]').exists()).toBe(true);
    const user = new User();
    user.human.isMale = false;
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="user-gender"]').text()).toBe('Женский');
    user.human.isMale = true;
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="user-gender"]').text()).toBe('Мужской');
  });

  test('Place birth shows if exists', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('[data-test="place-birth"]').exists()).toBe(false);
    const user = new User();
    user.human.placeBirth = 'Москва';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="place-birth"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="place-birth"]').text()).toBe(user.human.placeBirth);
  });

  test('Сitizenshiph shows if exists', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('[data-test="citizenship"]').exists()).toBe(false);
    const user = new User();
    user.human.citizenship = 'РФ';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="citizenship"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="citizenship"]').text()).toBe(user.human.citizenship);
  });

  test('Snils shows if exists', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('[data-test="snils"]').exists()).toBe(false);
    const user = new User();
    user.human.snils = '123';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="snils"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="snils"]').text()).toBe(user.human.snils);
  });

  test('Address shows if exists', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('[data-test="address"]').exists()).toBe(false);
    const user = new User();
    user.human.address = 'Москва';
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.find('[data-test="address"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="address"]').text()).toBe(user.human.address);
  });
});
