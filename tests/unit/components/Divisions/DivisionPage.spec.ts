import { flushPromises, mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { ElCarousel, ElRate } from 'element-plus';
import { createStore } from 'vuex';
import { ComponentPublicInstance } from 'vue';

import Division from '@/classes/Division';
import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import carouselSwipe from '@/services/CarouselSwipe';

import DateTimeFormatter from '@/services/DateFormat';

import ComponentStub from '../../../__mocks__/ComponentStub';

// jest.mock('vue-router', () => ({
//   useRoute: jest.fn(() => ({ params: { id: 1 } })),
// }));

describe('DivisionPage.vue', () => {
  let wrapper: VueWrapper<any>;
  let store = createStore({
    modules: {
      divisions: {
        actions: {
          get: jest.fn(),
        },
        namespaced: true,
      },
    },
  });
  
  beforeEach(() => {
    const div = new Division();
    div.id = 'id';
    store = createStore({
      modules: {
        divisions: {
          actions: {
            get: jest.fn(),
          },
          getters: {
            division: () => {
              return div;
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

  test('DivisionPage rendering after mount is true.', async () => {
    wrapper = mount(DivisionPage, {
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
          PaidServices: ComponentStub,
          NewsSlider:  ComponentStub,
          ScansSlider: ComponentStub,
          Comments:  ComponentStub,
          SocialMediaCarousel:  ComponentStub,
        },
        components: {
          'el-rate': ElRate,
          'el-carousel': ElCarousel,
        },
      },
    });

    // Act
    expect(wrapper.find('[data-test="division-component"]').exists()).toBe(false);
    // Assert
    await flushPromises();
    expect(wrapper.find('[data-test="division-component"]').exists()).toBe(true);
  });


  // const createWrapper = (): VueWrapper<ComponentPublicInstance> => {
  //   return mount(DivisionPage, {
  //     global: {
  //       provide: {
  //         store,
  //       },
  //       directives: {
  //         $carouselSwipe: carouselSwipe,
  //         touch: jest.fn(),
  //       },
  //       stubs: {
  //         RouterLink: RouterLinkStub,
  //         PaidServices: ComponentStub,
  //         NewsSlider:  ComponentStub,
  //         ScansSlider: ComponentStub,
  //         Comments:  ComponentStub,
  //         SocialMediaCarousel:  ComponentStub,
  //       },
  //       components: {
  //         'el-rate': ElRate,
  //         'el-carousel': ElCarousel,
  //       },
  //       mocks: {
  //         $dateTimeFormatter: new DateTimeFormatter('ru-RU'),
  //       },
  //     },
  //   });
  // };

  // test('Rendering component after mounted is true', async () => {
  //   wrapper = createWrapper();
  //   expect(wrapper.find('[data-test="division-component"]').exists()).toBe(false);
  //   await flushPromises();
  //   expect(wrapper.find('[data-test="division-component"]').exists()).toBe(true);
  // });
});