import User from '@/classes/User';
import Human from '@/services/classes/Human';
import TokenService from '@/services/Token';

const UserService = (() => {
  function _getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString).id;
    }
    return '';
  }

  function _getUser(): User | undefined {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return;
  }

  function _isAdmin(): boolean {
    const user = _getUser();
    if (!user) {
      return false;
    }
    // TODO: userFix
    return true;
    // return user.role.name === 'ADMIN' || user.role.name.split('_')[0] === 'ADMIN';
  }

  function _updateHuman(human: Human) {
    if (!TokenService.isAuth()) return;
    const user = TokenService.getUser();
    if (!user) return;
    user.human = human;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return {
    getUserId: _getUserId,
    getUser: _getUser,
    updateHuman: _updateHuman,
    isAdmin: _isAdmin,
  };
})();

export default UserService;
