import { VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

describe('DoctorPage.vue', () => {
  let wrapper: VueWrapper<any>;
  let store = createStore({
    modules: {
      doctors: {
        actions: {
          get: jest.fn(),
        },
        namespaced: true,
      },
    },
  });
  beforeEach(() => {
    store = createStore({
      modules: {
        doctors: {
          actions: {
            get: jest.fn(),
          },
          namespaced: true,
        },
      },
    });
  });

  test('DoctorPage rendering after mount is true.', async () => {
    // wrapper = mount(DoctorPage, {
    //   // data: () => {
    //   //   return {
    //   //     mounted: true,
    //   //   };
    //   // },
    //   global: {
    //     provide: {
    //       store,
    //     },
    //   },
    // });
    // Act
    // expect(wrapper.find('#doctor').exists()).toBe(false);
    // Assert
    // wrapper.vm.mounted = true;
    // console.log(wrapper.vm.mounted);
    // expect(wrapper.find('[data-test="doctorPageContainer"]').exists()).toBe(true);
  });
});
