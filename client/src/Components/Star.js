import React, {useState} from 'react';
import {createApiClient} from '../api';
import {BsStar, BsFillStarFill} from "react-icons/bs";
import '../App.scss';

const api = createApiClient()

function Star(props) {

    const [favourite, setFavourite] = useState(props.favourite);

    function toggleFavourite() {
        api.favourite(props.ticket_Id, !favourite)
        setFavourite(!favourite);
    }

    return (<div className='star'>
        {!favourite
            ? <p onClick={() => toggleFavourite()}><BsStar color='black' size='1rem'/></p>
            : <p onClick={() => toggleFavourite()}><BsFillStarFill color='yellow' size='1rem'/></p>}
    </div>)
}

export default Star;