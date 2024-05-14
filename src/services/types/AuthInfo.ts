import ITokens from '@/services/interfaces/ITokens';

export type AuthInfo<UserT> = {
  user: UserT;
  tokens: ITokens;
};
