import ClassHelper from '@/services/ClassHelper';

export default class MapNode {
  id?: string;
  name?: string;
  isEntry?: string;
  neighbors: MapNode[] = [];
  neighborsUuid: string[] = [];

  constructor(i?: MapNode) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'mapNode';
  }
}
