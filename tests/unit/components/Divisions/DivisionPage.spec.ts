import { flushPromises, mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { ElCarousel, ElRate } from 'element-plus';
import { createStore } from 'vuex';

import Division from '@/classes/Division';
import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import carouselSwipe from '@/services/CarouselSwipe';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

import ComponentStub from '../../../__mocks__/ComponentStub';

jest.mock('vue-router', () => ({
  Provider,
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

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
            item: () => {
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
    expect(wrapper.find('[data-test="division-component"]').exists()).toBe(false);
    // Assert
    await flushPromises();
    expect(wrapper.find('[data-test="division-component"]').exists()).toBe(true);
  });

});