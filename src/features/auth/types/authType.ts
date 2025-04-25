export interface IUserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface IAuthState {
  user: IUserData | null;
  isloading: boolean;
  error: string | null;
}
