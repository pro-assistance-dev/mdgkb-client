import 'reflect-metadata';

import { v4 as uuidv4 } from 'uuid';

import IWithId from '@/services/interfaces/IWithId';

export type ClassType = { [key: string]: any };
export type Constructable<T> = { new (...args: any[]): T };

export default class ClassHelper {
  static BuildClass(passedClass: ClassType, arg?: ClassType): void {
    if (!arg) {
      return;
    }
    Object.keys(arg).forEach((key) => {
      const prop = arg[key];
      if (this.isPrimitive(prop)) {
        if (passedClass[key] instanceof Date) {
          passedClass[key] = new Date(prop);
        } else {
          passedClass[key] = prop;
        }
      } else if (prop !== null && prop !== undefined && !Array.isArray(prop)) {
        if (passedClass[key] && passedClass[key].constructor) {
          passedClass[key] = new passedClass[key].constructor(prop);
        } else {
          const constructor = Reflect.getMetadata(key, passedClass);
          if (constructor) {
            passedClass[key] = new constructor[key](prop);
          }
        }
      }
      if (Array.isArray(prop)) {
        const constructor = Reflect.getMetadata(key, passedClass);
        if (constructor) {
          passedClass[key] = prop.map((t) => new constructor[key](t));
        }
      }
    });
  }

  static GetClassConstructor = <T>(construct: Constructable<T>): PropertyDecorator => {
    return (targetClass, propertyName) => {
      const metadataSingleton = Reflect.getMetadata(`property:${propertyName as string}`, targetClass) || {};
      metadataSingleton[propertyName] = construct;
      Reflect.defineMetadata(propertyName, metadataSingleton, targetClass);
    };
  };

  private static isPrimitive(prop: any): boolean {
    return prop !== null && typeof prop !== 'undefined' && prop !== Object(prop);
  }

  static RemoveFromClassByIndex(index: number, arrayFromDelete: IWithId[], arrayForDelete?: string[]): void {
    ClassHelper.RemoveFromClass(index, arrayFromDelete, arrayForDelete);
  }

  static RemoveFromClassById(id: string | undefined, arrayFromDelete: IWithId[], arrayForDelete?: string[]): string | undefined {
    if (!id) {
      return;
    }
    const index = arrayFromDelete.findIndex((i: IWithId) => i.id === id);
    ClassHelper.RemoveFromClass(index, arrayFromDelete, arrayForDelete);
  }

  private static RemoveFromClass(index: number, arrayFromDelete: IWithId[], arrayForDelete?: string[]): void {
    if (index < 0) {
      return;
    }
    const idForDelete = arrayFromDelete[index].id;
    if (idForDelete && arrayForDelete) {
      arrayForDelete.push(idForDelete);
    }
    arrayFromDelete.splice(index, 1);
  }

  static GetPropertyName<T extends ClassType>(obj: Constructable<T>): T {
    const o = new obj();
    return new Proxy(o, {
      get(t, key) {
        return key;
      },
    });
  }

  static CreateUUID(): string {
    return uuidv4();
  }

  static InitClassInstance(passedClass: ClassType, arg?: ClassType): ClassType {
    const item = passedClass.constructor(arg);
    ClassHelper.BuildClass(item);
    item.id = ClassHelper.CreateUUID();
    return item;
  }
  static ExistsWithId(arr: IWithId[], id?: string): boolean {
    return arr.some((a: IWithId) => a.id === id);
  }
}
