const FavouriteService = (() => {
  function _setFavourite(domain: string, id: (string | undefined)[]) {
    localStorage.setItem(`${domain}_favourite`, id.toString());
  }

  function _isFavourite(domain: string, id: string): boolean {
    const ids = localStorage.getItem(`${domain}_favourite`);
    if (!ids) {
      return false;
    }
    const idArr = ids.split(',');
    return idArr.includes(id);
  }

  function _addToFavourite(domain: string, id: string) {
    const ids = localStorage.getItem(`${domain}_favourite`);
    if (!ids) {
      _setFavourite(domain, [id]);
      return;
    }
    const idArr = ids!.split(',');
    idArr.push(id);
    _setFavourite(domain, idArr);
  }

  function _removeFromFavourite(domain: string, id: string) {
    const ids = localStorage.getItem(`${domain}_favourite`);
    if (!ids) {
      return;
    }
    const idArr = ids.split(',').filter((i: string) => i !== id);
    _setFavourite(domain, idArr);
  }

  function _clearFavourite() {
    for (const key in localStorage) {
      if (key.includes('_favourite')) {
        localStorage.removeItem(key);
      }
    }
  }
  // function _getAccessToken() {
  //   return localStorage.getItem('access_token');
  // }
  // function _getRefreshToken() {
  //   return localStorage.getItem('refresh_token');
  // }
  // function _clearTokens() {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
  // }

  return {
    addToFavourite: _addToFavourite,
    removeFromFavourite: _removeFromFavourite,
    setFavourite: _setFavourite,
    isFavourite: _isFavourite,
    clearFavourite: _clearFavourite,
  };
})();

export default FavouriteService;
