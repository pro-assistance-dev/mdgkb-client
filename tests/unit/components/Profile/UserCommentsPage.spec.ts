import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';
import { createStore } from 'vuex';

import Comment from '@/classes/comments/Comment';
import User from '@/classes/User';
import UserCommentsPage from '@/components/Profile/UserCommentsPage.vue';
import IUser from '@/interfaces/IUser';

import ComponentStub from '../../../__mocks__/ComponentStub';

describe('UserCommentsPage.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let store = createStore({
    modules: {
      users: {
        actions: {
          get: jest.fn(),
        },
        namespaced: true,
      },
    },
  });

  beforeEach(() => {
    const user = new User();
    store = createStore({
      modules: {
        users: {
          state: {
            item: user,
          },
          actions: {
            get: jest.fn(),
          },
          getters: {
            item: (state) => {
              return state.item;
            },
            comments: () => {
              return [];
            },
          },
          mutations: {
            set(state, item: IUser) {
              state.item = new User(item);
            },
          },
          namespaced: true,
        },
      },
    });
  });

  const createWrapper = (): VueWrapper<ComponentPublicInstance> => {
    return mount(UserCommentsPage, {
      global: {
        provide: {
          store,
        },
        stubs: {
          ProfileCommentCard: ComponentStub,
        },
      },
    });
  };

  test('Rendering after mounted is true', async () => {
    wrapper = createWrapper();
    expect(wrapper.find('[data-test="user-comments-component"]').exists()).toBe(false);
    await flushPromises();
    expect(wrapper.find('[data-test="user-comments-component"]').exists()).toBe(true);
  });

  test('Load questions list', async () => {
    wrapper = createWrapper();
    const user = new User();
    user.comments.push(new Comment(), new Comment(), new Comment(), new Comment());
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.findAll('[data-test="comments-list-item"]')).toHaveLength(user.comments.length);
  });
});
