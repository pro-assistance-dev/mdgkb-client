const testUUID = '65bc6bb1-20cc-44dc-96a7-27bfafc0e5a5';

describe('Vuex Auth Mutations', () => {
  test('Blank', () => {
    expect(true).toBe(true);
  });
  // // let state: State;

  // beforeEach(() => {
  //   // state = store..getDefaultState();
  //   localStorage.clear();
  // });

  // test('Mutation setUser set user to store and localStorage.', () => {
  //   // Arrange
  //   expect(store.getters['auth/user'].id).toBeUndefined();
  //   expect(localStorage.getItem('user')).toBeNull();
  //   // Act
  //   const user: IUser = new User();
  //   user.id = testUUID;
  //   // const { setUser } = mutations;
  //   store.commit('auth/setUser', user);
  //   // Assert
  //   expect(store.getters['auth/user'].id).toEqual(user.id);
  //   const userString = localStorage.getItem('user');
  //   expect(userString).toEqual(JSON.stringify(user));
  //   if (userString) {
  //     expect(JSON.parse(userString)).toHaveProperty('id');
  //     expect(JSON.parse(userString)).toHaveProperty('human');
  //   }
  // });
});
