export interface GiftrRgistryResponseModel {
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
  inventory: Inventory;
}
export class Inventory {
  id: string;
  description: string;
  price: number;
  mrp: number;
  title: string;
  indexing: number;
  image_url: string;
  image_urls: string;
  suggested_items: number[];
  is_bride_groom: string;
  subtitle?: any;
  discount?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  brand_id: string;
  category_id: string;
  source_id: string;
}




