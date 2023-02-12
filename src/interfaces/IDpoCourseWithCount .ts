import DpoCourse from '@/classes/DpoCourse';

export default interface IDpoCourseWithCount {
  dpoCourses: DpoCourse[];
  count: number;
}
