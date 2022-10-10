import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { v4 as uuidv4 } from 'uuid';

import Division from '@/classes/Division';
import TimePeriod from '@/classes/TimePeriod';
import Timetable from '@/classes/timetable/Timetable';
import TimetableDay from '@/classes/timetable/TimetableDay';
import TreatDirection from '@/classes/TreatDirection';
import DivisionInfo from '@/components/Divisions/DivisionInfo.vue';

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
  return mount(DivisionInfo, {
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

describe('DivisionInfo.vue', () => {
  let wrapper: VueWrapper<any>;
  let division: IDivision;

  beforeEach(() => {
    division = new Division();
  });

  test('card-item-left shown', async () => {
    division.chief.id = uuidv4();
    wrapper = createWrapper(division);

    expect(wrapper.find('[data-test="chief-id"]').exists()).toBe(true);
  });

  test('Show photo if exists, else show alt image', async () => {
    division.chief.id = uuidv4();

    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="chief-photo"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="chief-alt-photo"]').exists()).toBe(true);

    const divisionWithChiefPhoto = new Division();
    divisionWithChiefPhoto.chief.id = uuidv4();
    divisionWithChiefPhoto.chief.human.photo.fileSystemPath = '123';

    await wrapper.setProps({ division: divisionWithChiefPhoto });

    expect(wrapper.find('[data-test="chief-photo"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="chief-alt-photo"]').exists()).toBe(false);
  });

  test('treatDirection name show if exists', async () => {
    division.treatDirection = new TreatDirection();
    division.treatDirection.name = 'Name';
    wrapper = createWrapper(division);

    expect(wrapper.find('[data-test="treatDirection-name"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="treatDirection-name"]').text()).toBe(division.treatDirection.name);
  });

  test('Division name show if exists', async () => {
    division.name = 'Name';
    wrapper = createWrapper(division);

    expect(wrapper.find('[data-test="division-name"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="division-name"]').text()).toBe(division.name);
  });

  test('Division timeTable show if exists', async () => {
    division.timetable = new Timetable();
    wrapper = createWrapper(division);

    expect(wrapper.find('[data-test="timetable"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="timetable"]').text()).toBe('сегодня: ' + division.timetable.getTodayWorkday().getTimetable());
  });

  test('Division timeTable breaksExists show if exists', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="breaks-exists"]').exists()).toBe(false);

    const divisionWithbreakPeriod = new Division();
    divisionWithbreakPeriod.timetable = new Timetable();
    const timetableDay = new TimetableDay();
    timetableDay.weekday.number = new Date().getDay();
    const breakPeriod1 = new TimePeriod();
    breakPeriod1.startTime = '12:00';
    breakPeriod1.endTime = '13:00';
    const breakPeriod2 = new TimePeriod();
    breakPeriod2.startTime = '16:00';
    breakPeriod2.endTime = '16:30';
    timetableDay.breaksExists = true;
    timetableDay.breakPeriods.push(breakPeriod1, breakPeriod2);
    divisionWithbreakPeriod.timetable.timetableDays.push(timetableDay);

    await wrapper.setProps({ division: divisionWithbreakPeriod });

    expect(wrapper.find('[data-test="breaks-exists"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="breaks-exists"]').text()).toBe(
      'Перерыв: ' +
        divisionWithbreakPeriod.timetable.getTodayWorkday().breakPeriods[0].getPeriod?.() +
        divisionWithbreakPeriod.timetable.getTodayWorkday().breakPeriods[1].getPeriod?.()
    );
  });

  test('Division timeTable workday period show if exists', async () => {
    division.timetable = new Timetable();
    wrapper = createWrapper(division);
    const divisionWithWorkday = new Division();
    divisionWithWorkday.timetable = new Timetable();
    const timetableDay1 = new TimetableDay();
    timetableDay1.weekday.shortName = 'Пн';
    const timetableDay2 = new TimetableDay();
    timetableDay2.weekday.shortName = 'Вс';
    timetableDay2.isWeekend = true;

    divisionWithWorkday.timetable.timetableDays.push(timetableDay1, timetableDay2);

    await wrapper.setProps({ division: divisionWithWorkday });

    expect(wrapper.find('[data-test="workday-period"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="workday-period"]').text()).toBe('Пн: с 9:00 до 18:00');
  });

  test('Division timeTable only workday breaksExists show if exists', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="breaks-exists-2"]').exists()).toBe(false);

    const divisionWorkDayWithbreakPeriod = new Division();
    divisionWorkDayWithbreakPeriod.timetable = new Timetable();
    const timetableDay = new TimetableDay();
    timetableDay.weekday.number = new Date().getDay();
    const breakPeriod1 = new TimePeriod();
    breakPeriod1.startTime = '12:00';
    breakPeriod1.endTime = '13:00';
    const breakPeriod2 = new TimePeriod();
    breakPeriod2.startTime = '16:00';
    breakPeriod2.endTime = '16:30';
    timetableDay.breaksExists = true;
    timetableDay.breakPeriods.push(breakPeriod1, breakPeriod2);
    divisionWorkDayWithbreakPeriod.timetable.timetableDays.push(timetableDay);

    await wrapper.setProps({ division: divisionWorkDayWithbreakPeriod });

    expect(wrapper.find('[data-test="breaks-exists-2"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="breaks-exists-2"]').text()).toBe(
      'Перерыв: ' +
        divisionWorkDayWithbreakPeriod.timetable.getTodayWorkday().breakPeriods[0].getPeriod?.() +
        divisionWorkDayWithbreakPeriod.timetable.getTodayWorkday().breakPeriods[1].getPeriod?.()
    );
  });

  test('Division timeTable only workday breaksExists show if exists', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="breaks-exists-3"]').exists()).toBe(false);

    const divisionWorkDayWithbreakPeriod = new Division();
    divisionWorkDayWithbreakPeriod.timetable = new Timetable();
    const timetableDay = new TimetableDay();
    timetableDay.weekday.number = new Date().getDay();
    const breakPeriod1 = new TimePeriod();
    breakPeriod1.startTime = '12:00';
    breakPeriod1.endTime = '13:00';
    const breakPeriod2 = new TimePeriod();
    breakPeriod2.startTime = '16:00';
    breakPeriod2.endTime = '16:30';
    timetableDay.breaksExists = true;
    timetableDay.breakPeriods.push(breakPeriod1, breakPeriod2);
    divisionWorkDayWithbreakPeriod.timetable.timetableDays.push(timetableDay);

    await wrapper.setProps({ division: divisionWorkDayWithbreakPeriod });

    expect(wrapper.find('[data-test="breaks-exists-3"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="breaks-exists-3"]').text()).toBe(
      ', перерыв: ' +
        divisionWorkDayWithbreakPeriod.timetable.getTodayWorkday().breakPeriods[0].getPeriod?.() +
        divisionWorkDayWithbreakPeriod.timetable.getTodayWorkday().breakPeriods[1].getPeriod?.()
    );
  });
});
