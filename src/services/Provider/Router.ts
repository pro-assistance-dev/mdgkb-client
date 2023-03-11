import { RouteLocationNormalizedLoaded } from 'vue-router';

import router from '../../router';

const Router = (() => {
  function id() {
    return route().params['id'];
  }

  function route(): RouteLocationNormalizedLoaded {
    return router.currentRoute.value;
  }

  function routerPushBlank(path: string): void {
    const route = router.resolve({ path: path });
    window.open(route.href, '_blank');
  }

  function getPath(): string {
    const arr = route().path.split('/');
    return arr[arr.length - 1];
  }

  async function toAdmin(path: string): Promise<void> {
    await router.push(`/admin/${path}`);
  }

  return {
    toAdmin,
    id,
    route,
    getPath,
    routerPushBlank,
  };
})();

export default Router;
