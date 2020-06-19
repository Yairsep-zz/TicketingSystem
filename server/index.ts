import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';


const app = express();

const PORT = 3232;

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.get('/api/tickets', (req, res) => {

	const page = req.query.page || 1;
	const query = req.query.SearchQuery;
	let hasMoreData = false;
	let FilteredData = tempData;
	let response = [FilteredData, hasMoreData];

	if (query.startsWith("after:")){
		const date = query.slice(6,16)
		const searchWord = query.slice(17, query.length)
		FilteredData = FilteredData.filter((t) => (t.creationTime > new Date(date).getTime() && (t.title.toLowerCase().includes(searchWord.toLowerCase()) || (t.content.toLowerCase().includes(searchWord.toLowerCase())))));
	}
	else if (query.startsWith("before:")){
		const date = query.slice(7,17)
		const searchWord = query.slice(18, query.length)
		FilteredData = FilteredData.filter((t) => (t.creationTime < new Date(date).getTime() && (t.title.toLowerCase().includes(searchWord.toLowerCase()) || (t.content.toLowerCase().includes(searchWord.toLowerCase())))));

	}
	else if (query.startsWith("from:")){
		const email = query.slice(5,query.length)
		FilteredData = FilteredData.filter((t) => (t.userEmail.toLowerCase().includes(email.toLowerCase())));

	}
	else if (query !==undefined){
		FilteredData = FilteredData.filter((t) => ((t.title.toLowerCase().includes(query.toLowerCase()) || (t.content.toLowerCase().includes(query.toLowerCase())))));

	}
	if (FilteredData.length > 20){
		hasMoreData = true;
	}
	FilteredData = FilteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
	if (tempData[tempData.length-1] === FilteredData[FilteredData.length-1]){
		hasMoreData =false;
	}
	response = [FilteredData, hasMoreData];
	res.send(response);

});

app.put('/api/updateTickets', (req, res) => {

	const ticket_Id = req.query.ticket_id;
	const comment = req.query.comment;
	var index = -1;
	const filterdTickets = tempData.find(function (ticket , i) {
		if (ticket.id == ticket_Id){
			index = i;
		}
	})
	tempData[index].comment = comment;

});

app.put('/api/favouriteTickets', (req, res) => {

	const ticket_Id = req.query.ticket_id;
	const favourite = req.query.favourite;
	var index = -1;
	const filterdTickets = tempData.find(function (ticket , i) {
		if (ticket.id == ticket_Id){
			index = i;
		}
	})
	tempData[index].favourite = favourite;
});

app.listen(PORT);
console.log('server running', PORT)

