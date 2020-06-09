import React, {useState} from 'react';
import {createApiClient} from '../api';
import { BsStar , BsFillStarFill} from "react-icons/bs";
import '../App.scss';

const api = createApiClient()

function Star(props){

    const [status , setStatus] = useState(props.favourite);
    const [displayFavourite , setDisplayFavourite] = useState(status === "true");

    function isFavourite() {
        const respo = api.favourite(props.ticket_Id ,"true")
        setDisplayFavourite(true);
    }

    function unFavourite() {
        const respo = api.favourite(props.ticket_Id ,"false")
        setDisplayFavourite(false);
    }


    return (<div className='star'>
        {displayFavourite ? <p onClick={() => unFavourite()}><BsFillStarFill color='yellow' size='1rem'/></p> : <p onClick={() => isFavourite()}><BsStar color='black' size='1rem'/></p>}
    </div>)
}

export default Star;