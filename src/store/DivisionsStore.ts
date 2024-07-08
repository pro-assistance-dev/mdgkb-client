import Division from '@/classes/Division';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Division> {
  // comment: DivisionComment;
  // timetable(state): Timetable | undefined {
  //   if (state.item) return state.item.timetable;
  // },
  // schedule(state): Schedule | undefined {
  //   if (state.item) return state.item.schedule;
  // },
  // comment(state): DivisionComment {
  //   return state.comment;
  // },
  // comments(state): DivisionComment[] {
  //   return state.item.divisionComments;
  // },
  // divisionById(state): (id: string) => Division | undefined {
  //   return (id: string): Division | undefined => state.items.find((item: Division) => item.id === id);
  // },
  // visitingRules(state): IVisitingRule[] {
  //   return state.division.visitingRules;
  // },
  constructor() {
    super(Division, 'divisions');
  }
  // async RemoveComment (id: string): Promise<void>  {
  //   await HttpClient.delete({ query: `comment/${id}` });
  //   commit('removeComment', id);
  // }
  // createComment: async ({ commit }, comment: DivisionComment): Promise<void> => {
  //   const res = await httpClient.post<DivisionComment, DivisionComment>({ query: `comment`, payload: comment });
  //   commit('resetComment', res);
  // },
  // updateComment: async ({ commit }, newComment: DivisionComment): Promise<void> => {
  //   await httpClient.put({ query: `comment/${newComment.id}`, payload: newComment });
  //   commit('updateComment', newComment.comment.id);
  // },
  // deleteComment: async ({ commit }, comment: DivisionComment): Promise<void> => {
  //   await httpClient.delete({ query: `comment/${comment.id}` });
  //   commit('deleteCommentFromNews', comment);
  // },
  // resetState(state) {
  //   Object.assign(state, getDefaultState());
  // },
  // setTimetable(state, timetable: Timetable) {
  //   if (!state.item) {
  //     return;
  //   }
  //   state.item.timetable = timetable;
  // },
  // removeTimetable(state) {
  //   if (!state.item) {
  //     return;
  //   }
  //   state.item.timetable.timetableDays.forEach((day: TimetableDay) => {
  //     if (day.id) {
  //       state.item.timetableDaysForDelete.push(day.id);
  //     }
  //   });
  //   state.item.timetable = new Timetable();
  // },
  // setOnlyShowed(state, onlyShowed: boolean) {
  //   state.onlyShowed = onlyShowed;
  // },
  // setSchedule(state, item: Schedule) {
  //   if (!state.item) return;
  //   state.item.schedule = item;
  // },
  // removeSchedule(state) {
  //   if (!state.item) return;
  //   state.item.schedule = new Schedule();
  // },
  // removeScheduleItem(state, i: number) {
  //   if (!state.item) return;
  //   const idForDelete = state.item.schedule.scheduleItems[i].id;
  //   if (idForDelete) state.item.schedule.scheduleItemsForDelete.push(idForDelete);
  //   state.item.schedule.scheduleItems.splice(i, 1);
  // },
  // addScheduleItem(state, item: ScheduleItem) {
  //   if (!state.item) return;
  //   state.item.schedule.scheduleItems.push(item);
  // },
  //   setComment(state, item: DivisionComment) {
  //     if (state.item) state.item.divisionComments.unshift(item);
  //     state.comment = new DivisionComment();
  //   },
  //   removeComment(state, commentId: string) {
  //     if (state.item) {
  //       const index = state.item.divisionComments.findIndex((item: DivisionComment) => item.id === commentId);
  //       state.item.divisionComments.splice(index, 1);
  //     }
  //   },
  //   editComment(state, commentId: string) {
  //     if (state.item) {
  //       state.item.divisionComments = state.item.divisionComments.map((item: DivisionComment) => {
  //         if (item.comment.id === commentId) item.comment.isEditing = true;
  //         return item;
  //       });
  //     }
  //   },
  //   updateComment(state, commentId: string) {
  //     if (state.item) {
  //       state.item.divisionComments = state.item.divisionComments.map((item: DivisionComment) => {
  //         if (item.comment.id === commentId) item.comment.isEditing = false;
  //         return item;
  //       });
  //     }
  //   },
  //   setParentIdToComment(state, parentId: string) {
  //     state.comment.divisionId = parentId;
  //   },
  //
  //   resetComment(state) {
  //     state.comment = new DivisionComment();
  //   },
}

const store: S = new S();
export default store;
