
export class GuestResponseModel {
	status: number;
	message: string;
	is_error: boolean;
	data: Data;
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

export interface Data {
	count: number;
	rows: GuestRSVPList[];
}
