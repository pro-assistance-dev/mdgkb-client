// import { flushPromises, mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
// import { ElButton, ElCheckbox } from 'element-plus';
// import { ComponentPublicInstance } from 'vue';
// import { createStore } from 'vuex';

// import User from '@/classes/User';
// import ProfileSettingsPage from '@/components/Profile/Education/ProfileSettingsPage.vue';
// import User from '@/classes/User';

// import ComponentStub from '../../../__mocks__/ComponentStub';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

// let mockRouter;

describe('ProfileSettingsPage.vue', () => {
  // let wrapper: VueWrapper<ComponentPublicInstance>;
  // let store = createStore({
  //   modules: {
  //     users: {
  //       actions: {
  //         get: jest.fn(),
  //       },
  //       namespaced: true,
  //     },
  //   },
  // });

  // beforeEach(() => {
  //   const user = new User();
  //   store = createStore({
  //     modules: {
  //       users: {
  //         state: {
  //           item: user,
  //         },
  //         actions: {
  //           get: jest.fn(),
  //         },
  //         getters: {
  //           item: (state) => {
  //             return state.item;
  //           },
  //           comments: () => {
  //             return [];
  //           },
  //         },
  //         mutations: {
  //           set(state, item: User) {
  //             state.item = new User(item);
  //           },
  //         },
  //         namespaced: true,
  //       },
  //     },
  //   });
  // });

  // const createWrapper = (route?: string): VueWrapper<ComponentPublicInstance> => {
  //   mockRouter = {
  //     push: jest.fn(),
  //   };
  //   return mount(ProfileSettingsPage, {
  //     global: {
  //       provide: {
  //         store,
  //       },
  //       stubs: {
  //         RouterLink: RouterLinkStub,
  //         ElCheckbox: ComponentStub,
  //       },
  //       mocks: {
  //         $route: route,
  //         $router: mockRouter,
  //       },
  //       components: {
  //         'el-button': ElButton,
  //         'el-check-box': ElCheckbox,
  //       },
  //     },
  //   });
  // };

  // test('Rendering component after mounted is true', async () => {
  //   wrapper = createWrapper();
  //   expect(wrapper.find('[data-test="profile-settings-component"]').exists()).toBe(false);
  //   await flushPromises();
  //   expect(wrapper.find('[data-test="profile-settings-component"]').exists()).toBe(true);
  // });

  // test('Save button push to /profile', async () => {
  //   wrapper = createWrapper();

  //   await wrapper.find('[save-button"]').trigger('click');
  //   expect(mockRouter.push).toHaveBeenCalledTimes(1);
  //   expect(mockRouter.push).toHaveBeenCalledWith('/profile');
  // });
  test('', () => {
    // !TODO fix router error
  });
});
