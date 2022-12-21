import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { v4 as uuidv4 } from 'uuid';

import Division from '@/classes/Division';
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
    divisionWithChiefPhoto.chief.employee.human.photo.fileSystemPath = '123';

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
});
