import PropertyFabric from './Property';

type classConstructor<T, I> = new (p?: I | undefined) => I;
type construction<T> = {
  func: () => void;
  arr: Array<T>;
};

type addedConstruction<T, I> = {
  entity: T;
  constructions: construction<I>[];
};

const ClassTester = (() => {
  function InspectAddedFunctions<T, I>(construction: addedConstruction<T, I>): boolean {
    return construction.constructions.every((c) => {
      const len = c.arr.length;
      if (c.arr.length !== 0) {
        return false;
      }
      c.func.apply(construction.entity);
      return len + 1 === c.arr.length;
    });
  }

  function Inspect<T, I>(c: classConstructor<T, I>): boolean {
    return emptyConstructorTest(c) && constructorWithParamTest<T, I>(c, generateTestClass(c));
  }

  function emptyConstructorTest<T, I>(c: classConstructor<T, I>): boolean {
    const classInstance = new c();
    let pass = true;
    for (const key in classInstance) {
      pass = PropertyFabric.GetProperty(classInstance[key]).checkDefaultType();
      if (!pass) {
        console.error('Prop ', key, ' initialize error');
        break;
      }
    }
    return pass;
  }

  function constructorWithParamTest<T, I>(c: classConstructor<T, I>, initializer: I): boolean {
    const classInstance = new c(initializer);
    let pass = true;
    for (const key in classInstance) {
      const prop = PropertyFabric.GetProperty(classInstance[key]);
      prop.implementType();
      pass = prop.checkImplementedType();
      if (!pass) {
        console.error('Prop ', key, ' error');
        break;
      }
    }
    return pass;
  }

  function generateTestClass<T, I>(c: classConstructor<T, I>): I {
    const classInstance = new c();
    for (const key in classInstance) {
      const prop = PropertyFabric.GetProperty(classInstance[key]);
      prop.implementType();
      classInstance[key] = prop.getProperty() as I[typeof key];
    }
    return classInstance;
  }

  return {
    Inspect,
    InspectAddedFunctions,
  };
})();

export default ClassTester;
