import { mount, VueWrapper } from '@vue/test-utils';

import TimePeriod from '@/classes/TimePeriod';
import Timetable from '@/classes/timetable/Timetable';
import TimetableDay from '@/classes/timetable/TimetableDay';
import TimetableComponent from '@/components/TimetableComponent.vue';
import ITimetable from '@/interfaces/timetables/ITimetable';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

const createWrapper = (timetable: ITimetable, route?: string): VueWrapper<any> => {
  return mount(TimetableComponent, {
    props: {
      timetable: timetable,
    },
    // global: {
    //   stubs: stubs,
    //   mocks: {
    //     $route: route,
    //     $router: mockRouter,
    //   },
    // },
  });
};

describe('Timetable.vue', () => {
  let wrapper: VueWrapper<any>;
  let timetable: ITimetable;

  beforeEach(() => {
    timetable = new Timetable();
  });

  test('Division timeTable show if exists', async () => {
    timetable = new Timetable();
    wrapper = createWrapper(timetable);

    expect(wrapper.find('[data-test="timetable"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="timetable"]').text()).toBe('сегодня: ' + timetable.getTodayWorkday().getTimetable());
  });
  //
  test('Division timeTable breaksExists show if exists', async () => {
    wrapper = createWrapper(timetable);
    expect(wrapper.find('[data-test="breaks-exists"]').exists()).toBe(false);

    const divisionWithbreakPeriod = new Timetable();
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
    divisionWithbreakPeriod.timetableDays.push(timetableDay);

    await wrapper.setProps({ timetable: divisionWithbreakPeriod });

    expect(wrapper.find('[data-test="breaks-exists"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="breaks-exists"]').text()).toBe(
      'Перерыв: ' +
        divisionWithbreakPeriod.getTodayWorkday().breakPeriods[0].getPeriod() +
        divisionWithbreakPeriod.getTodayWorkday().breakPeriods[1].getPeriod()
    );
  });

  test('Division timeTable workday period show if exists', async () => {
    wrapper = createWrapper(timetable);
    const timetableWithWorkDay = new Timetable();
    const timetableDay1 = new TimetableDay();
    timetableDay1.weekday.shortName = 'Пн';
    const timetableDay2 = new TimetableDay();
    timetableDay2.weekday.shortName = 'Вс';
    timetableDay2.isWeekend = true;

    timetableWithWorkDay.timetableDays.push(timetableDay1, timetableDay2);

    await wrapper.setProps({ timetable: timetableWithWorkDay });

    expect(wrapper.find('[data-test="workday-period"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="workday-period"]').text()).toBe('Пн: с 9:00 до 18:00   Вс: выходной');
  });

  test('Division timeTable only workday breaksExists show if exists', async () => {
    wrapper = createWrapper(timetable);
    expect(wrapper.find('[data-test="breaks-exists-2"]').exists()).toBe(false);

    const timetableWorkDayWithbreakPeriod = new Timetable();
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
    timetableWorkDayWithbreakPeriod.timetableDays.push(timetableDay);

    await wrapper.setProps({ timetable: timetableWorkDayWithbreakPeriod });

    expect(wrapper.find('[data-test="breaks-exists-2"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="breaks-exists-2"]').text()).toBe(
      'Перерыв: ' +
        timetableWorkDayWithbreakPeriod.getTodayWorkday().breakPeriods[0].getPeriod() +
        timetableWorkDayWithbreakPeriod.getTodayWorkday().breakPeriods[1].getPeriod()
    );
  });
  //
  test('Division timeTable only workday breaksExists show if exists', async () => {
    wrapper = createWrapper(timetable);
    expect(wrapper.find('[data-test="breaks-exists-3"]').exists()).toBe(false);

    const timetableWorkDayWithbreakPeriod = new Timetable();
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
    timetableWorkDayWithbreakPeriod.timetableDays.push(timetableDay);

    await wrapper.setProps({ timetable: timetableWorkDayWithbreakPeriod });

    expect(wrapper.find('[data-test="breaks-exists-3"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="breaks-exists-3"]').text()).toBe(
      ', перерыв: ' +
        timetableWorkDayWithbreakPeriod.getTodayWorkday().breakPeriods[0].getPeriod() +
        timetableWorkDayWithbreakPeriod.getTodayWorkday().breakPeriods[1].getPeriod()
    );
  });
});
