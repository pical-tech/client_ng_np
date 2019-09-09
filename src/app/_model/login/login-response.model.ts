export class LoginResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: UserData;
}
export class UserData {
  id: string;
  user_name: string;
  first_name?: any;
  middle_name?: any;
  last_name?: any;
  token: string;
  token_expired_at: string;
  refresh_token: string;
  phone_no: string;
  email: string;
  gender: string;
  dob?: any;
  type?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  user_detail: UserDetail;
}
export class UserDetail {
  id: string;
  address?: any;
  is_phone_verified: boolean;
  city?: any;
  pin_code?: any;
  preference?: any;
  user_selfie?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}


