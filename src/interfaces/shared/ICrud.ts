export default interface ICrud {
  storeModule: string;
  // route: string;
  // router?: Router;
  // store?: Store<unknown>;

  edit: (id: string) => Promise<void>;
  create: () => void;
  remove: (id: string) => Promise<void>;

  commit: <T>(commit: string, param?: T) => void;
}
