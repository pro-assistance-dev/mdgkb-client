import { DynamicClass } from '@/services/classes/ClassesStore';

import EmptyVariables from '../../__mocks__/EmptyVariables';
import TestVariables from '../../__mocks__/TestVariables';

type typedGeneric<T> = T[Extract<keyof T, string>];
export default class PropertyFabric {
  static GetProperty<T>(property: typedGeneric<T>): IProperty {
    return new TypedClassesMap[typeof property](property);
  }
}

class UndefinedProperty implements IProperty {
  private property = undefined;
  constructor(p?: undefined) {
    if (p) {
      this.property = undefined;
    }
  }
  checkDefaultType(): boolean {
    return this.property === undefined;
  }
  implementType(): void {
    this.property = undefined;
  }
  checkImplementedType(): boolean {
    return this.property === undefined;
  }
  getProperty(): unknown {
    return this.property;
  }
}

class StringProperty implements IProperty {
  private property = '';
  constructor(p?: string) {
    if (p) {
      this.property = p;
    }
  }
  checkDefaultType(): boolean {
    return this.property === EmptyVariables.emptyString;
  }
  implementType(): void {
    this.property = TestVariables.smallCaseString;
  }
  checkImplementedType(): boolean {
    return this.property === TestVariables.smallCaseString;
  }
  getProperty(): unknown {
    return this.property;
  }
}

class NumberProperty implements IProperty {
  private property = 0;
  constructor(p?: number) {
    if (p) {
      this.property = p;
    }
  }
  checkDefaultType(): boolean {
    return this.property === EmptyVariables.emptyNumber;
  }
  implementType(): void {
    this.property = TestVariables.numberHundred;
  }
  checkImplementedType(): boolean {
    return this.property === TestVariables.numberHundred;
  }
  getProperty(): unknown {
    return this.property;
  }
}

class ObjectProperty<T> implements IProperty {
  private property: DynamicClass | undefined;
  private storedClass: DynamicClass | undefined;
  private className = '';

  constructor(p?: typedGeneric<T>) {
    if (Array.isArray(p)) {
      this.property = [];
      return;
    }
    if (p) {
      const pp = p as DynamicClass;
      this.storedClass = new DynamicClass(pp.constructor.name);
      this.className = pp.constructor.name;
    }
  }
  checkDefaultType(): boolean {
    if (Array.isArray(this.property)) {
      return this.property.length === 0;
    }
    return this.property === undefined;
  }
  implementType(): void {
    if (Array.isArray(this.property)) {
      this.property = TestVariables.arrayTriple;
      return;
    }
    this.property = this.storedClass;
    // this.property = undefined;
  }
  checkImplementedType(): boolean {
    if (Array.isArray(this.property)) {
      return this.property === TestVariables.arrayTriple;
    }
    return this.property instanceof DynamicClass.GetClass(this.className);
  }

  getProperty(): unknown {
    return this.property;
  }
}

class BooleanProperty implements IProperty {
  private property = false;
  private defaultBoolean = true;
  constructor(p?: boolean) {
    if (p) {
      this.property = p;
      this.defaultBoolean = false;
    }
  }
  checkDefaultType(): boolean {
    return this.defaultBoolean ? !this.property : this.property;
  }
  implementType(): void {
    this.property = true;
  }
  checkImplementedType(): boolean {
    return this.property;
  }
  getProperty(): unknown {
    return this.property;
  }
}

const TypedClassesMap: any = {
  undefined: UndefinedProperty,
  string: StringProperty,
  number: NumberProperty,
  object: ObjectProperty,
  boolean: BooleanProperty,
};
