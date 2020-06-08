import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import {BsFillStarFill, BsStar} from "react-icons/bs";
// or
// import { GoogleLogin } from 'react-google-login';

export default function googleLogin(){

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (<div>
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />,
        document.getElementById('googleButton')
    </div>)
}
