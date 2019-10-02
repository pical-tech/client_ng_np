import { Image_interaction } from './../gallery/galleryResponse.model';

export class CeremonyResponseModel {
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
  photo_galleries: PhotoGallery[];
}

export class PhotoGallery {
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
  image_interactions: Image_interaction[];
}
