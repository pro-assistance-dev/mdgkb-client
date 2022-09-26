import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';

import Doctor from '@/classes/Doctor';
import Regalia from '@/classes/Regalia';
import DoctorAchievements from '@/components/Doctors/DoctorAchievements.vue';
import IDoctor from '@/interfaces/IDoctor';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ params: { slug: 1 } })),
}));

const stubs = {
  RouterLink: RouterLinkStub,
};

let mockRouter;

const createWrapper = (doctor: IDoctor, route?: string): VueWrapper<any> => {
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
  let doctor: IDoctor;

  beforeEach(() => {
    doctor = new Doctor();
  });

  test('achievements-component shows', async () => {
    doctor.academicDegree = 'academicDegree';
    doctor.academicRank = 'academicRank';
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      r.name = String(i);
      doctor.regalias.push(r);
    }

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="achievements-component"]').exists()).toBe(true);
  });

  test('achievements-component hidden ', async () => {
    doctor.academicDegree = 'a';
    doctor.academicRank = 'a';

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="achievements-component"]').exists()).toBe(false);
  });

  test('Regalias list is shown correct', async () => {
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      r.name = String(i);
      doctor.regalias.push(r);
    }
    wrapper = createWrapper(doctor);

    expect(wrapper.findAll('[data-test="regalia-list"]')).toHaveLength(doctor.regalias.length);
  });

  test('doctor.academicDegree li shows', async () => {
    doctor.academicDegree = 'a';

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="academic-degree"]').exists()).toBe(false);
  });

  test('doctor.academicRank li shows', async () => {
    doctor.academicRank = 'academicRank';

    wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="academic-rank"]').exists()).toBe(true);
  });
});
