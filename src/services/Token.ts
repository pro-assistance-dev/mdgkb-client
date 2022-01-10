import ITokens from '@/interfaces/ITokens';

const TokenService = (() => {
  function _setToken(tokenObj: ITokens) {
    localStorage.setItem('accessToken', tokenObj.accessToken);
    localStorage.setItem('refreshToken', tokenObj.refreshToken);
  }
  function _getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  function _getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  function _clearToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return {
    setTokens: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();

export default TokenService;
