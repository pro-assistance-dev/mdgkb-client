import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';

import Comment from '@/classes/comments/Comment';
import Question from '@/classes/Question';
import ProfileCommentCard from '@/components/Profile/ProfileCommentCard.vue';
import IComment from '@/interfaces/comments/IComment';
import IQuestion from '@/interfaces/IQuestion';
import DateTimeFormatter from '@/services/DateFormat';

import ComponentStub from '../../../__mocks__/ComponentStub';

const dateTimeFormatter = new DateTimeFormatter('ru-RU');

type IWrapper = (object: {
  comment?: IComment;
  question?: IQuestion;
  isQuestion?: boolean;
  isReview?: boolean;
}) => VueWrapper<ComponentPublicInstance>;

const createWrapper: IWrapper = ({ comment, question, isQuestion, isReview }): VueWrapper<ComponentPublicInstance> => {
  return mount(ProfileCommentCard, {
    props: {
      comment,
      question,
      isQuestion,
      isReview,
    },
    global: {
      mocks: {
        $dateTimeFormatter: new DateTimeFormatter('ru-RU'),
      },
      stubs: {
        Rating: ComponentStub,
      },
    },
  });
};

describe('ProfileCommentCard.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let comment: IComment;
  let question: IQuestion;

  beforeEach(() => {
    comment = new Comment();
    question = new Question();
  });

  test('Question date properly shows if exists', async () => {
    wrapper = createWrapper({ question });
    expect(wrapper.find('[data-test="question-date"]').exists()).toBe(false);
    question.date = new Date();
    await wrapper.setProps({ isQuestion: true });
    expect(wrapper.find('[data-test="question-date"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="question-date"]').text()).toBe(`Вопрос от ${dateTimeFormatter.format(question.date)}`);
  });

  test('Comment date properly shows if exists', async () => {
    wrapper = createWrapper({ comment });
    expect(wrapper.find('[data-test="comment-or-review-date"]').exists()).toBe(true);
    comment.publishedOn = new Date();
    await wrapper.setProps({ isReview: false });
    expect(wrapper.find('[data-test="comment-or-review-date"]').text()).toBe(`Комментарий от ${dateTimeFormatter.format(question.date)}`);
  });

  test('Review date properly shows if exists', async () => {
    wrapper = createWrapper({ comment });
    expect(wrapper.find('[data-test="comment-or-review-date"]').exists()).toBe(true);
    comment.publishedOn = new Date();
    expect(wrapper.find('[data-test="comment-or-review-date"]').text()).toBe(`Отзыв от ${dateTimeFormatter.format(question.date)}`);
  });

  test('Question text shows if exists', async () => {
    question.question = 'Question?';
    wrapper = createWrapper({ question, isQuestion: true });
    expect(wrapper.find('[data-test="question-text"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="question-text"]').text()).toBe(question.question);
  });

  test('Question text shows if exists', async () => {
    question.question = 'Question?';
    wrapper = createWrapper({ question, isQuestion: true });
    expect(wrapper.find('[data-test="question-text"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="question-text"]').text()).toBe(question.question);
  });

  test('Comment text shows if exists', async () => {
    comment.text = 'Comment';
    wrapper = createWrapper({ comment });
    expect(wrapper.find('[data-test="comment-text"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="comment-text"]').text()).toBe(comment.text);
  });

  test('Comment answer shows', async () => {
    comment.answer = 'Comment';
    wrapper = createWrapper({ isQuestion: false, comment });
    expect(wrapper.find('[data-test="question-answer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="comment-answer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="comment-answer"]').text()).toBe(comment.answer);
  });

  test('Question answer shows', async () => {
    question.answer = 'Comment';
    question.originalAnswer = 'Comment';
    wrapper = createWrapper({ isQuestion: true, question });
    expect(wrapper.find('[data-test="comment-answer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="question-answer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="question-answer"]').text()).toBe(question.originalAnswer);
  });

  test('Question answer when its empty', async () => {
    question.answer = 'Comment';
    wrapper = createWrapper({ isQuestion: true, question });
    expect(wrapper.find('[data-test="question-answer"]').text()).toBe('Вопрос обрабатывается');
  });
});
