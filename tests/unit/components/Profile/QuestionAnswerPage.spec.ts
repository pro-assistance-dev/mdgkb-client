import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';
import { createStore } from 'vuex';

import Question from '@/classes/Question';
import User from '@/classes/User';
import User from '@/classes/User';
import QuestionAnswerPage from '@/components/Profile/QuestionAnswerPage.vue';

import ComponentStub from '../../../__mocks__/ComponentStub';

describe('QuestionAnswerPage.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let store = createStore({
    modules: {
      users: {
        actions: {
          get: jest.fn(),
        },
        namespaced: true,
      },
      questions: {
        actions: {
          readAnswers: jest.fn(),
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
            set(state, item: User) {
              state.item = new User(item);
            },
          },
          namespaced: true,
        },
      },
    });
  });

  const createWrapper = (): VueWrapper<ComponentPublicInstance> => {
    return mount(QuestionAnswerPage, {
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
    expect(wrapper.find('[data-test="qa-component"]').exists()).toBe(false);
    await flushPromises();
    expect(wrapper.find('[data-test="qa-component"]').exists()).toBe(true);
  });

  test('Load questions list', async () => {
    wrapper = createWrapper();
    const user = new User();
    user.questions.push(new Question(), new Question(), new Question(), new Question());
    store.commit('users/set', user);
    await flushPromises();
    expect(wrapper.findAll('[data-test="qa-list-item"]')).toHaveLength(user.questions.length);
  });
});
