import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import PostgraduateApplication from '@/classes/PostgraduateApplication';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import User from '@/classes/User';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(PostgraduateApplication),
  setUser(state, user: User) {
    state.item.formValue.user = new User(user);
  },
  setCourse(state, postgraduateCourse: PostgraduateCourse) {
    state.item.postgraduateCourse = new PostgraduateCourse(postgraduateCourse);
    state.item.postgraduateCourseId = state.item.postgraduateCourse.id;
  },
  setFormValue(state, form: Form) {
    state.item.formValue = new Form(form);
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
