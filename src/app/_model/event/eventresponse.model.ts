export class EventResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: EventResponse;
}

export class EventResponse {
  count: number;
  rows: EventResponseData[];
}

export class EventResponseData {
  id: string;
  description?: any;
  title: string;
  event_date: string;
  venue: string;
  latitude?: any;
  longitude?: any;
  address: string;
  pin_code: string;
  event_time: string;
  family_details?: any;
  bride_name: string;
  groom_name: string;
  event_url: string;
  event_slug: string;
  registry_start_date?: any;
  registry_end_date?: any;
  shipping_address?: any;
  gift_registry_owner?: any;
  s3_unnamed_collections?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  customer_id: string;
  user_consumers: any[];
}


