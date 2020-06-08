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
	const hasMoreData = false;
	let FilteredData = tempData;

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
	else if (query !==""){
		FilteredData = FilteredData.filter((t) => ((t.title.toLowerCase().includes(query.toLowerCase()) || (t.content.toLowerCase().includes(query.toLowerCase())))));
		// console.log("Not undifined", FilteredData)
	}
	FilteredData = FilteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	res.send(FilteredData);

});

app.listen(PORT);
console.log('server running', PORT)

