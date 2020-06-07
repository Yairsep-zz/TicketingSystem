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
	const search = req.query.search
	console.log(search)
	// console.log("page:", page)
	// console.log("search:", search)
	var FilteredData = tempData
	if (search !==""){
		FilteredData = FilteredData.filter((t) => ((t.title.toLowerCase().includes(search) || (t.content.toLowerCase().includes(search)))));
		// console.log("Not undifined", FilteredData)
	}
	FilteredData = FilteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	// const paginatedData = searchFilteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	// console.log(paginatedData.length)
	// console.log(tempData.length)
	res.send(FilteredData);
});

app.listen(PORT);
console.log('server running', PORT)

