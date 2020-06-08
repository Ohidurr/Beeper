import React, { useState, useEffect } from "react";
import navBar from './navBar'
import { useHistory } from 'react-router-dom';
import '../css/FeedPage.css'

import Modal from './Modal'
import axios from 'axios'

const Feed = () => {

}import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "../css/LandingPage.css"
import axios from 'axios';

const LandingPage = () => {

    const [Form,setShowForm] = useState(false)
    const [signUpForm, setsignUpForm] = useState(false)
    const history = useHistory()

    
    const handleLogInClick = () =>  {
        console.log(Form)
        setShowForm(!Form)
    }
    const handleSignUpClick = () =>  {
        console.log(signUpForm)
        setsignUpForm(!signUpForm)
    }
    const handleLogin = async(e) => {
        e.preventDefault()
        let display_name = e.target.display_name.value
        let url=`http://localhost:3001/users/search/${display_name}`
        try{
        let res = await axios.get(url)
        let user=res.data.body.searchUser
            if(user.length){
                sessionStorage.setItem("currentUser",user[0].id)
                history.push(`/feed`)
            }else{
                alert("fail")
            }
        }catch(error){
            console.log(error);
        }
    }

    const  handleSignup = async(e) => {
        e.preventDefault()
        let first_name={firstname:e.target.firstname.value}
        let last_name={lastname:e.target.lastname.value}
        let display_name={username:e.target.username.value}
        let profile_pic={profile_pic:e.target.profile_pic.value}
        if(!profile_pic){
            profile_pic=""
        }
        let newUser={first_name,last_name,display_name,profile_pic}
        try{
            let res = await axios.post(`http://localhost:3001/users/`,newUser)
            debugger
            sessionStorage.setItem("currentUser",res.data.body.newUser.id)
            history.push(`/feed`)
     }catch(error){
         console.log(error);
     }
    }

    const login = ()=>{
        return <div className="login-info">
            <form id="loginForm" onSubmit={handleLogin}>
                <input name="display_name" placeholder="username"></input>
                <button type="submit">submit</button>
            </form>
        
        </div>
    }

    
    const signup = () => {
        return( 
            <div className="signup-info">
     <form id="signupForm" onSubmit={handleSignup}>
        <input name="firstname"placeholder="First Name"></input>
        <input name="lastname" placeholder="Last Name"></input>
        <input name="username" placeholder="Username"></input>
        <input name="profile_pic" placeholder="VARCHAR"></input>
        <button type="submit">Submit</button>
     </form>
     </div>
        )
    }

    return(
        <div className="LandingPage">
            <div>
        <div id="leftSide">
            <img className="logo" src={imgs}/>

            </div>

            </div>
            <div id='rightSide'>
                <header>
                    <button id="logIN" onClick={handleLogInClick}>Login</button>
                    <button id="signUP" onClick={handleSignUpClick}>Signup</button>
                </header>
                <div className="bottom">
                
                </div>

                </div>


                {Form?login():null}
                {signUpForm?signup():null}



            </div>
    )
}

export default LandingPage