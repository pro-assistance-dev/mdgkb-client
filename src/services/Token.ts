import ITokens from '@/interfaces/ITokens';

const TokenService = (() => {
  function _setToken(tokenObj: ITokens) {
    localStorage.setItem('access_token', tokenObj.accessToken);
    localStorage.setItem('refresh_token', tokenObj.refreshToken);
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
    setTokens: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearTokens: _clearTokens,
  };
})();

export default TokenService;
