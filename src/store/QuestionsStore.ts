import Question from '@/classes/Question';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<Question> {
  constructor() {
    super(Question, 'questions');
  }
  async ReadAnswers(userId: string) {
    await HttpClient.Put<Question, Question>({
      query: this.getUrl(`profile/question-answer/${userId}`),
    });
    this.Set();
  }
  async Publish(id: string): Promise<void> {
    await HttpClient.Put<Question, Question>({
      query: this.getUrl(`publish/${id}`),
    });
    this.Set();
  }
  async ChangeNewStatus(question: Question): Promise<void> {
    await HttpClient.Put<Question, Question>({
      query: this.getUrl(`new/${question.id}?isNew=${question.isNew}`),
    });
  }
}

const store: S = new S();
export default store;
