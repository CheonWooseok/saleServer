export default interface User {
  user_id: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  // iat: number;
  // exp: number;
  // iss: string;
}
export interface AuthUser extends User {
  password: string;
  group?: 0 | 1 | 99;
}
