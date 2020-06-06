import React, {useState} from 'react';
import { BsStar , BsFillStarFill} from "react-icons/bs";
import '../App.scss';

function Star(){

    const [status , setStatus] = useState(false);

    function setFavourite() {
        setStatus(true);
    }
    function unFavourite() {
        setStatus(false);
    }

    return (<div className='star' >
        {!status ? <p onClick={() => setFavourite()}><BsStar color='black' size='1rem'/></p> : <p onClick={() => unFavourite()}><BsFillStarFill color='yellow' size='1rem'/></p>}

    </div>)
}

export default Star;