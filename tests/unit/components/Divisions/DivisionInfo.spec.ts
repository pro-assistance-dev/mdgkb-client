import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';

import Division from '@/classes/Division';
import TreatDirection from '@/classes/TreatDirection';
import DivisionInfo from '@/components/Divisions/DivisionInfo.vue';

import Email from '../../../../src/classes/contacts/Email';
import TelephoneNumber from '../../../../src/classes/contacts/TelephoneNumber';
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

describe('DoctorInfo.vue', () => {
  let wrapper: VueWrapper<any>;
  let division: IDivision;

  beforeEach(() => {
    division = new Division();
  });

  test('Show photo if exists, else show alt image', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="chief-photo"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="chief-alt-photo"]').exists()).toBe(true);

    const divisionWithChiefPhoto = new Division();
    divisionWithChiefPhoto.chief.human.photo.fileSystemPath = '123';
    await wrapper.setProps({ division: divisionWithChiefPhoto });

    expect(wrapper.find('[data-test="chief-photo"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="chief-alt-photo"]').exists()).toBe(false);
  });

  test('Chief fullName shows if exists', async () => {
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="chief-name"]').exists()).toBe(false);

    const doctorWithDivision = new Division();
    doctorWithDivision.chief.human.name = 'Имя';
    doctorWithDivision.chief.human.surname = 'Фамилия';
    doctorWithDivision.chief.human.patronymic = 'Отчество';
    await wrapper.setProps({ division: doctorWithDivision });

    expect(wrapper.find('[data-test="chief-name"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="chief-name"]').text()).toBe(doctorWithDivision.chief.human.getFullName());
  });

  test('Division treatDirection name is shown', async () => {
    division.treatDirection = new TreatDirection();
    division.treatDirection.name = 'name';
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="treat-direction-name"]').exists()).toBe(division.treatDirection.name);
  });

  test('Division name is shown', async () => {
    division.name = 'name';
    wrapper = createWrapper(division);
    expect(wrapper.find('[data-test="division-name"]').exists()).toBe(division.name);
  });

  test('Address link push to map with division id', async () => {
    division.id = 'test';
    division.address = 'test';
    wrapper = createWrapper(division);

    await wrapper.find('[data-test="map-link"]').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(`/map/${division.id}`);
  });

  test('Position name is hidden if not exists', async () => {
    const wrapper = createWrapper(division);

    expect(wrapper.find('[data-test="position-name"]').exists()).toBe(false);
  });

  test('Phones list is shown correct', async () => {
    for (let i = 0; i < 5; i++) {
      const t = new TelephoneNumber();
      t.number = String(i);
      division.contactInfo.telephoneNumbers.push(t);
    }
    wrapper = createWrapper(division);
    expect(wrapper.findAll('[data-test="phones-list"]')).toHaveLength(division.contactInfo.telephoneNumbers.length);
  });

  test('Emails list is shown correct', async () => {
    for (let i = 0; i < 5; i++) {
      const t = new Email();
      t.address = String(i);
      division.contactInfo.telephoneNumbers.push(t);
    }
    wrapper = createWrapper(division);
    expect(wrapper.findAll('[data-test="emails-list"]')).toHaveLength(division.contactInfo.telephoneNumbers.length);
  });
});
