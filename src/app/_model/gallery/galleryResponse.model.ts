export class GalleryResponseModel {
  status: number;
  message: string;
  is_error: boolean;
  data: GalleryData[];
}

export class GalleryData {
  ceremony_id: string;
  ceremony_name: string;
  gallery: GalleryListModel[];
}

export class GalleryListModel {
  id: string;
  medea_url: string;
  tempImage?: string;
  medea_type?: string;
  type?: any;
  priority?: any;
  comments_count: string;
  is_like?: any;
  likes_count: string;
  tags?: any;
  is_public: boolean;
  is_vertical?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  ceremony_id: string;
  like_count: string;
  name: string;
  self_react: string;
}
