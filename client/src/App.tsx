import React from 'react'
import './App.scss';
import {createApiClient, Ticket} from './api';
import Comment from "./Components/Comment";
import Star from './Components/Star';

export type AppState = {
    tickets: Ticket[],
    search: string,
    hiddenCount: number,
    pageNumber: number,
    hasMore: boolean
}

const api = createApiClient()

export class App extends React.PureComponent<{}, AppState> {

    state: AppState = {
        search: '',
        hiddenCount: 0,
        pageNumber: 1,
        tickets: [],
        hasMore: true,
    }

    searchDebounce: any = null;

    async componentDidMount() {
        this.setState({
            hiddenCount: 0,
            tickets: await api.getTickets(this.state.pageNumber , this.state.search),
            hasMore: await api.hasMore(this.state.pageNumber , this.state.search)
        });
    }

    async restore(){
        let tickets = await this.getAllTickets(this.state.pageNumber)
        this.setState({
            hiddenCount: 0,
            tickets: tickets
        });
    }

    async getAllTickets(pageNumber : number){
        let pageNum;
        let tickets = await api.getTickets(1 , this.state.search)
        for (pageNum =2 ; pageNum <= pageNumber ; pageNum++){
            tickets = [...tickets , ...await api.getTickets(pageNum , this.state.search)]
        }
        return tickets;
    }


    renderTickets = (tickets: Ticket[]) => {

        const filteredTickets = tickets

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
            if (ticket.content.length > 370){return true}
            else{return false}
        }


        return (<ul className='tickets'>
            {filteredTickets.map((ticket) => (!ticket.hidden ? <li key={ticket.id} className='ticket' onMouseOver={() => displayHide(ticket)} onMouseLeave={() => unDisplayHide(ticket)}>

                <div className="hidden">{ticket.displayHide && <a className="hideButton" onClick={() => hideTicket(ticket)}>Hide</a>}</div>
                <Star ticket_Id={ticket.id} favourite={ticket.favourite}/>

                <h5 className='title'>{ticket.title}</h5>

                <div className='content'>
                    {!longTicket(ticket) ? <p>{ticket.content}</p> :
                        !ticket.extendText ? <div><div className='longContent'> {ticket.content}</div><a className="showMore" onClick={() => seeMore(ticket)}>See More</a></div>
                            : <div>{ticket.content}<div><a className="showLess" onClick={() => seeLess(ticket)}>See less</a></div></div>}
                </div>

                <div> {ticket.labels && ticket.labels.map((label, index) => (<div key={index} className='ticketLabels'>{label}</div>))}</div>

                <Comment ticket_Id={ticket.id} comment={ticket.comment}/>
                <footer><div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div></footer></li> : null))}</ul>);
    }

    onSearch = async (val: string, newPage?: number) => {
        clearTimeout(this.searchDebounce);
        this.searchDebounce = setTimeout(async () => {
            this.setState({
                search: val
            });
            await this.getFilteredItems();
        }, 300);
    }
//
    getFilteredItems = async()=>{
        const tickets = await api.getTickets(1 ,this.state.search);
        this.setState({hasMore: await api.hasMore(1 , this.state.search)})
        this.setState({
            hiddenCount: 0,
            tickets: tickets,
            pageNumber: 1
        });
    }

    loadMore = async () =>{

        const tickets = await api.getTickets(this.state.pageNumber + 1, this.state.search);
        const hasMore = await api.hasMore(this.state.pageNumber + 1 , this.state.search);
        // await this.restore();
        this.setState({
            tickets: [...this.state.tickets, ...tickets],
            hasMore : hasMore,
            pageNumber: this.state.pageNumber +1
        });
    }

    render() {

        const {tickets} = this.state;
        return (<main>
                <h1>Tickets List</h1>
                <header>
                    <input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value, this.state.pageNumber)}/>
                </header>

                {tickets &&
                <div className='results'>Showing {tickets.length - this.state.hiddenCount} results
                    {this.state.hiddenCount > 0 &&
                    <text>({this.state.hiddenCount} hidden tickets - <a onClick={() => this.restore()}>restore</a>)</text>}
                </div>}

                {tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
                <div className='loadMoreButton'>
                    {this.state.hasMore && <button className='loadMore' onClick={this.loadMore}>Load More...</button>}
                </div>
            </main>
        )
    }
}

export default App;