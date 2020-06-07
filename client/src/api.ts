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
	getTickets: (pageNumber:number, searchWord: string) => Promise<Ticket[]>;
}

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (pageNumber:number, searchWord: string) => {
			const pageNum = pageNumber.toString();
			const search = searchWord.toLowerCase();
			const tempString = "http://localhost:3232/api/tickets?page="+pageNum+"&search="+search;
			return axios.get(tempString).then((res) => res.data);
		}
	}
}


