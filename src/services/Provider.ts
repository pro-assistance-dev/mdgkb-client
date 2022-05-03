import { computed, ComputedRef, Ref } from 'vue';

type CallbackFunction = () => void;
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISchema from '@/interfaces/schema/ISchema';

import router from '../router/index';
import store from '../store/index';
const Provider = (() => {
  const r = router;
  const s = store;
  const schema: Ref<ISchema> = computed(() => s.getters['meta/schema']);
  const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

  function setFilterModel(model: IFilterModel): void {
    s.commit('filter/setFilterModel', model);
  }

  return {
    setFilterModel: setFilterModel,
    filterQuery: filterQuery,
    schema: schema,
    router: r,
    store: s,
  };
})();

export default Provider;
