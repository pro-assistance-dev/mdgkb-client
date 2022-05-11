interface IWithId {
  id?: string;
}

export default function removeFromClass(index: number, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
  const idForDelete = arrayFromDelete[index].id;
  console.log(index, arrayFromDelete);
  if (idForDelete) {
    arrayForDelete.push(idForDelete);
  }
  arrayFromDelete.splice(index, 1);
}
