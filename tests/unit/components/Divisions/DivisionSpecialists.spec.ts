import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { ElCarousel } from 'element-plus';
import { createStore } from 'vuex';

import Division from '@/classes/Division';
import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import carouselSwipe from '@/services/CarouselSwipe';

import Doctor from '../../../../src/classes/Doctor';
import IDivision from '../../../../src/interfaces/IDivision';
import ComponentStub from '../../../__mocks__/ComponentStub';

// jest.mock('vue-router', () => ({
//   useRoute: jest.fn(() => ({ params: { id: 1 } })),
// }));

const createWrapper = (division: IDivision, route?: string): VueWrapper<any> => {
  const store = createStore({
    modules: {
      doctors: {
        actions: {
          get: jest.fn(),
        },
        namespaced: true,
      },
    },
  });
  return shallowMount(DivisionPage, {
    global: {
      provide: {
        store,
      },
      directives: {
        $carouselSwipe: carouselSwipe,
        touch: jest.fn(),
      },
      stubs: {
        DoctorInfoCard: ComponentStub,
      },
      components: {
        'el-carousel': ElCarousel,
      },
    },
  });
};

describe('DivisionSpecialists.vue', () => {
  let division: IDivision;

  beforeEach(() => {
    division = new Division();
  });

  test('DivisionPage rendering after mount is true.', async () => {
    division.doctors = [new Doctor(), new Doctor(), new Doctor()];
    const wrapper = createWrapper(division);
    // Act
    wrapper.vm.mounted = true;
    // await wrapper.setProps({ mounted: true });
    await flushPromises();
    expect(wrapper.findAll('[data-test="doctors-carousel"]')).toHaveLength(division.doctors.length);
  });
});
