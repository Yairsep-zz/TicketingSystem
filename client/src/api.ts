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
	getTickets: (pageNumber:number, searchQuery: string , searchWord: string , date: string , email: string) => Promise<Ticket[]>;
}

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (pageNumber:number, searchQuery: string , searchWord: string , date: string , email: string) => {
			const pageNum = pageNumber.toString();
			const query = searchQuery.toLowerCase();
			const search_Word = searchWord.toString();
			const date_ = date.toLowerCase();
			const email_ = email.toLowerCase();
			const queryString = "http://localhost:3232/api/tickets" + "?page="+pageNum+ "&query="+query + "&search_Word="+search_Word + "&date="+date_ +"&email_="+email_;
			return axios.get(queryString).then((res) => res.data);
		}
	}
}


