import { InventoryResponseModel } from './index';

export class ProductResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: ProductDetailsModel;
}

export class ProductDetailsModel {
  id: string;
  description: string;
  price: number;
  mrp: number;
  title: string;
  indexing: number;
  image_url?: any;
  image_urls?: any;
  suggested_items?: InventoryResponseModel[];
  is_bride_groom?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  brand_id: string;
  category_id: string;
  source_id: string;
  inventory_brand: Inventory_brand;
  inventory_category: Inventory_category;
  inventory_source: Inventory_source;
}

export class Inventory_brand {
  id: string;
  name: string;
  tags?: any;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
}

export class Inventory_category {
  id: string;
  name: string;
  tags?: any;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
}

export class Inventory_source {
  id: string;
  patner_name: string;
  partner_link: string;
  api?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
}

