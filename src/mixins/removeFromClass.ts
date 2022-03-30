interface IWithId {
  id?: string;
}

export default function removeFromClass(index: number, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
  console.log(arrayFromDelete);
  const idForDelete = arrayFromDelete[index].id;
  if (idForDelete) {
    arrayForDelete.push(idForDelete);
  }
  arrayFromDelete.splice(index, 1);
}
