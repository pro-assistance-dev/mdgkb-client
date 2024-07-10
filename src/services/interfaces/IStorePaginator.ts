export default interface IStorePaginator {
  Count: () => Ref<Number>;
  FTSP: () => Promise<void>;
}
