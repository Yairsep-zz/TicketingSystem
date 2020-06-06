import React from 'react';
import './App.scss';
import {createApiClient, Ticket} from './api';
import Star from './Components/Star'

export type AppState = {
    tickets?: Ticket[],
    search: string;
    hiddenCount: number
}

const api = createApiClient()
let originalTickets = null;

export class App extends React.PureComponent<{}, AppState> {

    state: AppState = {
        search: '',
        hiddenCount: 0
    }

    searchDebounce: any = null;

    async componentDidMount() {
		originalTickets = await api.getTickets()
        this.setState({
            tickets: originalTickets
        });
    }

    async restore(){
        originalTickets = await api.getTickets()
        this.setState({tickets: originalTickets});
        this.setState({hiddenCount: 0})
    }

    // hideTicket2(ticket: Ticket) {
    //     const ticketFilter = this.state.tickets!.find(item => item.id === ticket.id);
	// 	ticketFilter!.hidden = true;
    //     this.setState({tickets: [...this.state.tickets!]})
	// 	this.setState({hiddenCount: this.state.hiddenCount +1})
    // }

    renderTickets = (tickets: Ticket[]) => {

        const filteredTickets = tickets
            .filter((t) => (t.title.toLowerCase() + t.content.toLowerCase() + t.userEmail.toLowerCase()).includes(this.state.search.toLowerCase()) &&
                !t.hidden);

        const hideTicket = (ticket : any) =>{
            ticket.hidden = true;
            this.setState({tickets:[...tickets]})
            this.setState({hiddenCount: this.state.hiddenCount +1})
        }

        const seeMore = (ticket : any) =>{
            ticket.extendText = true;
            this.setState({tickets:[...tickets]})
        }

        const seeLess = (ticket : any) =>{
            ticket.extendText = false;
            this.setState({tickets:[...tickets]})
        }

        const displayHide = (ticket : any) =>{
            ticket.displayHide = true;
            this.setState({tickets:[...tickets]})
        }

        const unDisplayHide = (ticket : any) =>{
            ticket.displayHide = false;
            this.setState({tickets:[...tickets]})
        }

        const setFavourite = (ticket : any) =>{
            ticket.favourite = true;
            this.setState({tickets:[...tickets]})
        }

        const unFavourite = (ticket : any) =>{
            ticket.favourite = false;
            this.setState({tickets:[...tickets]})
        }

        return (<ul className='tickets'>
            {filteredTickets.map((ticket) => (!ticket.hidden ? <li key={ticket.id} className='ticket' onMouseOver={() => displayHide(ticket)} onMouseLeave={() => unDisplayHide(ticket)}>

                <div className='hideButton'><text>{ticket.displayHide ? <a className="hideButton" onClick={() => hideTicket(ticket)}>Hide</a> : null}</text></div>
                {/*<div className='star'> {!ticket.favourite ? <text onClick={() => setFavourite(ticket)}><BsStar color='black' size='1rem'/></text> : <text onClick={() => unFavourite(ticket)}><BsFillStarFill color='yellow' size='1rem'/></text>}</div>*/}
                <Star/>
                <h5 className='title'>{ticket.title}</h5>



                {ticket.content.length < 382 ? <p>{ticket.content}</p> :
                    !ticket.extendText ? <p>{ticket.content.slice(0,350)}
                    <div><a className="showMore" onClick={() => seeMore(ticket)}>See More</a></div></p> :
                        <p>{ticket.content}<div><a className="showLess" onClick={() => seeLess(ticket)}>See less</a></div></p>}

                {/*<button>👍</button>*/}
                {/*<button>👎</button>*/}
                <p> {ticket.labels! ? ticket.labels!.map((label) => (<text className='ticketLabels'>{label}</text>)) : null}</p>

                <footer>
                    <div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
                </footer></li> : null))}</ul>);
    }

    onSearch = async (val: string, newPage?: number) => {

        if (val.includes("after:")){
            const date = val.slice(6, 16);
            const searchWord = val.slice(17, val.length);

            clearTimeout(this.searchDebounce);

            this.searchDebounce = setTimeout(async () => {
                this.setState({
                    search: searchWord
                });
            }, 300);
        }

        if (val.includes("before:")){
            const date = val.slice(7, 17);
            const searchWord = val.slice(18, val.length);

            clearTimeout(this.searchDebounce);

            this.searchDebounce = setTimeout(async () => {
                this.setState({
                    search: searchWord
                });
            }, 300);
        }

        if (val.includes("from:")){
            const email = val.slice(5, val.length);

            clearTimeout(this.searchDebounce);

            this.searchDebounce = setTimeout(async () => {
                this.setState({
                    search: email
                });
            }, 300);
        }
        else {
            clearTimeout(this.searchDebounce);

            this.searchDebounce = setTimeout(async () => {
                this.setState({
                    search: val
                });
            }, 300);
        }
    }

    render() {
        const {tickets} = this.state;

        return (<main>
            <h1>Tickets List</h1>
            <header>
                <input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
            </header>

            {tickets ? <div className='results'>Showing {tickets.length - this.state.hiddenCount} results {this.state.hiddenCount > 0 ?
                <text>({this.state.hiddenCount} hidden tickets - <a onClick={() => this.restore()}>restore</a>)</text>
                : null}
            </div> : null}

            {tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
        </main>)
    }
}

export default App;