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
	const query = req.query.query
	const search_Word = req.query.search_Word
	const date = req.query.date
	const email = req.query.email_
	console.log("page:" +page)
	console.log("query:" +query)
	console.log("search_Word:" + search_Word)
	console.log("date:" + date)
	console.log("email:" + email)
	// console.log("page:", page)
	console.log("date:" , 1542111235544)
	console.log("query date:", new Date(date).getMilliseconds());
	console.log(1542111235544 < (new Date(date)).getMilliseconds())
	// console.log("search:", search)
	var FilteredData = tempData
	if (query === "before:"){
		FilteredData = FilteredData.filter((t) => (t.creationTime <= new Date(date).getTime() && (t.title.toLowerCase().includes(search_Word.toLowerCase()) || (t.content.toLowerCase().includes(search_Word.toLowerCase())))));
	}
	else if (query === "after:"){
		FilteredData = FilteredData.filter((t) => (t.creationTime > new Date(date).getTime() && (t.title.toLowerCase().includes(search_Word.toLowerCase()) || (t.content.toLowerCase().includes(search_Word.toLowerCase())))));
	}

	else if (query === "from:"){
		console.log(email)
		FilteredData = FilteredData.filter((t) => (t.userEmail.toLowerCase().includes(email.toLowerCase())));
		console.log(FilteredData)
	}
	else if (search_Word !==""){
		FilteredData = FilteredData.filter((t) => ((t.title.toLowerCase().includes(search_Word.toLowerCase()) || (t.content.toLowerCase().includes(search_Word.toLowerCase())))));
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

