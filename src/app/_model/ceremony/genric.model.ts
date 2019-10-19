export interface User_consumer {
	id: string;
	grant_type?: any;
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
}

export interface Gift_registry {
	id: string;
	specification?: any;
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

export interface Image_interaction {
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

export interface Photo_gallery {
	id: string;
	medea_url: string;
	medea_type?: string;
	type?: any;
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

export interface Ceremony {
	id: string;
	title: string;
	venue: string;
	date_time: string;
	description: string;
	image_url: string[];
	address: string;
	latitude: string;
	longitude: string;
	created_at: string;
	updated_at: string;
	deleted_at?: any;
	createdAt: string;
	updatedAt: string;
	event_id: string;
	photo_galleries: Photo_gallery[];
}

export interface Data {
	id: string;
	description?: any;
	title: string;
	event_date: string;
	venue: string;
	latitude: string;
	longitude: string;
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
	s3_unnamed_collections: string[][];
	created_at: string;
	updated_at: string;
	deleted_at?: any;
	createdAt: string;
	updatedAt: string;
	customer_id: string;
	event_template?: any;
	user_consumers: User_consumer[];
	gift_registries: Gift_registry[];
	ceremonies: Ceremony[];
	rsvp_forms: any[];
}

export interface RootObject {
	status: number;
	message: string;
	is_error: boolean;
	data: Data;
}
