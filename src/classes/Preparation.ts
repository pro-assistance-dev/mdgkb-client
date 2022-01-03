import PreparationRulesGroup from '@/classes/PreparationRulesGroup';
import PreparationToTag from '@/classes/PreparationToTag';
import IPreparation from '@/interfaces/IPreparation';
import IPreparationRulesGroup from '@/interfaces/IPreparationRulesGroup';
import IPreparationToTag from '@/interfaces/IPreparationToTag';

export default class Preparation implements IPreparation {
  id?: string;
  name = '';
  editMode = false;
  selected = false;
  preparationRulesGroups: IPreparationRulesGroup[] = [];
  preparationRulesGroupsForDelete: string[] = [];

  preparationsToTags: IPreparationToTag[] = [];
  preparationsToTagsForDelete: string[] = [];

  constructor(i?: IPreparation) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;

    if (i.preparationRulesGroups) {
      this.preparationRulesGroups = i.preparationRulesGroups.map((item: IPreparationRulesGroup) => new PreparationRulesGroup(item));
    }
    if (i.preparationsToTags) {
      this.preparationsToTags = i.preparationsToTags.map((item: IPreparationToTag) => new PreparationToTag(item));
    }
  }

  addRulesGroup(): void {
    this.preparationRulesGroups.push(new PreparationRulesGroup());
  }

  removeRulesGroup(index: number): void {
    const idForDelete = this.preparationRulesGroups[index].id;
    if (idForDelete) {
      this.preparationRulesGroupsForDelete.push(idForDelete);
    }
    this.preparationRulesGroups.splice(index, 1);
  }

  addTag(add: boolean, tagId: string): void {
    if (add) {
      const tag = new PreparationToTag();
      tag.preparationTagId = tagId;
      this.preparationsToTags.push(tag);
      return;
    }
    const tagForDeleteIndex = this.preparationsToTags.findIndex((tag: IPreparationToTag) => tag.preparationTagId === tagId);
    if (tagForDeleteIndex > -1) {
      const idForDelete = this.preparationsToTags[tagForDeleteIndex].id;
      if (idForDelete) {
        this.preparationsToTagsForDelete.push(idForDelete);
      }
      this.preparationsToTags.splice(tagForDeleteIndex, 1);
    }
  }
  findTag(tagId: string): boolean {
    return !!this.preparationsToTags.find((preparationToTag: IPreparationToTag) => preparationToTag.preparationTagId === tagId);
  }
}
