type CallbackFunction = () => void;
import router from '../router/index';
import store from '../store/index';
const Provider = (() => {
  const r = router;
  const s = store;
  return {
    router: r,
    store: s,
  };
})();

export default Provider;
