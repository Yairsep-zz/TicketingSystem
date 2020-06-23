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
	comment: string;
}

export type ApiClient = {
	getTickets: (pageNumber:number, searchQuery: string) => Promise<Ticket[]>,
	hasMore: (pageNumber:number, searchQuery: string) => Promise<boolean>,
	comment: (ticket_id: string, comment: string) => Promise<boolean>,
	favourite: (ticket_id: string, favourite: boolean) => Promise<boolean>,
}

export const createApiClient = (): ApiClient => {
		const _BASEURL = 'http://localhost:3232/api/'
		const _PAGE = (pageNum : any) => `page=${pageNum}`
		const  _SearchQuery = (query : any) => `SearchQuery=${query.toLowerCase()}`
	return {


		getTickets: (pageNumber:number, searchQuery: string) => {
			const queryString = `${_BASEURL}tickets?${_PAGE(pageNumber)}&${_SearchQuery(searchQuery)}`;
			return axios.get(queryString).then((res) => res.data[0]);
		},
		hasMore: (pageNumber:number, searchQuery: string) => {
			const pageNum = pageNumber.toString();
			const search_Query = searchQuery.toLowerCase();
			const queryString = "http://localhost:3232/api/tickets" + "?page="+pageNum+ "&SearchQuery="+search_Query;
			return axios.get(queryString).then((res) => res.data[1]);
		},
		comment: (ticket_id: string, comment: string) => {
			const queryString = "http://localhost:3232/api/updateTickets" + "?ticket_id="+ticket_id+ "&comment="+comment;
			return axios.put(queryString).then((res) => res.data);
		},
		favourite: (ticket_id: string, favourite: boolean) => {
			const queryString = `http://localhost:3232/api/favouriteTickets?ticket_id=${ticket_id}&favourite=${favourite}`;
			return axios.put(queryString).then((res) => res.data);
		}
	}
}

