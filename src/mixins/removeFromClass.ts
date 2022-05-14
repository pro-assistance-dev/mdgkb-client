import IWithId from '@/interfaces/IWithId';

export default function removeFromClass(index: number, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
  const idForDelete = arrayFromDelete[index].id;
  if (idForDelete) {
    arrayForDelete.push(idForDelete);
  }
  arrayFromDelete.splice(index, 1);
}
