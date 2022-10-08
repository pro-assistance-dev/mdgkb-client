import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';

import DivisionSchedule from '@/components/Divisions/DivisionSchedule.vue';

import Division from '../../../../src/classes/Division';
import ScheduleItem from '../../../../src/classes/timetable/ScheduleItems';
import IDivision from '../../../../src/interfaces/IDivision';
import ComponentStub from '../../../__mocks__/ComponentStub';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

const stubs = {
  FavouriteIcon: ComponentStub,
  Rating: ComponentStub,
  RouterLink: RouterLinkStub,
};

let mockRouter;

const createWrapper = (division: IDivision, route?: string): VueWrapper<any> => {
  mockRouter = {
    push: jest.fn(),
  };
  return mount(DivisionSchedule, {
    props: {
      division: division,
    },
    global: {
      stubs: stubs,
      mocks: {
        $route: route,
        $router: mockRouter,
      },
    },
  });
};

describe('DivisionSchedule.vue', () => {
  let wrapper: VueWrapper<any>;
  let division: IDivision;

  beforeEach(() => {
    division = new Division();
  });

  test('Show schedule if scheduleItems > 0', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="schedule-items-block"]').exists()).toBe(false);
    const divisionWithSchedule = new Division();
    divisionWithSchedule.schedule.scheduleItems = [new ScheduleItem()];
    await wrapper.setProps({ division: divisionWithSchedule });
    expect(wrapper.find('[data-test="schedule-items-block"]').exists()).toBe(true);
  });

  test('Show schedule if visitingRules > 0', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="schedule-items-block"]').exists()).toBe(false);
    const divisionWithVisitingRules = new Division();
    divisionWithVisitingRules.visitingRules = [];
    await wrapper.setProps({ division: divisionWithVisitingRules });
    expect(wrapper.find('[data-test="schedule-items-block"]').exists()).toBe(true);
  });
});
