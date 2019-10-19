export class GiftrRgistryResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: GiftrRgistryResponse;
}

export class GiftrRgistryResponse {
  count: number;
  rows: GiftrRgistryList[];
}

export class GiftrRgistryList {
  id: string;
  specification: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  event_id: string;
  inventory_id: string;
  gift_template_id?: any;
}
