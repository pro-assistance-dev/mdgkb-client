import IBasicState from '@/store/baseModule/baseState';

export interface Constructable<T> {
  new (i?: T): T;
}

export default function getBaseDefaultState<ClassType>(passedClass: Constructable<ClassType>): IBasicState<ClassType> {
  return {
    items: [],
    item: new passedClass(),
    count: 0,
  };
}
