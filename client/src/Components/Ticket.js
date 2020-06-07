// import React from "react";
// import Star from "./Star";
//
//
// function Ticket(props) {
//
//     const hideTicket = (ticket : any) =>{
//         ticket.hidden = true;
//         this.setState({tickets:[...tickets]})
//         this.setState({hiddenCount: this.state.hiddenCount +1})
//     }
//
//     const seeMore = (ticket : any) =>{
//         ticket.extendText = true;
//         this.setState({tickets:[...tickets]})
//     }
//
//     const seeLess = (ticket : any) =>{
//         ticket.extendText = false;
//         this.setState({tickets:[...tickets]})
//     }
//
//     const displayHide = (ticket : any) =>{
//         ticket.displayHide = true;
//         this.setState({tickets:[...tickets]})
//     }
//
//     const unDisplayHide = (ticket : any) =>{
//         ticket.displayHide = false;
//         this.setState({tickets:[...tickets]})
//     }
//
//     const longTicket = (ticket : any) =>{
//         const lines = ticket.content.split(/\r\n|\r|\n/)
//         if (lines.length > 3){
//             return true
//         }
//         else{
//             return false
//         }
//     }
//
//     const shortContent = (ticket : any) =>{
//         const lines = ticket.content.split(/\r\n|\r|\n/)
//         const maxlength = ticket.content
//         return ticket.content.slice(0 , 500)
//     }
//
//
//     return (
//         <ul className='tickets'>
//             {filteredTickets.map((ticket) => (!ticket.hidden ? <li key={ticket.id} className='ticket' onMouseOver={() => displayHide(ticket)} onMouseLeave={() => unDisplayHide(ticket)}>
//
//                 <div className='hideButton'><text>{ticket.displayHide ? <a className="hideButton" onClick={() => hideTicket(ticket)}>Hide</a> : null}</text></div>
//                 {/*<div className='star'> {!ticket.favourite ? <text onClick={() => setFavourite(ticket)}><BsStar color='black' size='1rem'/></text> : <text onClick={() => unFavourite(ticket)}><BsFillStarFill color='yellow' size='1rem'/></text>}</div>*/}
//                 <Star/>
//                 <h5 className='title'>{ticket.title}</h5>
//
//                 {!longTicket(ticket) ? <p>{ticket.content}</p> : longTicket(ticket) && !ticket.extendText
//                     ? <p>{shortContent(ticket)}<div><a className="showMore" onClick={() => seeMore(ticket)}>See More</a></div></p>
//                     : <p>{ticket.content}<div><a className="showLess" onClick={() => seeLess(ticket)}>See less</a></div></p>}
//
//                 {/*/!*<button>👍</button>*!/*/}
//                 {/*/!*<button>👎</button>*!/*/}
//                 <p> {ticket.labels! ? ticket.labels!.map((label) => (<text className='ticketLabels'>{label}</text>)) : null}</p>
//
//                 <footer>
//                     <div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
//                 </footer></li> : null))}</ul>);
//
//         <div className="Ticket">
//             <h1>{props.name}</h1>
//             <p>{props.details}</p>
//         </div>
//     );
// }
//
// export default Ticket;

// hideTicket2(ticket: Ticket) {
//     const ticketFilter = this.state.tickets!.find(item => item.id === ticket.id);
// 	ticketFilter!.hidden = true;
//     this.setState({tickets: [...this.state.tickets!]})
// 	this.setState({hiddenCount: this.state.hiddenCount +1})
// }