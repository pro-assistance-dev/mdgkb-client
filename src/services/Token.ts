import ITokens from '@/interfaces/ITokens';

const TokenService = (() => {
  function _isAuth(): boolean {
    const token = _getAccessToken();
    return !(!token || token === 'undefined');
  }

  function _setToken(tokenObj: ITokens) {
    if (tokenObj.accessToken) {
      localStorage.setItem('access_token', tokenObj.accessToken);
    }
    if (tokenObj.refreshToken) {
      localStorage.setItem('refresh_token', tokenObj.refreshToken);
    }
  }

  function _getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString).id;
    }
    return '';
  }

  function _getAccessToken() {
    return localStorage.getItem('access_token');
  }
  function _getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  function _clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  return {
    isAuth: _isAuth,
    setTokens: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    getUserId: _getUserId,
    clearTokens: _clearTokens,
  };
})();

export default TokenService;
