import React, { useState, useRef, useCallback } from 'react'
import './App.scss';
import {createApiClient, Ticket} from './api';
import Star from './Components/Star'

export type AppState = {
    tickets: Ticket[],
    search: string;
    hiddenCount: number;
    pageNumber: number;
}

const api = createApiClient()

export class App extends React.PureComponent<{}, AppState> {

    state: AppState = {
        search: '',
        hiddenCount: 0,
        pageNumber: 1,
        tickets: []
    }

    searchDebounce: any = null;

    async componentDidMount() {
        this.setState({
            tickets: await api.getTickets(this.state.pageNumber , this.state.search)
        });
    }

    async restore(){

        this.setState({
            hiddenCount: 0,
            tickets: this.state.tickets.map((ticket) => { ticket.hidden = false; return ticket})})
    }


    renderTickets = (tickets: Ticket[]) => {

        const filteredTickets = tickets
        //     .filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()) &&
        //         !t.hidden);

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

        const longTicket = (ticket : any) =>{
            const lines = ticket.content.split(/\r\n|\r|\n/)
            if (lines.length > 3){
                return true
            }
            else{
                return false
            }
        }

        const shortContent = (ticket : any) =>{
            const lines = ticket.content.split(/\r\n|\r|\n/)
            const maxlength = ticket.content
            return ticket.content.slice(0 , 500)
        }


        return (<ul className='tickets'>
            {filteredTickets.map((ticket) => (!ticket.hidden ? <li key={ticket.id} className='ticket' onMouseOver={() => displayHide(ticket)} onMouseLeave={() => unDisplayHide(ticket)}>

                <div className='hideButton'><text>{ticket.displayHide ? <a className="hideButton" onClick={() => hideTicket(ticket)}>Hide</a> : null}</text></div>
                {/*<div className='star'> {!ticket.favourite ? <text onClick={() => setFavourite(ticket)}><BsStar color='black' size='1rem'/></text> : <text onClick={() => unFavourite(ticket)}><BsFillStarFill color='yellow' size='1rem'/></text>}</div>*/}
                <Star/>
                <h5 className='title'>{ticket.title}</h5>
                <div className='content'>
                {!longTicket(ticket) ? <p>{ticket.content}</p> : longTicket(ticket) && !ticket.extendText
                    ? <p>{shortContent(ticket)}<div><a className="showMore" onClick={() => seeMore(ticket)}>See More</a></div></p>
                    : <p>{ticket.content}<div><a className="showLess" onClick={() => seeLess(ticket)}>See less</a></div></p>}
                </div>
                <p> {ticket.labels! ? ticket.labels!.map((label) => (<text className='ticketLabels'>{label}</text>)) : null}</p>
                <footer>
                    <div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
                </footer></li> : null))}</ul>);

    }
    onScroll = (event: React.UIEvent<HTMLElement>) => {
        console.log(1111)
        console.log(event.target)
    }
    onSearch = async (val: string, newPage?: number) => {

        const tickets = await api.getTickets(1 , this.state.search);
        this.setState({
            tickets: tickets,
            search: val,
            pageNumber: 1
        });
        console.log(tickets)


        // this.searchDebounce = setTimeout(async () => {
        //     this.setState({
        //         tickets: tickets,
        //         search: val
        //     });
        // }, 300);
    }

    loadMore = async () =>{
        console.log("asdfasdasd")
        const tickets = await api.getTickets(this.state.pageNumber + 1 , this.state.search);
        this.setState({
            tickets: [...this.state.tickets, ...tickets],
            pageNumber: this.state.pageNumber +1
    
        });
    }

    render() {

        const {tickets} = this.state;
        return (<main >
            <h1>Tickets List</h1>
            <header>
                <input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value, this.state.pageNumber)}/>
            </header>

            {tickets ? <div className='results'>Showing {tickets.length - this.state.hiddenCount} results {this.state.hiddenCount > 0 ?
                <text>({this.state.hiddenCount} hidden tickets - <a onClick={() => this.restore()}>restore</a>)</text>
                : null}
            </div> : null}
                
                {tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
                <button onClick={this.loadMore}>Load More...</button>
        </main>)
    }
}

export default App;