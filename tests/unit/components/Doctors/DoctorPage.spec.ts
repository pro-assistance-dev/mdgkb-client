import { flushPromises, mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { ElCarousel, ElRate } from 'element-plus';
import { createStore } from 'vuex';

import Doctor from '@/classes/Doctor';
import DoctorPage from '@/components/Doctors/DoctorPage.vue';
import carouselSwipe from '@/services/CarouselSwipe';

import ComponentStub from '../../../__mocks__/ComponentStub';

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
    const doc = new Doctor();
    doc.id = 'id';
    store = createStore({
      modules: {
        doctors: {
          actions: {
            get: jest.fn(),
          },
          getters: {
            item: () => {
              return doc;
            },
            comments: () => {
              return [];
            },
          },
          namespaced: true,
        },
      },
    });
  });

  test('DoctorPage rendering after mount is true.', async () => {
    wrapper = mount(DoctorPage, {
      global: {
        provide: {
          store,
        },
        directives: {
          $carouselSwipe: carouselSwipe,
          touch: jest.fn(),
        },
        stubs: {
          RouterLink: RouterLinkStub,
          ElCarouselItem: ComponentStub,
          ElFormItem: ComponentStub,
          Comments: ComponentStub,
        },
        components: {
          'el-rate': ElRate,
          'el-carousel': ElCarousel,
        },
      },
    });

    // Act
    expect(wrapper.find('[data-test="doctor-component"]').exists()).toBe(false);
    // Assert
    await flushPromises();
    expect(wrapper.find('[data-test="doctor-component"]').exists()).toBe(true);
  });
});
