
export class GuestResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: GuestResponse;
}
export class GuestResponse {
  count: number;
  rows: GuestRSVPList[];
}

export class GuestRSVPList {
  id: string;
  name: string;
  phone_no: string;
  email?: any;
  description: string;
  timings: string;
  is_vegetarian?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  event_id?: any;
  event?: any;
}


export class GuestApprovalResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: GuestApprovalResponse;
}

export class GuestApprovalResponse {
  count: number;
  rows: GuestApprovalList[];
}

export class GuestApprovalList {
  id: string;
  grant_type?: any;
  side: string;
  approval_state: string;
  consumer_id: string;
  is_co_owner: boolean;
  s3_collection: string[];
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  event_id: string;
  user: GuestApprovalUser;
}


export class GuestApprovalUser {
  id: string;
  user_name: string;
  first_name: string;
  middle_name?: any;
  last_name: string;
  password: string;
  password_salt: string;
  password_iterations: string;
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
}

