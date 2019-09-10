export class GalleryResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: GalleryData;
}
export class GalleryData {
  count: number;
  rows: GalleryListModel[];
}
export class GalleryListModel {
  id: string;
  medea_url: string;
  medea_type: string;
  type: string;
  priority: number;
  tags?: any;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  ceremony_id: string;
  ceremony: CeremonyModel;
  image_interactions: Image_interaction[];
}
export class CeremonyModel {
  id: string;
  title: string;
  venue: string;
  date_time: string;
  description: string;
  image_url: string;
  address: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  event_id: string;
}

export class Image_interaction {
  id: string;
  comment: string;
  is_react: boolean;
  react_type?: any;
  image_replied?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  createdAt: string;
  updatedAt: string;
  user_consumer_id: string;
  image_id: string;
}





