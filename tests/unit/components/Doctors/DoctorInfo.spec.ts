import { DOMWrapper, mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';

import Doctor from '@/classes/Doctor';
import MedicalProfile from '@/classes/MedicalProfile';
import Regalia from '@/classes/Regalia';
import DoctorInfo from '@/components/Doctors/DoctorInfo.vue';

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

const createWrapper = (doctor: Doctor, route?: string): VueWrapper<ComponentPublicInstance> => {
  mockRouter = {
    push: jest.fn(),
  };
  return mount(DoctorInfo, {
    props: {
      doctor,
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

describe('DoctorInfo.vue', () => {
  let doctor: Doctor;

  beforeEach(() => {
    doctor = new Doctor();
  });

  test('Show photo if exists, else show alt image', async () => {
    const wrapper = createWrapper(doctor);
    expect(wrapper.find('[data-test="doctor-photo"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="doctor-alt-photo"]').exists()).toBe(true);

    const doctorWithPhoto = new Doctor();
    doctorWithPhoto.employee.human.photo.fileSystemPath = '123';
    await wrapper.setProps({ doctor: doctorWithPhoto });

    expect(wrapper.find('[data-test="doctor-photo"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="doctor-alt-photo"]').exists()).toBe(false);
  });

  // test('Division name is hidden if not exists', async () => {
  //   doctor.division = undefined;
  //   const wrapper = createWrapper(doctor);
  //   expect(wrapper.find('[data-test="division-name"]').exists()).toBe(false);
  //
  //   const doctorWithDivision = new Doctor();
  //   doctorWithDivision.division = new Division();
  //   await wrapper.setProps({ doctor: doctorWithDivision });
  //
  //   expect(wrapper.find('[data-test="division-name"]').exists()).toBe(false);
  // });
  //
  // test('Division name show if exists', async () => {
  //   doctor.division = new Division();
  //   doctor.division.name = 'test';
  //   const wrapper = createWrapper(doctor);
  //
  //   expect(wrapper.find('[data-test="division-name"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="division-name"]').text()).toBe(doctor.division.name);
  // });

  // test('Doctor name shows', async () => {
  //   doctor.employee.human.name = 'Name';
  //   doctor.employee.human.surname = 'Surname';
  //   doctor.employee.human.patronymic = 'Patronymic';
  //   const wrapper = createWrapper(doctor);

  // expect(wrapper.find('[data-test="doctor-name"]').exists()).toBe(true);
  // expect(wrapper.find('[data-test="doctor-name"]').text()).toBe(doctor.employee.human.getFullName());
  // });

  // test('BlockIsChief exists only if Doctor is Chief', async () => {
  //   const id = uuidv4();
  //   doctor.id = id;
  //   doctor.division = new Division();
  //   doctor.division.chiefId = id;
  //   const wrapper = createWrapper(doctor);
  //
  //   expect(wrapper.find('[data-test="is-chief-block"]').exists()).toBe(true);
  //   const doctorNotChief = new Doctor();
  //   await wrapper.setProps({ doctor: doctorNotChief });
  //   expect(wrapper.find('[data-test="is-chief-block"]').exists()).toBe(false);
  // });

  test('MedicalProfile name is hidden if not exists', async () => {
    doctor.medicalProfile = undefined;
    const wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="medical-profile-name"]').exists()).toBe(false);
    const doctorWithMedicalProfile = new Doctor();
    doctorWithMedicalProfile.medicalProfile = new MedicalProfile();
    await wrapper.setProps({ doctor: doctorWithMedicalProfile });
    expect(wrapper.find('[data-test="medical-profile-name"]').exists()).toBe(false);
  });

  test('MedicalProfile name show if exists', async () => {
    doctor.medicalProfile = new MedicalProfile();
    doctor.medicalProfile.name = 'test';
    const wrapper = createWrapper(doctor);
    expect(wrapper.find('[data-test="medical-profile-name"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="medical-profile-name"]').text()).toBe(doctor.medicalProfile.name);
  });

  test('Position name is hidden if not exists', async () => {
    const wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="position-name"]').exists()).toBe(false);
  });

  test('Regalias list is shown correct', async () => {
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      r.name = String(i);
      doctor.employee.regalias.push(r);
    }
    const wrapper = createWrapper(doctor);

    expect(wrapper.findAll('[data-test="regalia-list"]')).toHaveLength(doctor.employee.regalias.length);
  });
  test('Regalia list skip regalia without name ', async () => {
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      if (i !== 3) {
        r.name = String(i);
      }
      doctor.employee.regalias.push(r);
    }
    const wrapper = createWrapper(doctor);

    expect(wrapper.findAll('[data-test="regalia-list"]')).toHaveLength(doctor.employee.regalias.length - 1);
  });

  test('Regalia list has dot everywhere expect before first element ', async () => {
    for (let i = 0; i < 5; i++) {
      const r = new Regalia();
      r.name = String(i);
      doctor.employee.regalias.push(r);
    }
    const wrapper = createWrapper(doctor);

    wrapper.findAll('[data-test="regalia-list"]').forEach((w: DOMWrapper<Element>, i) => {
      w.text();
      if (i === 0) {
        expect(w.text()).toEqual('0');
      } else {
        expect(w.text()).toEqual('• ' + i);
      }
    });
  });

  test('MosDoctor link is hidden if not exists', async () => {
    const wrapper = createWrapper(doctor);
    expect(wrapper.find('[data-test="mos-doctor-link"]').exists()).toBe(false);
  });

  test('MosDoctor link show if exists', async () => {
    doctor.mosDoctorLink = 'test';
    const wrapper = createWrapper(doctor);
    expect(wrapper.find('[data-test="mos-doctor-link"]').exists()).toBe(true);
  });

  test('OnlineConsult button is hidden if not exists', async () => {
    const wrapper = createWrapper(doctor);
    expect(wrapper.find('[data-test="online-consult-button"]').exists()).toBe(false);
  });

  test('OnlineConsult button show  if exists', async () => {
    doctor.onlineDoctorId = 'test';
    const wrapper = createWrapper(doctor);
    expect(wrapper.find('[data-test="online-consult-button"]').exists()).toBe(true);
  });

  // test('Division link push to division of doctor with slug', async () => {
  //   doctor.division = new Division();
  //   doctor.division.slug = 'test';
  //   doctor.division.name = 'test';
  //   const wrapper = createWrapper(doctor);
  //
  //   await wrapper.find('[data-test="division-name"]').trigger('click');
  //   expect(mockRouter.push).toHaveBeenCalledTimes(1);
  //   expect(mockRouter.push).toHaveBeenCalledWith(`/divisions/${doctor.division.slug}`);
  // });
  //
  // test('Address link push to map with division id', async () => {
  //   doctor.division = new Division();
  //   doctor.division.id = 'test';
  //   doctor.division.address = 'test';
  //   const wrapper = createWrapper(doctor);
  //
  //   await wrapper.find('[data-test="map-link"]').trigger('click');
  //   expect(mockRouter.push).toHaveBeenCalledTimes(1);
  //   expect(mockRouter.push).toHaveBeenCalledWith(`/map/${doctor.division.id}`);
  // });

  test('doctor.employee.academicDegree shows', async () => {
    doctor.employee.academicDegree = '';

    const wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="regalia-list"]').exists()).toBe(false);
  });

  test('doctor.employee.academicRank shows', async () => {
    doctor.employee.academicRank = 'academicRank';

    const wrapper = createWrapper(doctor);

    expect(wrapper.find('[data-test="regalia-list"]').exists()).toBe(true);
  });
});
