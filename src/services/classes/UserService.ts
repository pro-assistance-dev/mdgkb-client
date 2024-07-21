import IWithId from '@/services/interfaces/IWithId';

export default class AuthUser<TUser extends IWithId> {
  private user: TUser | undefined;

  Get(): TUser | undefined {
    return this.user;
  }

  GetId(): string | undefined {
    return this.Get()?.id;
  }

  Set(user: TUser): void {
    this.user = user;
  }
  Reset(): void {
    this.user = undefined;
  }
}
