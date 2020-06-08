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
	getTickets: (pageNumber:number, searchQuery: string) => Promise<Ticket[]>,
	hasMore: (pageNumber:number, searchQuery: string) => Promise<boolean>,
}

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (pageNumber:number, searchQuery: string) => {
			const pageNum = pageNumber.toString();
			const search_Query = searchQuery.toLowerCase();
			const queryString = "http://localhost:3232/api/tickets" + "?page="+pageNum+ "&SearchQuery="+search_Query;
			return axios.get(queryString).then((res) => res.data[0]);
		},
		hasMore: (pageNumber:number, searchQuery: string) => {
			const pageNum = pageNumber.toString();
			const search_Query = searchQuery.toLowerCase();
			const queryString = "http://localhost:3232/api/tickets" + "?page="+pageNum+ "&SearchQuery="+search_Query;
			return axios.get(queryString).then((res) => res.data[1]);
		}
	}
}


