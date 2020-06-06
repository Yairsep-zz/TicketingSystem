import axios from 'axios';

export type Ticket = {
	id: string,
	title: string;
	content: string;
	creationTime: number;
	userEmail: string;
	labels?: string[];
	displayHide: boolean;
	hidden: boolean;
	extendText: boolean;
	favourite: boolean;
}

export type ApiClient = {
	getTickets: () => Promise<Ticket[]>;
}

export const createApiClient = (): ApiClient => {
	return {
		getTickets: () => {
			return axios.get(`http://localhost:3232/api/tickets`).then((res) => res.data);

			// axios({method: 'GET', url: 'http://localhost:3232/api/tickets', params: {page: pageNumber}}).then((res) => res.data);
		}
	}
}



