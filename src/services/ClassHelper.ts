import 'reflect-metadata';

import IWithId from '@/interfaces/IWithId';
import { Constructable } from '@/store/baseModule/baseIndex';

export default class ClassHelper {
  static BuildClass(passedClass: { [key: string]: any }, arg?: { [key: string]: any }): void {
    if (!arg) {
      return;
    }
    Object.keys(arg).forEach((key) => {
      const prop = arg[key];
      if (this.isPrimitive(prop)) {
        passedClass[key] = prop;
      } else if (prop !== null && !Array.isArray(prop)) {
        passedClass[key] = new passedClass[key].constructor(prop);
      }
      if (Array.isArray(prop)) {
        const constructor = Reflect.getMetadata(key, passedClass);
        passedClass[key] = prop.map((t) => new constructor[key](t));
      }
    });
  }

  static GetClassConstructorForArray = <T>(construct: Constructable<T>): PropertyDecorator => {
    return (targetClass, propertyName) => {
      if (propertyName === 'educations') {
        console.log(construct);
      }

      const metadataSingleton = Reflect.getMetadata(`property:${propertyName as string}`, targetClass) || {};
      metadataSingleton[propertyName] = construct;
      Reflect.defineMetadata(propertyName, metadataSingleton, targetClass);
    };
  };

  private static isPrimitive(prop: any): boolean {
    return prop !== null && typeof prop !== 'undefined' && prop !== Object(prop);
  }

  static RemoveFromClassByIndex(index: number, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
    const idForDelete = arrayFromDelete[index].id;
    if (idForDelete) {
      arrayForDelete.push(idForDelete);
    }
    arrayFromDelete.splice(index, 1);
  }

  static RemoveFromClassById(id: string | undefined, arrayFromDelete: IWithId[], arrayForDelete: string[]): void {
    const index = arrayFromDelete.findIndex((i: IWithId) => i.id === id);
    if (index < 0) {
      return;
    }
    const idForDelete = arrayFromDelete[index].id;
    if (idForDelete) {
      arrayForDelete.push(idForDelete);
    }
    arrayFromDelete.splice(index, 1);
  }
}
