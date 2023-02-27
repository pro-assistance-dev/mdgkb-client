import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';

import Doctor from '@/classes/Doctor';
import Regalia from '@/classes/Regalia';
import DoctorAchievements from '@/components/Doctors/DoctorAchievements.vue';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

const stubs = {
  RouterLink: RouterLinkStub,
};

let mockRouter;

const createWrapper = (doctor: Doctor, route?: string): VueWrapper<any> => {
  mockRouter = {
    push: jest.fn(),
  };
  return mount(DoctorAchievements, {
    props: {
      doctor: doctor,
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

describe('DoctorAchievements.vue', () => {
  let wrapper: VueWrapper<any>;
  let doctor: Doctor;

  beforeEach(() => {
    doctor = new Doctor();
  });

  test('achievements-component shows', async () => {
    doctor.employee.academicDegree = 'academicDegree';
    doctor.employee.academicRank = 'academicRank';
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      r.name = String(i);
      doctor.employee.regalias.push(r);
    }

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="achievements-component"]').exists()).toBe(true);
  });

  test('achievements-component hidden ', async () => {
    doctor.employee.academicDegree = 'a';
    doctor.employee.academicRank = 'a';

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="achievements-component"]').exists()).toBe(false);
  });

  test('Regalias list is shown correct', async () => {
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      r.name = String(i);
      doctor.employee.regalias.push(r);
    }
    wrapper = createWrapper(doctor);

    expect(wrapper.findAll('[data-test="regalia-list"]')).toHaveLength(doctor.employee.regalias.length);
  });

  test('doctor.employee.academicDegree li shows', async () => {
    doctor.employee.academicDegree = 'a';

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="academic-degree"]').exists()).toBe(false);
  });

  test('doctor.employee.academicRank li shows', async () => {
    doctor.employee.academicRank = 'academicRank';

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="academic-rank"]').exists()).toBe(true);
  });
});
