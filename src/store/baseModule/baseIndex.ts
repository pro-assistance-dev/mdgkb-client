import { Constructable } from '@/services/ClassHelper';
import IBasicState from '@/store/baseModule/baseState';

export default function getBaseDefaultState<ClassType>(passedClass: Constructable<ClassType>): IBasicState<ClassType> {
  return {
    items: [],
    item: new passedClass(),
    count: 0,
  };
}
