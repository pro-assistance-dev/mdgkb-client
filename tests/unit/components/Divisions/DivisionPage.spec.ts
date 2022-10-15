import { flushPromises, RouterLinkStub, shallowMount, VueWrapper } from '@vue/test-utils';
import { ElCarousel, ElRate } from 'element-plus';
import { createStore } from 'vuex';

import Division from '@/classes/Division';
import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import carouselSwipe from '@/services/CarouselSwipe';

import ComponentStub from '../../../__mocks__/ComponentStub';

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
      questions: {
        actions: {
          readAnswers: jest.fn(),
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
    wrapper = shallowMount(DivisionPage, {
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
          NewsSlider: ComponentStub,
          ScansSlider: ComponentStub,
          Comments: ComponentStub,
          SocialMediaCarousel: ComponentStub,
          DivisionSpecialists: ComponentStub,
        },
        components: {
          'el-rate': ElRate,
          'el-carousel': ElCarousel,
        },
      },
    });

    // Act
    expect(wrapper.find('[data-test="division-component"]').exists()).toBe(false);
    wrapper.vm.mounted = true;
    await flushPromises();
    expect(wrapper.find('[data-test="division-component"]').exists()).toBe(true);
  });
});
